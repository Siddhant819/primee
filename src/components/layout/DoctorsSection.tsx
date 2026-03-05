import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/badge";
import { Activity, Star, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Ramesh Chaurasia",
    specialty: "Nephrology",
    qualification: "MD, DM (Nephrology)",
    image: "https://i.imgur.com/oOneoU6.jpg",
    available: true,
    experience: "10 years",
    rating: 4.9,
  },
  {
    name: "Dr. Sangeeta Mishra",
    specialty: "Obstetrics & Gynecology",
    qualification: "MBBS, MS (OB-GYN)",
    image: "https://i.imgur.com/Vu3ObhC.jpg",
    available: true,
    experience: "10 years",
    rating: 4.8,
  },
  {
    name: "Dr. Ajay Mahato",
    specialty: "Orthopedic Surgery",
    qualification: "MBBS, MS (Ortho) - AIIMS",
    image: "https://i.imgur.com/0PmSuNt.jpg",
    available: true,
    experience: "10 years",
    rating: 5.0,
  },
  {
    name: "Dr. Manish Agrawal",
    specialty: "General Surgery",
    qualification: "MBBS, MS (Surgery)",
    image: "https://i.imgur.com/ASdmiN1.jpg",
    available: true,
    experience: "10 years",
    rating: 4.7,
  },
  {
    name: "Dr. Ranjeev Yadav",
    specialty: "Radiology",
    qualification: "MBBS, MD (Radiology)",
    image: "https://i.imgur.com/b9KM8o5.jpg",
    available: true,
    experience: "10 years",
    rating: 4.9,
  },
  {
    name: "Dr. Shrijana Yadav",
    specialty: "Pathology",
    qualification: "MBBS, MD (Pathology)",
    image: "https://i.imgur.com/sAWlGhC.jpg",
    available: true,
    experience: "10 years",
    rating: 4.6,
  },
  {
    name: "Dr. Tek Narayan Yadav",
    specialty: "Laparoscopic Surgeon",
    qualification: "MBBS, MS (Gen Surg), MCh (Surg Gastro)",
    image: "https://i.imgur.com/QaeLFUy.jpg",
    available: true,
    experience: "10 years",
    rating: 4.9,
  },
];

const DoctorsSection = () => (
  <section className="py-32 bg-slate-950 overflow-hidden">
    <div className="container mx-auto px-8 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <Reveal>
          <div className="space-y-4">
            <p className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase italic font-bold">Clinical Excellence</p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white italic tracking-tighter">
              Meet Our <span className="font-light text-slate-400">Specialists</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl text-slate-500 font-serif italic max-w-md leading-relaxed">
            A collaborative network of world-class medical professionals dedicated to precision diagnostics and patient care.
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {doctors.map((doc, idx) => (
          <Reveal key={doc.name} delay={idx * 0.1}>
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative glass-morphism p-1 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/20 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <div className="relative p-10 space-y-8">
                {/* Doctor Image & Status */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-white/5 group-hover:border-cyan-500/30 transition-colors shadow-2xl">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 p-4 bg-slate-950 rounded-2xl border border-white/10 shadow-xl">
                    <ShieldCheck className="text-cyan-400" size={20} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold italic text-white group-hover:text-cyan-400 transition-colors">{doc.name}</h3>
                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mt-2 italic">{doc.specialty}</p>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-y border-white/5">
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-400 fill-amber-400" size={12} />
                      <span className="text-[10px] font-black text-white">{doc.rating}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-800 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Activity className="text-cyan-400" size={12} />
                      <span className="text-[10px] uppercase font-black text-slate-500 italic">Board Certified</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 font-serif italic line-clamp-2 leading-relaxed">
                    {doc.qualification} with over {doc.experience} of dedicated clinical experience.
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[9px] uppercase font-black text-cyan-500 tracking-widest italic">{doc.available ? "Ready for consultation" : "Off-Index"}</span>
                    <button className="p-3 rounded-full bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-slate-950 transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default DoctorsSection;