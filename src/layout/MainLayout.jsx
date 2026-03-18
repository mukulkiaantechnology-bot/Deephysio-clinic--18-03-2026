import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { cn } from '../components/ui/Button';

const MainLayout = ({ onLogout, userRole, setUserRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay - Only blocks if sidebar is open in mobile mode */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 z-[40] md:hidden transition-all duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} userRole={userRole} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar toggleSidebar={toggleSidebar} onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-8 lg:px-8 custom-scrollbar relative z-0">
          <div className="max-w-[1600px] mx-auto">
            {/* SaaS Role Switcher (Mock for Demo) */}
            <div className="mb-6 flex items-center justify-end">
              <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 shadow-glass">
                {['admin', 'therapist', 'receptionist', 'billing'].map(role => (
                  <button 
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      localStorage.setItem('deephysio_role', role);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${userRole === role ? 'bg-clinicPrimary text-white shadow-lg ' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
