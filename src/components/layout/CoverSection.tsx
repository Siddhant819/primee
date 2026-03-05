import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";

interface CoverSectionProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
}

const CoverSection: React.FC<CoverSectionProps> = ({ imageSrc, title, subtitle }) => (
  <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background Image with Parallax-ready styling */}
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-110"
      style={{ backgroundImage: `url(${imageSrc})` }}
    />

    {/* Sophisticated Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />

    {/* Content Container */}
    <div className="relative z-10 container mx-auto px-8 max-w-5xl">
      <Reveal>
        <div className="text-center space-y-8">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-serif font-bold text-white italic tracking-tighter leading-tight"
            >
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? "font-light text-slate-300" : "italic"}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl text-slate-400 font-serif italic max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center pt-8"
          >
            <div className="w-px h-24 bg-gradient-to-b from-cyan-500 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </Reveal>
    </div>

    {/* Glass Bottom Edge */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
  </section>
);

export default CoverSection;