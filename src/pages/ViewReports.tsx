import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Download, Eye, ArrowLeft, FileText, Search, ChevronRight, Calendar, User, Activity, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const ViewReports = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedId = patientId.trim().toUpperCase();

    if (!formattedId) {
      toast.error("Please enter your Patient ID");
      return;
    }

    if (!/^PT\d+$/.test(formattedId)) {
      toast.error("Invalid format. Please use PT followed by numbers (e.g., PT00001)");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await apiCall(`/reports/patient/${formattedId}`);

      if (data.success) {
        setReports(data.reports);
        toast.success(`Found ${data.reports.length} report(s)`);
      } else {
        setReports([]);
        toast.error(data.message || "No reports found");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (imageUrl: string, fileName: string) => {
    setDownloading(true);
    try {
      const fullUrl = `${SERVER_BASE_URL}${imageUrl}`;
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.body.appendChild(document.createElement('a'));
      link.href = url;
      link.download = fileName;
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded!");
    } catch (error) {
      toast.error("Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Premium Hero Header */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center bg-slate-950 overflow-hidden text-center border-b border-white/5">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]" />

        <div className="relative z-10 container mx-auto px-6">
          <Reveal>
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.4em] uppercase">
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
                <ChevronRight size={10} className="text-teal-500" />
                <span className="text-slate-400">Medical Reports</span>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-6">
              Health <span className="font-light italic text-slate-400">Archives</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Secure access to your sensitive <span className="text-white font-medium italic">clinical data</span> and diagnostic documentation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Search Section */}
      <div className="container mx-auto px-6 -mt-24 relative z-20 max-w-6xl pb-32">
        <Reveal>
          <div className="glass-morphism p-10 md:p-16 rounded-[3.5rem] border-white/40 shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden mb-16">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Access Your <span className="font-light italic text-slate-400">Laboratory Results</span></h2>
              <p className="text-slate-500 font-light mb-10 italic">Please authenticate using your unique Patient Identification Index (PII).</p>

              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500">
                  <Search size={24} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Enter Patient ID (e.g. PT00001)"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full pl-16 pr-40 py-6 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500/30 transition-all shadow-xl font-medium text-slate-900 placeholder:text-slate-300 placeholder:font-light"
                />
                <button
                  type="submit"
                  disabled={loading || !patientId}
                  className="absolute right-3 top-3 bottom-3 px-10 bg-slate-950 text-white font-bold rounded-[1.5rem] hover:bg-teal-600 transition-all disabled:opacity-50 text-xs uppercase tracking-widest shadow-lg shadow-teal-900/10"
                >
                  {loading ? "Searching..." : "Access Data"}
                </button>
              </form>
              <p className="text-[10px] text-slate-400 mt-6 uppercase font-black tracking-[0.2em]">End-to-end Encrypted Infrastructure</p>
            </div>
          </div>
        </Reveal>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <ClipboardList size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 leading-none">Diagnostic Records</h3>
                    <p className="text-slate-500 text-sm italic font-light mt-1">Found {reports.length} verified documents</p>
                  </div>
                </div>
              </div>

              {reports.length === 0 ? (
                <div className="text-center py-32 glass-morphism rounded-[3rem] border-dashed border-2 border-slate-200">
                  <Activity size={64} className="mx-auto text-slate-300 mb-6 animate-pulse" />
                  <h4 className="text-xl font-bold text-slate-400 italic">No corresponding data found.</h4>
                  <p className="text-slate-400 font-light mt-2">Verify your Patient ID and attempt authentication again.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {reports.map((report: any, idx) => (
                    <Reveal key={report._id} delay={idx * 0.1}>
                      <TiltCard>
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[5rem] group-hover:bg-teal-500/10 transition-colors" />

                          <div className="flex justify-between items-start mb-8">
                            <div className="space-y-2">
                              <span className="px-5 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10">
                                {report.reportType}
                              </span>
                              <h4 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-teal-600 transition-colors tracking-tight">
                                {report.description || "General Report"}
                              </h4>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 leading-none">IDRef</p>
                              <p className="text-xs font-mono font-medium text-slate-900">{report._id.slice(-8).toUpperCase()}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-8 mb-10 py-8 border-y border-slate-50 relative overflow-hidden">
                            <div className="space-y-1">
                              <p className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 tracking-tighter italic"><Calendar size={12} className="text-teal-500" /> Exam Date</p>
                              <p className="text-sm font-bold text-slate-900">{new Date(report.reportDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 tracking-tighter italic"><Activity size={12} className="text-blue-500" /> Dept</p>
                              <p className="text-sm font-bold text-slate-900">{report.department}</p>
                            </div>
                            <div className="space-y-1 lg:col-span-2">
                              <p className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 tracking-tighter italic"><User size={12} className="text-purple-500" /> Surgeon / Specialist</p>
                              <p className="text-sm font-bold text-slate-900">{report.doctorName}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 relative z-10">
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 text-slate-900 rounded-2xl hover:bg-white border border-slate-100 font-bold text-xs uppercase tracking-widest transition-all hover:shadow-xl"
                            >
                              <Eye size={16} strokeWidth={2.5} />
                              Inspector
                            </button>
                            <button
                              onClick={() => downloadReport(report.reportImageUrl, `Report-${report.reportType}.jpg`)}
                              disabled={downloading}
                              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-teal-500 text-white rounded-2xl hover:bg-teal-600 font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-teal-900/10 disabled:opacity-50"
                            >
                              <Download size={16} strokeWidth={2.5} />
                              Archive
                            </button>
                          </div>
                        </div>
                      </TiltCard>
                    </Reveal>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Modal */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6 z-[100]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-[4rem] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.5)] relative flex flex-col"
              >
                <div className="p-10 md:p-14 border-b border-slate-50 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-teal-500 flex items-center justify-center text-white shadow-2xl shadow-teal-500/30">
                      <Activity size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Diagnostic Intelligence</p>
                      <h2 className="text-3xl font-serif font-bold text-slate-900">{selectedReport.reportType}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="h-12 w-12 rounded-full h-12 w-12 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-all"
                  >
                    <ArrowLeft size={24} />
                  </button>
                </div>

                <div className="overflow-y-auto p-10 md:p-14 grow custom-scrollbar">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-10">
                      <div className="glass-card p-10 border-slate-100 rounded-[2.5rem]">
                        <p className="text-xs font-black uppercase text-teal-600 tracking-widest mb-6 italic">Clinical Metadata</p>
                        <div className="grid grid-cols-2 gap-y-10">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 leading-none">Subject</p>
                            <p className="text-lg font-bold text-slate-900">{selectedReport.patientName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 leading-none">Dept</p>
                            <p className="text-lg font-bold text-slate-900">{selectedReport.department}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 leading-none">Lead Clinician</p>
                            <p className="text-lg font-bold text-slate-900">{selectedReport.doctorName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 leading-none">Authorized Date</p>
                            <p className="text-lg font-bold text-slate-900">{new Date(selectedReport.reportDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {selectedReport.description && (
                        <div className="glass-card p-10 border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                          <p className="text-xs font-black uppercase text-slate-950 tracking-widest mb-4 italic">Surgeon's Memo</p>
                          <p className="text-slate-600 font-light leading-relaxed italic">
                            "{selectedReport.description}"
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => downloadReport(selectedReport.reportImageUrl, `Report-${selectedReport.reportType}.jpg`)}
                        disabled={downloading}
                        className="w-full flex items-center justify-center gap-4 py-8 bg-slate-950 text-white rounded-[2rem] font-bold text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-2xl shadow-teal-900/10"
                      >
                        <Download size={20} strokeWidth={2.5} />
                        Download Authorized Copy
                      </button>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-4 bg-teal-500/5 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={`${SERVER_BASE_URL}${selectedReport.reportImageUrl}`}
                        alt={selectedReport.reportType}
                        className="w-full h-full object-cover rounded-[3rem] border-8 border-white shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://i.imgur.com/vHqB37p.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewReports;