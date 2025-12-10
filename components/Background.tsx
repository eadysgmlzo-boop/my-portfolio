import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface" />

      {/* Static Decorative Elements */}

      {/* Top Left Triangle */}
      <div className="absolute top-20 left-1/4 opacity-15">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="rgb(var(--color-primary))" strokeWidth="1.5">
          <path d="M50 10 L90 90 L10 90 Z" />
        </svg>
      </div>

      {/* Soft Glow - Top Right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary rounded-full filter blur-[150px] opacity-10" />

      {/* Soft Glow - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary rounded-full filter blur-[120px] opacity-10" />

      {/* Bottom Left Square */}
      <div className="absolute bottom-20 left-20 opacity-15">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="1.5">
          <rect x="10" y="10" width="80" height="80" />
        </svg>
      </div>

      {/* Center Circle */}
      <div className="absolute top-1/2 right-1/3 opacity-10">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="rgb(var(--color-secondary))" strokeWidth="1">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--color-txt-main)) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--color-txt-main)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};

export default Background;
