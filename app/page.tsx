"use client";

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import About from '@/components/About';
import Business from '@/components/Business';
import Background from '@/components/Background';
import { NavigationItem } from '@/types';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavigationItem>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onContactClick={() => setActiveTab('business')} />;
      case 'skills':
        return <Skills />;
      case 'works':
        return <Works setSidebarVisible={setIsSidebarVisible} />;
      case 'about':
        return <About />;
      case 'business':
        return <Business />;
      default:
        return <Hero onContactClick={() => setActiveTab('business')} />;
    }
  };

  const navItems: { id: NavigationItem; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'business', label: 'Business' },
  ];

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen text-txt-main font-sans overflow-hidden selection:bg-primary selection:text-white bg-background transition-colors duration-300">
          <Background />

          <div className="flex h-[100dvh] overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isVisible={isSidebarVisible}
            />

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden fixed top-4 right-4 z-50 p-3 bg-surface/80 backdrop-blur-md rounded-full shadow-lg border border-glass/10 text-txt-main transition-opacity duration-300 ${!isSidebarVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                   <motion.div
                     initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                     animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
                     exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                     transition={{ duration: 0.3 }}
                     className="fixed inset-0 z-50 bg-background/90 flex flex-col items-center justify-center text-txt-main"
                   >
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-6 right-6 p-2 text-txt-muted hover:text-txt-main"
                      >
                          <X size={32} />
                      </button>

                      <nav className="flex flex-col items-center gap-6">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`text-4xl font-bold tracking-tight transition-all duration-300 ${
                                    activeTab === item.id
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary scale-110'
                                    : 'text-txt-muted hover:text-txt-main'
                                }`}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                      </nav>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-12 text-sm text-txt-muted font-mono"
                      >
                          © 2025 Tim Dev
                      </motion.div>
                   </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main
              className={`flex-1 relative z-10 h-full transition-all duration-500 ease-in-out ${isSidebarVisible ? 'md:ml-64' : 'md:ml-0'} w-full`}
            >
                {renderContent()}
            </main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
