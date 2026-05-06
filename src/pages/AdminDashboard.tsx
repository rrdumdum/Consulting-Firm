import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Users, Calendar, MessageSquare, Clock, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  createdAt: Timestamp;
  status: string;
}

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  createdAt: Timestamp;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');

  useEffect(() => {
    const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const qConsults = query(collection(db, 'consultations'), orderBy('createdAt', 'desc'));

    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
    });

    const unsubConsults = onSnapshot(qConsults, (snapshot) => {
      setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Consultation)));
      setLoading(false);
    });

    return () => {
      unsubLeads();
      unsubConsults();
    };
  }, []);

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="w-10 h-10 animate-spin text-navy-700" /></div>;

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl font-bold text-navy-950 mb-2">Nexus Command Center</h1>
            <p className="text-slate-500">Manage your incoming leads and firm appointments.</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
             <button 
               onClick={() => setActiveTab('leads')}
               className={cn(
                 "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                 activeTab === 'leads' ? "bg-navy-900 text-white shadow-md" : "text-slate-500 hover:text-navy-900"
               )}
             >
               Contact Leads ({leads.length})
             </button>
             <button 
               onClick={() => setActiveTab('bookings')}
               className={cn(
                 "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                 activeTab === 'bookings' ? "bg-navy-900 text-white shadow-md" : "text-slate-500 hover:text-navy-900"
               )}
             >
               Consultations ({consultations.length})
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'leads' ? (
            <div className="space-y-4">
              {leads.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl text-center border border-dashed border-slate-300">
                   <p className="text-slate-400">No new leads yet.</p>
                </div>
              ) : (
                leads.map((lead) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={lead.id} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                         <MessageSquare className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-950">{lead.name}</h3>
                        <p className="text-sm text-slate-500">{lead.email} {lead.company && `• ${lead.company}`}</p>
                        <div className="mt-2 text-xs font-bold text-navy-700 bg-navy-50 px-2 py-0.5 rounded inline-block uppercase tracking-wider">
                          Interest: {lead.service}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow max-w-md">
                       <p className="text-sm text-slate-600 italic">"{lead.message}"</p>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="text-xs text-slate-400 font-medium mb-1">Received {lead.createdAt?.toDate().toLocaleDateString()}</p>
                       <button className="text-navy-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                          Process Lead <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultations.length === 0 ? (
                 <div className="col-span-full bg-white p-20 rounded-3xl text-center border border-dashed border-slate-300">
                    <p className="text-slate-400">No bookings scheduled.</p>
                 </div>
              ) : (
                consultations.map((c) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={c.id} 
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-6">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-emerald-600" />
                       </div>
                       <div className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-600">Pending</span>
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-navy-950 mb-1">{c.name}</h3>
                    <p className="text-sm text-slate-500 mb-6">{c.email} • {c.phone}</p>
                    
                    <div className="space-y-3 mb-8">
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-navy-700" />
                          <span className="font-medium">{new Date(c.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Clock className="w-4 h-4 text-navy-700" />
                          <span className="font-medium">{c.time} (EST)</span>
                       </div>
                    </div>
                    
                    <button className="w-full btn-secondary py-2 border-slate-200">View Detailed Context</button>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

