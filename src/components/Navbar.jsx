import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSearch, FaBell, FaEnvelope, FaChevronDown, FaBars, FaEnvelopeOpenText, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, onLogout }) => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Real-time search logic would go here
  };

  const notificationData = [
    { id: 1, title: 'New system update available', time: '2 hours ago', type: 'update' },
    { id: 2, title: 'Patient James Wilson sent a message', time: '4 hours ago', type: 'message' },
    { id: 3, title: 'Backup completed successfully', time: 'Yesterday', type: 'system' },
  ];

  const messageData = [
    { id: 1, sender: 'James Wilson', text: 'Protocol evaluated.', time: '10 mins ago' },
    { id: 2, sender: 'Sarah Thompson', text: 'Schedule sync ready.', time: '1 hour ago' },
  ];

  return (
    <header className="h-20 bg-slate-50/80 backdrop-blur-md px-4 md:px-10 flex items-center justify-between sticky top-0 z-40 transition-all duration-300 border-b border-slate-200/50">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 text-slate-500 hover:text-clinicPrimary bg-white rounded-xl shadow-soft active:scale-95 transition-all border border-slate-100 hover:border-clinicPrimary/30 hover:shadow-google"
        >
          <FaBars size={18} />
        </button>
        
        {/* Search Section */}
        <div className="flex-1 max-w-xl relative group hidden lg:block">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-base group-focus-within:text-clinicPrimary transition-all duration-300 group-focus-within:scale-110" />
          <input 
            type="text" 
            placeholder="Search records, patients or notes..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all caret-clinicPrimary shadow-soft placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Profile / Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1 md:gap-2 pr-3 md:pr-6 border-r border-slate-200 relative">
          <button 
            onClick={() => togglePanel('notifications')}
            className={`relative p-2 rounded-xl transition-all active:scale-90 shadow-soft border border-transparent ${activePanel === 'notifications' ? 'bg-white text-clinicPrimary border-slate-100' : 'text-slate-400 hover:text-clinicPrimary hover:bg-white hover:border-slate-100'}`}
          >
            <FaBell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          
          <button 
            onClick={() => togglePanel('messages')}
            className={`hidden sm:block p-2 rounded-xl transition-all active:scale-90 shadow-soft border border-transparent ${activePanel === 'messages' ? 'bg-white text-clinicPrimary border-slate-100' : 'text-slate-400 hover:text-clinicPrimary hover:bg-white hover:border-slate-100'}`}
          >
            <FaEnvelopeOpenText size={18} />
          </button>

          {/* Activity Panels */}
          {activePanel && (
            <div className="absolute top-16 right-0 w-80 bg-white rounded-2xl shadow-google border border-slate-100 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">{activePanel}</h3>
                <button 
                  onClick={() => setActivePanel(null)} 
                  className="text-[9px] font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-3">
                {(activePanel === 'notifications' ? notificationData : messageData).map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setActivePanel(null)}
                    className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-clinicPrimary/10 group-hover:scale-110 transition-all">
                      <div className={`w-2 h-2 rounded-full ${activePanel === 'notifications' ? 'bg-clinicPrimary' : 'bg-amber-500'}`}></div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-700 leading-tight truncate">
                         {activePanel === 'notifications' ? item.title : `${item.sender}: ${item.text}`}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative group/profile">
          <div className="flex items-center gap-4 cursor-pointer group p-1.5 rounded-2xl hover:bg-white hover:shadow-premium transition-all">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Kiaan Paras</p>
              <p className="text-[10px] font-bold text-clinicPrimary uppercase tracking-widest mt-1.5">Lead Practitioner</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-clinicPrimary to-clinicPrimary-dark flex items-center justify-center font-bold text-white text-base shadow-lg group-hover:rotate-3 transition-all ring-2 ring-white ring-offset-2 ring-offset-slate-50">
              KP
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-google border border-slate-100 p-3 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 origin-top-right scale-95 group-hover/profile:scale-100">
            <div className="space-y-1">
              <button 
                onClick={() => navigate('/patients/profile')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-clinicPrimary transition-all"
              >
                <FaUser size={14} className="opacity-50" /> My Profile
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-clinicPrimary transition-all"
              >
                <FaCog size={14} className="opacity-50" /> Account Settings
              </button>
              <div className="h-px bg-slate-50 my-2 mx-2"></div>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold text-rose-500 hover:bg-rose-50 transition-all"
              >
                <FaSignOutAlt size={14} /> Logout Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
