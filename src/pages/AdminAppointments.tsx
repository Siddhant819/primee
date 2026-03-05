import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, ArrowLeft, Phone, User, Copy, Calendar, Mail, MessageSquare, ChevronRight, AlertCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const AdminAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed">("pending");
  const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await apiCall("/appointments");
      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      toast.error("Failed to load appointments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async (id: string) => {
    try {
      const data = await apiCall(`/appointments/${id}/confirm`, {
        method: "PUT",
        body: JSON.stringify({ notes }),
      });
      if (data.success) {
        const patientId = data.appointment.patientId?.patientId;
        setCreatedPatientId(patientId);

        toast.success(`Appointment confirmed! New Patient ID: ${patientId}`);
        setSelectedAppointment(null);
        setNotes("");
        fetchAppointments();
        setActiveTab("confirmed");

        // Show success notification for 10 seconds (more premium duration)
        setTimeout(() => setCreatedPatientId(null), 10000);
      }
    } catch (error) {
      toast.error("Failed to confirm appointment");
      console.error(error);
    }
  };

  const copyPatientId = (patientId: string) => {
    navigator.clipboard.writeText(patientId);
    toast.success("Patient ID copied to clipboard!");
  };

  const pendingAppointments = appointments.filter((apt: any) => apt.status === "pending");
  const confirmedAppointments = appointments.filter((apt: any) => apt.status === "confirmed");

  const displayedAppointments = activeTab === "pending" ? pendingAppointments : confirmedAppointments;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Modern Top Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/20"
            >
              <ArrowLeft size={24} />
            </button>
            <Reveal>
              <div>
                <p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.5em] mb-2 font-mono">Operations Module</p>
                <h1 className="text-4xl font-serif font-bold text-white tracking-tighter">Appointment <span className="font-light italic text-slate-400">Control</span></h1>
              </div>
            </Reveal>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 shadow-lg relative h-fit">
            <button
              onClick={() => setActiveTab("pending")}
              className={`relative z-10 px-8 py-3.5 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all duration-500 flex items-center gap-3 ${activeTab === "pending" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
            >
              <Clock size={16} />
              Pending Entry ({pendingAppointments.length})
              {activeTab === "pending" && (
                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-blue-500 rounded-[1.5rem] -z-10 shadow-2xl shadow-blue-500/40" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("confirmed")}
              className={`relative z-10 px-8 py-3.5 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all duration-500 flex items-center gap-3 ${activeTab === "confirmed" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
            >
              <CheckCircle size={16} />
              Confirmed ({confirmedAppointments.length})
              {activeTab === "confirmed" && (
                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-teal-500 rounded-[1.5rem] -z-10 shadow-2xl shadow-teal-500/40" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Patient Creation Banner */}
      <AnimatePresence>
        {createdPatientId && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-teal-500 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white"><User size={24} /></div>
                <div>
                  <h4 className="text-slate-950 font-black text-[10px] uppercase tracking-widest mb-1 italic">Genetic Sequence Assigned</h4>
                  <p className="text-white font-medium">Patient synchronized. ID: <span className="font-mono font-black border-b border-white text-lg">{createdPatientId}</span></p>
                </div>
              </div>
              <button
                onClick={() => copyPatientId(createdPatientId)}
                className="px-8 py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-3"
              >
                <Copy size={16} /> Copy Index
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">

          {/* List Section */}
          <div className="xl:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-40 gap-8"
                >
                  <div className="w-16 h-16 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin shadow-2xl shadow-blue-500/20" />
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.5em] italic">Synchronizing Logs...</p>
                </motion.div>
              ) : displayedAppointments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="glass-morphism p-20 rounded-[4rem] border-white/5 text-center bg-white/[0.02]"
                >
                  <Clock size={64} className="mx-auto text-slate-800 mb-8 opacity-20" />
                  <h3 className="text-3xl font-serif font-bold text-slate-300 mb-4 italic">Operational <span className="text-slate-500 font-light">Stasis</span></h3>
                  <p className="text-slate-500 font-light max-w-sm mx-auto italic">No active appointment streams detected for the current filter index.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid grid-cols-1 gap-6"
                >
                  {displayedAppointments.map((apt: any, idx) => (
                    <Reveal key={apt._id} delay={idx * 0.05}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        onClick={() => apt.status === "pending" && setSelectedAppointment(apt)}
                        className={`glass-morphism p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all cursor-pointer group flex items-center justify-between ${selectedAppointment?._id === apt._id ? 'bg-blue-500/10 border-blue-500/20 ring-1 ring-blue-500/20' : 'bg-white/[0.01]'
                          }`}
                      >
                        <div className="flex items-center gap-8">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${activeTab === "pending" ? 'bg-blue-500/20 text-blue-400' : 'bg-teal-500/20 text-teal-400'
                            }`}>
                            <User size={24} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{apt.patientName}</h4>
                            <div className="flex gap-4 items-center">
                              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest flex items-center gap-2">
                                <Calendar size={12} className="text-slate-600" /> {new Date(apt.appointmentDate).toLocaleDateString()}
                              </p>
                              <span className="w-1 h-1 bg-slate-800 rounded-full" />
                              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{apt.department}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-12">
                          <div className="hidden md:block text-right">
                            {apt.patientId ? (
                              <>
                                <p className="text-[9px] uppercase font-black text-slate-600 tracking-tighter mb-1">Assigned Index</p>
                                <p className="font-mono text-teal-500 font-bold text-sm tracking-widest">{apt.patientId?.patientId}</p>
                              </>
                            ) : (
                              <p className="text-slate-700 italic text-[10px] uppercase font-black italic tracking-widest">Unassigned Index</p>
                            )}
                          </div>
                          {apt.status === "pending" ? (
                            <button className="p-4 bg-white/5 text-blue-400 rounded-2xl group-hover:bg-blue-500 group-hover:text-slate-950 transition-all shadow-xl shadow-black/20">
                              <ChevronRight size={20} />
                            </button>
                          ) : (
                            <div className="w-12 h-12 rounded-full border border-teal-500/50 flex items-center justify-center text-teal-500">
                              <CheckCircle size={20} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          /* Details Panel Section */
          <aside className="sticky top-40 space-y-8">
            <AnimatePresence mode="wait">
              {selectedAppointment ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="glass-morphism p-10 rounded-[3.5rem] border border-blue-500/20 bg-blue-500/[0.03] shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex justify-between items-start mb-10">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight italic">Protocol <span className="font-light text-slate-400">Review</span></h3>
                    <button onClick={() => setSelectedAppointment(null)} className="p-2 text-slate-600 hover:text-white transition-colors"><Trash2 size={20} /></button>
                  </div>

                  <div className="space-y-8 mb-12">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-4 text-slate-400">
                        <Phone size={16} className="text-blue-500" />
                        <span className="text-sm font-bold tracking-widest font-mono text-blue-400 uppercase">{selectedAppointment.phone || "No Vox Index"}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <Mail size={16} className="text-blue-500" />
                        <span className="text-sm truncate font-medium text-slate-300">{selectedAppointment.email}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <Clock size={16} className="text-blue-500" />
                        <span className="text-sm font-bold text-white bg-blue-500/20 px-3 py-1 rounded-full">{selectedAppointment.timeSlot}</span>
                      </div>
                    </div>

                    {selectedAppointment.reason && (
                      <div className="space-y-2 px-2">
                        <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest italic flex items-center gap-4">
                          <span className="w-8 h-px bg-slate-800" /> Patient Narrative
                        </p>
                        <p className="text-sm text-slate-400 italic leading-relaxed">"{selectedAppointment.reason}"</p>
                      </div>
                    )}

                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-start gap-4">
                      <AlertCircle size={20} className="text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-blue-300 font-medium leading-relaxed uppercase tracking-tighter">Initializing this protocol will permanently ingest data into the clinical index.</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Injection Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-800 resize-none"
                        placeholder="Add procedural clinical notes..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => confirmAppointment(selectedAppointment._id)}
                      className="w-full py-5 bg-blue-500 text-slate-950 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-blue-400 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      <CheckCircle size={18} /> Execute Synchronization
                    </button>
                    <button
                      onClick={() => { setSelectedAppointment(null); setNotes("") }}
                      className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                    >
                      Abort Control
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism p-10 rounded-[3.5rem] border border-white/5 border-dashed bg-white/[0.01] text-center"
                >
                  <MessageSquare size={48} className="mx-auto text-slate-800 mb-6 opacity-20" />
                  <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic leading-loose">Awaiting node selection for synchronization...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AdminAppointments;