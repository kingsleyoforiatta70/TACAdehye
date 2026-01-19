import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RulesOfConduct from './pages/RulesOfConduct';
import BriefHistory from './pages/BriefHistory';
import OurBelief from './pages/OurBelief';
import Tenets from './pages/Tenets';
import Contact from './pages/Contact';
import SubmissionForm from './pages/SubmissionForm';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { MessageProvider } from './context/MessageContext';
import { EventProvider, useEvents } from './context/EventContext';
import { CalendarProvider } from './context/CalendarContext';
import { VideoProvider } from './context/VideoContext';
import { GalleryProvider } from './context/GalleryContext';
import { LeaderProvider } from './context/LeaderContext';
import ScrollToTop from './components/ScrollToTop';
import LocalHistory from './pages/LocalHistory';
import Videos from './pages/Videos';
import Gallery from './pages/Gallery';
import {
  AudioSermon,
  LiveStream,
} from './pages/Placeholders';
import EventDetails from './pages/EventDetails';
import CalendarPage from './pages/CalendarPage';
import LoadingScreen from './components/LoadingScreen';

// Internal component to consume contexts
const AppContent = () => {
  const { loading: contentLoading } = useContent();
  const { loading: eventsLoading } = useEvents();
  const [animationFinished, setAnimationFinished] = useState(false);

  // Check if critical data is loaded
  const dataLoaded = !contentLoading && !eventsLoading;

  return (
    <>
      {/* 
        LoadingScreen covers the entire screen (fixed, z-50, bg-white).
        It waits for dataReady to be true before fading itself out.
      */}
      {!animationFinished && (
        <LoadingScreen
          dataReady={dataLoaded}
          onComplete={() => setAnimationFinished(true)}
        />
      )}

      {/* 
         Render the app immediately behind the loading screen.
      */}
      <div className="min-h-screen bg-white">
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about/tenets" element={<Tenets />} />
                <Route path="/about/our-belief" element={<OurBelief />} />
                <Route path="/about/rules" element={<RulesOfConduct />} />
                <Route path="/about/history" element={<BriefHistory />} />
                <Route path="/about/local-history" element={<LocalHistory />} />
                <Route path="/media/audio" element={<AudioSermon />} />
                <Route path="/media/videos" element={<Videos />} />
                <Route path="/media/pictures" element={<Gallery />} />
                <Route path="/live-stream" element={<LiveStream />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/prayer-request" element={<SubmissionForm title="Prayer Request" />} />
                <Route path="/testimony" element={<SubmissionForm title="Testimony" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/events/:id" element={<EventDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MessageProvider>
          <EventProvider>
            <CalendarProvider>
              <VideoProvider>
                <GalleryProvider>
                  <LeaderProvider>
                    <AppContent />
                  </LeaderProvider>
                </GalleryProvider>
              </VideoProvider>
            </CalendarProvider>
          </EventProvider>
        </MessageProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
