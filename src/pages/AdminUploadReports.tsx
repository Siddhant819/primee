import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, Trash2, Plus, X, Search, FileText, Database, User, Calendar, Activity, ChevronRight, AlertCircle, CheckCircle2, CloudUpload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const AdminUploadReports = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [createNewPatient, setCreateNewPatient] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDateOfBirth: "",
    patientGender: "",
    reportType: "X-Ray",
    department: "",
    reportDate: new Date().toISOString().split('T')[0],
    description: "",
    doctorName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchPatients();
    fetchReports();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await apiCall("/patients");
      if (data.success) {
        setPatients(data.patients || []);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
    }
  };

  const fetchReports = async () => {
    try {
      const data = await apiCall("/reports");
      if (data.success) {
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
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

  const handlePatientSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      patientName: value,
    }));

    if (value.trim().length > 0) {
      const filtered = patients.filter((p: any) =>
        p.patientId.toLowerCase().includes(value.toLowerCase()) ||
        p.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPatients(filtered);
      setShowPatientDropdown(true);
    } else {
      setShowPatientDropdown(false);
    }
  };

  const handleSelectPatient = (patient: any) => {
    setFormData((prev) => ({
      ...prev,
      patientId: patient._id,
      patientName: patient.fullName,
    }));
    setShowPatientDropdown(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files.filter(file => {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          toast.error(`${file.name}: Invalid file type`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name}: File too large (max 5MB)`);
          return false;
        }
        return true;
      });

      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      if (validFiles.length > 0) {
        toast.success(`${validFiles.length} file(s) added to upload queue`);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      toast.error("Please select at least one report image");
      return;
    }

    if (createNewPatient) {
      if (!formData.patientName || !formData.patientEmail || !formData.patientPhone ||
        !formData.patientDateOfBirth || !formData.patientGender) {
        toast.error("Please fill all patient details");
        return;
      }
    } else {
      if (!formData.patientId.trim()) {
        toast.error("Please select a patient");
        return;
      }
    }

    setReportLoading(true);

    try {
      const formDataToSend = new FormData();
      selectedFiles.forEach(file => {
        formDataToSend.append('reportImages', file);
      });

      if (createNewPatient) {
        formDataToSend.append("patientName", formData.patientName);
        formDataToSend.append("patientEmail", formData.patientEmail);
        formDataToSend.append("patientPhone", formData.patientPhone);
        formDataToSend.append("patientDateOfBirth", formData.patientDateOfBirth);
        formDataToSend.append("patientGender", formData.patientGender);
        formDataToSend.append("createNewPatient", "true");
      } else {
        formDataToSend.append("patientId", formData.patientId);
        formDataToSend.append("createNewPatient", "false");
      }

      formDataToSend.append("reportType", formData.reportType);
      formDataToSend.append("department", formData.department || "General");
      formDataToSend.append("reportDate", formData.reportDate);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("doctorName", formData.doctorName || "Not Specified");

      const data = await apiCall("/reports/upload", {
        method: "POST",
        body: formDataToSend,
        headers: {} // Multi-part handled by browser
      });

      if (data.success) {
        toast.success(`Diagnostic sequence synchronized successfully!`);
        setSelectedFiles([]);
        setFormData({
          patientId: "",
          patientName: "",
          patientEmail: "",
          patientPhone: "",
          patientDateOfBirth: "",
          patientGender: "",
          reportType: "X-Ray",
          department: "",
          reportDate: new Date().toISOString().split('T')[0],
          description: "",
          doctorName: "",
        });
        setCreateNewPatient(false);
        fetchReports();
        fetchPatients();
      } else {
        toast.error(data.message || "Failed to synchronize diagnostics");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during synchronization.");
    } finally {
      setReportLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to purge this record?")) return;

    try {
      const data = await apiCall(`/reports/${id}`, {
        method: "DELETE",
      });
      if (data.success) {
        fetchReports();
        toast.success("Record purged from clinical index");
      }
    } catch (error) {
      toast.error("Failed to purge record");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 py-8 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/20"
            >
              <ArrowLeft size={24} />
            </button>
            <Reveal>
              <div>
                <p className="text-[10px] uppercase font-black text-cyan-500 tracking-[0.5em] mb-2 font-mono italic">Diagnostic Engineering</p>
                <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic">Clinical <span className="font-light text-slate-400">Synchronizer</span></h1>
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
            <Database size={16} className="text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Clinical Index: <span className="text-white">{reports.length} Nodes</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">

          {/* Synchronizer Form */}
          <div className="xl:col-span-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              <section className="space-y-12">
                <div className="glass-morphism p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] shadow-2xl">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-serif font-bold italic text-white tracking-tight">Node <span className="font-light text-slate-400">Assignment</span></h2>
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                      <button
                        onClick={() => setCreateNewPatient(false)}
                        className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!createNewPatient ? 'bg-cyan-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                      >Existing</button>
                      <button
                        onClick={() => setCreateNewPatient(true)}
                        className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${createNewPatient ? 'bg-cyan-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                      >New Entity</button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {!createNewPatient ? (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Entity Search</label>
                        <div className="relative group">
                          <input
                            type="text"
                            placeholder="Search clinical index by Name/ID..."
                            value={formData.patientName}
                            onChange={handlePatientSearch}
                            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-sm focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-light italic"
                            autoComplete="off"
                          />
                          <Search size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-cyan-500 transition-colors" />

                          <AnimatePresence>
                            {showPatientDropdown && filteredPatients.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="absolute top-full left-0 right-0 mt-4 glass-morphism border border-white/10 rounded-[2.5rem] overflow-hidden z-50 bg-slate-900/90 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                              >
                                {filteredPatients.map((p: any) => (
                                  <button
                                    key={p._id}
                                    type="button"
                                    onMouseDown={(e) => { e.preventDefault(); handleSelectPatient(p); }}
                                    className="w-full text-left px-10 py-6 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
                                  >
                                    <p className="font-mono text-cyan-400 font-bold text-xs tracking-widest mb-1">{p.patientId}</p>
                                    <p className="text-white font-serif italic text-lg">{p.fullName}</p>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {formData.patientId && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 pl-4 text-cyan-400">
                            <CheckCircle2 size={12} />
                            <span className="text-[10px] uppercase font-black tracking-widest italic">Connection Optimized: {formData.patientName}</span>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Full Name</label>
                            <input name="patientName" value={formData.patientName} onChange={handleInputChange} className="synchronizer-input" placeholder="Entity Designation" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Email Channel</label>
                            <input name="patientEmail" value={formData.patientEmail} onChange={handleInputChange} className="synchronizer-input" placeholder="nexus@domain.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Vox Connect</label>
                            <input name="patientPhone" value={formData.patientPhone} onChange={handleInputChange} className="synchronizer-input" placeholder="+1 000..." />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Chrono Index (DOB)</label>
                            <input type="date" name="patientDateOfBirth" value={formData.patientDateOfBirth} onChange={handleInputChange} className="synchronizer-input" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Bio-Type</label>
                            <select name="patientGender" value={formData.patientGender} onChange={handleInputChange} className="synchronizer-input appearance-none">
                              <option value="">Matrix Select</option>
                              <option value="Male">XY</option>
                              <option value="Female">XX</option>
                              <option value="Other">Non-Binary</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-8 border-t border-white/5 space-y-8">
                      <h3 className="text-xl font-serif font-bold italic text-white tracking-tight">Clinical <span className="font-light text-slate-400">Specifications</span></h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 text-white">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Modality Type</label>
                          <select name="reportType" value={formData.reportType} onChange={handleInputChange} className="synchronizer-input appearance-none bg-slate-900 border-white/10 text-white">
                            <option value="X-Ray">Radiographic X-Ray</option>
                            <option value="CT Scan">Computed Tomography</option>
                            <option value="Ultrasound">Sonography</option>
                            <option value="Blood Test">Hematology Index</option>
                            <option value="MRI">Magnetic Resonance</option>
                            <option value="ECG">Electrocardiogram</option>
                            <option value="Other">Unspecified Protocol</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Department Cell</label>
                          <input name="department" value={formData.department} onChange={handleInputChange} className="synchronizer-input" placeholder="e.g. Neurology Delta" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Authorized Physician</label>
                        <input name="doctorName" value={formData.doctorName} onChange={handleInputChange} className="synchronizer-input" placeholder="Dr. Designation" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-4 italic">Clinical Narrative</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="synchronizer-input min-h-[120px] resize-none" placeholder="Diagnostic overview and procedural notes..." />
                      </div>
                    </div>
                  </form>
                </div>
              </section>

              <section className="space-y-12">
                {/* File Queue Section */}
                <div className="glass-morphism p-12 rounded-[3.5rem] border border-cyan-500/20 bg-cyan-500/[0.02] shadow-2xl flex flex-col h-fit">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-serif font-bold italic text-white tracking-tight">Diagnostic <span className="font-light text-slate-400">Ingress</span></h2>
                    <button className="p-3 bg-white/5 rounded-2xl text-cyan-400 border border-white/5 hover:bg-cyan-500 hover:text-slate-950 transition-all active:scale-95"><Activity size={18} /></button>
                  </div>

                  <div className="space-y-8">
                    <div className="relative group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      />
                      <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CloudUpload size={48} className="mx-auto text-slate-700 mb-6 group-hover:text-cyan-400 transition-colors animate-bounce" />
                        <p className="text-lg font-serif italic text-slate-300 mb-2">Initialize Image Transfer</p>
                        <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest">Supports high-res DICOM/JPEG/PNG</p>
                      </div>
                    </div>

                    {/* Selection Queue */}
                    <AnimatePresence>
                      {selectedFiles.length > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-4">
                          <div className="flex justify-between items-center px-4">
                            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest italic leading-loose">Transfer Queue: {selectedFiles.length} Blobs</h4>
                            <button onClick={() => setSelectedFiles([])} className="text-[9px] uppercase font-black text-red-500 hover:text-red-400 transition-colors">Abort All</button>
                          </div>
                          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-4">
                            {selectedFiles.map((file, idx) => (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group/item hover:bg-white/10 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center"><FileText size={18} /></div>
                                  <div>
                                    <p className="text-sm font-bold text-white truncate max-w-[150px]">{file.name}</p>
                                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button onClick={() => removeFile(idx)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><X size={16} /></button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={handleSubmit}
                      disabled={reportLoading}
                      className="w-full py-6 bg-cyan-500 text-slate-950 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all flex items-center justify-center gap-4 group"
                    >
                      {reportLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                          <span>Synchronizing Stream...</span>
                        </div>
                      ) : (
                        <>
                          <Zap size={20} className="group-hover:rotate-12 transition-transform" />
                          Execute Diagnostic Push
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* History Feed */}
                <div className="space-y-8">
                  <h3 className="text-xl font-serif font-bold italic text-white tracking-tight flex items-center gap-4 px-4">
                    <Clock size={20} className="text-slate-700" />
                    Recent <span className="font-light text-slate-500">Injections</span>
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                    {reports.length === 0 ? (
                      <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">No clinical history detected</p>
                      </div>
                    ) : (
                      reports.map((report: any, idx) => (
                        <Reveal key={report._id} delay={idx * 0.05}>
                          <div className="glass-morphism p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all flex justify-between items-center group bg-white/[0.01]">
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-white/5 text-slate-400 rounded-2xl flex items-center justify-center border border-white/5 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all italic font-serif font-black">{report.reportType.charAt(0)}</div>
                              <div>
                                <div className="flex items-center gap-3">
                                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{report.reportType}</p>
                                  <span className="w-1 h-1 bg-slate-800 rounded-full" />
                                  <p className="text-[9px] font-mono text-cyan-600 font-bold uppercase tracking-widest">{report.patientId?.patientId}</p>
                                </div>
                                <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest italic mt-1">{report.patientName}</p>
                              </div>
                            </div>
                            <button onClick={() => deleteReport(report._id)} className="p-3 bg-white/5 rounded-xl text-slate-600 hover:text-red-500 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                          </div>
                        </Reveal>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <style>{`
         .synchronizer-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 1.5rem;
            padding: 1rem 1.5rem;
            color: white;
            font-size: 0.875rem;
            transition: all 0.3s;
            font-weight: 300;
            font-style: italic;
         }
         .synchronizer-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(6, 182, 212, 0.3);
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.05);
         }
         .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(6, 182, 212, 0.2);
         }
      `}</style>
    </div>
  );
};

export default AdminUploadReports;