import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Menu, X, ArrowUp, ShieldCheck, 
  Home, Users, Briefcase, HelpCircle, 
  Heart, Handshake, Calendar, Phone, 
  Mail, ExternalLink 
} from 'lucide-react';

// View Imports
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProgramsView } from './components/ProgramsView';
import { GetHelpView } from './components/GetHelpView';
import { VolunteerView } from './components/VolunteerView';
import { DonateView } from './components/DonateView';
import { NewsView } from './components/NewsView';
import { ContactView } from './components/ContactView';

// Widget component
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll monitoring for Back-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe Navigation with auto scroll reset
  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'programs', label: 'Programs & Services', icon: Briefcase },
    { id: 'get-help', label: 'Get Help', icon: HelpCircle },
    { id: 'volunteer', label: 'Volunteer', icon: Handshake },
    { id: 'donate', label: 'Donate', icon: Heart },
    { id: 'news-events', label: 'News & Events', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* Background radial soft pattern to reinforce Sleek UI elegance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(22,163,74,0.03),transparent_50%)] pointer-events-none" />

      {/* Top sticky brand header bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all duration-200 shadow-sm shadow-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex justify-between items-center">
          
          {/* Logo brand label */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 active:opacity-90 transition cursor-pointer group text-left focus:outline-none"
            aria-label="National Housing Community home page link"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold border border-blue-500 shadow-md shadow-blue-100 group-hover:scale-102 transition duration-200">
              <Building className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm sm:text-base font-bold tracking-tight text-blue-900 font-sans">
                National Housing Community
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-400 font-semibold uppercase mt-0.5">
                Foundation for the future
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Desktop primary navigation menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold'
                      : 'border border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Right Menu Toggler */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-650 text-slate-600 hover:text-blue-600 transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-label="Toggle mobile drawer"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu container */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-200 absolute top-18 sm:top-20 width-full left-0 right-0 z-30 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`p-3.5 rounded-2xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer w-full text-left ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container View Box */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 text-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id={`tab-pane-${activeTab}`}
          >
            {activeTab === 'home' && <HomeView onNavigate={navigateTo} />}
            {activeTab === 'about' && <AboutView />}
            {activeTab === 'programs' && <ProgramsView onNavigate={navigateTo} />}
            {activeTab === 'get-help' && <GetHelpView />}
            {activeTab === 'volunteer' && <VolunteerView />}
            {activeTab === 'donate' && <DonateView />}
            {activeTab === 'news-events' && <NewsView />}
            {activeTab === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Support Companion Chatbox */}
      <Chatbot />

      {/* Scroll to Top floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 left-6 bg-white hover:bg-slate-50 text-blue-600 p-3.5 rounded-full border border-slate-200 shadow-xl flex items-center justify-center z-50 transition cursor-pointer"
            aria-label="Smooth scroll to page top container"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="h-5.5 w-5.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sleek Sub-Footer & Contact Banner */}
      <footer className="bg-slate-900 text-slate-400 px-6 sm:px-12 py-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono">Contact Us</span>
              <span className="text-white font-medium text-sm">(323) 396-1569</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono">Email</span>
              <span className="text-white font-medium text-sm">ronebiz@gmail.com</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-mono">Location</span>
              <span className="text-white font-medium text-sm">Housing Resource Center, CA</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-slate-500">
            <span>&copy; 2026 National Housing Community</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full hidden sm:inline-block"></span>
            <a href="mailto:ronebiz@gmail.com" className="hover:text-white transition-colors">Tax ID: 88-1234567</a>
            <span className="w-1 h-1 bg-slate-700 rounded-full hidden sm:inline-block"></span>
            <span className="text-slate-400 font-mono">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-semibold">iWebNext</a>
            </span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
