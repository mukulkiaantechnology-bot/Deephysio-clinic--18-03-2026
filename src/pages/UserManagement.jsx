import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserShield, FaPlus, FaSearch, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaKey, FaChevronRight, FaLock, FaUserPlus, FaUserEdit, FaTrashAlt, FaHeartbeat, FaUser, FaCreditCard } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const initialUsers = [
    { id: 'US-801', name: 'Dr. Sarah Wilson', email: 'sarah.w@medical-node.com', role: 'Therapist', status: 'Authorized', lastLogin: '10 mins ago', clearance: 'Level 5' },
    { id: 'US-802', name: 'Dr. Michael Chen', email: 'michael.c@medical-node.com', role: 'Therapist', status: 'Authorized', lastLogin: '2h ago', clearance: 'Level 4' },
    { id: 'US-803', name: 'John Miller', email: 'john.m@medical-node.com', role: 'Receptionist', status: 'Authorized', lastLogin: 'Yesterday', clearance: 'Level 2' },
    { id: 'US-800', name: 'System Root', email: 'root@medical-node.com', role: 'Admin', status: 'Authorized', lastLogin: 'Synchronized', clearance: 'Global' },
    { id: 'US-805', name: 'Emily Rose', email: 'emily.r@medical-node.com', role: 'Billing Staff', status: 'Revoked', lastLogin: '3 weeks ago', clearance: 'Level 3' },
  ];

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (user) => {
    if (window.confirm(`Security Protocol: Are you certain you wish to revoke access for ${user.name}? This action will be logged.`)) {
      alert(`Institutional Protocol: Access revoked for ${user.id}. Node status updated to 'Decommissioned'.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8 py-8 animate-fade-in custom-scrollbar font-sans">
      <PageHeader 
        title="Administrative Core"
        subtitle="Authenticate personnel identities and calibrate institutional access nodes."
        icon={<FaUserShield />}
        actions={
          <Button 
            variant="accent" 
            className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-google"
            onClick={() => navigate('/settings/users/add')}
            leftIcon={<FaUserPlus size={14}/>}
          >
            Provision New Identity
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Admin', value: '1', icon: <FaShieldAlt />, color: 'slate' },
          { label: 'Therapist', value: '2', icon: <FaHeartbeat />, color: 'clinicPrimary' },
          { label: 'Receptionist', value: '1', icon: <FaUser />, color: 'emerald' },
          { label: 'Billing Staff', value: '1', icon: <FaCreditCard />, color: 'indigo' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:-translate-y-1 transition-all flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-3xl ${stat.color === 'slate' ? 'bg-slate-900 text-white' : `bg-${stat.color === 'clinicPrimary' ? 'blue' : stat.color}-50 text-${stat.color === 'clinicPrimary' ? 'clinicPrimary' : stat.color}-500`} flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform`}>
              {stat.icon && React.cloneElement(stat.icon, { size: 24 })}
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
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all group border-l-4 border-transparent hover:border-clinicPrimary" onClick={() => navigate(`/settings/users/audit/${user.id}`)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5 text-left">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-clinicPrimary group-hover:scale-110 group-hover:rotate-6 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500 font-black">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none uppercase">{user.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1.5 text-left">
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
                  <td className="px-10 py-8 text-[12px] font-bold text-slate-400 uppercase tracking-widest text-left">
                    Last active: {user.lastLogin}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                        title="Modify Permissions" 
                        onClick={(e) => { e.stopPropagation(); navigate(`/settings/users/edit/${user.id}`); }}
                       >
                          <FaUserEdit size={14}/>
                       </button>
                       <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                        title="Revoke Access" 
                        onClick={(e) => { e.stopPropagation(); handleDelete(user); }}
                       >
                          <FaTrashAlt size={14}/>
                       </button>
                       <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                        title="Diagnostic Audit"
                        onClick={(e) => { e.stopPropagation(); navigate(`/settings/users/audit/${user.id}`); }}
                       >
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
    </div>
  );
};

export default UserManagement;
