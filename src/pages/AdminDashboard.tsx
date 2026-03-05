import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Users, Calendar, MessageSquare, FileText, Activity, ShieldCircle, Bell, Settings, ChevronRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Reveal } from "@/components/animations/Reveal";
import { API_BASE_URL, apiCall } from "@/api/config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ patients: 0, appointments: 0, messages: 0, reports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [patientsData, appointmentsData, messagesData, reportsData] = await Promise.all([
        apiCall("/patients"),
        apiCall("/appointments"),
        apiCall("/messages"),
        apiCall("/reports"),
      ]);

      setStats({
        patients: patientsData.patients?.length || 0,
        appointments: appointmentsData.appointments?.length || 0,
        messages: messagesData.messages?.length || 0,
        reports: reportsData.reports?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dashboardItems = [
    {
      title: "Active Patients",
      count: stats.patients,
      icon: Users,
      color: "bg-teal-500",
      accent: "text-teal-500",
      bg: "bg-teal-500/10",
      path: "/admin/patients",
      desc: "Clinical profiles"
    },
    {
      title: "Scheduled Service",
      count: stats.appointments,
      icon: Calendar,
      color: "bg-blue-500",
      accent: "text-blue-500",
      bg: "bg-blue-500/10",
      path: "/admin/appointments",
      desc: "Patient sessions"
    },
    {
      title: "Inbox Inquiries",
      count: stats.messages,
      icon: MessageSquare,
      color: "bg-purple-500",
      accent: "text-purple-500",
      bg: "bg-purple-500/10",
      path: "/admin/messages",
      desc: "Digital inquiries"
    },
    {
      title: "Medical Archives",
      count: stats.reports,
      icon: FileText,
      color: "bg-amber-500",
      accent: "text-amber-500",
      bg: "bg-amber-500/10",
      path: "/admin/reports",
      desc: "Laboratory data"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Modern Sidebar / Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white/5 backdrop-blur-3xl border-r border-white/10 z-50 flex flex-col items-center py-10 gap-10 hidden md:flex">
        <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl shadow-teal-500/20">
          <ShieldCircle size={28} />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="p-3 text-teal-400 bg-teal-500/10 rounded-xl cursor-not-allowed"><Activity size={20} /></div>
          <div className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer"><Users size={20} /></div>
          <div className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer"><Calendar size={20} /></div>
          <div className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer"><Settings size={20} /></div>
        </div>
        <button onClick={handleLogout} className="mt-auto p-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
          <LogOut size={20} />
        </button>
      </nav>

      {/* Main Container */}
      <main className="md:pl-24">
        {/* Header */}
        <header className="px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5">
          <Reveal>
            <div>
              <p className="text-[10px] uppercase font-black text-teal-500 tracking-[0.4em] mb-2">Internal Infrastructure</p>
              <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Admin <span className="font-light italic text-slate-400">Command Center</span></h1>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-teal-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="relative bg-white/5 p-3 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-slate-950" />
                </button>
              </div>
              <div className="flex items-center gap-3 bg-white/5 pl-2 pr-5 py-2 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-xl">AD</div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Senior Admin</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Prime Ops</p>
                </div>
              </div>
              <button onClick={handleLogout} className="md:hidden p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <LogOut size={20} />
              </button>
            </div>
          </Reveal>
        </header>

        {/* Console Content */}
        <div className="p-8 md:p-12 space-y-12">

          {/* Welcome Banner */}
          <Reveal>
            <div className="glass-morphism p-10 md:p-14 rounded-[3.5rem] border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent">
              <div className="absolute right-0 top-0 w-1/3 h-full bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold leading-none tracking-tight">System Status: <br /><span className="text-teal-400 italic font-light">Operational</span></h2>
                  <p className="text-slate-400 font-light text-lg">Infrastructure health is at <span className="text-white font-bold">99.9%</span>. All clinical modules are currently synchronized with the biometric core.</p>
                  <div className="flex gap-4">
                    <button onClick={() => navigate("/admin/patients")} className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/10">Synchronize Data</button>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">View Logs</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
                      <TrendingUp size={24} className="text-teal-500/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <Reveal>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Core Repository</h3>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.4em] italic">Real-time modular intelligence</p>
                </div>
              </Reveal>
              <button className="text-[10px] uppercase font-black text-teal-500 tracking-widest hover:text-teal-400 transition-colors">Global Analytics <ChevronRight size={10} className="inline ml-1" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dashboardItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(item.path)}
                    className="glass-morphism p-8 rounded-[2.5rem] border-white/5 shadow-xl hover:shadow-2xl hover:border-white/10 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`} />

                    <div className={`${item.bg} ${item.accent} w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-black/20`}>
                      <item.icon size={28} />
                    </div>
                    <div className="space-y-1 mb-8">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest italic">{item.desc}</p>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-5xl font-serif font-bold text-white tracking-tighter">{item.count}</span>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-slate-400 group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Performance Visualization Placeholder */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
              <div className="lg:col-span-2 glass-morphism p-10 rounded-[3rem] border-white/5 h-[400px] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white flex items-center gap-3"><Activity className="text-teal-500" /> Interaction Velocity</h3>
                  <div className="flex gap-2">
                    <span className="w-12 h-1 bg-teal-500 rounded-full" />
                    <span className="w-8 h-1 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="flex items-end gap-2 h-40">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.random() * 100}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-teal-500/40 to-blue-500/10 rounded-t-lg"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] uppercase font-black text-slate-600 tracking-widest">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <div className="glass-morphism p-10 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full border-8 border-teal-500/20 border-t-teal-500 animate-spin-slow flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-2xl font-serif font-bold text-white tracking-tighter">84%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white">Resource Allocation</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">Strategic optimization of available medical staff and infrastructure.</p>
                </div>
                <button className="w-full py-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-500 hover:text-slate-950 transition-all">Adjust Strategy</button>
              </div>
            </div>
          </Reveal>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;