import React, { useState, useEffect } from 'react';
import { FaVideo, FaMicrophone, FaVolumeUp, FaCog, FaPlus, FaUsers, FaClock, FaCheckCircle, FaPhoneSlash, FaMicrophoneSlash, FaVideoSlash, FaExpand, FaCompress, FaClipboardList, FaFileMedicalAlt, FaHistory, FaSync, FaSignal, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Telehealth = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activePatient, setActivePatient] = useState(null);

  const queue = [
    { id: 'PAT-1021', name: 'Robert Downey Jr.', waitTime: '4m', priority: 'High', status: 'In Waiting' },
    { id: 'PAT-1025', name: 'Sarah Miller', waitTime: '12m', priority: 'Normal', status: 'In Waiting' },
  ];

  const handleAction = (action) => {
    alert(`Virtual Care Cluster: Initiating "${action}" for Clinical Session Node. Handshake verified.`);
  };

  const startSession = (patient) => {
    setActivePatient(patient);
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setActivePatient(null);
    alert('Session Terminated: Clinical transmission node closed and synchronized to patient ledger.');
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Virtual Care Intelligence</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Conduct secure, encrypted clinical video consultations with real-time diagnostic synchronization.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Audit Device Integrity')} leftIcon={<FaCog />}>System Audit</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Schedule Virtual Node')} leftIcon={<FaPlus />}>Book Virtual Window</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Interface */}
        <div className="lg:col-span-8 space-y-10">
           <div className={`relative aspect-video rounded-[40px] bg-slate-900 overflow-hidden shadow-premium group border-b-8 ${isSessionActive ? 'border-b-emerald-500' : 'border-b-slate-800'} transition-all duration-1000`}>
              {!isSessionActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center space-y-8 px-10">
                      <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center mx-auto border border-white/10 shadow-2xl relative">
                         <FaVideo className="text-clinicPrimary text-4xl animate-pulse"/>
                         <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg"></div>
                      </div>
                      <div className="space-y-3">
                         <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Virtual Standby Mode</h3>
                         <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Waiting for destination node handshake...</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                   <div className="text-center animate-pulse">
                      <FaUsers className="text-white/10 text-[200px] mb-8" />
                      <h4 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">{activePatient.name}</h4>
                      <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Encrypted Session Active</p>
                   </div>
                </div>
              )}
              
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-slate-900/60 backdrop-blur-3xl p-5 rounded-[32px] border border-white/5 shadow-premium w-max group-hover:bg-slate-900/80 transition-all duration-500">
                 <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-2xl transition-all shadow-soft active:scale-95 ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {isMuted ? <FaMicrophoneSlash size={18}/> : <FaMicrophone size={18}/>}
                 </button>
                 <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-2xl transition-all shadow-soft active:scale-95 ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {isVideoOff ? <FaVideoSlash size={18}/> : <FaVideo size={18}/>}
                 </button>
                 <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all shadow-soft active:scale-95"><FaVolumeUp size={18}/></button>
                 <div className="w-px h-6 bg-white/10 mx-2"></div>
                 {isSessionActive ? (
                   <button onClick={endSession} className="px-10 py-4 bg-rose-500 hover:bg-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-google flex items-center gap-3">
                     <FaPhoneSlash /> Terminate Session
                   </button>
                 ) : (
                   <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all shadow-soft active:scale-95"><FaCog size={18}/></button>
                 )}
              </div>

              <div className="absolute top-10 right-10 w-56 aspect-video rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-premium flex items-center justify-center group/cam overflow-hidden">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] relative z-10">Institutional Cam</p>
                 <div className="absolute inset-0 bg-gradient-to-br from-clinicPrimary/5 to-transparent"></div>
              </div>

              <div className="absolute top-10 left-10 p-5 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/5 flex items-center gap-5 shadow-premium">
                 <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Live Connection</span>
                 </div>
                 <div className="w-px h-4 bg-white/10"></div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">128ms Latency • Encrypted State</p>
              </div>
           </div>

           <Card className="p-10 bg-white border-none shadow-premium flex items-center justify-between group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('Review Patient Ledger')}>
              <div className="flex items-center gap-8">
                 <div className="w-16 h-16 rounded-[24px] bg-blue-50 flex items-center justify-center text-clinicPrimary shadow-soft group-hover:scale-110 transition-transform">
                    <FaFileMedicalAlt size={28}/>
                 </div>
                 <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Next Scheduled Consult</h4>
                    <p className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">Robert Downey Jr. • 14:30 PM (Temporal GMT)</p>
                 </div>
              </div>
              <Button variant="secondary" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 border-none shadow-soft hover:shadow-google hover:text-clinicPrimary transition-all"><FaExternalLinkAlt size={16}/></Button>
           </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 bg-slate-900 border-none shadow-premium relative overflow-hidden group rounded-[40px]">
              <FaUsers className="absolute -right-16 -bottom-16 text-white/5 text-[280px] rotate-12 transition-transform group-hover:rotate-6 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.4em] mb-12 relative z-10 flex items-center gap-4">
                 <FaClock /> Inbound Cluster Queue
              </h3>
              <div className="space-y-6 relative z-10">
                 {queue.map(patient => (
                   <div key={patient.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group/row" onClick={() => startSession(patient)}>
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <p className="text-[15px] font-black text-white tracking-tighter uppercase leading-none group-hover/row:text-clinicPrimary transition-colors">{patient.name}</p>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Node {patient.id}</p>
                         </div>
                         <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${patient.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-500/20 text-slate-400'}`}>
                            {patient.priority}
                         </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{patient.status}</p>
                         <p className="text-[14px] font-black text-white tracking-tighter leading-none">{patient.waitTime} Wait</p>
                      </div>
                   </div>
                 ))}
                 {queue.length === 0 && (
                   <div className="text-center py-10 opacity-40">
                      <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">No target nodes in standby.</p>
                   </div>
                 )}
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium space-y-8 rounded-[40px]">
              <div className="flex items-center justify-between">
                 <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Network Integrity</h4>
                 <FaSignal className="text-emerald-500" />
              </div>
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inbound Signal</span>
                       <span className="text-[13px] font-black text-slate-900 tracking-tighter uppercase">Excellent</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encryption Verification</span>
                       <span className="text-[13px] font-black text-slate-900 tracking-tighter uppercase">AES-256 Valid</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                       <div className="bg-clinicPrimary h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                 </div>
              </div>
              <Button variant="secondary" className="w-full h-14 rounded-2xl border-none shadow-premium font-black text-[10px] uppercase tracking-widest group" onClick={() => handleAction('Global Latency Reset')}>
                 <FaSync className="mr-3 group-hover:rotate-180 transition-transform duration-700" /> Optimize Transmission
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Telehealth;
