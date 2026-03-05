import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { MoveLeft, Activity, ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden font-sans">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-xl w-full text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-12 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
            <ShieldAlert size={16} className="text-rose-500" />
            <p className="text-white text-[10px] font-black tracking-[0.4em] uppercase">Diagnostic Error: 404</p>
          </div>
        </Reveal>

        <div className="relative mb-16">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center -z-10"
          >
            <div className="w-[300px] h-[300px] bg-teal-500/20 blur-[100px] rounded-full" />
          </motion.div>

          <Reveal delay={0.2}>
            <h1 className="text-[12rem] font-serif font-bold text-white leading-none tracking-tighter opacity-10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity size={80} className="text-teal-400 animate-pulse" strokeWidth={1} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white italic tracking-tighter">
              Out of <span className="font-light text-slate-400">Clinical Focus</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm mx-auto">
              The requested neural path <span className="text-white font-mono text-sm bg-white/5 px-2 py-0.5 rounded italic">"{location.pathname}"</span> does not exist in our institutional index.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Core
                </span>
              </motion.button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="text-slate-600 mt-20 text-[9px] uppercase font-black tracking-[0.5em] opacity-30">
            Institutional Index Recovery System
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default NotFound;
