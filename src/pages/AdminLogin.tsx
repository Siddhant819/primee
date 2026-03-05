import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { API_BASE_URL, apiCall } from "@/api/config";

const FloatingInput = ({ label, name, value, onChange, type = "text", required = false, icon: Icon }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 transition-colors ${isFocused ? 'text-teal-500' : 'text-slate-400'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <motion.div
        animate={isFocused || value ? { y: -28, x: 0, scale: 0.85, color: "#14b8a6" } : { y: 0, x: 40, scale: 1, color: "#64748b" }}
        className="absolute left-0 top-4 pointer-events-none transition-all origin-left font-medium"
      >
        {label} {required && "*"}
      </motion.div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-4 pt-6 pb-2 bg-transparent border-b-2 border-slate-200 focus:border-teal-500 outline-none transition-all"
      />
      <motion.div
        initial={false}
        animate={isFocused ? { scaleX: 1 } : { scaleX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 origin-left"
      />
    </div>
  );
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@primehospital.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.success) {
        if (data.user.role !== "admin") {
          toast.error("Only admins can access this panel");
          return;
        }

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <Reveal>
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Back to Website</span>
        </Link>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="w-full max-w-[450px] relative">
          <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full opacity-20" />

          <div className="glass-morphism p-10 md:p-14 rounded-[3rem] border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full" />

            <div className="flex justify-center mb-10">
              <div className="w-20 h-20 rounded-3xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                <ShieldCheck size={40} strokeWidth={1.5} />
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">Admin <span className="font-light italic text-slate-400">Portal</span></h1>
              <p className="text-slate-500 text-sm font-light uppercase tracking-widest">Secure Infrastructure Access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-10">
              <FloatingInput
                label="Administrator Email"
                name="email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                icon={Mail}
              />

              <div className="relative">
                <FloatingInput
                  label="Security Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  required
                  icon={Lock}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2.5 p-2 text-slate-500 hover:text-teal-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl hover:bg-teal-400 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl uppercase tracking-[0.2em] text-xs"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  "Initiate Access"
                )}
              </motion.button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                System Core: Stable
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-slate-600 mt-10 text-[10px] uppercase font-black tracking-[0.4em] opacity-50">
          Prime Hospital • Managed Environment
        </p>
      </Reveal>
    </div>
  );
};

export default AdminLogin;