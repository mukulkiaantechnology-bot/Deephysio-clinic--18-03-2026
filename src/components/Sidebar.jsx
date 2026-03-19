import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaChartPie, FaCalendarAlt, FaUserFriends, FaNotesMedical, FaComments, 
  FaFileInvoiceDollar, FaWpforms, FaChartLine, FaBullhorn, FaPuzzlePiece, 
  FaCog, FaChevronDown, FaChevronRight, FaPlusCircle, FaHistory, FaUserShield,
  FaFileAlt, FaSms, FaEnvelopeOpenText, FaVideo, FaTools, FaStripe, FaPaypal,
  FaFileSignature, FaShieldAlt, FaDatabase, FaBell, FaHeartbeat, FaUsers
} from 'react-icons/fa';

import { cn } from './ui/Button';

const Sidebar = ({ isOpen, toggleSidebar, onLogout, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: <FaChartPie />, path: '/' },
    { 
      name: 'Appointments', 
      icon: <FaCalendarAlt className="text-blue-400" />, 
      path: '/appointments',
      subItems: [
        { name: 'Calendar View', path: '/appointments' },
        { name: 'Book Appointment', path: '/appointments/book' },
        { name: 'Waitlist', path: '/appointments/waitlist' },
        { name: 'Availability Blocks', path: '/appointments/availability' },
        { name: 'Booking Settings', path: '/appointments/settings' },
      ]
    },
    { 
      name: 'Patients', 
      icon: <FaUserFriends className="text-indigo-400" />, 
      path: '/patients',
      subItems: [
        { name: 'Patient List', path: '/patients' },
        { name: 'Add Patient', path: '/patients/add' },
        { name: 'Referrals', path: '/patients/referrals' },
        { name: 'Insurance', path: '/patients/insurance' },
        { name: 'Clients / Insurers', path: '/clients' },
      ]
    },
    { 
      name: 'Clinical Notes', 
      icon: <FaNotesMedical className="text-rose-400" />, 
      path: '/notes',
      subItems: [
        { name: 'New Note', path: '/notes/new' },
        { name: 'Templates', path: '/notes/templates' },
        { name: 'Patient Notes', path: '/notes' },
        { name: 'Attachments', path: '/notes/attachments' },
      ]
    },
    { 
      name: 'Communication', 
      icon: <FaComments className="text-cyan-400" />, 
      path: '/communication',
      subItems: [
        { name: 'SMS Chat', path: '/communication/sms' },
        { name: 'Email Messages', path: '/communication/email' },
        { name: 'Bulk Messaging', path: '/communication/bulk' },
        { name: 'Telehealth', path: '/communication/telehealth' },
        { name: 'Templates', path: '/communication/templates' },
      ]
    },
    { 
      name: 'Billing & Payments', 
      icon: <FaFileInvoiceDollar className="text-emerald-500" />, 
      path: '/billing',
      subItems: [
        { name: 'Invoices', path: '/billing' },
        { name: 'Payments', path: '/billing/payments' },
        { name: 'Insurance Claims', path: '/billing/claims' },
        { name: 'Payment Reminders', path: '/billing/reminders' },
        { name: 'Pricing / Services', path: '/billing/pricing' },
      ]
    },
    { 
      name: 'Forms', 
      icon: <FaWpforms className="text-slate-400" />, 
      path: '/forms',
      subItems: [
        { name: 'Intake Forms', path: '/forms' },
        { name: 'Consent Forms', path: '/forms/consent' },
        { name: 'Health History', path: '/forms/history' },
        { name: 'Assessments', path: '/forms/assessments' },
        { name: 'Form Builder', path: '/forms/builder' },
      ]
    },
    { 
      name: 'Analytics', 
      icon: <FaChartLine className="text-purple-400" />, 
      path: '/analytics',
      subItems: [
        { name: 'Appointment Reports', path: '/analytics' },
        { name: 'Revenue Reports', path: '/analytics/revenue' },
        { name: 'Patient Growth', path: '/analytics/growth' },
        { name: 'Service Popularity', path: '/analytics/services' },
        { name: 'Staff Performance', path: '/analytics/staff' },
      ]
    },
    { 
      name: 'Marketing', 
      icon: <FaBullhorn className="text-orange-400" />, 
      path: '/marketing',
      subItems: [
        { name: 'Email Campaigns', path: '/communication/email' },
        { name: 'Patient Segments', path: '/marketing/segments' },
        { name: 'Follow-up Automation', path: '/marketing/automation' },
        { name: 'Campaign Analytics', path: '/marketing/analytics' },
      ]
    },
    { 
      name: 'Integrations', 
      icon: <FaPuzzlePiece className="text-pink-400" />, 
      path: '/integrations',
      subItems: [
        { name: 'Clinic Manual', path: '/integrations/manual' },
        { name: 'Google Calendar', path: '/integrations/google' },
        { name: 'Outlook Calendar', path: '/integrations/outlook' },
        { name: 'Stripe', path: '/integrations/stripe' },
        { name: 'PayPal', path: '/integrations/paypal' },
        { name: 'QuickBooks', path: '/integrations/quickbooks' },
        { name: 'Xero', path: '/integrations/xero' },
      ]
    },
    { 
      name: 'Settings', 
      icon: <FaCog className="text-slate-500" />, 
      path: '/settings',
      subItems: [
        { name: 'User Management', path: '/settings/users' },
        { name: 'Roles & Permissions', path: '/settings/roles' },
        { name: 'Clinic Details', path: '/settings/clinic' },
        { name: 'Multi Location', path: '/settings/location' },
        { name: 'Security', path: '/settings/security' },
        { name: 'Backup', path: '/settings/backup' },
        { name: 'Notifications', path: '/settings/notifications' },
      ]
    },
  ];

  const roleMenuAccess = {
    admin: ['Dashboard', 'Appointments', 'Patients', 'Clinical Notes', 'Communication', 'Billing & Payments', 'Forms', 'Analytics', 'Marketing', 'Integrations', 'Settings'],
    therapist: ['Dashboard', 'Appointments', 'Patients', 'Clinical Notes', 'Forms', 'Communication'],
    receptionist: ['Dashboard', 'Appointments', 'Patients', 'Forms', 'Communication'],
    billing: ['Dashboard', 'Patients', 'Billing & Payments', 'Analytics']
  };

  const allowedMenus = roleMenuAccess[userRole] || roleMenuAccess['admin'];
  const filteredMenuItems = menuItems.filter(item => allowedMenus.includes(item.name));

  const roleDisplay = {
    admin: { name: 'Admin', role: 'Administrator', initial: 'A', color: 'from-slate-800 to-slate-900' },
    therapist: { name: 'Dr. Sarah Wilson', role: 'Therapist', initial: 'SW', color: 'from-clinicPrimary to-clinicPrimary-dark' },
    receptionist: { name: 'Emma Wilson', role: 'Receptionist', initial: 'EW', color: 'from-emerald-500 to-emerald-600' },
    billing: { name: 'John Doe', role: 'Billing Staff', initial: 'JD', color: 'from-indigo-500 to-indigo-600' }
  };

  const currentProfile = roleDisplay[userRole || 'admin'] || roleDisplay.admin;

  // Auto-expand parent menu if a sub-item is active
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = filteredMenuItems.find(item => 
      item.subItems?.some(sub => sub.path === currentPath)
    );

    if (activeItem) {
      setExpandedMenu(activeItem.name);
    }
  }, [location.pathname]);

  const handleToggleMenu = (menuName, path) => {
    if (path) {
      navigate(path);
    }
    if (!isOpen) {
      toggleSidebar();
      setExpandedMenu(menuName);
      return;
    }
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 md:relative md:translate-x-0 transition-all duration-500 ease-in-out bg-[#0f172a] text-slate-300 overflow-hidden flex flex-col shadow-2xl border-r border-slate-800/50",
      isOpen ? "translate-x-0 w-64" : "-translate-x-full md:w-20"
    )}>
      {/* Header / Logo Section */}
      <div className="flex items-center justify-between px-6 py-8 border-b border-slate-800/50 bg-gradient-to-b from-slate-900/50 to-transparent shrink-0">
        <div className={`flex items-center gap-4 ${isOpen ? 'opacity-100 scale-100' : 'md:opacity-0 w-0 scale-90'} transition-all duration-300`}>
          <div className="w-10 h-10 bg-gradient-to-br from-clinicPrimary to-clinicPrimary-dark rounded-xl flex items-center justify-center shadow-lg  rotate-3 group-hover:rotate-0 transition-transform">
            <FaHeartbeat className="text-white text-xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white leading-none tracking-tight">DeePhysio</h1>
            <p className="text-[10px] text-clinicPrimary font-bold uppercase tracking-[0.2em] mt-1.5 opacity-80">Professional Suite</p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all">
          <FaChevronRight className={cn("w-4 h-4 transition-transform duration-500", isOpen ? "rotate-180" : "")} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredMenuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenu === item.name;
          const isActive = location.pathname === item.path || (hasSubItems && item.subItems.some(sub => sub.path === location.pathname));

          return (
            <div key={item.name} className="space-y-1">
              {hasSubItems ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleMenu(item.name, item.path);
                  }}
                  className={cn(
                    "w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-clinicPrimary/10 text-white" 
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  )}
                >
                  <span className={cn(
                    "text-xl transition-all duration-300", 
                    isOpen ? "mr-4" : "mx-auto scale-110",
                    isActive ? "text-clinicPrimary" : "group-hover:text-clinicPrimary"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "font-semibold whitespace-nowrap transition-all duration-300 flex-1 text-left text-sm",
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 w-0 absolute -translate-x-4"
                  )}>
                    {item.name}
                  </span>
                  {isOpen && (
                    <FaChevronDown className={cn("w-3 h-3 text-slate-600 transition-transform duration-300", isExpanded ? "rotate-180 text-clinicPrimary" : "")} />
                  )}
                  {isActive && !isOpen && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-clinicPrimary rounded-r-full shadow-[0_0_10px_rgba(46,167,184,0.5)]" />
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative",
                      isActive 
                        ? "bg-slate-800 text-white shadow-lg" 
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    )
                  }
                >
                  <span className={cn(
                    "text-xl transition-all duration-300", 
                    isOpen ? "mr-4" : "mx-auto scale-110",
                    isActive ? "text-clinicPrimary" : "group-hover:text-clinicPrimary"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "font-semibold whitespace-nowrap transition-all duration-300 text-sm",
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 w-0 absolute -translate-x-4"
                  )}>
                    {item.name}
                  </span>
                  {isActive && !isOpen && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  )}
                </NavLink>
              )}

              {/* Submenu Items */}
              {hasSubItems && isExpanded && isOpen && (
                <div className="ml-11 space-y-1 mt-2 mb-4 border-l-2 border-slate-800/50 pl-2 animate-in slide-in-from-top-2 duration-300 text-[13px]">
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={({ isActive }) =>
                        cn(
                          "block px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group/sub",
                          isActive 
                            ? "text-clinicPrimary bg-clinicPrimary/5" 
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                         <div className={cn(
                           "w-1.5 h-1.5 rounded-full transition-all duration-300",
                           location.pathname === sub.path ? "bg-clinicPrimary scale-110" : "bg-slate-700 group-hover/sub:bg-slate-500"
                         )} />
                         {sub.name}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Profile Section */}
      <div className={cn(
        "p-6 border-t border-slate-800/50 bg-gradient-to-t from-slate-900/50 to-transparent transition-all duration-500 shrink-0",
        isOpen ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
      )}>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentProfile.color} flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-all duration-300`}>
            {currentProfile.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate text-white uppercase tracking-tight">{currentProfile.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{currentProfile.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

  );
};

export default Sidebar;
