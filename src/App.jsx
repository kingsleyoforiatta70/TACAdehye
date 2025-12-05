import React from 'react';
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
import { ContentProvider } from './context/ContentContext';
import { MessageProvider } from './context/MessageContext';
import { EventProvider } from './context/EventContext';
import { VideoProvider } from './context/VideoContext';
import ScrollToTop from './components/ScrollToTop';
import LocalHistory from './pages/LocalHistory';
import Videos from './pages/Videos';
import {
  AudioSermon,
  Pictures,
  LiveStream,
  CalendarPage,
} from './pages/Placeholders';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MessageProvider>
          <EventProvider>
            <VideoProvider>
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
                      <Route path="/media/pictures" element={<Pictures />} />
                      <Route path="/live-stream" element={<LiveStream />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/prayer-request" element={<SubmissionForm title="Prayer Request" />} />
                      <Route path="/testimony" element={<SubmissionForm title="Testimony" />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </VideoProvider>
          </EventProvider>
        </MessageProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
