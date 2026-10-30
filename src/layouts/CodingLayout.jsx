import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Terminal, ChevronLeft } from 'lucide-react';

export const CodingLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      <main className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </main>
    </div>
  );
};
