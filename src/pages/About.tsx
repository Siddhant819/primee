import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Heart,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Microscope,
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We treat every patient like family, ensuring that premium medical care is always delivered with a human touch.",
  },
  {
    icon: Shield,
    title: "Safety & Quality",
    desc: "Adhering to international medical protocols to provide the safest diagnostic and surgical outcomes in Nepal.",
  },
  {
    icon: Zap,
    title: "Modern Innovation",
    desc: "Equipped with Biratnagar's latest 4D Ultrasound and CT technology for fast, pinpoint-accurate results.",
  },
  {
    icon: Award,
    title: "Integrity",
    desc: "Unwavering commitment to ethical medical practices, transparency in treatment, and patient trust.",
  },
];

const About = () => (
  <div className="bg-white text-slate-900 font-sans antialiased">

    {/* High-Transparency Glass Hero */}
    <section className="relative h-[70vh] min-h-[500px] flex items-center bg-slate-950 overflow-hidden text-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://i.imgur.com/XOtGHPL.jpg')" }}
      />

      {/* Subtle Neutral Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 backdrop-blur-[2px]" />

      <div className="relative container mx-auto px-6 z-10">
        <Reveal>
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.4em] uppercase">
              <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
              <ChevronRight size={10} className="text-teal-500" />
              <span className="text-slate-400">About Us</span>
            </nav>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 tracking-tighter leading-none">
            Redefining <span className="font-light italic text-slate-400">Healthcare</span>
          </h1>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Prime Hospital is a premier multi-specialty institution dedicated to
            bringing <span className="text-white font-medium">world-class clinical expertise</span> to Biratnagar.
          </p>
        </Reveal>
      </div>
    </section>

    {/* Story Section: Professional Split Layout */}
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] -z-10 group-hover:bg-teal-50/50 transition-colors duration-700" />
              <img
                src="https://i.imgur.com/2Ij1JIQ.jpg"
                alt="Hospital Interior"
                className="rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] object-cover h-[550px] w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Floating Stats Card (Glass Style) */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-10 -right-10 glass-morphism p-10 rounded-[2rem] shadow-2xl border-white/60 hidden md:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 text-xl tracking-tight">ISO Standards</span>
                    <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">Certified Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-xs font-black text-teal-600 tracking-[0.5em] uppercase">The Prime Story</h2>
                <h3 className="text-5xl md:text-6xl font-serif text-slate-900 leading-[1.05] tracking-tighter">
                  Premium Care. <br /> <span className="font-light text-slate-400">Proven Expertise.</span>
                </h3>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-light">
                <p>
                  Founded to serve as a beacon of health in Eastern Nepal, <strong className="text-slate-900 font-bold">Prime Hospital</strong> integrates high-end diagnostic capabilities with a specialized team of consultants.
                </p>
                <p>
                  Our facility is uniquely equipped to handle complex cases, featuring
                  <span className="text-slate-900 font-semibold italic"> 24/7 Emergency Trauma Surgery</span>, a high-precision
                  <span className="text-slate-900 font-semibold italic"> CT Scan wing</span>,
                  and specialized <span className="text-slate-900 font-semibold italic">NICU/PICU units</span>.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-slate-900 tracking-tight text-lg">24/7 Response</span>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <Microscope size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-slate-900 tracking-tight text-lg">Auto Lab</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values: Minimalist High-Transparency Grid */}
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-teal-600 tracking-[0.5em] uppercase mb-4">The Prime Promise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter">Our Core Values</h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <Reveal key={v.title} delay={idx * 0.1}>
              <TiltCard>
                <div className="group glass-card p-10 h-full border-white/60 hover:border-teal-400/30">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-xl shadow-teal-900/5 flex items-center justify-center text-teal-600 mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                    <v.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors uppercase italic">{v.title}</h4>
                  <p className="text-slate-500 text-base leading-relaxed font-light">{v.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default About;