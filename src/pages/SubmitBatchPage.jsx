import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt, FaExclamationTriangle, FaPlus, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';

const SubmitBatchPage = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [batchSelection, setBatchSelection] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('deephysio_claims') || '[]');
    setClaims(saved);
  }, []);

  const executeBatchSubmission = () => {
    if (batchSelection.length === 0) return;
    
    const updated = claims.map(c => 
      batchSelection.includes(c.id) ? { 
        ...c, 
        status: 'Submitted', 
        notes: [...(c.notes || []), `Batch submitted on ${new Date().toLocaleDateString()}`] 
      } : c
    );
    
    localStorage.setItem('deephysio_claims', JSON.stringify(updated));
    alert(`Protocol successfully initialized. ${batchSelection.length} nodes transmitted to clearing house.`);
    navigate('/billing/claims');
  };

  const pendingClaims = claims.filter(c => c.status !== 'Submitted' && c.status !== 'Approved');

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/billing/claims')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Insurance Batch Protocol</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Initialize Global Clearing House Transmission</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-8">
           <div className="p-6 bg-blue-50 border border-blue-100 rounded-[32px] flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                 <FaExclamationTriangle size={20} />
              </div>
              <p className="text-[12px] font-bold text-blue-700 uppercase tracking-tight leading-relaxed">
                 Select clinical nodes to include in the current transmission cycle. <br/>Only pending or edited claims are available for batching.
              </p>
           </div>

           <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {pendingClaims.length > 0 ? pendingClaims.map(claim => (
                <div 
                  key={claim.id} 
                  onClick={() => {
                    setBatchSelection(prev => prev.includes(claim.id) ? prev.filter(id => id !== claim.id) : [...prev, claim.id]);
                  }}
                  className={`p-6 border rounded-[32px] cursor-pointer transition-all flex items-center justify-between ${batchSelection.includes(claim.id) ? 'bg-clinicPrimary/5 border-clinicPrimary shadow-md scale-[1.02]' : 'bg-white border-slate-100 hover:border-clinicPrimary/30 hover:bg-slate-50/50'}`}
                >
                   <div className="flex items-center gap-6">
                      <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${batchSelection.includes(claim.id) ? 'bg-clinicPrimary border-clinicPrimary' : 'border-slate-200 bg-slate-50'}`}>
                         {batchSelection.includes(claim.id) && <FaPlus className="text-white scale-75 rotate-45" />}
                      </div>
                      <div>
                         <p className="text-[15px] font-black text-slate-800 tracking-tight leading-none">{claim.patient}</p>
                         <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] font-black text-clinicPrimary uppercase tracking-widest bg-clinicPrimary/5 px-2 py-1 rounded">{claim.provider}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{claim.code}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-lg font-black text-slate-900 tracking-tighter">{claim.amount}</p>
                </div>
              )) : (
                <div className="py-20 text-center space-y-4">
                   <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">No pending nodes detected</p>
                   <Button variant="secondary" onClick={() => navigate('/billing/claims')}>Return to Ledger</Button>
                </div>
              )}
           </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${batchSelection.length > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{batchSelection.length} Nodes Ready for Uplink</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <Button variant="secondary" className="flex-1 md:px-10 py-5 rounded-2xl" onClick={() => navigate('/billing/claims')}>Abort</Button>
              <Button 
                variant="accent" 
                className="flex-1 md:px-10 py-5 rounded-2xl" 
                disabled={batchSelection.length === 0} 
                onClick={executeBatchSubmission}
                leftIcon={<FaCloudUploadAlt />}
              >
                Execute Submission
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitBatchPage;
