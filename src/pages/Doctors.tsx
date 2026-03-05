import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Award, Calendar, ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const doctors = [
  {
    name: "Dr. Tek Narayan Yadav",
    specialty: "Senior Laparoscopic & GI Surgeon",
    qualification: "MBBS (BPKIHS), MS (General Surgery) PGIMER, MCh (Surgical GI)",
    image: "https://i.imgur.com/QaeLFUy.jpg",
    available: true,
    experience: "10+ years",
  },
  {
    name: "Dr. Ramesh Chaurasia",
    specialty: "Nephrology",
    qualification: "MD, DM (Nephrology)",
    image: "https://i.imgur.com/oOneoU6.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Sangeeta Mishra",
    specialty: "Obstetrics & Gynecology",
    qualification: "MBBS, MS (OB-GYN)",
    image: "https://i.imgur.com/Vu3ObhC.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Ajay Mahato",
    specialty: "Orthopedic Surgery",
    qualification: "MBBS, MS (Ortho) - AIIMS",
    image: "https://i.imgur.com/0PmSuNt.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Manish Agrawal",
    specialty: "General Surgery",
    qualification: "MBBS, MS (Surgery)",
    image: "https://i.imgur.com/ASdmiN1.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Ranjeev Yadav",
    specialty: "Radiology",
    qualification: "MBBS, MD (Radiology)",
    image: "https://i.imgur.com/b9KM8o5.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Shrijana Yadav",
    specialty: "Pathology",
    qualification: "MBBS, MD (Pathology)",
    image: "https://i.imgur.com/sAWlGhC.jpg",
    available: true,
    experience: "10 years",
  },
];

const Doctors = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center bg-slate-950 overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.imgur.com/Qn0pz2o.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 backdrop-blur-[2px]" />

        <div className="relative container mx-auto px-6 z-10">
          <Reveal>
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.4em] uppercase">
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
                <ChevronRight size={10} className="text-teal-500" />
                <span className="text-slate-400">Doctors</span>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tighter leading-none">
              Our <span className="font-light italic text-slate-400">Medical Experts</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Meet our <span className="text-white font-medium">certified specialists</span> dedicated to
              providing world-class medical care in Biratnagar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {doctors.map((doc, idx) => (
              <Reveal key={doc.name} delay={idx * 0.1}>
                <TiltCard>
                  <div className="group glass-card p-10 flex flex-col items-center text-center h-full border-white/60 hover:border-teal-400/30 overflow-hidden relative">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-teal-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative w-48 h-48 mb-8 p-3 bg-white rounded-full shadow-2xl">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover rounded-full filter grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                      />
                      {doc.available && (
                        <span className="absolute bottom-6 right-6 w-5 h-5 bg-teal-500 rounded-full border-4 border-white shadow-xl animate-pulse" />
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{doc.name}</h3>
                    <p className="text-xs text-teal-600 font-black uppercase tracking-[0.3em] mb-6 italic">{doc.specialty}</p>

                    <div className="space-y-4 mb-10 w-full text-slate-500 font-light relative z-10 flex-grow">
                      <div className="flex items-start justify-center gap-3 px-4">
                        <GraduationCap size={18} className="text-teal-600 shrink-0 mt-1" />
                        <span className="text-sm leading-relaxed">{doc.qualification}</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                        <Award size={14} className="text-teal-600" /> {doc.experience} Experience
                      </div>
                    </div>

                    <Link to="/appointments" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-colors flex items-center justify-center gap-3 shadow-xl"
                      >
                        <Calendar size={18} /> Book Consultation
                      </motion.button>
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <Reveal>
            <div className="glass-morphism p-16 rounded-[3.5rem] border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tighter italic">
                  Need a <span className="font-bold underline decoration-teal-500/30">Consultation</span>?
                </h2>
                <p className="text-slate-500 mb-12 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                  Our specialists are available for scheduled appointments and <span className="text-slate-900 font-medium">emergency trauma care</span>.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-2xl flex items-center gap-3 mx-auto"
                  >
                    <Phone size={20} /> Emergency Response
                  </motion.button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Doctors;