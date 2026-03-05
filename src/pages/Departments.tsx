import React from "react";
import {
  Heart,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Eye,
  Pill,
  Scissors,
  Activity,
  Microscope,
  Ear,
  Smile,
  Zap,
  Clock,
  ArrowRight,
  ChevronRight,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const departments = [
  { name: "General & Laparoscopic", icon: Scissors, desc: "Advanced surgical excellence featuring minimally invasive procedures and 24-hour trauma support." },
  { name: "Pediatrics (NICU/PICU)", icon: Baby, desc: "Specialized 24-hour care for newborns and children in our modern NICU and PICU facilities." },
  { name: "Cardiology", icon: Heart, desc: "Precision heart and vascular care providing comprehensive diagnostics and treatment plans." },
  { name: "Radiology & Imaging", icon: Zap, desc: "24-hour diagnostic precision featuring high-resolution CT Scans and 4D Ultrasound." },
  { name: "Pathology Lab", icon: Microscope, desc: "A fully automatic laboratory ensuring rapid, accurate diagnostic results for optimized outcomes." },
  { name: "Internal Medicine", icon: Stethoscope, desc: "Expert management of chronic conditions with specialized clinics for Nephrology and Neurology." },
  { name: "Orthopedics", icon: Bone, desc: "Comprehensive musculoskeletal care, from joint preservation to advanced fracture management." },
  { name: "Ophthalmology", icon: Eye, desc: "Leading eye care services ranging from routine exams to advanced micro-surgical procedures." },
  { name: "Emergency & Trauma", icon: Activity, desc: "Immediate medical intervention available 24/7 for critical emergencies and surgical trauma." },
  { name: "ENT & Dental", icon: Ear, desc: "Specialized therapeutic care for Ear, Nose, Throat, and complete restorative dentistry." },
  { name: "Pharmacy", icon: Pill, desc: "A 24-hour fully stocked pharmaceutical center providing immediate access to medications." },
  { name: "Obs & Gynae", icon: Users, desc: "Compassionate maternity and women's health services designed for a safe birthing experience." },
];

const Departments = () => {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">

      {/* High-Transparency Glass Header */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center bg-slate-950 overflow-hidden text-center">
        {/* The Actual Hospital Photo */}
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
                <span className="text-slate-400">Departments</span>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tighter leading-none">
              Our <span className="font-light italic text-slate-400">Departments</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Experience <span className="text-white font-medium">premium medical services</span> driven by
              advanced technology in the heart of Biratnagar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Modern Clean Department Grid */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((d, idx) => (
              <Reveal key={d.name} delay={idx * 0.05}>
                <TiltCard>
                  <div className="group glass-card p-10 h-full border-white/60 hover:border-teal-400/30">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-teal-900/5 flex items-center justify-center text-teal-600 mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                      <d.icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-teal-600 transition-colors">
                      {d.name}
                    </h3>

                    <p className="text-slate-500 leading-relaxed mb-8 text-base font-light">
                      {d.desc}
                    </p>

                    <div className="flex items-center text-xs font-black text-slate-300 group-hover:text-teal-600 gap-2 transition-all duration-300 uppercase tracking-[0.2em] italic">
                      View Detail <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Footer Banner (Clean & Dark) */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="relative rounded-[4rem] overflow-hidden min-h-[500px] flex items-center group shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-slate-100">
              {/* Background with slight parallax effect via hover */}
              <div className="absolute inset-0 bg-slate-950 transition-colors duration-700 group-hover:bg-slate-900" />
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-teal-500/10 to-transparent" />

              <div className="relative z-10 w-full p-12 md:p-24 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-10 text-teal-400 border border-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                >
                  <Clock size={32} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tighter leading-tight">
                  24/7 <span className="font-light text-slate-400 italic">Emergency</span> Response
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-12 text-xl font-light leading-relaxed">
                  Our critical care units and diagnostic imaging are operational
                  <span className="text-white font-medium italic"> every minute of every day</span>.
                </p>
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="rounded-2xl px-12 h-16 text-base font-bold bg-white text-slate-950 hover:bg-teal-50 transition-all shadow-2xl">
                      Emergency Helpline
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Departments;