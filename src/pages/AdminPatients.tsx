import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Plus, ArrowLeft, Search, X, User, Mail, Phone, Calendar, Droplet, MapPin, ClipboardList, ChevronRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const AdminPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    medicalHistory: "",
    bloodGroup: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchPatients();
  }, []);

  // Filter patients based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(
        (patient: any) =>
          patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  const fetchPatients = async () => {
    try {
      const data = await apiCall("/patients");
      if (data.success) {
        setPatients(data.patients || []);
        setFilteredPatients(data.patients || []);
      }
    } catch (error) {
      toast.error("Failed to load patients");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.gender) {
      toast.error("Please fill in all required fields");
      return;
    }

    setFormLoading(true);

    try {
      const data = await apiCall("/patients", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        toast.success(`Patient added successfully! ID: ${data.patient.patientId}`);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          medicalHistory: "",
          bloodGroup: "",
        });
        setShowAddPatientModal(false);
        fetchPatients();
      } else {
        toast.error(data.message || "Failed to add patient");
      }
    } catch (error) {
      toast.error("An error occurred while adding patient");
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      const data = await apiCall(`/patients/${id}`, {
        method: "DELETE",
      });
      if (data.success) {
        setPatients(patients.filter((p: any) => p._id !== id));
        toast.success("Patient deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete patient");
      }
    } catch (error) {
      toast.error("Failed to delete patient");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Modern Top Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-3 bg-white/5 rounded-2xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <Reveal>
              <div>
                <p className="text-[10px] uppercase font-black text-teal-500 tracking-[0.4em] mb-1">Registry Control</p>
                <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Patient <span className="font-light italic text-slate-400">Management</span></h1>
              </div>
            </Reveal>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search indices, names, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowAddPatientModal(true)}
              className="p-3.5 bg-teal-500 text-slate-950 rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Initialize Entry</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 relative z-10">

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40 gap-6"
            >
              <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-light italic uppercase tracking-widest text-[10px]">Retrieving Core Data...</p>
            </motion.div>
          ) : filteredPatients.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center py-40 glass-morphism rounded-[4rem] border-white/5 bg-white/[0.02]"
            >
              <User size={64} className="mx-auto text-slate-800 mb-6 opacity-20" />
              <h3 className="text-2xl font-serif font-bold text-slate-300 mb-2 italic">Zero Matches Detected</h3>
              <p className="text-slate-500 font-light">The search parameters yielded no clinical indices. Adjust filters or initialize a new entry.</p>
              <button onClick={() => { setSearchTerm(""); setShowAddPatientModal(true) }} className="mt-10 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Clear & Initialize</button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPatients.map((patient: any, idx) => (
                <Reveal key={patient._id} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="glass-morphism p-8 rounded-[3rem] border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[4rem] pointer-events-none group-hover:bg-teal-500/10 transition-colors" />

                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono font-bold text-teal-500 uppercase tracking-widest">IDRef: {patient.patientId}</p>
                        <h4 className="text-2xl font-serif font-bold text-white group-hover:text-teal-400 transition-colors">{patient.fullName}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/admin/patients/${patient._id}`)} className="p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5"><Edit size={16} /></button>
                        <button onClick={() => deletePatient(patient._id)} className="p-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20"><Trash2 size={16} /></button>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10 pb-8 border-b border-white/5">
                      <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-300 transition-colors text-sm">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><Mail size={14} /></div>
                        <span className="truncate">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-300 transition-colors text-sm">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400"><Phone size={14} /></div>
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-8 pt-4">
                        <div>
                          <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter italic mb-1">Blood Group</p>
                          <p className="text-sm font-bold text-white flex items-center gap-1"><Droplet size={14} className="text-rose-500" /> {patient.bloodGroup || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter italic mb-1">Gender</p>
                          <p className="text-sm font-bold text-white">{patient.gender}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center group/btn">
                      <button onClick={() => navigate(`/admin/patients/${patient._id}`)} className="text-[10px] uppercase font-black text-teal-400 tracking-widest italic flex items-center gap-2 group-hover/btn:translate-x-2 transition-transform">
                        View Clinical Module <ChevronRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Patient Modal - Full Modern Overhaul */}
      <AnimatePresence>
        {showAddPatientModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setShowAddPatientModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 rounded-[4rem] border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.5)] relative z-10 flex flex-col"
            >
              <div className="p-10 md:p-14 border-b border-white/5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-teal-500 flex items-center justify-center text-slate-950 shadow-2xl shadow-teal-500/30">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-teal-500 tracking-[0.2em] mb-1 italic">Registry Injection</p>
                    <h2 className="text-4xl font-serif font-bold text-white tracking-tight">New <span className="font-light italic text-slate-400">Clinical Entry</span></h2>
                  </div>
                </div>
                <button onClick={() => setShowAddPatientModal(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:rotate-90">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="overflow-y-auto p-10 md:p-14 grow custom-scrollbar space-y-12">

                {/* Section: Primary Metadata */}
                <div className="space-y-8">
                  <h3 className="text-xs uppercase font-black text-white tracking-widest italic flex items-center gap-3">
                    <span className="w-8 h-px bg-teal-500" /> Primary Identifiers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Full Legal Name</label>
                      <input name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white placeholder:text-slate-700 font-medium" placeholder="E.g. Dr. Julian Bashir" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Digital Mailbox</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white placeholder:text-slate-700 font-medium" placeholder="patient@prime-health.net" />
                    </div>
                  </div>
                </div>

                {/* Section: Biometric Data */}
                <div className="space-y-8">
                  <h3 className="text-xs uppercase font-black text-white tracking-widest italic flex items-center gap-3">
                    <span className="w-8 h-px bg-blue-500" /> Biometric Core
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Contact frequency (Vox)</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white placeholder:text-slate-700 font-medium" placeholder="+1 (555) 0123" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Birth Cycle</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Gender Index</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white font-medium appearance-none">
                        <option value="" className="bg-slate-900">Select Index</option>
                        <option value="Male" className="bg-slate-900">Male</option>
                        <option value="Female" className="bg-slate-900">Female</option>
                        <option value="Other" className="bg-slate-900">Other / Non-Binary</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Medical Metadata */}
                <div className="space-y-8">
                  <h3 className="text-xs uppercase font-black text-white tracking-widest italic flex items-center gap-3">
                    <span className="w-8 h-px bg-rose-500" /> Clinical Specifics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Hematology (Blood)</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white font-medium appearance-none">
                        <option value="" className="bg-slate-900">Select Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                          <option key={bg} value={bg} className="bg-slate-900">{bg}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 col-span-1 md:col-span-2">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Geographic Node (Address)</label>
                      <input name="address" value={formData.address} onChange={handleInputChange} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white placeholder:text-slate-700 font-medium" placeholder="Spatial coordinates or street address" />
                    </div>
                    <div className="space-y-2 col-span-full">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest pl-4">Long-term Diagnostic Logs (Medical History)</label>
                      <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange} rows={3} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-3xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/30 transition-all text-white placeholder:text-slate-700 font-medium resize-none" placeholder="Historical clinical anomalies, chronic conditions, or genetic predispositions..." />
                    </div>
                  </div>
                </div>

                {/* Execution Footer */}
                <div className="flex flex-col md:flex-row gap-6 pt-10 border-t border-white/5">
                  <button type="button" onClick={() => setShowAddPatientModal(false)} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex-1">
                    Abort Protocol
                  </button>
                  <button type="submit" disabled={formLoading} className="px-10 py-5 bg-teal-500 text-slate-950 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/20 flex-1 disabled:opacity-50">
                    {formLoading ? "Injecting Data..." : "Execute Entry"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPatients;