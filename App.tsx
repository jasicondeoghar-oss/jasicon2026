
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Committee from './pages/Committee';
import Program from './pages/Program';
import Faculty from './pages/Faculty';
import Accommodation from './pages/Accommodation';
import Travel from './pages/Travel';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Downloads from './pages/Downloads';
import Legal from './pages/Legal';
import ASIJharkhand from './pages/ASIJharkhand';
import ASICentral from './pages/ASICentral';
import { AuthProvider, useAuth } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F14] text-[#C9A24D]">
        <div className="w-16 h-16 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-medium serif animate-pulse">Accessing Secure Hub...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#0B0F14] text-[#E6EAF0]">
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/committee/organizing" element={<Committee />} />
              <Route path="/committee/asi-jharkhand" element={<ASIJharkhand />} />
              <Route path="/committee/asi-central" element={<ASICentral />} />
              <Route path="/program" element={<Program />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/privacy" element={<Legal type="privacy" />} />
              <Route path="/terms" element={<Legal type="terms" />} />
              <Route path="/refund" element={<Legal type="refund" />} />
              <Route path="/shipping" element={<Legal type="shipping" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
