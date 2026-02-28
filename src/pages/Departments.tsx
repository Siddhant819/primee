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
      <section className="relative py-32 md:py-52 bg-white overflow-hidden text-center">
        {/* The Actual Hospital Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url('https://i.imgur.com/XOtGHPL.jpg')" }} 
        />
        
        {/* Subtle Neutral Overlay (Light & Transparent) */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-75" />
        
        <div className="relative container mx-auto px-6 z-10">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.3em] uppercase">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="opacity-70">Departments</span>
            </nav>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Our <span className="font-light ">Departments</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md backdrop-blur-[2px] py-2">
            Experience premium medical services driven by 
            advanced technology in the heart of Biratnagar.
          </p>
        </div>
      </section>

      {/* Modern Clean Department Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((d) => (
              <div
                key={d.name}
                className="group p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-inner">
                  <d.icon size={26} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-slate-900">
                  {d.name}
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-8 text-[15px]">
                  {d.desc}
                </p>

                <div className="flex items-center text-xs font-bold text-slate-300 group-hover:text-slate-900 gap-2 transition-all duration-300 uppercase tracking-widest">
                  View Detail <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Footer Banner (Clean & Dark) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/40 border border-white/10">
                <Clock size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                24/7 Emergency Response
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg font-light">
                Our critical care units and diagnostic imaging are operational 
                every minute of every day.
              </p>
              <Button asChild size="lg" className="rounded-full px-12 h-14 text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 transition-all active:scale-95">
                <Link to="/contact">Emergency Helpline</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;