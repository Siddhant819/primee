import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { toast } from "sonner";
import { API_BASE_URL, apiCall } from "@/api/config";

const FloatingInput = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <motion.div
        animate={isFocused || value ? { y: -24, scale: 0.85, color: "#14b8a6" } : { y: 0, scale: 1, color: "#64748b" }}
        className="absolute left-4 top-4 pointer-events-none transition-all origin-left font-medium"
      >
        {label} {required && "*"}
      </motion.div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 bg-slate-50 border-b-2 border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all rounded-t-xl"
      />
      <motion.div
        initial={false}
        animate={isFocused ? { scaleX: 1 } : { scaleX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 origin-left"
      />
    </div>
  );
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Calling",
      content: "021-517777",
      desc: "Emergency 24/7 available",
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "info@primehospital.com.np",
      desc: "Response within 2 hours",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: MapPin,
      title: "Our Location",
      content: "Biratnagar, Nepal",
      desc: "Main Hospital Complex",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiCall("/messages", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        toast.success("Message sent successfully! We'll reply soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white font-sans antialiased text-slate-900 border-t border-slate-100">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] flex items-center bg-slate-950 overflow-hidden text-center">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="relative z-10 container mx-auto px-6">
          <Reveal>
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.4em] uppercase">
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
                <ChevronRight size={10} className="text-teal-500" />
                <span className="text-slate-400">Contact</span>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-6">
              Get <span className="font-light italic text-slate-400">in Reach</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              We are available <span className="text-white font-medium italic">24/7 for emergencies</span> and support.
              Drop us a message below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info & Map */}
            <div className="space-y-16">
              <div className="space-y-10">
                <Reveal>
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2 tracking-tight">
                      Information <span className="font-light italic text-slate-400">Center</span>
                    </h2>
                    <p className="text-slate-500 font-light text-lg">
                      Speak directly with our clinical staff or administrative team.
                    </p>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {contactInfo.map((info, idx) => (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <TiltCard>
                        <div className="glass-card p-8 border-white/60 hover:border-teal-400/30 group">
                          <div className="flex items-center gap-6">
                            <div className={`h-16 w-16 rounded-2xl ${info.bg} flex items-center justify-center ${info.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                              <info.icon size={28} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 leading-none">{info.title}</p>
                              <h4 className="text-xl font-bold text-slate-900 mb-1">{info.content}</h4>
                              <p className="text-sm text-slate-500 font-light italic">{info.desc}</p>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Map */}
              <Reveal delay={0.4}>
                <div className="rounded-[2.5rem] overflow-hidden h-96 shadow-2xl border-4 border-white relative group">
                  <div className="absolute inset-0 bg-slate-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                    loading="lazy"
                    title="Hospital Map"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.8981893456015!2d87.2649!3d26.4037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef608a000b8b6d%3A0x1234567890!2sPrime%20Hospital!5e0!3m2!1sen!2snp!4v1234567890"
                  ></iframe>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <Reveal delay={0.2}>
                <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden h-full">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-4xl font-serif font-bold text-slate-900 mb-10 tracking-tighter">
                      Send us a <span className="font-light text-slate-400 italic">Message</span>
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <FloatingInput
                        label="Your Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sujit Kumar"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FloatingInput
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                        <FloatingInput
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+977-XXXXXXXXXX"
                        />
                      </div>

                      <FloatingInput
                        label="Subject of Inquiry"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What are you writing about?"
                      />

                      <div className="relative">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 italic">
                          Detailed Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:bg-white focus:border-teal-500/30 transition-all font-light text-slate-600"
                          placeholder="Tell us more about your inquiry..."
                          rows={4}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-slate-950 text-white font-bold py-5 rounded-[2rem] hover:bg-teal-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-teal-900/10"
                      >
                        {loading ? (
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;