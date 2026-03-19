import React, { useState } from 'react';
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
    const newEmail = {
      id: Date.now(),
      sender: 'You',
      email: 'practitioner@deephysio.com',
      subject: composeData.subject,
      excerpt: composeData.message.substring(0, 50) + '...',
      date: 'Just Now',
      read: true,
      priority: 'Normal',
      content: composeData.message,
      folder: 'Inbox', // User wants it to appear in Inbox as well for dummy flow
      isStarred: false
    };
    setEmails([newEmail, ...emails]);
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
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 lg:px-6 animate-fade-in font-sans relative">
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] animate-bounce-in">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-sm flex items-center gap-3">
             <FaCheckCircle className="text-clinicPrimary size={12}" />
             <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 border border-slate-100 shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Intelligence Email Center</h1>
          <p className="text-slate-500 font-bold mt-1.5 uppercase tracking-widest text-[9px] sm:text-[10px] opacity-80">Synchronize clinical correspondence and administrative transmission nodes.</p>
        </div>
        <div className="flex gap-2 sm:gap-3 relative z-10 w-full lg:w-auto">
           <Button 
             variant="secondary" 
             className="flex-1 lg:flex-none rounded-lg h-9 sm:h-10 px-4 sm:px-5 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-[9px] lg:text-[10px] font-black uppercase tracking-widest" 
             onClick={runMailSync} 
             isLoading={isSyncing} 
             leftIcon={<FaSync size={10}/>}
           >
             {isSyncing ? 'Syncing...' : 'Handshake Sync'}
           </Button>
           <Button variant="accent" className="flex-1 lg:flex-none rounded-lg h-9 sm:h-10 px-4 sm:px-5 shadow-sm active:scale-95 transition-all text-[9px] lg:text-[10px] font-black uppercase tracking-widest" onClick={() => setIsComposeOpen(true)} leftIcon={<FaPlus size={10}/>}>Compose Inbound</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[500px] h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)]">
        {/* Sidebar */}
        <Card hover={false} className="lg:col-span-3 p-4 sm:p-5 flex flex-col h-full bg-white border border-slate-100 shadow-sm rounded-xl sm:rounded-2xl">
           <div className="mb-4 sm:mb-5 px-2 shrink-0">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">Directory Nodes</h3>
              <div className="space-y-1 sm:space-y-1.5">
                {folders.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => { setActiveFolder(item.name); setSelectedEmailId(null); }}
                    className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors group ${activeFolder === item.name ? 'bg-clinicPrimary/10 text-clinicPrimary' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                       <span className={`text-sm ${activeFolder === item.name ? 'text-clinicPrimary' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.icon}</span>
                       <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${activeFolder === item.name ? 'text-clinicPrimary' : 'text-slate-600'}`}>{item.name}</span>
                    </div>
                    {item.count > 0 && (
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${activeFolder === item.name ? 'bg-clinicPrimary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
           </div>

           <div className="p-4 bg-slate-900 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer mt-auto shrink-0" onClick={() => showToast('Security Ledger Verified')}>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-white uppercase tracking-tight mb-1.5 flex items-center gap-2">
                   <FaCheckCircle className="text-clinicPrimary size={12}" /> Clinical Encryption
                 </p>
                 <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">All inbound transmissions are encrypted via AES-256 clinical logic.</p>
              </div>
           </div>
        </Card>

        {/* Email List & Preview */}
        <div className="lg:col-span-9 flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
           {/* List */}
           <Card hover={false} className="flex-1 flex flex-col p-0 overflow-hidden border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl shrink-0 lg:shrink h-[40vh] lg:h-full">
              <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center gap-3 bg-white z-10 relative shrink-0">
                 <div className="relative flex-1 group">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-clinicPrimary transition-colors" size={12}/>
                    <input 
                      type="text" 
                      placeholder="Query transmission nodes..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors shadow-sm placeholder:text-slate-400" 
                    />
                 </div>
                 <div className="relative">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)} 
                      className={`w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center border rounded-lg transition-colors shadow-sm active:scale-95 ${isFilterOpen ? 'bg-clinicPrimary text-white border-clinicPrimary' : 'bg-white border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary/30'}`}
                    >
                      <FaFilter size={12}/>
                    </button>
                    {isFilterOpen && (
                      <div className="absolute top-10 right-0 w-40 bg-white rounded-xl shadow-sm border border-slate-200 z-50 overflow-hidden p-1.5">
                        {['All', 'Unread', 'Starred'].map(f => (
                          <button 
                            key={f}
                            onClick={() => { setActiveFilter(f); setIsFilterOpen(false); }}
                            className={`w-full text-left px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-colors ${activeFilter === f ? 'bg-clinicPrimary/10 text-clinicPrimary' : 'text-slate-500 hover:bg-slate-50'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0">
                 {filteredEmails.length > 0 ? filteredEmails.map(email => (
                   <div 
                     key={email.id} 
                     onClick={() => {
                        setSelectedEmailId(email.id);
                        if (!email.read) {
                          setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e));
                        }
                     }}
                     className={`p-3 sm:p-4 lg:p-5 border-b border-slate-100 cursor-pointer transition-colors flex items-start gap-3 sm:gap-4 lg:gap-5 relative group ${selectedEmailId === email.id ? 'bg-clinicPrimary/5' : 'hover:bg-slate-50'}`}
                   >
                     {selectedEmailId === email.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-clinicPrimary"></div>
                     )}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm sm:text-base transition-colors shadow-sm shrink-0 ${selectedEmailId === email.id ? 'bg-clinicPrimary text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                         {email.sender[0]}
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                         <div className="flex justify-between items-center mb-1">
                            <h4 className={`text-[12px] sm:text-[13px] uppercase tracking-tight font-black truncate ${selectedEmailId === email.id ? 'text-clinicPrimary' : 'text-slate-900'}`}>{email.sender}</h4>
                            <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0 ml-2">{email.date}</span>
                         </div>
                         <p className={`text-[11px] sm:text-[12px] truncate font-black tracking-tight mb-1 ${!email.read ? 'text-slate-900' : 'text-slate-500 opacity-80'}`}>{email.subject}</p>
                         <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold truncate opacity-80">{email.excerpt}</p>
                      </div>
                      {!email.read && <div className="absolute top-4 right-4 w-2 h-2 bg-clinicPrimary rounded-full"></div>}
                   </div>
                 )) : (
                   <div className="p-10 text-center space-y-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto border border-dashed border-slate-200">
                         <FaEnvelope className="text-slate-300" size={16} />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Empty Transmission Node</p>
                   </div>
                 )}
              </div>
           </Card>

           {/* Preview */}
           <Card hover={false} className="flex-[1.5] flex flex-col p-0 overflow-hidden border border-slate-100 shadow-sm bg-slate-50 rounded-xl sm:rounded-2xl border-t-2 sm:border-t-4 border-t-clinicPrimary min-h-[50vh] lg:min-h-0">
              {selectedEmail ? (
                <>
                <div className="p-3 sm:p-4 lg:p-5 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10 shrink-0">
                   <div className="flex items-center gap-2 sm:gap-3">
                      <button onClick={() => handleAction('Archive Signal', selectedEmail)} title="Archive" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50 transition-colors shadow-sm"><FaArchive size={12}/></button>
                      <button onClick={() => handleAction('Deletion Signal', selectedEmail)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition-colors shadow-sm"><FaTrash size={12}/></button>
                      <div className="w-px h-5 bg-slate-200 mx-1"></div>
                      <button onClick={() => handleAction('Mark Read Unread', selectedEmail)} title={selectedEmail.read ? "Mark as Unread" : "Mark as Read"} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:bg-slate-50 transition-colors shadow-sm">
                        {selectedEmail.read ? <FaEnvelope size={12}/> : <FaCheckCircle size={12}/>}
                      </button>
                      <button onClick={() => handleAction('Print Command', selectedEmail)} title="Print" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:bg-slate-50 transition-colors shadow-sm"><FaPrint size={12}/></button>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-widest border transition-colors ${selectedEmail.priority === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {selectedEmail.priority}
                      </span>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 space-y-6 sm:space-y-8 bg-white/50 relative z-0">
                   <div className="space-y-4 sm:space-y-6 relative z-10">
                      <div className="flex items-start justify-between">
                         <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900 flex items-center justify-center text-clinicPrimary font-black text-base sm:text-lg shadow-sm shrink-0">
                               {selectedEmail.sender[0]}
                            </div>
                            <div>
                               <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tighter uppercase leading-none mb-0.5 sm:mb-1">{selectedEmail.sender}</h2>
                               <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">{selectedEmail.email} • {selectedEmail.date}</p>
                            </div>
                         </div>
                         <Button 
                           variant="secondary" 
                           size="icon" 
                           className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-white border border-slate-200 shadow-sm shrink-0 transition-colors ${selectedEmail.isStarred ? 'bg-amber-50 border-amber-200' : ''}`}
                           onClick={() => handleAction('Toggle Star', selectedEmail)}
                         >
                           <FaStar size={12} className={selectedEmail.isStarred ? 'text-amber-400' : 'text-slate-300'} />
                         </Button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden relative z-10">
                         <div className="p-4 sm:p-5 lg:p-6">
                            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tighter leading-snug mb-4 sm:mb-5 border-l-2 sm:border-l-4 border-clinicPrimary pl-3 sm:pl-4">{selectedEmail.subject}</h3>
                            <div className="text-[12px] sm:text-[13px] text-slate-700 font-bold leading-relaxed whitespace-pre-wrap tracking-tight">
                               {selectedEmail.content}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 sm:gap-4 relative z-10 px-1 lg:px-2">
                      <Button variant="accent" className="flex-1 h-9 sm:h-10 rounded-lg shadow-sm font-black uppercase tracking-widest text-[9px] sm:text-[10px]" leftIcon={<FaReply size={10}/>} onClick={() => showToast('Response Sent')}>Synchronize Response</Button>
                      <Button variant="secondary" className="flex-1 h-9 sm:h-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 shadow-sm font-black uppercase tracking-widest text-[9px] sm:text-[10px] transition-colors" leftIcon={<FaShare size={10}/>} onClick={() => setIsForwardOpen(true)}>Forward Node</Button>
                   </div>
                </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-10 text-center bg-transparent">
                   <div className="space-y-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-200">
                         <FaRegPaperPlane className="text-slate-300" size={24} />
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-400 uppercase tracking-tighter">Terminal Awaiting Data</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Select a transmission node to review clinical payload.</p>
                      </div>
                   </div>
                </div>
              )}
           </Card>
        </div>
      </div>

      {/* Compose Modal */}
      <Modal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)}
        title="Compose Clinical Transmission"
        footer={
          <div className="flex gap-3 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsComposeOpen(false)}>Abort Command</Button>
            <Button variant="accent" onClick={handleComposeSubmit} leftIcon={<FaRegPaperPlane size={10}/>}>Execute Protocol</Button>
          </div>
        }
      >
        <div className="space-y-4 p-0 text-left font-sans">
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Recipient Node</label>
              <div className="relative group">
                 <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors" size={12}/>
                 <input 
                   type="text" 
                   value={composeData.to}
                   onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                   placeholder="pat_node_01@client.com" 
                   className="w-full pl-8 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary text-shadow transition-colors placeholder:text-slate-400" 
                 />
              </div>
           </div>
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Transmission Header</label>
              <input 
                type="text" 
                value={composeData.subject}
                onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                placeholder="Protocol Handshake: Initial Clinical Sync" 
                className="w-full px-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary text-shadow transition-colors placeholder:text-slate-400" 
              />
           </div>
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Payload Content</label>
              <textarea 
                value={composeData.message}
                onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                placeholder="Enter clinical or administrative operational data..." 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors h-32 custom-scrollbar resize-none placeholder:text-slate-400"
              />
           </div>
           <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm">
              <FaPaperclip className="text-blue-500 shrink-0 size={12}"/>
              <p className="text-[9px] sm:text-[10px] font-black text-blue-700 uppercase tracking-widest">Attach Clinical Documentation Nodes</p>
           </div>
        </div>
      </Modal>

      {/* Forward Modal */}
      <Modal 
        isOpen={isForwardOpen} 
        onClose={() => setIsForwardOpen(false)}
        title="Forward Operational Node"
        footer={
          <div className="flex gap-3 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsForwardOpen(false)}>Abort</Button>
            <Button variant="accent" onClick={handleForwardSubmit} leftIcon={<FaRegPaperPlane size={10} />}>Forward Sequence</Button>
          </div>
        }
      >
        <div className="space-y-4 p-0 text-left font-sans">
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Node Address</label>
              <div className="relative group">
                 <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={12}/>
                 <input 
                   type="text" 
                   value={forwardData.to}
                   onChange={(e) => setForwardData({...forwardData, to: e.target.value})}
                   placeholder="recipient@node.com" 
                   className="w-full pl-8 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary text-shadow transition-colors placeholder:text-slate-400" 
                 />
              </div>
           </div>
           <div className="p-4 bg-white border border-slate-200 rounded-xl italic text-[11px] sm:text-[12px] text-slate-500 shadow-sm font-bold">
              "Forwarding: {selectedEmail?.subject}"
           </div>
        </div>
      </Modal>
    </div>
  );
};


export default EmailMessages;
