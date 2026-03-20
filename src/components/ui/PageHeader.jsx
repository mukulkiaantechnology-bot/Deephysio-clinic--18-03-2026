import React from 'react';
import Card from './Card';

const PageHeader = ({ title, subtitle, icon, actions }) => {
  return (
    <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 border-none shadow-premium bg-white relative overflow-hidden group mb-8">
      <div className="flex items-center gap-6 relative z-10">
        {icon && (
          <div className="w-16 h-16 rounded-[24px] bg-slate-50 text-slate-400 flex items-center justify-center text-2xl shadow-soft border border-slate-100 group-hover:bg-clinicPrimary group-hover:text-white group-hover:scale-105 transition-all duration-500">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{title}</h1>
          {subtitle && <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em] opacity-80">{subtitle}</p>}
        </div>
      </div>
      
      {actions && (
        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full lg:w-auto">
          {actions}
        </div>
      )}
      
      {/* Visual Decorations */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
    </Card>
  );
};

export default PageHeader;
