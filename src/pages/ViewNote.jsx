import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaFileMedical, FaUser, FaHistory, FaPrint, FaEdit } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ViewNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real app we would fetch by id, here we just show a premium mock readout
  const [note] = useState({
    id: id || '1',
    patientName: 'Alice Johnson',
    date: '2026-03-19',
    time: '11:45 AM',
    category: 'Progress Follow-up',
    content: {
      subjective: 'Pain down to 4/10. Sleeping better, less stiffness in morning.',
      objective: 'ROM Flexion: 110 deg. Stability improving. Gait normal.',
      plan: 'Increase repetitions in HEP. Review in 1 week.'
    },
    author: 'Dr. Sarah Smith (Senior Physio)'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <button 
            type="button"
            onClick={() => navigate('/notes')}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90 shrink-0"
          >
            <FaArrowLeft size={16}/>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-clinicPrimary/10 text-clinicPrimary rounded-lg text-[9px] font-black uppercase tracking-widest">{note.category}</span>
               <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{note.date} • {note.time}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Review Clinical Node</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="secondary" onClick={() => window.print()} className="rounded-xl px-5 h-12 text-[10px] font-black uppercase tracking-widest shadow-sm" leftIcon={<FaPrint />}>Print Ledger</Button>
        </div>
      </div>

      <Card className="p-8 sm:p-12 border-none shadow-premium bg-white space-y-10 group relative overflow-hidden">
         <div className="absolute -top-32 -right-32 w-80 h-80 bg-clinicPrimary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>

         <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 gap-6 relative z-10">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center text-clinicPrimary shadow-sm">
                  <FaUser size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject Entity</p>
                  <p className="text-[18px] font-black text-slate-900 tracking-tight leading-none">{note.patientName}</p>
               </div>
            </div>
            <div className="h-px w-full md:w-px md:h-12 bg-slate-200"></div>
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm">
                  <FaFileMedical size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attending Clinician</p>
                  <p className="text-[14px] font-extrabold text-slate-700 tracking-tight leading-none">{note.author}</p>
               </div>
            </div>
         </div>

         <div className="space-y-12 relative z-10 pt-4">
            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Subjective Findings
               </h4>
               <p className="text-[14px] font-medium text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                 "{note.content.subjective}"
               </p>
            </div>

            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Objective Assessment
               </h4>
               <p className="text-[14px] font-medium text-slate-700 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 {note.content.objective}
               </p>
            </div>

            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Treatment Plan & Next Steps
               </h4>
               <p className="text-[14px] font-medium text-slate-700 leading-relaxed bg-white p-6 rounded-2xl border border-clinicPrimary/20 shadow-sm">
                 {note.content.plan}
               </p>
            </div>
         </div>

         <div className="pt-8 border-t border-slate-100 relative z-10 flex items-center justify-between opacity-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Node ID: {note.id.padStart(6, '0')} • Immutable Ledger</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FaHistory /> Version 1.0</p>
         </div>
      </Card>
    </div>
  );
};
export default ViewNote;
