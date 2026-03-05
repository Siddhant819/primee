import React from "react";
import { galleryImages } from "./galleryImages";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const Gallery = () => {
  return (
    <div className="bg-slate-50 font-sans antialiased text-slate-900 overflow-x-hidden">

      {/* --- PREMIUM DYNAMIC HERO --- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_70%)] animate-pulse" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <p className="text-teal-400 text-[10px] font-black tracking-[0.5em] uppercase italic">
                Cine-Medical Exhibition
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-8">
              Visual <span className="font-light italic text-slate-400">Excellence</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              Explore our <span className="text-white font-medium italic">world-class infrastructure</span> and cutting-edge medical environments designed for peak clinical performance.
            </p>
          </Reveal>
        </div>

        {/* Floating Element */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase font-black tracking-[0.5em]">Scroll to Explore</span>
          <div className="w-0.5 h-16 bg-gradient-to-b from-teal-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* --- GALLERY GRID SECTION --- */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <Reveal>
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-teal-600 tracking-[0.5em] uppercase italic bg-teal-50 inline-block px-4 py-1.5 rounded-full border border-teal-100">Architecture</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight">
                  The <span className="font-light italic">Art</span> of <span className="font-bold">Healthcare</span>
                </h3>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-md text-slate-500 font-light italic text-right">
                Synthesizing architectural precision with clinical necessity to create environments where healing is inevitable.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {galleryImages.map((img, idx) => (
              <Reveal key={img.id} delay={idx * 0.1}>
                <TiltCard>
                  <figure
                    className="group relative overflow-hidden rounded-[3rem] border border-white bg-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_60px_100px_rgba(0,0,0,0.1)] transition-all duration-700"
                  >
                    {/* Image Aspect Ratio Container */}
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      />
                    </div>

                    {/* Premium Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <figcaption className="w-full p-10 translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-out relative z-10">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-teal-500/20 backdrop-blur-xl border border-teal-400/30">
                          <p className="text-teal-400 text-[9px] font-black tracking-[0.3em] uppercase italic">Facility Unit {idx + 1}</p>
                        </div>
                        <p className="text-white text-3xl font-serif font-bold tracking-tight leading-none mb-4">
                          {img.caption || img.alt}
                        </p>
                        <div className="h-0.5 w-0 group-hover:w-full bg-teal-500 transition-all duration-700 delay-100" />
                      </figcaption>
                    </div>
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION BAR --- */}
      <Reveal>
        <div className="container mx-auto px-6 mb-32">
          <div className="glass-morphism p-12 md:p-20 rounded-[4rem] border-white/40 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 blur-3xl rounded-full" />
            <h4 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 italic">Experience it in <span className="font-bold border-b-2 border-slate-900 border-dotted">Person</span></h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-12 py-5 bg-slate-950 text-white font-bold rounded-3xl text-xs uppercase tracking-widest shadow-xl"
              >
                Schedule Site Visit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-12 py-5 bg-white text-slate-950 font-bold rounded-3xl border border-slate-200 text-xs uppercase tracking-widest shadow-lg"
              >
                View Map Location
              </motion.button>
            </div>
          </div>
        </div>
      </Reveal>

    </div>
  );
};

export default Gallery;