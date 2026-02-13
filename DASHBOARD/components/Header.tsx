import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface-dark/80 backdrop-blur-md border-b border-white/5 h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="material-icons-round text-primary text-3xl">electric_bolt</span>
          <h1 className="text-xl font-bold tracking-tight text-white">EV Battery Intelligence</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">System Online</span>
        </div>
        
        <span className="text-xs text-gray-400 ml-2">Last updated: Just now</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-primary transition-colors">
            <span>Pack: INR18650</span>
            <span className="material-icons-round text-lg">expand_more</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-electric-blue p-[2px]">
            <img 
              alt="User" 
              className="h-full w-full rounded-full object-cover border-2 border-surface-dark" 
              src="https://picsum.photos/100/100" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};