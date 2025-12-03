import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kiusgydbxwrduhgafqnp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpdXNneWRieHdyZHVoZ2FmcW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTcxNzAsImV4cCI6MjA4MDMzMzE3MH0.kOKt7PbzBZ1plYGB6Nzu2Wcfn22UlrD1Q16jXTmAIZQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
