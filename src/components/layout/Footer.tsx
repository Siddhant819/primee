import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-white pt-32 pb-12 overflow-hidden">
      {/* Animated Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <span className="font-serif text-3xl tracking-tight">
                <span className="font-light text-slate-400 group-hover:text-teal-400 transition-colors">Prime</span> <span className="font-bold text-white">Hospital</span>
              </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed font-light max-w-xs">
              Redefining healthcare in Biratnagar through world-class clinical excellence and a compassionate, patient-first approach.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -5, color: "#38bdf8" }}
                href="https://facebook.com/primehospitalbrt"
                target="_blank"
                className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.div
                whileHover={{ y: -5, color: "#ef4444" }}
                className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Heart size={20} />
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-500 mb-10">Navigation</h4>
            <ul className="space-y-5">
              {["About", "Departments", "Doctors", "Appointments", "Gallery"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="group flex items-center text-base font-light text-slate-400 hover:text-white transition-all"
                  >
                    <span className="relative overflow-hidden h-6 block">
                      <span className="block group-hover:-translate-y-full transition-transform duration-300">{item}</span>
                      <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-teal-400 font-medium">{item}</span>
                    </span>
                    <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-teal-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-500 mb-10">Contact</h4>
            <ul className="space-y-6 text-base font-light text-slate-400">
              <li className="flex items-start gap-4 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-teal-500/20 group-hover:text-teal-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="pt-1">Biratnagar-4, Morang, Nepal</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                  <Phone size={18} />
                </div>
                <a href="tel:021517777" className="group-hover:text-white transition-colors">021-517777</a>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                  <Mail size={18} />
                </div>
                <a href="mailto:info@primehospital.com.np" className="group-hover:text-white transition-colors truncate">info@primehospital.com.np</a>
              </li>
            </ul>
          </motion.div>

          {/* Operations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-500 mb-10">Operations</h4>
            <ul className="space-y-6 text-base font-light text-slate-400">
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Clock size={18} />
                </div>
                <span>OPD: Sun–Fri (8AM–5PM)</span>
              </li>
              <li className="flex items-center gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 group">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <span className="text-white font-medium group-hover:text-red-400 transition-colors">Emergency: 24/7 Available</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Clock size={18} />
                </div>
                <span>Pharmacy: 24/7 Service</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-600 font-medium">
            © {currentYear} Prime Hospital <span className="text-slate-500">Biratnagar</span>. Professional Care.
          </p>
          <div className="flex gap-10 text-xs uppercase tracking-[0.2em] text-slate-600 font-medium font-body">
            <span className="hover:text-teal-400 cursor-pointer transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-400 transition-all group-hover:w-full" />
            </span>
            <span className="hover:text-teal-400 cursor-pointer transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-400 transition-all group-hover:w-full" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;