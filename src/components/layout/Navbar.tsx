import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "My Reports", path: "/view-reports" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Semi-transparent dark overlay for top visibility */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/60 to-transparent z-[95] pointer-events-none" />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-4 md:px-8 mt-4 md:mt-6`}
      >
        <div
          className={`container mx-auto max-w-7xl transition-all duration-700 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group
            ${scrolled
              ? "py-3 bg-slate-950/40 backdrop-blur-2xl px-6 md:px-10"
              : "py-5 bg-white/5 backdrop-blur-xl px-4 md:px-8"}
          `}
        >
          {/* Glass Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />

          {/* Bottom Border Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

          <div className="flex justify-between items-center relative z-10">
            {/* --- LOGO SECTION --- */}
            <Link to="/" className="flex items-center gap-4 group/logo">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                <img
                  src="/logo.jpg"
                  alt="Prime Hospital Logo"
                  className="h-10 md:h-12 w-auto object-contain relative z-10 rounded-xl"
                />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl md:text-2xl tracking-tighter text-white">
                  <span className="font-light text-slate-300">PRIME</span> <span className="font-black">HOSPITAL</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.5em] text-cyan-400 mt-1 uppercase italic">Infrastructure Group</span>
              </div>
            </Link>

            {/* --- DESKTOP NAV --- */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group
                    ${isActive
                      ? "text-cyan-400 bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                      : "text-slate-400 hover:text-white"}`
                  }
                >
                  {({ isActive }) => (
                    <span className="relative z-10 flex flex-col items-center">
                      <span className="group-hover:scale-110 transition-transform duration-500">{link.name}</span>
                      {/* Hover / Active Indicator */}
                      <motion.span
                        initial={false}
                        animate={{
                          width: isActive ? "20px" : "0px",
                          opacity: isActive ? 1 : 0
                        }}
                        className="h-0.5 bg-cyan-500 mt-1 rounded-full absolute -bottom-2 group-hover:w-full transition-all duration-500"
                      />
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* --- ACTION AREA --- */}
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:021517777"
                className="hidden xl:flex items-center gap-3 bg-cyan-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-white transition-all"
              >
                <Phone size={14} />
                Emergency
              </motion.a>

              {/* --- MOBILE BUTTON --- */}
              <button
                className={`p-3 rounded-2xl transition-all duration-500 border border-white/10
                  ${isOpen ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-white hover:bg-white/10"} lg:hidden`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU DRAWER --- */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[80] md:hidden"
              />

              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-screen w-full max-w-[400px] z-[90] md:hidden bg-slate-950/80 backdrop-blur-3xl border-l border-white/10 p-12 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-16">
                  <div className="flex items-center gap-2 text-cyan-500 font-black italic tracking-widest uppercase text-xs">
                    <ShieldCheck size={18} />
                    Index
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between p-6 rounded-3xl transition-all duration-500 border border-transparent
                          ${isActive ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "text-slate-400 hover:bg-white/5"}`
                        }
                      >
                        <span className="text-3xl font-serif font-bold italic tracking-tighter">
                          {link.name}
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="p-3 bg-white/5 rounded-2xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Phone size={18} />
                        </motion.div>
                      </NavLink>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-6"
                  >
                    <p className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase italic">Emergency Intelligence</p>
                    <div className="space-y-4">
                      <a href="tel:021517777" className="flex items-center justify-between group">
                        <span className="text-xl font-serif font-bold text-white tracking-tighter">021-517777</span>
                        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all text-slate-400">
                          <Phone size={16} />
                        </div>
                      </a>
                      <div className="h-px bg-white/5 w-full" />
                      <p className="text-xs text-slate-500 font-serif italic">Operational index: 24h per biometric cycle.</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;