import React, { useState } from 'react';
import { FaUsers, FaUserShield, FaPlus, FaSearch, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaKey, FaChevronRight, FaLock, FaUserPlus, FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUserNode, setActiveUserNode] = useState(null);

  const initialUsers = [
    { id: 'US-801', name: 'Dr. Sarah Wilson', email: 'sarah.w@medical-node.com', role: 'Clinical Owner', status: 'Authorized', lastLogin: '10 mins ago', clearance: 'Level 5' },
    { id: 'US-802', name: 'Dr. Michael Chen', email: 'michael.c@medical-node.com', role: 'Senior Practitioner', status: 'Authorized', lastLogin: '2h ago', clearance: 'Level 4' },
    { id: 'US-803', name: 'John Miller', email: 'john.m@medical-node.com', role: 'Operations Desk', status: 'Authorized', lastLogin: 'Yesterday', clearance: 'Level 2' },
    { id: 'US-800', name: 'System Root', email: 'root@medical-node.com', role: 'Super Admin', status: 'Authorized', lastLogin: 'Synchronized', clearance: 'Global' },
    { id: 'US-805', name: 'Emily Rose', email: 'emily.r@medical-node.com', role: 'Junior Practitioner', status: 'Revoked', lastLogin: '3 weeks ago', clearance: 'Level 3' },
  ];

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, user) => {
    alert(`Security Protocol: Initiating ${action} for ${user ? user.name : 'new identity'}. System audit synchronized.`);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Administrative Core</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Authenticate personnel identities and calibrate institutional access nodes.</p>
        </div>
        <Button 
          variant="accent" 
          size="lg"
          className="rounded-[24px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.2em] w-full lg:w-auto relative z-10"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<FaUserPlus size={14}/>}
        >
          Provision New Identity
        </Button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Identities', value: initialUsers.length, icon: <FaUsers />, color: 'blue' },
          { label: 'Authorized Nodes', value: '4', icon: <FaCheckCircle />, color: 'emerald' },
          { label: 'Security Officers', value: '2', icon: <FaUserShield />, color: 'purple' },
          { label: 'Revoked Access', value: '1', icon: <FaTimesCircle />, color: 'rose' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:-translate-y-1 transition-all">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform`}>
              {React.cloneElement(stat.icon, { size: 20 })}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-50">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/20">
          <div className="relative flex-1 group w-full">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
            <input 
              type="text" 
              placeholder="Search identity by name, email or clearing level..." 
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[1000px]">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
              <tr>
                <th className="px-10 py-6 w-[25%]">Personnel Identity</th>
                <th className="px-10 py-6 w-[20%]">Institutional Role</th>
                <th className="px-10 py-6 w-[15%] text-center">Status</th>
                <th className="px-10 py-6 w-[20%]">Temporal Sync</th>
                <th className="px-10 py-6 w-[20%] text-right">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => handleAction('Security Audit', user)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-clinicPrimary group-hover:scale-110 group-hover:rotate-6 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500 font-black">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{user.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1.5">
                       <p className="text-[13px] font-bold text-slate-700 uppercase tracking-tight">{user.role}</p>
                       <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{user.clearance} Access</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className={`mx-auto w-fit px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-soft flex items-center gap-2 ${
                      user.status === 'Authorized' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Authorized' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                      {user.status}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                    Last active: {user.lastLogin}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" title="Modify Permissions" onClick={(e) => { e.stopPropagation(); handleAction('Node Modification', user); }}>
                          <FaUserEdit size={14}/>
                       </button>
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" title="Revoke Access" onClick={(e) => { e.stopPropagation(); handleAction('Revoke Access', user); }}>
                          <FaTrashAlt size={14}/>
                       </button>
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Advanced Audit', user); }}>
                          <FaEllipsisV size={14}/>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Provision New Node Identity"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Abort Protocol</Button>
            <Button variant="accent" onClick={() => { setIsModalOpen(false); alert('System: New personnel identity successfully provisioned and synchronized.'); }} leftIcon={<FaPlus />}>Authorize Provisioning</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 font-sans text-left">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Entity Name</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="e.g. Dr. Jane Cooper" />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Institutional Connectivity Node (Email)</label>
              <input type="email" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="jane.c@medical-node.com" />
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Institutional Role</label>
                 <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                    <option>Practitioner Node</option>
                    <option>Operations Desk</option>
                    <option>Financial Analyst</option>
                    <option>Clinic Owner</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Clearing Level</label>
                 <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                    <option>Level 1 (Basic)</option>
                    <option>Level 2 (Standard)</option>
                    <option>Level 3 (Clinical)</option>
                    <option>Level 4 (Admin)</option>
                    <option>Level 5 (Restricted)</option>
                 </select>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
