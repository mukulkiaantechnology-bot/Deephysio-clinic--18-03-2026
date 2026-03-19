import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaEnvelope, FaSearch, FaFilter, FaPlus, FaInbox, FaRegPaperPlane, FaStar, FaTrash, FaChevronRight, FaPaperclip, FaHistory, FaCheckCircle, FaExclamationCircle, FaUserCircle, FaReply, FaShare, FaPrint, FaArchive, FaSync } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const EmailMessages = () => {
  const [selectedEmailId, setSelectedEmailId] = useState(1);
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isForwardOpen, setIsForwardOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });

  const [emails, setEmails] = useState([
    { id: 1, sender: 'Alice Johnson', email: 'alice.j@node.com', subject: 'Question about my exercise plan', excerpt: 'Hi, I was wondering if I should continue the pathological node stabilization exercises if the pain subsides?', date: '10:30 AM', read: false, priority: 'High', content: "Hi Dr. Paras,\n\nI've been following the stabilization routine for my lumbar node as discussed. The acute pain has subsided significantly. Should I transition to Phase 2 of the protocol, or continue with the current baseline until our next synchronization session?\n\nBest regards,\nAlice", folder: 'Inbox', isStarred: false },
    { id: 2, sender: 'BUPA Health', email: 'claims@bupa.com', subject: 'Invoice Confirmation: #4402', excerpt: 'The payment for patient ID 4402 has been successfully authenticated against the insurance ledger.', date: '09:15 AM', read: true, priority: 'Normal', content: "Dear DeePhysio Clinic,\n\nWe are pleased to confirm that Invoice #4402 has been validated and the payout is scheduled for the next financial cycle. No further action is required from your administrative node.\n\nRegards,\nBUPA Claims Intelligence", folder: 'Inbox', isStarred: true },
    { id: 3, sender: 'Dr. Michael Chen', email: 'm.chen@hospital.uk', subject: 'Patient Referral: Robert Downey', excerpt: 'Please find the attached clinical documents for the referral of Robert Downey concerning post-op recovery.', date: 'Yesterday', read: true, priority: 'Critical', content: "Hello Team,\n\nI am referring Robert Downey for post-operative rehabilitation following his ACL reconstruction. Attached are the surgical notes and initial diagnostic imaging for your review. Please sync with the patient to establish a care timeline.\n\nThanks,\nMichael", folder: 'Inbox', isStarred: false },
  ]);

  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });
  const [forwardData, setForwardData] = useState({ to: '' });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const folders = [
    { name: 'Inbox', icon: <FaInbox />, count: emails.filter(e => e.folder === 'Inbox' && !e.read).length },
    { name: 'Sent', icon: <FaRegPaperPlane />, count: emails.filter(e => e.folder === 'Sent').length },
    { name: 'Starred', icon: <FaStar />, count: emails.filter(e => e.isStarred).length },
    { name: 'Drafts', icon: <FaEnvelope />, count: emails.filter(e => e.folder === 'Drafts').length },
    { name: 'Trash', icon: <FaTrash />, count: emails.filter(e => e.folder === 'Trash').length },
  ];

  const handleAction = (action, item) => {
    if (action === 'Deletion Signal') {
      setEmails(emails.map(e => e.id === item.id ? { ...e, folder: 'Trash' } : e));
      showToast('Moved to Trash');
    } else if (action === 'Archive Signal') {
      setEmails(emails.map(e => e.id === item.id ? { ...e, folder: 'Archive' } : e));
      showToast('Archived Successfully');
    } else if (action === 'Print Command') {
      window.print();
    } else if (action === 'Toggle Star') {
      setEmails(emails.map(e => e.id === item.id ? { ...e, isStarred: !e.isStarred } : e));
    } else if (action === 'Mark Read Unread') {
      setEmails(emails.map(e => e.id === item.id ? { ...e, read: !e.read } : e));
    }
  };

  const runMailSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Emails Synced Successfully');
    }, 2000);
  };

  const handleComposeSubmit = () => {
    if (!composeData.to || !composeData.subject) {
      showToast('Error: Recipient and Header Required');
      return;
    }
    const newId = Date.now();
    const newEmail = {
      id: newId,
      sender: 'You',
      email: 'practitioner@deephysio.com',
      subject: composeData.subject,
      excerpt: composeData.message.substring(0, 50) + (composeData.message.length > 50 ? '...' : ''),
      date: 'Just Now',
      read: true,
      priority: 'Normal',
      content: composeData.message,
      folder: 'Inbox', 
      isStarred: false
    };
    setEmails([newEmail, ...emails]);
    setSelectedEmailId(newId);
    setActiveFolder('Inbox');
    setIsComposeOpen(false);
    setComposeData({ to: '', subject: '', message: '' });
    showToast('Inbound Transmission Created');
  };

  const handleForwardSubmit = () => {
    showToast(`Email Forwarded to ${forwardData.to}`);
    setIsForwardOpen(false);
    setForwardData({ to: '' });
  };

  const filteredEmails = emails.filter(email => {
    const matchesFolder = activeFolder === 'Starred' ? email.isStarred : email.folder === activeFolder;
    const matchesSearch = email.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : 
                          activeFilter === 'Unread' ? !email.read : 
                          activeFilter === 'Starred' ? email.isStarred : true;
    return matchesFolder && matchesSearch && matchesFilter;
  });

  const selectedEmail = emails.find(e => e.id === selectedEmailId) || filteredEmails[0] || null;

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans relative">
      {/* Toast Notification - Portaled to body to escape z-index hell */}
      {toast.visible && createPortal(
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[10000] animate-bounce-in">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-[20px] shadow-2xl border border-white/10 flex items-center gap-4">
             <FaCheckCircle className="text-clinicPrimary" />
             <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>,
        document.body
      )}

      {/* Modals moved to top for better event handling and visibility */}
      <Modal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)}
        title="Compose Clinical Transmission"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsComposeOpen(false)}>Abort Command</Button>
            <Button variant="accent" onClick={handleComposeSubmit} leftIcon={<FaRegPaperPlane />}>Execute Protocol</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 text-left font-sans">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Recipient Node</label>
              <div className="relative group">
                 <FaUserCircle className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-clinicPrimary transition-colors" size={16}/>
                 <input 
                   type="text" 
                   value={composeData.to}
                   onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                   placeholder="pat_node_01@client.com" 
                   className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" 
                 />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Transmission Header</label>
              <input 
                type="text" 
                value={composeData.subject}
                onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                placeholder="Protocol Handshake: Initial Clinical Sync" 
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" 
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Payload Content</label>
              <textarea 
                value={composeData.message}
                onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                placeholder="Enter clinical or administrative operational data..." 
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-[15px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all h-48 custom-scrollbar resize-none"
              />
           </div>
           <div className="flex items-center gap-4 px-4 py-6 bg-blue-50/50 rounded-[28px] border border-blue-100">
              <FaPaperclip className="text-blue-500" />
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-widest">Attach Clinical Documentation Nodes</p>
           </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isForwardOpen} 
        onClose={() => setIsForwardOpen(false)}
        title="Forward Operational Node"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsForwardOpen(false)}>Abort</Button>
            <Button variant="accent" onClick={handleForwardSubmit} leftIcon={<FaRegPaperPlane />}>Forward Sequence</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 text-left font-sans">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Target Node Address</label>
              <div className="relative group">
                 <FaUserCircle className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 transition-colors" size={16}/>
                 <input 
                   type="text" 
                   value={forwardData.to}
                   onChange={(e) => setForwardData({...forwardData, to: e.target.value})}
                   placeholder="recipient@node.com" 
                   className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" 
                 />
              </div>
           </div>
           <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 italic text-[13px] text-slate-400">
              "Forwarding: {selectedEmail?.subject}"
           </div>
        </div>
      </Modal>

      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Intelligence Email Center</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Synchronize clinical correspondence and administrative transmission nodes.</p>
        </div>
        <div className="flex gap-4 relative z-30 w-full lg:w-auto">
           <Button 
             variant="secondary" 
             size="lg" 
             className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" 
             onClick={runMailSync} 
             isLoading={isSyncing} 
             leftIcon={<FaSync />}
           >
             {isSyncing ? 'Syncing...' : 'Handshake Sync'}
           </Button>
           
           <button 
             key="compose-btn"
             onClick={() => setIsComposeOpen(true)}
             className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 bg-[#2EA7B8] text-white shadow-google hover:bg-[#1E6C77] active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 relative z-40 cursor-pointer"
           >
             <FaPlus /> Compose Inbound
           </button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[750px]">
        {/* Sidebar */}
        <Card className="lg:col-span-3 p-8 space-y-3 h-full bg-white border-none shadow-premium rounded-[40px]">
           <div className="mb-10 px-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Directory Nodes</h3>
              <div className="space-y-2">
                {folders.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => { setActiveFolder(item.name); setSelectedEmailId(null); }}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-[24px] transition-all duration-300 group ${activeFolder === item.name ? 'bg-clinicPrimary text-white shadow-google translate-x-2' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-4">
                       <span className={`text-lg transition-transform group-hover:scale-110 ${activeFolder === item.name ? 'text-white' : 'text-slate-300'}`}>{item.icon}</span>
                       <span className={`text-[13px] font-black uppercase tracking-widest ${activeFolder === item.name ? 'text-white' : 'text-slate-600'}`}>{item.name}</span>
                    </div>
                    {item.count > 0 && (
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${activeFolder === item.name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
           </div>

           <div className="p-8 bg-slate-900 rounded-[32px] border border-white/5 relative overflow-hidden group cursor-pointer" onClick={() => showToast('Security Ledger Verified')}>
              <div className="relative z-10">
                 <p className="text-[12px] font-black text-white uppercase tracking-tight mb-2 flex items-center gap-3">
                   <FaCheckCircle className="text-clinicPrimary" /> Clinical Encryption
                 </p>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">All inbound transmissions are encrypted via AES-256 clinical logic.</p>
              </div>
           </div>
        </Card>

        {/* Email List & Preview */}
        <div className="lg:col-span-9 flex flex-col lg:flex-row gap-8 h-full">
           {/* List */}
           <Card className="flex-1 flex flex-col p-0 overflow-hidden border-none shadow-premium bg-white rounded-[40px]">
              <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/20">
                 <div className="relative flex-1 group">
                    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                    <input 
                      type="text" 
                      placeholder="Query transmission nodes..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-white border border-slate-100 rounded-[20px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200" 
                    />
                 </div>
                 <div className="relative">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)} 
                      className={`w-12 h-12 flex items-center justify-center border rounded-[20px] transition-all shadow-soft active:scale-95 ${isFilterOpen ? 'bg-clinicPrimary text-white border-clinicPrimary' : 'bg-white border-slate-100 text-slate-300 hover:text-clinicPrimary'}`}
                    >
                      <FaFilter size={14}/>
                    </button>
                    {isFilterOpen && (
                      <div className="absolute top-14 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 z-50 overflow-hidden p-2">
                        {['All', 'Unread', 'Starred'].map(f => (
                          <button 
                            key={f}
                            onClick={() => { setActiveFilter(f); setIsFilterOpen(false); }}
                            className={`w-full text-left px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${activeFilter === f ? 'bg-clinicPrimary/10 text-clinicPrimary' : 'text-slate-400 hover:bg-slate-50'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar min-h-[400px]">
                 {filteredEmails.length > 0 ? filteredEmails.map(email => (
                   <div 
                     key={email.id} 
                     onClick={() => {
                        setSelectedEmailId(email.id);
                        if (!email.read) {
                          setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e));
                        }
                     }}
                     className={`p-10 border-b border-slate-50 cursor-pointer transition-all duration-500 flex items-start gap-8 relative group ${selectedEmailId === email.id ? 'bg-clinicPrimary/5 border-l-8 border-l-clinicPrimary' : 'hover:bg-slate-50 border-l-8 border-l-transparent'}`}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-soft shrink-0 ${selectedEmailId === email.id ? 'bg-clinicPrimary text-white shadow-google scale-110' : 'bg-slate-50 text-slate-300'}`}>
                         {email.sender[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center mb-3">
                            <h4 className={`text-[15px] uppercase tracking-tight font-black ${selectedEmailId === email.id ? 'text-clinicPrimary' : 'text-slate-800'}`}>{email.sender}</h4>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{email.date}</span>
                         </div>
                         <p className={`text-[13px] truncate font-black mb-2 ${!email.read ? 'text-slate-900' : 'text-slate-500 opacity-60'}`}>{email.subject}</p>
                         <p className="text-[12px] text-slate-400 font-medium truncate tracking-tight opacity-70">{email.excerpt}</p>
                      </div>
                      {!email.read && <div className="absolute top-10 right-10 w-2 h-2 bg-clinicPrimary rounded-full shadow-[0_0_10px_rgba(46,167,184,0.5)]"></div>}
                   </div>
                 )) : (
                   <div className="p-20 text-center space-y-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                         <FaEnvelope className="text-slate-200" size={30} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Empty Transmission Node</p>
                   </div>
                 )}
              </div>
           </Card>

           {/* Preview */}
           <Card className="flex-[1.5] flex flex-col p-0 overflow-hidden border-none shadow-premium bg-slate-50 rounded-[40px] border-t-4 border-t-clinicPrimary">
              {selectedEmail ? (
                <>
                <div className="p-8 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                   <div className="flex items-center gap-4">
                      <button onClick={() => handleAction('Archive Signal', selectedEmail)} title="Archive" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-amber-500 transition-all shadow-sm"><FaArchive size={14}/></button>
                      <button onClick={() => handleAction('Deletion Signal', selectedEmail)} title="Delete" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 transition-all shadow-sm"><FaTrash size={14}/></button>
                      <div className="w-px h-6 bg-slate-100 mx-2"></div>
                      <button onClick={() => handleAction('Mark Read Unread', selectedEmail)} title={selectedEmail.read ? "Mark as Unread" : "Mark as Read"} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-clinicPrimary transition-all shadow-sm">
                        {selectedEmail.read ? <FaEnvelope size={14}/> : <FaCheckCircle size={14}/>}
                      </button>
                      <button onClick={() => handleAction('Print Command', selectedEmail)} title="Print" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-clinicPrimary transition-all shadow-sm"><FaPrint size={14}/></button>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedEmail.priority === 'Critical' ? 'bg-rose-50 text-rose-500 border-rose-100 shadow-rose-500/10' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        {selectedEmail.priority} Node
                      </span>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-white/40">
                   <div className="space-y-8">
                      <div className="flex items-start justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-900 border border-slate-800 flex items-center justify-center text-clinicPrimary font-black text-2xl shadow-premium">
                               {selectedEmail.sender[0]}
                            </div>
                            <div>
                               <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">{selectedEmail.sender}</h2>
                               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{selectedEmail.email} • {selectedEmail.date}</p>
                            </div>
                         </div>
                         <Button 
                           variant="secondary" 
                           size="icon" 
                           className={`h-12 w-12 rounded-2xl bg-white border border-slate-100 hover:shadow-google ${selectedEmail.isStarred ? 'bg-amber-50 border-amber-200' : ''}`}
                           onClick={() => handleAction('Toggle Star', selectedEmail)}
                         >
                           <FaStar className={selectedEmail.isStarred ? 'text-amber-400' : 'text-slate-200'} />
                         </Button>
                      </div>

                      <div className="p-8 bg-white border border-slate-50 rounded-[32px] shadow-soft">
                         <h3 className="text-xl font-black text-slate-800 tracking-tight leading-snug mb-8 border-l-4 border-clinicPrimary pl-6">{selectedEmail.subject}</h3>
                         <div className="text-[15px] text-slate-600 font-medium leading-relaxed whitespace-pre-wrap tracking-tight px-6 opacity-80">
                            {selectedEmail.content}
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-5 px-4">
                      <Button variant="accent" className="flex-1 h-14 rounded-[24px] shadow-google font-black uppercase tracking-widest text-[11px]" leftIcon={<FaReply />} onClick={() => showToast('Response Sent')}>Synchronize Response</Button>
                      <Button variant="secondary" className="flex-1 h-14 rounded-[24px] border-none shadow-premium font-black uppercase tracking-widest text-[11px]" leftIcon={<FaShare />} onClick={() => setIsForwardOpen(true)}>Forward Node</Button>
                   </div>
                </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-20 text-center bg-white/20">
                   <div className="space-y-6">
                      <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center mx-auto shadow-premium border border-slate-50">
                         <FaRegPaperPlane className="text-slate-200" size={32} />
                      </div>
                      <div>
                        <p className="text-xl font-black text-slate-300 uppercase tracking-tighter">Terminal Awaiting Data</p>
                        <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-2">Select a transmission node to review clinical payload.</p>
                      </div>
                   </div>
                </div>
              )}
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none opacity-50"></div>
           </Card>
        </div>
      </div>

    </div>
  );
};



export default EmailMessages;
