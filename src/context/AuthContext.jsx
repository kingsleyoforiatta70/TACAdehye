import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;

                if (data?.session?.user) {
                    await fetchProfile(data.session.user);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error getting session:', error);
                setLoading(false);
            }
        };

        getSession();

        // Force loading to false after 3 seconds to prevent hanging
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                await fetchProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const fetchProfile = async (authUser) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
            }

            const profile = data || null;

            setUser({
                ...authUser,
                isProfileComplete: !!profile,
                profile: profile
            });
        } catch (error) {
            console.error('Error in fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
        return { success: true };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: profileData.fullName,
                phone_number: profileData.phoneNumber,
                role: profileData.role,
                updated_at: new Date()
            });

        if (error) {
            console.error('Error updating profile:', error);
            throw error;
        }

        // Refresh user state
        await fetchProfile(user);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
