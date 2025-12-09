"use client";


import React, { useState, useRef, useEffect } from 'react';
import { Home, Code, Briefcase, User, Handshake, Moon, Sun, ChevronDown, Check } from 'lucide-react';
import { NavigationItem } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isVisible }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems: { id: NavigationItem; label: string; subLabel: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('nav.home'), subLabel: t('nav.homeSub'), icon: <Home size={20} /> },
    { id: 'skills', label: t('nav.skills'), subLabel: t('nav.skillsSub'), icon: <Code size={20} /> },
    { id: 'works', label: t('nav.works'), subLabel: t('nav.worksSub'), icon: <Briefcase size={20} /> },
    { id: 'about', label: t('nav.about'), subLabel: t('nav.aboutSub'), icon: <User size={20} /> },
    { id: 'business', label: t('nav.business'), subLabel: t('nav.businessSub'), icon: <Handshake size={20} /> },
  ];

  const languages = [
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { code: 'en-US', label: 'English', flag: '🇺🇸' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className={`fixed left-0 top-0 h-full w-64 bg-surface/80 backdrop-blur-md border-r border-glass/5 z-40 hidden md:flex flex-col transition-transform duration-500 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between text-txt-muted text-sm mb-6">
          
          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 cursor-pointer hover:text-txt-main transition-colors bg-glass/5 px-3 py-1.5 rounded-md hover:bg-glass/10 border border-transparent hover:border-glass/10"
            >
              <span className="text-lg leading-none">{currentLangObj.flag}</span>
              <span className="font-mono text-xs">{currentLangObj.label}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-40 bg-surface/95 backdrop-blur-xl border border-glass/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col p-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        language === lang.code 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-txt-muted hover:text-txt-main hover:bg-glass/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {language === lang.code && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="cursor-pointer hover:text-txt-main transition-colors bg-glass/5 p-1.5 rounded-md hover:bg-glass/10 border border-transparent hover:border-glass/10"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
        <h1 className="text-2xl font-bold text-txt-main tracking-tight">My Resume</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary' 
                  : 'text-txt-muted hover:text-txt-main hover:bg-glass/5'
              }`}
            >
              <span className={`relative z-10 ${isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
                {item.icon}
              </span>
              <div className="flex flex-col items-start relative z-10">
                <span className="font-medium text-sm">{item.label}</span>
                <span className="text-[10px] tracking-wider opacity-60 font-mono">{item.subLabel}</span>
              </div>
              
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6">
        <button 
            onClick={() => setActiveTab('business')}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-1"
        >
            <Handshake size={18} />
            {t('nav.startProject')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
