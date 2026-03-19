import React, { useState } from 'react';
import { FaPlus, FaSearch, FaChevronRight, FaPhoneAlt, FaEnvelope, FaVideo, FaCommentAlt, FaPaperPlane, FaWhatsapp, FaInfoCircle, FaRegClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('sms');
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [conversations, setConversations] = useState([
    { id: 1, name: 'James Wilson', initial: 'JW', lastMsg: 'Protocol evaluated.', time: '10:45 AM', status: 'active', unread: false },
    { id: 2, name: 'Sarah Thompson', initial: 'ST', lastMsg: 'Imaging results ready.', time: '09:30 AM', status: 'online', unread: true },
    { id: 3, name: 'Robert Davis', initial: 'RD', lastMsg: 'Next session confirmed.', time: 'Yesterday', status: 'offline', unread: false },
    { id: 4, name: 'Emily Brown', initial: 'EB', lastMsg: 'Payment link received.', time: 'Yesterday', status: 'online', unread: false },
  ]);

  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'James Wilson', initial: 'JW', text: "Subject: Protocol Authentication. Just confirming tomorrow's evaluation window at 10:00 AM clinical time. Is the station authenticated?", time: '10:42 AM', isMe: false },
    { id: 2, sender: 'You', initial: 'KP', text: "Access Granted James. Protocol window 10:00-11:00 is authenticated. Your progression data has been synchronized for validation.", time: '10:45 AM', isMe: true },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      initial: 'KP',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setChatHistory([...chatHistory, newMessage]);
    setMessageText('');
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setIsCommModalOpen(false);
      alert('Broadcast Sync Executed Successfully to all target nodes.');
    }, 2000);
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeThread = conversations.find(c => c.id === activeThreadId) || conversations[0];

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 lg:px-6 animate-fade-in custom-scrollbar font-sans relative">
      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 border border-slate-100 shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Communication Hub</h1>
          <p className="text-slate-500 font-bold mt-1.5 uppercase tracking-widest text-[9px] sm:text-[10px] opacity-80">Manage patient interactions across SMS, Email, and professional channels.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1 sm:p-1.5 rounded-lg border border-slate-100 relative z-10 shadow-sm w-full lg:w-auto overflow-x-auto custom-scrollbar">
          {[
            { id: 'sms', icon: <FaCommentAlt />, label: 'SMS' },
            { id: 'whatsapp', icon: <FaWhatsapp />, label: 'WhatsApp' },
            { id: 'email', icon: <FaEnvelope />, label: 'Email' },
            { id: 'telehealth', icon: <FaVideo />, label: 'Telehealth' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors shrink-0 ${activeTab === tab.id ? 'bg-white text-clinicPrimary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-transparent'}`}
            >
              <span className="text-[10px] sm:text-[11px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
      </Card>

      <Modal 
        isOpen={isCommModalOpen} 
        onClose={() => !isBroadcasting && setIsCommModalOpen(false)}
        title="Broadcast Notification"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsCommModalOpen(false)} disabled={isBroadcasting}>Cancel Action</Button>
            <Button 
              variant="accent" 
              onClick={handleBroadcast} 
              leftIcon={isBroadcasting ? null : <FaPaperPlane />}
              disabled={isBroadcasting}
            >
              {isBroadcasting ? 'Processing...' : 'Execute Sync'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 p-0">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Audience</label>
            <select className="w-full p-2 lg:p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors cursor-pointer">
              <option>Individual Patient Record</option>
              <option>Active Patient Database</option>
              <option>Pending Follow-up Queue</option>
              <option>Appointment Waitlist</option>
            </select>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Message Content</label>
            <textarea className="w-full p-3 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors h-24 sm:h-32 custom-scrollbar placeholder:text-slate-400 shadow-sm resize-none" placeholder="Enter clinical or administrative notification text..."></textarea>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2.5">
             <FaInfoCircle className="text-blue-500 mt-0.5 shrink-0" size={12}/>
             <p className="text-[10px] sm:text-[11px] font-bold text-blue-700 leading-relaxed">Broadcast messages will be delivered through the primary communication channel set in the patient's profile preferences.</p>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[500px] h-auto lg:h-[calc(100vh-200px)]">
        <Card hover={false} className="lg:col-span-4 flex flex-col p-0 overflow-hidden border border-slate-100 shadow-sm bg-white h-full relative">
          <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 relative">
            <h3 className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-widest">{activeTab} Conversations</h3>
            <Button 
              variant="accent" 
              size="icon" 
              className="h-8 w-8 rounded-lg shadow-sm transform hover:rotate-90 transition-transform active:scale-95"
              onClick={() => setIsCommModalOpen(true)}
            >
              <FaPlus size={10}/>
            </Button>
          </div>
          <div className="p-3 sm:p-4 pb-2 z-10 relative">
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-clinicPrimary transition-colors">
                <FaSearch size={12}/>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search threads..."
                className="block w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 sm:px-3 pb-3 relative z-10">
            {filteredConversations.map((thread) => (
              <div 
                key={thread.id} 
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-3 sm:p-4 rounded-xl mb-1.5 flex items-center gap-3 sm:gap-4 cursor-pointer transition-colors border ${activeThreadId === thread.id ? 'bg-clinicPrimary/5 border-clinicPrimary/20' : 'border-transparent hover:bg-slate-50'}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl ${activeThreadId === thread.id ? 'bg-slate-900 text-clinicPrimary' : 'bg-slate-100 text-slate-600 border border-slate-200'} flex items-center justify-center font-black text-xs shadow-sm relative overflow-hidden transition-colors`}>
                     {thread.initial}
                  </div>
                  {thread.status === 'online' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-[0_0_5px_rgba(16,185,129,0.3)]"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-[12px] sm:text-[13px] font-black truncate tracking-tight ${activeThreadId === thread.id ? 'text-clinicPrimary' : 'text-slate-900'}`}>{thread.name}</p>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest whitespace-nowrap ml-2 shrink-0">{thread.time}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate font-bold tracking-tight opacity-80">{thread.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false} className="lg:col-span-8 flex flex-col p-0 overflow-hidden border border-slate-100 shadow-sm bg-white h-full relative">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-clinicPrimary text-white flex items-center justify-center font-black text-sm shadow-sm relative overflow-hidden shrink-0">
                 {activeThread.initial}
              </div>
              <div>
                <p className="text-[13px] sm:text-[14px] font-black text-slate-900 tracking-tighter leading-none mb-1">{activeThread.name}</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center">
                    <span className={`w-2 h-2 ${activeThread.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'} rounded-full`}></span>
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Transmission: {activeThread.status === 'online' ? 'Active Node' : 'Standby Mode'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white border border-slate-200 shadow-sm hover:text-clinicPrimary hover:bg-slate-50 transition-colors"><FaPhoneAlt size={12}/></Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white border border-slate-200 shadow-sm hover:text-clinicPrimary hover:bg-slate-50 transition-colors"><FaInfoCircle size={12}/></Button>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto custom-scrollbar bg-slate-50/50 space-y-6 sm:space-y-8 relative z-10">
            <div className="flex justify-center mb-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm">Temporal Data Node: March 18, 2026</span>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-6">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg ${msg.isMe ? 'bg-clinicPrimary text-white shadow-sm' : 'bg-slate-900 text-clinicPrimary shadow-sm'} flex items-center justify-center text-[10px] font-black shrink-0 relative overflow-hidden`}>
                     {msg.initial}
                  </div>
                  <div className={`p-3 sm:p-4 ${msg.isMe ? 'bg-clinicPrimary text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'} rounded-xl ${msg.isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'} group/msg relative`}>
                    <p className="text-[11px] sm:text-[12px] font-bold leading-relaxed tracking-tight">{msg.text}</p>
                    <div className={`flex items-center ${msg.isMe ? 'justify-between' : 'justify-end'} gap-2 mt-2 opacity-80`}>
                       {msg.isMe && <p className="text-[8px] font-black tracking-widest uppercase text-white/80">{msg.time}</p>}
                       <div className="flex items-center gap-1">
                          <FaRegClock size={8} />
                          <span className="text-[8px] font-black uppercase tracking-widest">{msg.isMe ? 'Delivered' : msg.time}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-4 border-t border-slate-100 bg-white relative z-20">
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm focus-within:border-clinicPrimary/30 focus-within:ring-2 focus-within:ring-clinicPrimary/10 transition-all">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tactical response or note..."
                className="flex-1 bg-transparent border-none text-[12px] sm:text-[13px] font-bold tracking-tight px-3 py-1 outline-none text-slate-700 placeholder:text-slate-400"
              />
              <Button 
                variant="accent" 
                size="icon" 
                onClick={handleSendMessage}
                className="h-8 w-8 rounded-lg shadow-sm shrink-0 active:scale-95 transition-transform"
              >
                <FaPaperPlane size={12}/>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Communication;
