"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // 只在客户端设置窗口尺寸
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface opacity-90" />

      {/* Glowing Orbs/Shapes */}

      {/* Top Left Triangle */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 opacity-20"
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="rgb(var(--color-primary))" strokeWidth="2">
            <path d="M50 10 L90 90 L10 90 Z" />
        </svg>
      </motion.div>

      {/* Center Right Text Glow (Soft Blob) */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-pulse-slow"></div>

      {/* Bottom Left Square */}
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 opacity-20"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="2">
            <rect x="10" y="10" width="80" height="80" />
        </svg>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-txt-main rounded-full opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0.2, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
          }}
        />
      ))}
    </div>
  );
};

export default Background;
