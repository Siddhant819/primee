import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Eye,
  Clock,
  Award,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

// Hero images
const heroImages = [
  "https://i.imgur.com/XOtGHPL.jpg",
  "https://i.imgur.com/2Ij1JIQ.jpg",
  "https://i.imgur.com/RaWuN9i.jpg",
  "https://i.imgur.com/UAtihd2.jpg",
  "https://i.imgur.com/UkVdNir.jpg",
];

const departments = [
  { name: "Cardiology", icon: Heart, desc: "Heart & cardiovascular care" },
  { name: "General Medicine", icon: Stethoscope, desc: "Primary healthcare services" },
  { name: "Pediatrics", icon: Baby, desc: "Children's healthcare" },
  { name: "Neurology", icon: Brain, desc: "Brain & nervous system" },
  { name: "Orthopedics", icon: Bone, desc: "Bone & joint care" },
  { name: "Ophthalmology", icon: Eye, desc: "Eye care & surgery" },
];

const stats = [
  { value: "1+", label: "Year of Service", icon: Clock },
  { value: "10+", label: "Expert Doctors", icon: Users },
  { value: "15+", label: "Departments", icon: Award },
  { value: "1000+", label: "Patients Served", icon: Heart },
];

// Restored & Modernized Custom Arrows
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
    >
      <ChevronLeft size={24} />
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
    >
      <ChevronRight size={24} />
    </button>
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true, // Arrows Enabled
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  fade: true,
};

const Index = () => {
  return (
    <div className="bg-white font-sans antialiased text-slate-900">

      {/* --- 1. HERO SLIDER SECTION --- */}
      <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden bg-slate-950">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse delay-1000 pointer-events-none" />

        <div className="absolute inset-0 w-full h-full z-0">
          <Slider {...sliderSettings} className="h-full w-full">
            {heroImages.map((img, idx) => (
              <div key={idx} className="relative h-screen min-h-[750px]">
                <img
                  src={img}
                  alt={`Hero ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex items-center">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <ShieldCheck size={14} className="text-teal-400" />
                <p className="text-white text-[10px] font-bold tracking-[0.4em] uppercase">
                  Premium Multi-Specialty Institution
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter leading-[1.05]">
                <span className="font-light text-slate-400">In the</span> <span className="font-bold">Heart</span><br />
                <span className="font-light">of</span> <span className="font-bold text-teal-400">Biratnagar</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-light">
                Prime Hospital integrates <span className="text-white font-medium">world-class clinical expertise</span> with
                state-of-the-art diagnostic technology for our community.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-wrap gap-6">
                <Link to="/appointments">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-10 h-16 rounded-2xl shadow-[0_20px_40px_rgba(13,148,136,0.3)] transition-all border border-teal-400/20">
                      Book Appointment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/departments">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-white/5 text-white hover:bg-white/10 backdrop-blur-xl border border-white/10 font-bold px-10 h-16 rounded-2xl transition-all shadow-xl">
                      Our Departments
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- 2. STATS SECTION --- */}
      <section className="relative -mt-24 z-20 container mx-auto px-6">
        <Reveal width="100%">
          <div className="glass-morphism rounded-[3rem] p-12 text-slate-900 shadow-2xl border-white/40 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              {stats.map((s, idx) => (
                <div key={s.label} className="group flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ y: -5, rotate: 10 }}
                    className="h-14 w-14 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-2 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-xl shadow-teal-500/10"
                  >
                    <s.icon size={26} />
                  </motion.div>
                  <span className="text-5xl font-bold tracking-tighter text-slate-900">{s.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- 3. DEPARTMENTS PREVIEW --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal width="100%">
            <div className="text-center mb-24">
              <h2 className="text-[10px] font-black text-teal-600 tracking-[0.5em] uppercase mb-4">Specialties</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-slate-900 tracking-tighter">
                <span className="font-bold">Our</span> <span className="font-light text-slate-400">Departments</span>
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {departments.map((d, idx) => (
              <Reveal key={d.name} delay={idx * 0.1}>
                <TiltCard>
                  <div className="group p-10 rounded-[2.5rem] border border-white bg-white/60 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/5 hover:border-teal-500/20 relative overflow-hidden h-full">
                    {/* Hover Decoration */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

                    <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                      <d.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight relative z-10">
                      {d.name}
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed font-light relative z-10">{d.desc}</p>

                    <motion.div
                      className="mt-8 flex items-center text-teal-600 font-bold text-xs uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Learn More <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. DOCTORS CALLOUT --- */}
      <section className="py-32 container mx-auto px-6">
        <Reveal width="100%">
          <div
            className="relative rounded-[3.5rem] overflow-hidden min-h-[600px] flex items-center group shadow-2xl border border-white/10"
            style={{ backgroundImage: "url('https://i.imgur.com/Qn0pz2o.jpg')", backgroundPosition: "center 25%", backgroundSize: "cover" }}
          >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] group-hover:bg-slate-950/60 transition-all duration-700" />

            <div className="relative z-10 w-full p-12 md:p-24 text-center md:text-left text-white">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-black tracking-widest uppercase mb-8"
                >
                  <Zap size={14} /> Medical Leadership
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] tracking-tighter">
                  Meet <span className="font-light text-slate-400">Our</span> <br />
                  <span className="font-bold">Medical Experts</span>
                </h2>
                <p className="text-slate-300 text-xl mb-12 font-light leading-relaxed max-w-xl">
                  Experienced and compassionate professionals dedicated to
                  providing world-class clinical care to Biratnagar.
                </p>
                <Link to="/doctors">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-teal-50 rounded-2xl font-bold px-12 h-16 shadow-2xl transition-all border border-white/20">
                      View All Doctors
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Index;