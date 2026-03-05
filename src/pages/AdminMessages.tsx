import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mail, CheckCircle2, User, MessageSquare, Trash2, ChevronRight, Inbox, Clock, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const AdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState<"unread" | "replied">("unread");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await apiCall("/messages");
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = async (message: any) => {
    try {
      const data = await apiCall(`/messages/${message._id}`);
      if (data.success) {
        setSelectedMessage(data.message);
      }
    } catch (error) {
      toast.error("Failed to load message");
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      const data = await apiCall(`/messages/${selectedMessage._id}/reply`, {
        method: "PUT",
        body: JSON.stringify({ repliedMessage: replyText }),
      });
      if (data.success) {
        toast.success("Reply sent successfully!");
        setReplyText("");
        fetchMessages();
        setSelectedMessage(null);
        setActiveTab("replied");
      }
    } catch (error) {
      toast.error("Failed to send reply");
      console.error(error);
    }
  };

  const unreadMessages = messages.filter(
    (msg: any) => msg.status === "new" || msg.status === "read"
  );
  const repliedMessages = messages.filter((msg: any) => msg.status === "replied");

  const displayedMessages = activeTab === "unread" ? unreadMessages : repliedMessages;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full" />
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
                <p className="text-[10px] uppercase font-black text-indigo-500 tracking-[0.5em] mb-2 font-mono">Communication Grid</p>
                <h1 className="text-4xl font-serif font-bold text-white tracking-tighter">Nexus <span className="font-light italic text-slate-400">Response</span></h1>
              </div>
            </Reveal>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 shadow-lg relative h-fit">
            <button
              onClick={() => setActiveTab("unread")}
              className={`relative z-10 px-8 py-3.5 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all duration-500 flex items-center gap-3 ${activeTab === "unread" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
            >
              <Inbox size={16} />
              Incoming ({unreadMessages.length})
              {activeTab === "unread" && (
                <motion.div layoutId="tab-bg-msg" className="absolute inset-0 bg-blue-500 rounded-[1.5rem] -z-10 shadow-2xl shadow-blue-500/40" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("replied")}
              className={`relative z-10 px-8 py-3.5 rounded-[1.5rem] text-[10px] uppercase font-black tracking-widest transition-all duration-500 flex items-center gap-3 ${activeTab === "replied" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
            >
              <CheckCircle2 size={16} />
              Resolved ({repliedMessages.length})
              {activeTab === "replied" && (
                <motion.div layoutId="tab-bg-msg" className="absolute inset-0 bg-green-500 rounded-[1.5rem] -z-10 shadow-2xl shadow-green-500/40" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Area */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Messages Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-morphism rounded-[3rem] border border-white/5 overflow-hidden bg-white/[0.01]">
              <div className={`px-10 py-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-between border-b border-white/5 ${activeTab === "unread" ? 'text-blue-400' : 'text-green-400'
                }`}>
                <span>{activeTab === "unread" ? "Data Ingress" : "History Log"}</span>
                <Zap size={14} className="animate-pulse" />
              </div>

              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <div className="p-20 text-center"><div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto" /></div>
                  ) : displayedMessages.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center space-y-4">
                      <Inbox size={40} className="mx-auto text-slate-800 opacity-20" />
                      <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest italic">Signal Void</p>
                    </motion.div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {displayedMessages.map((msg: any, idx) => (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={msg._id}
                          onClick={() => handleSelectMessage(msg)}
                          className={`w-full text-left px-10 py-8 transition-all hover:bg-white/[0.03] group relative flex flex-col gap-2 ${selectedMessage?._id === msg._id ? 'bg-white/[0.05] ring-inset ring-1 ring-white/10' : ''
                            }`}
                        >
                          {selectedMessage?._id === msg._id && (
                            <motion.div layoutId="active-indicator" className={`absolute left-0 top-0 bottom-0 w-1 ${activeTab === "unread" ? 'bg-blue-500' : 'bg-green-500'
                              }`} />
                          )}
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase text-sm tracking-tight">{msg.name}</p>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${msg.status === 'new' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                              msg.status === 'replied' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                                'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                              }`}>{msg.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium truncate italic leading-relaxed">{msg.subject}</p>
                          <p className="text-[9px] text-slate-600 font-mono tracking-tighter mt-1">{new Date(msg.createdAt || Date.now()).toLocaleDateString()}</p>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Message Viewer Pane */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  key={selectedMessage._id}
                  className="glass-morphism rounded-[3.5rem] border border-white/5 bg-white/[0.01] overflow-hidden flex flex-col h-full shadow-2xl"
                >
                  <div className="p-12 border-b border-white/5 space-y-6">
                    <div className="flex justify-between items-start">
                      <Reveal>
                        <h3 className="text-3xl font-serif font-bold text-white tracking-tight italic">{selectedMessage.subject}</h3>
                      </Reveal>
                      <button onClick={() => setSelectedMessage(null)} className="p-4 bg-white/5 text-slate-500 rounded-2xl hover:text-white transition-all"><Trash2 size={20} /></button>
                    </div>

                    <div className="flex flex-wrap gap-8 items-center pt-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shadow-lg"><User size={20} /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest mb-0.5 italic">Origin Entity</p>
                          <p className="text-sm font-bold text-slate-300">{selectedMessage.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shadow-lg"><Mail size={20} /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest mb-0.5 italic">Digital Terminal</p>
                          <p className="text-sm font-medium text-slate-400">{selectedMessage.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-12 flex-1 space-y-12">
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest italic flex items-center gap-4">
                        <span className="w-12 h-px bg-slate-800" /> Ingress Stream
                      </p>
                      <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] relative group">
                        <p className="text-slate-200 text-lg leading-[1.8] italic font-light whitespace-pre-wrap">{selectedMessage.message}</p>
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-slate-700 opacity-20 group-hover:opacity-100 transition-opacity"><MessageSquare size={16} /></div>
                      </div>
                    </div>

                    {selectedMessage.repliedMessage && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <p className="text-[10px] uppercase font-black text-green-500 tracking-widest italic flex items-center gap-4 justify-end">
                          Resolved Protocol <span className="w-12 h-px bg-green-900" />
                        </p>
                        <div className="bg-green-500/5 border border-green-500/20 p-10 rounded-[2.5rem] shadow-2xl shadow-green-500/5 ml-12">
                          <p className="text-green-100/80 text-lg italic leading-[1.8] whitespace-pre-wrap font-medium">{selectedMessage.repliedMessage}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {selectedMessage.status !== "replied" && (
                    <div className="p-12 bg-white/[0.02] border-t border-white/5 space-y-8">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest pl-4 italic">Response Injection</label>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-[2rem] p-8 text-white text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all placeholder:text-slate-800 resize-none font-light italic"
                          placeholder="Compose clinical response protocol..."
                          rows={4}
                        />
                      </div>
                      <button
                        onClick={sendReply}
                        className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-slate-950 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                      >
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Execute Transmission
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="glass-morphism h-[80vh] rounded-[3.5rem] border border-white/5 border-dashed bg-white/[0.01] flex flex-col items-center justify-center text-center p-20"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-10 text-slate-800 opacity-20 border border-white/10 animate-pulse">
                    <Inbox size={48} />
                  </div>
                  <h4 className="text-3xl font-serif font-bold text-slate-400 mb-4 italic">Subspace <span className="font-light text-slate-600">Idle</span></h4>
                  <p className="text-slate-600 font-light max-w-sm italic text-sm">Select a communication node from the ingress feed to initialize response protocols.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMessages;