import React, { useState } from 'react';
import { FaUsers, FaPlus, FaSearch, FaHistory, FaShieldAlt, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaBuilding, FaKey, FaHandshake, FaChartBar } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const ClientsInsurers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    { id: 1, name: 'Bupa Health UK', email: 'portal@bupa.co.uk', activeAppointments: 124, status: 'Active', permissions: ['Calendar', 'Booking'], lastLogin: '2h ago' },
    { id: 2, name: 'AXA PPP Healthcare', email: 'admin@axappp.com', activeAppointments: 86, status: 'Active', permissions: ['Calendar', 'Booking'], lastLogin: '5h ago' },
    { id: 3, name: 'Aviva Insurance', email: 'bookings@aviva.co.uk', activeAppointments: 42, status: 'Restricted', permissions: ['Calendar'], lastLogin: '1d ago' },
    { id: 4, name: 'Vitality Health', email: 'external@vitality.co.uk', activeAppointments: 18, status: 'Inactive', permissions: [], lastLogin: 'Never' },
  ];

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Clients & Insurers</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Manage external insurance company access nodes and configure booking permissions.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 border-none shadow-premium hover:shadow-glass" leftIcon={<FaHistory size={12}/>}>History</Button>
           <Button variant="accent" size="lg" className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 shadow-lg " leftIcon={<FaPlus size={12}/>} onClick={() => setIsAddModalOpen(true)}>Register</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Register External Insurer"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel Action</Button>
            <Button variant="accent" onClick={() => setIsAddModalOpen(false)} leftIcon={<FaHandshake />}>Create Account</Button>
          </div>
        }
      >
        <div className="space-y-8 p-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Company Entity Name</label>
            <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" placeholder="e.g. Allianz Global" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Portal Administrator Email</label>
              <input type="email" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" placeholder="portal@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Account Secret Key (API/Auth)</label>
              <div className="relative">
                <input type="password" readonly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-400 outline-none cursor-not-allowed" value="******************" />
                <FaKey className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Module Permission Matrix</label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'cal', label: 'View Calendar', default: true },
                  { id: 'book', label: 'Create Bookings', default: true },
                  { id: 'pat', label: 'View Patient Data', default: false },
                  { id: 'bill', label: 'Access Billing', default: false },
                ].map(perm => (
                  <div key={perm.id} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <input type="checkbox" defaultChecked={perm.default} className="w-5 h-5 rounded-lg border-slate-300 text-clinicPrimary focus:ring-clinicPrimary/20 transition-all" />
                    <span className="text-[12px] font-bold text-slate-600">{perm.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Registered Entities', value: '24 Companies', icon: <FaBuilding />, color: 'blue' },
          { label: 'External Inflow', value: '840 Bookings', icon: <FaChartBar />, color: 'emerald' },
          { label: 'Security Protocols', value: 'High Density', icon: <FaShieldAlt />, color: 'amber' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:shadow-glass hover:-translate-y-1 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-clinicPrimary/10 group-hover:text-clinicPrimary transition-all duration-500`}>
                   {stat.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-slate-500">Live Node</span>
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
             <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-premium bg-white">
        <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between bg-slate-50/30 group gap-6">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.25em] flex items-center gap-3 italic text-center sm:text-left">
            <FaShieldAlt className="text-clinicPrimary" /> External Registry
          </h3>
          <div className="relative group/search w-full md:max-w-md">
            <span className="absolute inset-y-0 left-5 flex items-center text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors">
              <FaSearch size={14}/>
            </span>
            <input
              type="text"
              placeholder="Query insurance nodes..."
              className="block w-full pl-14 pr-6 py-3.5 bg-white border-none rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-10 py-6">Insurer Entity</th>
                <th className="px-10 py-6">Account Status</th>
                <th className="px-10 py-6 text-center">Active Syncs</th>
                <th className="px-10 py-6">Permission Layer</th>
                <th className="px-10 py-6 text-right">Node Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-clinicPrimary">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-premium text-slate-400 flex items-center justify-center border border-slate-50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:bg-clinicPrimary/10 group-hover:text-clinicPrimary">
                        <FaBuilding size={20} />
                      </div>
                      <div>
                         <span className="text-[15px] font-bold text-slate-900 tracking-tight">{client.name}</span>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-2">
                        {client.status === 'Active' ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-rose-400" />}
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${client.status === 'Active' ? 'text-emerald-600' : 'text-rose-500'}`}>{client.status}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                     <span className="text-[16px] font-black text-slate-900 tracking-tighter">{client.activeAppointments}</span>
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Booked Nodes</p>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-wrap gap-2">
                        {client.permissions.length > 0 ? client.permissions.map(p => (
                          <span key={p} className="px-3 py-1 bg-blue-50 text-clinicPrimary text-[9px] font-bold rounded-lg border border-blue-100 uppercase tracking-widest">{p}</span>
                        )) : (
                          <span className="text-[9px] font-bold text-slate-300 uppercase italic">Locked Matrix</span>
                        )}
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass"><FaKey size={12}/></Button>
                      <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass"><FaChartBar size={12}/></Button>
                      <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass"><FaEllipsisV size={12}/></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientsInsurers;
