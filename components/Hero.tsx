"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Scene3D from '@/components/Scene3D';

const Hero: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const roles = t('hero.roles') as string[];
  const greetingText = t('hero.greeting') as string;
  
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  // Typing effect for greeting
  useEffect(() => {
    setDisplayedGreeting('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < greetingText.length) {
        setDisplayedGreeting(prev => prev + greetingText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [greetingText]);

  // Rotating roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
    },
  };

  return (
    <div className="h-full flex flex-col justify-center items-center relative z-10 px-4 text-center overflow-hidden">
      
      {/* 3D Scene Background */}
      <Scene3D />

      {/* Background Spotlight Effect (Kept for depth behind 3D model) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none z-10 opacity-5"
        style={{
          backgroundColor: 'rgb(var(--primary-rgb))',
          boxShadow: '0 0 200px 100px rgba(var(--primary-rgb), 0.1)'
        }}
      />

      {/* Content Container */}
      <motion.div 
        className="relative z-20 max-w-4xl mx-auto flex flex-col items-center pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Greeting Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 md:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-glass/10 backdrop-blur-sm pointer-events-auto shadow-sm"
        >
          <Terminal size={14} className="text-secondary" />
          <span className="text-secondary font-mono text-sm tracking-wider">
            {displayedGreeting}<span className="animate-pulse border-r-2 border-secondary h-4 inline-block align-middle ml-1"></span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          variants={itemVariants}
          className="mb-4 md:mb-6 relative group pointer-events-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-txt-main tracking-tight leading-tight select-none drop-shadow-2xl">
             {t('hero.iam')}<br className="md:hidden" /> 
             <span className="relative inline-block ml-2 md:ml-4">
                <span className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></span>
                <span className="relative text-primary font-extrabold">
                  Tim Dev
                </span>
             </span>
          </h1>
        </motion.div>

        {/* Rotating Roles */}
        <motion.div 
          variants={itemVariants}
          className="h-8 md:h-10 mb-8 overflow-hidden relative w-full flex justify-center pointer-events-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute text-xl md:text-2xl font-light text-txt-muted flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"></span>
              {roles[roleIndex]}
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"></span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl text-txt-muted/80 text-base md:text-lg mb-10 leading-relaxed font-light backdrop-blur-[2px] rounded-xl p-2 pointer-events-auto"
        >
          {t('hero.description')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pointer-events-auto w-full sm:w-auto px-6 sm:px-0"
        >
          {/* Contact Me -> Navigates to Business Tab */}
          <button 
             onClick={onContactClick}
             className="group px-8 py-4 bg-primary text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(var(--color-primary),0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <MessageSquare size={18} />
            {t('hero.contact')}
            <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Business Inquiry -> Navigates to Business Tab */}
          <button 
             onClick={onContactClick}
             className="group px-8 py-4 bg-surface/50 backdrop-blur-sm border border-secondary/30 text-secondary rounded-xl hover:bg-secondary/10 hover:border-secondary transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 w-full sm:w-auto"
          >
            {t('hero.businessBtn')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-txt-muted/50 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-5 h-8 border border-current rounded-full flex justify-center p-1">
           <motion.div 
             animate={{ y: [0, 12, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-1 h-1 bg-current rounded-full" 
           />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
