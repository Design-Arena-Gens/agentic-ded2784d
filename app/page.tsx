"use client";

import { Suspense } from 'react';
import Scene from './components/Scene';
import Title from './components/Title';

export default function Home() {
  return (
    <main className="w-screen h-screen relative overflow-hidden bg-black">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="text-cyber-blue text-2xl glow-text">Loading Reality...</div>
        </div>
      }>
        <Scene />
      </Suspense>
      <Title />
    </main>
  );
}
