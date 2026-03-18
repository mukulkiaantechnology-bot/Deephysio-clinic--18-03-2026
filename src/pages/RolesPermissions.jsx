import React, { useState } from 'react';
import { FaUserShield, FaPlus, FaSearch, FaCheck, FaTimes, FaLock, FaUserCog, FaShieldAlt, FaChevronRight, FaSave, FaUndo, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const RolesPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('Practitioner');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const roles = [
    { id: 'RL-001', name: 'Clinical Owner', users: 2, level: 'Global Access', color: 'bg-rose-500', icon: <FaUserShield /> },
    { id: 'RL-002', name: 'Practitioner', users: 12, level: 'Clinical Only', color: 'bg-blue-500', icon: <FaUserCog /> },
    { id: 'RL-003', name: 'Front Desk', users: 4, level: 'Operational', color: 'bg-emerald-500', icon: <FaUsers /> },
    { id: 'RL-004', name: 'Billing Manager', users: 1, level: 'Finance Node', color: 'bg-amber-500', icon: <FaFileInvoiceDollar /> },
  ];

  const permissions = [
    { cat: 'Patient Management', actions: ['Create Identity', 'Read Dossier', 'Update Bio-Data', 'Delete Node', 'Export Registry'] },
    { cat: 'Clinical Records', actions: ['Initialize Note', 'Read History', 'Modify Logic', 'Archive Node', 'Encryption Lock'] },
    { cat: 'Financial Assets', actions: ['Invoicing', 'Claim Submission', 'Refund Auth', 'Revenue Audit'] },
    { cat: 'System Architecture', actions: ['User Provisioning', 'Clinic Calibration', 'Security Protocol', 'API Integration'] },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Security Matrix Updated: Permissions for role "${selectedRole}" have been synchronized across the clinical grid.`);
    }, 1500);
  };

  const handleAction = (action) => {
    alert(`Protocol Execution: Initiating ${action} for Role Optimization.`);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Access Control Matrix</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Calibrate institutional permission nodes and authority hierarchies.</p>
        </div>
        <Button 
          variant="accent" 
          size="lg"
          className="rounded-[24px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.2em] w-full lg:w-auto relative z-10"
          onClick={() => setIsRoleModalOpen(true)}
          leftIcon={<FaPlus size={14}/>}
        >
          Initialize New Role
        </Button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2 mb-4">Authority Hierarchies</h4>
           {roles.map(role => (
              <button 
                key={role.id} 
                onClick={() => setSelectedRole(role.name)}
                className={`w-full p-8 rounded-[32px] border-none transition-all text-left flex items-center gap-6 group relative overflow-hidden ${
                  selectedRole === role.name 
                    ? 'bg-slate-900 text-white shadow-2xl translate-x-3' 
                    : 'bg-white text-slate-400 hover:bg-slate-50 hover:shadow-premium'
                }`}
              >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg  group-hover:scale-110 transition-transform ${role.color}`}>
                    {role.icon}
                 </div>
                 <div className="flex-1 overflow-hidden relative z-10">
                    <h3 className={`text-[15px] font-black uppercase tracking-tight truncate mb-1.5 ${selectedRole === role.name ? 'text-white' : 'text-slate-800'}`}>{role.name}</h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-60`}>{role.level}</p>
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></span>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${selectedRole === role.name ? 'text-clinicPrimary' : 'text-slate-400'}`}>{role.users} Active Nodes</span>
                    </div>
                 </div>
                 {selectedRole === role.name && (
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-clinicPrimary/10 rounded-full blur-3xl"></div>
                 )}
                 <FaChevronRight className={`ml-auto transition-transform ${selectedRole === role.name ? 'text-clinicPrimary translate-x-2' : 'text-slate-200 group-hover:text-slate-400'}`} />
              </button>
           ))}
        </div>

        <div className="lg:col-span-8">
          <Card className="p-0 bg-white border-none shadow-premium overflow-hidden rounded-[40px]">
            <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-8 bg-slate-50/20 relative overflow-hidden group">
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white shadow-premium rounded-[24px] text-clinicPrimary flex items-center justify-center group-hover:rotate-6 transition-all duration-500 border border-slate-50">
                     <FaShieldAlt size={24}/>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">{selectedRole} Matrix</h3>
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3 opacity-80">Synchronize functional permissions for this identity node.</p>
                  </div>
               </div>
               <button 
                onClick={() => handleAction('Security Bulk Lock')}
                className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest flex items-center gap-3 px-6 py-3 border border-clinicPrimary/20 rounded-2xl hover:bg-clinicPrimary hover:text-white transition-all shadow-soft active:scale-95 group/btn"
               >
                  <FaLock size={12} className="group-hover/btn:animate-bounce" /> Encryption Lock
               </button>
               <div className="absolute top-0 right-0 w-32 h-32 bg-clinicPrimary/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left min-w-[700px]">
                  <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                     <tr>
                        <th className="px-10 py-6">Operational Module</th>
                        {['Read', 'Write', 'Delete', 'Admin'].map(act => (
                          <th key={act} className="px-10 py-6 text-center">{act}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {permissions.map((p, idx) => (
                        <tr key={p.cat} className="hover:bg-slate-50/50 transition-all group/tr">
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-5 text-slate-800 font-black text-[14px] uppercase tracking-tight group-hover/tr:text-clinicPrimary transition-colors">
                                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover/tr:bg-clinicPrimary group-hover/tr:scale-125 transition-all"></div>
                                 {p.cat}
                              </div>
                           </td>
                           {[1, 2, 3, 4].map(idx2 => (
                              <td key={idx2} className="px-10 py-8 text-center">
                                 <label className="relative inline-flex items-center cursor-pointer group/toggle">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={idx2 <= 2 || (selectedRole === 'Clinical Owner' && idx2 <= 4)}/>
                                    <div className="w-12 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-lg after:h-4 after:w-4 after:transition-all peer-checked:bg-clinicPrimary shadow-inner-soft group-hover/toggle:shadow-md transition-all"></div>
                                 </label>
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="p-10 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-50">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[.2em] opacity-60">Last sync: {new Date().toLocaleTimeString()} • Verified Security Level 4</p>
               <div className="flex gap-4 w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    onClick={() => handleAction('Protocol Reset')}
                    className="flex-1 sm:flex-none px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-none shadow-premium hover:shadow-soft"
                    leftIcon={<FaUndo />}
                  >
                    Reset Grid
                  </Button>
                  <Button 
                    variant="accent"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none py-4 px-10 text-[10px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all"
                    leftIcon={isSaving ? null : <FaSave />}
                  >
                    {isSaving ? 'Synchronizing...' : 'Save Matrix'}
                  </Button>
               </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)}
        title="Initialize New Authority Hierarchy"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsRoleModalOpen(false)}>Terminate Process</Button>
            <Button variant="accent" onClick={() => { setIsRoleModalOpen(false); alert('Hierarchy Initialized: New Role Node added to the institutional grid.'); }} leftIcon={<FaPlus />}>Authorize Role</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 font-sans text-left">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hierarchy Alias (Role Name)</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="e.g. Senior Tech Analyst" />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Partition Template</label>
              <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                 <option>Clinical Partition Only</option>
                 <option>Financial & Billing Node</option>
                 <option>Operational & Frontend</option>
                 <option>Unrestricted Institutional Access</option>
              </select>
           </div>
           <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">Warning: New hierarchy nodes require manual personnel assignment from the Administrative Core.</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

const FaUsers = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FaFileInvoiceDollar = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

export default RolesPermissions;
