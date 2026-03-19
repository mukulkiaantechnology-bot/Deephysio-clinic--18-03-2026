import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaChevronRight, FaPhoneAlt, FaEnvelope, FaVideo, FaCommentAlt, FaPaperPlane, FaWhatsapp, FaInfoCircle, FaRegClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState('audio'); // 'audio' or 'video'
  const [callStatus, setCallStatus] = useState('Calling'); // 'Calling', 'Connecting', 'Connected'
  const [callTime, setCallTime] = useState(0);

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

  useEffect(() => {
    let timer;
    if (isCallModalOpen) {
      if (callStatus === 'Calling') {
        timer = setTimeout(() => setCallStatus('Connecting'), 1500);
      } else if (callStatus === 'Connecting') {
        timer = setTimeout(() => setCallStatus('Connected'), 2000);
      } else if (callStatus === 'Connected') {
        timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
      }
    }
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [isCallModalOpen, callStatus]);

  const startCall = (type) => {
    setCallType(type);
    setCallStatus('Calling');
    setCallTime(0);
    setIsCallModalOpen(true);
  };

  const endCall = () => {
    setIsCallModalOpen(false);
    setCallStatus('Calling');
    setCallTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Communication Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Manage patient interactions across SMS, Email, and professional channels.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 relative z-10 shadow-inner-soft">
          {[
            { id: 'whatsapp', icon: <FaWhatsapp />, label: 'WhatsApp' },
            { id: 'email', icon: <FaEnvelope />, label: 'Email' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-clinicPrimary shadow-soft border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
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
        <div className="space-y-8 p-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Target Audience</label>
            <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
              <option>Individual Patient Record</option>
              <option>Active Patient Database</option>
              <option>Pending Follow-up Queue</option>
              <option>Appointment Waitlist</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Message Content</label>
            <textarea className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-[13px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all h-40 custom-scrollbar placeholder:text-slate-300" placeholder="Enter clinical or administrative notification text..."></textarea>
          </div>
          <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <FaInfoCircle className="text-blue-500 mt-0.5" />
             <p className="text-[11px] font-medium text-blue-700 leading-relaxed">Broadcast messages will be delivered through the primary communication channel set in the patient's profile preferences.</p>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[700px]">
        <Card className="lg:col-span-4 flex flex-col p-0 overflow-hidden border-none shadow-premium bg-white h-full transition-all">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em]">{activeTab} Conversations</h3>
            <Button 
              variant="accent" 
              size="icon" 
              className="h-11 w-11 rounded-xl shadow-lg transform hover:rotate-90 transition-all duration-500 active:scale-90"
              onClick={() => setIsCommModalOpen(true)}
            >
              <FaPlus size={14}/>
            </Button>
          </div>
          <div className="p-8 pb-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-5 flex items-center text-slate-300 group-focus-within:text-clinicPrimary transition-colors">
                <FaSearch size={14}/>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search threads..."
                className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft placeholder:text-slate-300 font-sans"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
            {filteredConversations.map((thread) => (
              <div 
                key={thread.id} 
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-6 rounded-[24px] mb-2 flex items-center gap-6 cursor-pointer transition-all duration-300 border border-transparent ${activeThreadId === thread.id ? 'bg-clinicPrimary/5 border-clinicPrimary px-8' : 'hover:bg-slate-50'}`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${activeThreadId === thread.id ? 'bg-slate-900 border-none' : 'bg-slate-100 border border-slate-200'} text-clinicPrimary flex items-center justify-center font-bold text-lg shadow-soft relative overflow-hidden transition-all`}>
                     {thread.initial}
                     <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 -mr-4 -mt-4 rounded-full"></div>
                  </div>
                  {thread.status === 'online' && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className={`text-[15px] font-bold truncate tracking-tight transition-colors ${activeThreadId === thread.id ? 'text-clinicPrimary' : 'text-slate-900'}`}>{thread.name}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap ml-2">{thread.time}</span>
                  </div>
                  <p className="text-[13px] text-slate-400 truncate font-medium tracking-tight opacity-70">{thread.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card glass className="lg:col-span-8 flex flex-col p-0 overflow-hidden border-none shadow-premium bg-white h-full relative">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/60 sticky top-0 z-20 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-clinicPrimary text-white flex items-center justify-center font-bold text-xl shadow-lg relative overflow-hidden">
                 {activeThread.initial}
                 <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 -ml-4 -mb-4 rounded-full"></div>
              </div>
              <div>
                <p className="text-[17px] font-bold text-slate-900 tracking-tight leading-none mb-2">{activeThread.name}</p>
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <span className={`w-2 h-2 ${activeThread.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'} rounded-full`}></span>
                    {activeThread.status === 'online' && <span className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Transmission: {activeThread.status === 'online' ? 'Active Node' : 'Standby Mode'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => startCall('audio')} variant="secondary" size="icon" className="h-12 w-12 rounded-xl bg-slate-50 border-none shadow-premium hover:shadow-glass hover:text-clinicPrimary transition-all active:scale-95"><FaPhoneAlt size={16}/></Button>
              <Button onClick={() => startCall('video')} variant="secondary" size="icon" className="h-12 w-12 rounded-xl bg-slate-50 border-none shadow-premium hover:shadow-glass hover:text-clinicPrimary transition-all active:scale-95"><FaVideo size={16}/></Button>
              <Button onClick={() => alert('Viewing patient communication insights...')} variant="secondary" size="icon" className="h-12 w-12 rounded-xl bg-slate-50 border-none shadow-premium hover:shadow-glass hover:text-clinicPrimary transition-all active:scale-95"><FaInfoCircle size={16}/></Button>
            </div>
          </div>

          <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-slate-50/20 space-y-10">
            <div className="flex justify-center">
              <span className="px-5 py-2 bg-white/80 border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] shadow-premium backdrop-blur-sm">Temporal Data Node: March 18, 2026</span>
            </div>
            
            <div className="flex flex-col gap-8">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-6 max-w-[80%] ${msg.isMe ? 'self-end flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl ${msg.isMe ? 'bg-clinicPrimary text-white' : 'bg-slate-900 text-clinicPrimary'} shadow-xl flex items-center justify-center text-xs font-bold shrink-0 relative overflow-hidden`}>
                     {msg.initial}
                     <div className={`absolute ${msg.isMe ? 'bottom-0 left-0' : 'top-0 right-0'} w-4 h-4 bg-white/10 -m-2 rounded-full`}></div>
                  </div>
                  <div className={`p-8 ${msg.isMe ? 'bg-clinicPrimary text-white shadow-project' : 'bg-white border border-slate-50 text-slate-700 shadow-premium'} rounded-[32px] ${msg.isMe ? 'rounded-tr-none' : 'rounded-tl-none'} group/msg hover:-translate-y-1 transition-all duration-300`}>
                    <p className="text-[15px] font-medium leading-relaxed tracking-tight">{msg.text}</p>
                    <div className={`flex items-center ${msg.isMe ? 'justify-between' : 'justify-end'} gap-2 mt-4 opacity-60 transition-opacity`}>
                       {msg.isMe && <p className="text-[10px] font-bold tracking-widest uppercase">{msg.time}</p>}
                       <div className="flex items-center gap-1">
                          <FaRegClock size={10} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{msg.isMe ? 'Delivered' : msg.time}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-slate-50 bg-white/40 backdrop-blur-xl relative z-10 px-10">
            <div className="flex items-center gap-5 bg-white p-3 rounded-[32px] border border-slate-50 shadow-premium focus-within:shadow-glass focus-within:border-clinicPrimary/30 transition-all duration-500">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tactical response or note..."
                className="flex-1 bg-transparent border-none text-[15px] font-medium tracking-tight px-6 outline-none text-slate-700 placeholder:text-slate-300 py-2.5 font-sans"
              />
              <Button 
                variant="accent" 
                size="icon" 
                onClick={handleSendMessage}
                className="h-12 w-12 rounded-[20px] shadow-lg shadow-clinicPrimary/30 transform hover:scale-110 active:scale-95 transition-all"
              >
                <FaPaperPlane size={18}/>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none opacity-50"></div>
        </Card>
      </div>

      <Modal
        isOpen={isCallModalOpen}
        onClose={endCall}
        title={`${callType === 'video' ? 'Video' : 'Audio'} Call: ${activeThread.name}`}
        footer={
          <div className="flex justify-center w-full">
            <Button variant="accent" className="bg-rose-500 hover:bg-rose-600 rounded-2xl px-12 py-4 h-auto shadow-lg shadow-rose-200" onClick={endCall}>End Call Session</Button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center p-8 space-y-8 min-h-[400px]">
          <div className="relative">
            <div className={`w-32 h-32 rounded-[40px] bg-gradient-to-br from-clinicPrimary to-clinicPrimary-dark flex items-center justify-center text-white text-4xl font-bold shadow-2xl relative z-10 ${callStatus === 'Calling' ? 'animate-bounce' : ''}`}>
              {activeThread.initial}
            </div>
            {callStatus === 'Calling' && (
              <>
                <div className="absolute top-0 left-0 w-32 h-32 bg-clinicPrimary/20 rounded-[40px] animate-ping"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-clinicPrimary/10 rounded-[40px] animate-pulse scale-110"></div>
              </>
            )}
            {callStatus === 'Connected' && callType === 'audio' && (
              <div className="absolute -inset-4 bg-clinicPrimary/5 rounded-[48px] animate-pulse"></div>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-2xl font-black text-slate-900 tracking-tight">{activeThread.name}</p>
            <div className="flex flex-col items-center">
              <p className={`text-base font-bold uppercase tracking-widest ${callStatus === 'Connected' ? 'text-emerald-500' : 'text-slate-400'}`}>
                {callStatus === 'Connected' ? formatTime(callTime) : callStatus}
              </p>
              {callStatus !== 'Connected' && <div className="flex gap-1 mt-2">
                <div className="w-1.5 h-1.5 bg-clinicPrimary rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-clinicPrimary rounded-full animate-bounce delay-200"></div>
                <div className="w-1.5 h-1.5 bg-clinicPrimary rounded-full animate-bounce delay-300"></div>
              </div>}
            </div>
          </div>

          {callType === 'video' && callStatus === 'Connected' ? (
            <div className="w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white">
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <FaVideo size={64} className="animate-pulse" />
              </div>
              <div className="absolute bottom-6 right-6 w-32 h-24 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                You
              </div>
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                Live 1080p
              </div>
            </div>
          ) : callType === 'audio' && callStatus === 'Connected' ? (
            <div className="flex items-center gap-12 py-8">
               <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:bg-white hover:shadow-premium transition-all cursor-pointer border border-slate-100">
                    <FaPlus size={18} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add</p>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-clinicPrimary/10 text-clinicPrimary flex items-center justify-center shadow-soft border border-clinicPrimary/20">
                    <FaPhoneAlt size={18} />
                  </div>
                  <p className="text-[10px] font-bold text-clinicPrimary uppercase tracking-widest">Audio</p>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:bg-white hover:shadow-premium transition-all cursor-pointer border border-slate-100">
                    <FaPlus size={18} className="rotate-45" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hold</p>
               </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default Communication;
