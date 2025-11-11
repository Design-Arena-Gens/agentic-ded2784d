"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Title() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="text-center"
      >
        <motion.h1
          className={`text-6xl md:text-8xl font-bold tracking-wider ${glitch ? 'glitch' : ''}`}
          style={{
            color: '#00d9ff',
            textShadow: '0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 30px #00d9ff, 0 0 40px #00fff9',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '0.1em',
            background: 'linear-gradient(to right, #00d9ff, #00fff9, #00d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AI REALITY CHECK
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-4"
        >
          <p
            className="text-2xl md:text-3xl font-light tracking-widest glow-text"
            style={{
              color: '#00fff9',
              textShadow: '0 0 10px #00fff9, 0 0 20px #00fff9',
            }}
          >
            OFFICIAL
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-8"
        >
          <p
            className="text-sm md:text-base tracking-wider"
            style={{
              color: '#00d9ff',
              textShadow: '0 0 5px #00d9ff',
            }}
          >
            REVEALING THE TRUTH BEHIND REALITY
          </p>
        </motion.div>

        {/* Holographic light trails */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Data stream overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-cyber-blue"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
              opacity: 0.2,
            }}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}
