import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaSearch, FaPaperPlane, FaUserCircle, FaCheckDouble, FaPlus, FaPhoneAlt, FaVideo, FaInfoCircle, FaEllipsisV, FaRegSmile, FaPaperclip, FaHistory, FaCheck, FaTimes, FaCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SMSChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);

  const [chats, setChats] = useState([
    { id: 1, name: 'Alice Johnson', initial: 'AJ', lastMsg: 'I’ll be there in 5 mins', time: 'Just now', unread: 2, status: 'online', phone: '+44 7700 900123' },
    { id: 2, name: 'Bob Smith', initial: 'BS', lastMsg: 'Can we reschedule to Tuesday?', time: '2h ago', unread: 0, status: 'offline', phone: '+44 7700 900456' },
    { id: 3, name: 'Charlie Brown', initial: 'CB', lastMsg: 'Thanks for the exercises!', time: 'Yesterday', unread: 0, status: 'online', phone: '+44 7700 900789' },
    { id: 4, name: 'Diana Prince', initial: 'DP', lastMsg: 'Payment confirmed. See you soon.', time: '2 days ago', unread: 0, status: 'offline', phone: '+44 7700 900012' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, chatId: 1, text: 'Hi Alice, just confirming your appointment for 10am today.', sender: 'me', time: '09:00 AM', status: 'read' },
    { id: 2, chatId: 1, text: 'Yes, I’m on my way! I’ll be there in 5 mins.', sender: 'them', time: '09:45 AM', status: 'read' },
    { id: 3, chatId: 1, text: 'Great, see you soon!', sender: 'me', time: '09:46 AM', status: 'read' },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChatId]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now(),
      chatId: selectedChatId,
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setMessageText('');

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        chatId: selectedChatId,
        text: "System: Tactical node authenticated. Message received and synchronized.",
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];
  const activeMessages = messages.filter(m => m.chatId === selectedChatId);

  const handleAction = (action) => {
    alert(`Communication Logic: Initiating "${action}" for ${activeChat.name}. Node authenticated.`);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8 animate-fade-in font-sans">
      {/* Sidebar - Chat List */}
      <Card className="w-full lg:w-96 flex flex-col p-0 overflow-hidden border-none shadow-premium bg-white h-full transition-all rounded-[40px]">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <h1 className="text-[11px] font-black text-slate-900 tracking-[0.25em] uppercase leading-none flex items-center gap-4">
            <FaComments className="text-clinicPrimary" /> Transmission Core
          </h1>
          <button onClick={() => handleAction('New Thread Initialization')} className="w-11 h-11 bg-white text-clinicPrimary rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-clinicPrimary hover:text-white hover:shadow-google transition-all active:scale-90 shadow-soft">
            <FaPlus size={14}/>
          </button>
        </div>
        
        <div className="p-8 pb-4">
          <div className="relative group">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
            <input 
              type="text" 
              placeholder="Query thread nodes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8 space-y-2 lg:bg-transparent">
          {filteredChats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-6 rounded-[32px] cursor-pointer transition-all duration-500 border relative group ${selectedChatId === chat.id ? 'bg-clinicPrimary/5 border-clinicPrimary/20 shadow-soft translate-x-1' : 'bg-white border-transparent hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 shadow-soft ${selectedChatId === chat.id ? 'bg-clinicPrimary text-white rotate-3 scale-110' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                    {chat.initial}
                  </div>
                  {chat.status === 'online' && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-[15px] font-black tracking-tight truncate leading-none ${selectedChatId === chat.id ? 'text-clinicPrimary' : 'text-slate-800'}`}>{chat.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] font-bold truncate pr-4 text-slate-400 opacity-80">{chat.lastMsg}</p>
                    {chat.unread > 0 && (
                      <span className="bg-clinicPrimary text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-google animate-pulse">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden border-none shadow-premium bg-white h-full relative rounded-[40px] border-l-4 border-l-clinicPrimary">
        {/* Chat Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-clinicPrimary/10 border border-clinicPrimary/20 flex items-center justify-center text-clinicPrimary font-black text-xl shadow-soft">
                 {activeChat.initial}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${activeChat.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'} border-4 border-white rounded-full`}></div>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">{activeChat.name}</h3>
              <div className="flex items-center gap-3">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">{activeChat.phone}</p>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <p className={`text-[9px] font-black uppercase tracking-[0.25em] ${activeChat.status === 'online' ? 'text-emerald-500' : 'text-slate-400'}`}>
                   {activeChat.status === 'online' ? 'Active Handshake' : 'Offline Node'}
                 </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleAction('Voice Call Initiation')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90"><FaPhoneAlt size={16}/></button>
            <button onClick={() => handleAction('Video Session Handshake')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90"><FaVideo size={16}/></button>
            <button onClick={() => handleAction('Operational Details Audit')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90"><FaEllipsisV size={16}/></button>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-10 bg-slate-50/20 custom-scrollbar relative"
        >
          <div className="flex justify-center mb-4">
             <span className="px-5 py-2 bg-white/80 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] shadow-premium backdrop-blur-sm">Secure Terminal Sync: {new Date().toLocaleDateString()}</span>
          </div>

          {activeMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-500`}>
              <div className={`max-w-[75%] p-6 md:p-8 rounded-[32px] text-[15px] font-bold leading-relaxed tracking-tight group relative shadow-premium transition-all hover:translate-y-[-2px] ${msg.sender === 'me' ? 'bg-clinicPrimary text-white rounded-tr-none' : 'bg-white border border-slate-50 text-slate-700 rounded-tl-none'}`}>
                {msg.text}
                <div className={`absolute top-0 ${msg.sender === 'me' ? '-right-2' : '-left-2'} w-4 h-4 bg-inherit opacity-20`}></div>
              </div>
              <div className="flex items-center gap-3 mt-4 px-2 opacity-60">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.time}</span>
                {msg.sender === 'me' && (
                   <span className="text-clinicPrimary flex items-center gap-1">
                      <FaCheckDouble size={10}/>
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none pt-0.5">Verified</span>
                   </span>
                )}
              </div>
            </div>
          ))}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
             <FaComments size={300} className="text-clinicPrimary rotate-12" />
          </div>
        </div>

        {/* Input */}
        <div className="p-10 bg-white/60 backdrop-blur-xl border-t border-slate-50 relative z-10">
          <div className="flex items-center gap-5 bg-white rounded-[32px] p-2 pl-8 border border-slate-100 shadow-premium transition-all duration-500 focus-within:shadow-google focus-within:border-clinicPrimary/30">
            <button onClick={() => handleAction('Attachment Node Sync')} className="text-slate-300 hover:text-clinicPrimary transition-colors p-2 active:scale-90"><FaPaperclip size={18}/></button>
            <button onClick={() => handleAction('Emotional Feedback Node')} className="text-slate-300 hover:text-clinicPrimary transition-colors p-2 active:scale-90"><FaRegSmile size={18}/></button>
            <input 
              type="text" 
              placeholder="Deploy response node..." 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent border-none outline-none text-[15px] font-bold text-slate-700 min-w-0 placeholder:text-slate-200 tracking-tight" 
            />
            <button 
              onClick={handleSendMessage}
              className="w-14 h-14 bg-clinicPrimary text-white rounded-[24px] shadow-google flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
            >
              <FaPaperPlane size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg"></span>
                Institutional Logic Encrypted
             </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SMSChat;
