import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { API_BASE_URL, apiCall } from "@/api/config";

const departments = [
  "General & Laparoscopic",
  "Pediatrics (NICU/PICU)",
  "Cardiology",
  "Radiology & Imaging",
  "Pathology Lab",
  "Internal Medicine",
  "Orthopedics",
  "Ophthalmology",
  "Emergency & Trauma",
  "ENT & Dental",
  "Pharmacy",
  "Obs & Gynae",
];

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

const FloatingSelect = ({ label, name, value, onChange, options, required = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <motion.div
        animate={isFocused || value ? { y: -24, scale: 0.85, color: "#14b8a6" } : { y: 0, scale: 1, color: "#64748b" }}
        className="absolute left-4 top-4 pointer-events-none transition-all origin-left font-medium"
      >
        {label} {required && "*"}
      </motion.div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 bg-slate-50 border-b-2 border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all rounded-t-xl appearance-none"
      >
        <option value=""></option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <motion.div
        initial={false}
        animate={isFocused ? { scaleX: 1 } : { scaleX: 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 origin-left"
      />
      <div className="absolute right-4 top-6 pointer-events-none text-slate-400">
        <ChevronRight size={16} className="rotate-90" />
      </div>
    </div>
  );
};

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    department: "",
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiCall("/appointments", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        toast.success("Appointment request submitted! Check your email for confirmation.");
        setFormData({
          patientName: "",
          email: "",
          phone: "",
          department: "",
          appointmentDate: "",
          timeSlot: "",
          reason: "",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center bg-slate-950 overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('https://i.imgur.com/6VTBj3j.jpg')",
            backgroundPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 backdrop-blur-[2px]" />

        <div className="relative container mx-auto px-6 z-10">
          <Reveal>
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.4em] uppercase">
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
                <ChevronRight size={10} className="text-teal-500" />
                <span className="text-slate-400">Appointments</span>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tighter leading-none">
              <span className="font-bold">Book</span> <span className="font-light italic text-slate-400">Appointment</span>
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

      {/* --- ENHANCED FORM SECTION --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal width="100%">
            <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 flex flex-col lg:flex-row">

              {/* Left Column: Contact & Stats */}
              <div className="lg:w-1/3 bg-slate-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-black tracking-widest uppercase mb-8">
                    Direct Contact
                  </div>
                  <h3 className="text-4xl font-serif font-bold mb-8 leading-tight tracking-tighter">
                    Get <span className="font-light text-slate-400 italic">in touch</span>
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-10 font-light text-lg">
                    Our dedicated team is ready to help you book your appointment and answer any questions.
                  </p>

                  <div className="space-y-8">
                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5 group cursor-pointer">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-600 transition-colors">
                        <Phone size={20} className="text-teal-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 mb-1">24/7 Hotline</p>
                        <p className="text-lg font-bold text-white">021-517777</p>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5 group cursor-pointer">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600 transition-colors">
                        <Mail size={20} className="text-blue-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 mb-1">Email Support</p>
                        <p className="text-lg font-bold text-white truncate">info@primehospital.com.np</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-3 text-teal-400 mb-6 font-bold tracking-[0.2em] uppercase text-[10px]">
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                    Front Desk Active
                  </div>
                  <div className="space-y-4 text-slate-400">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-slate-600" />
                      <span className="text-sm font-light">Response: <span className="text-white font-medium italic">~10 mins</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-slate-600" />
                      <span className="text-sm font-light">100% <span className="text-white font-medium">Secure Booking</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:w-2/3 p-16 bg-white">
                <div className="max-w-xl mx-auto">
                  <h2 className="text-4xl font-serif font-bold text-slate-900 mb-10 tracking-tighter">
                    Schedule Your <span className="font-light text-slate-400 italic">Visit</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <Reveal delay={0.1}>
                      <FloatingInput
                        label="Patient Full Name"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sujit Kumar Yadav"
                      />
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Reveal delay={0.2}>
                        <FloatingInput
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </Reveal>
                      <Reveal delay={0.3}>
                        <FloatingInput
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+977-XXXXXXXXXX"
                        />
                      </Reveal>
                    </div>

                    <Reveal delay={0.4}>
                      <FloatingSelect
                        label="Department Specialties"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        options={departments}
                        required
                      />
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Reveal delay={0.5}>
                        <FloatingInput
                          label="Preferred Date"
                          name="appointmentDate"
                          type="date"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          required
                        />
                      </Reveal>
                      <Reveal delay={0.6}>
                        <FloatingSelect
                          label="Time Slot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleChange}
                          required
                          options={[
                            "09:00 AM", "10:00 AM", "11:00 AM",
                            "02:00 PM", "03:00 PM", "04:00 PM"
                          ]}
                        />
                      </Reveal>
                    </div>

                    <Reveal delay={0.7}>
                      <div className="relative">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 italic">
                          Medical Concerns (Optional)
                        </label>
                        <textarea
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:bg-white focus:border-teal-500/30 transition-all font-light text-slate-600"
                          placeholder="Describe your symptomsbriefly..."
                          rows={4}
                        />
                      </div>
                    </Reveal>

                    <Reveal delay={0.8}>
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
                            <CheckCircle2 size={20} />
                            Confirm Booking
                          </>
                        )}
                      </motion.button>
                    </Reveal>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Appointments;