import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CalendarCheck, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from "lucide-react";
import { toast } from "sonner";

// Native UI Components (to avoid import errors)
const CustomBadge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${className}`}>
    {children}
  </div>
);

const departments = [
  "Cardiology", "General Medicine", "Pediatrics", "Neurology", "Orthopedics",
  "Ophthalmology", "General Surgery", "ENT", "Dental", "Emergency Medicine",
];

const Appointments = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Appointment request submitted! We will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-32 md:py-48 flex items-center justify-center text-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ 
            backgroundImage: "url('https://i.imgur.com/6VTBj3j.jpg')",
            backgroundPosition: "center 30%" 
          }} 
        />
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-90" />
        
        <div className="relative container mx-auto px-6 z-10">
          {/* Glass Breadcrumb Pill */}
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <nav className="flex items-center gap-2 text-white text-[10px] font-bold tracking-[0.3em] uppercase">
              <Link to="/" className="hover:opacity-70 transition-opacity text-white">Home</Link>
              <ChevronRight size={10} className="opacity-50 text-white" />
              <span className="opacity-70 text-white">Appointments</span>
            </nav>
          </div>

          {/* Bold/Light Serif Heading */}
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">
            <span className="font-bold">Book</span> <span className="font-light opacity-90">Appointment</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md backdrop-blur-[2px] py-2">
            Experience premium medical services driven by 
            advanced technology in the heart of Biratnagar.
          </p>
        </div>
      </section>

      {/* --- ENHANCED FORM SECTION --- */}
      <section className="py-24 bg-slate-50/50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
            
            {/* Left Column: Contact & Stats */}
            <div className="lg:w-1/3 bg-slate-900 p-12 text-white flex flex-col justify-between">
              <div>
                <CustomBadge className="bg-white/10 text-white border-white/20 mb-6">
                  Direct Contact
                </CustomBadge>
                <h2 className="text-3xl font-bold mb-8 leading-tight">
                  We are here to <span className="font-light italic text-slate-300">help you.</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">Phone</p>
                      <p className="text-sm font-medium text-white">+977-21-XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">Email</p>
                      <p className="text-sm font-medium text-white">info@hospital.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-green-400 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Front Desk Active</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock size={14} />
                    <span className="text-xs">Response time: ~15 mins</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <ShieldCheck size={14} />
                    <span className="text-xs">Secure Patient Portal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Minimalist Form */}
            <div className="lg:w-2/3 p-12 md:p-16">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Information</h3>
                  <p className="text-slate-400 text-sm mt-1 font-medium">Please fill in the details below</p>
                </div>
                <CalendarCheck className="text-slate-100 hidden md:block" size={48} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Row 1: Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors block ml-1">
                      Full Name
                    </label>
                    <input 
                      required 
                      placeholder="Enter your full name"
                      className="w-full border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus:ring-0 focus:border-slate-900 transition-all text-lg placeholder:text-slate-300 outline-none" 
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors block ml-1">
                      Phone Number
                    </label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="98XXXXXXXX"
                      className="w-full border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus:ring-0 focus:border-slate-900 transition-all text-lg placeholder:text-slate-300 outline-none" 
                    />
                  </div>
                </div>

                {/* Row 2: Logistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block ml-1">
                      Preferred Date
                    </label>
                    <input 
                      required 
                      type="date" 
                      className="w-full border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus:ring-0 focus:border-slate-900 transition-all text-lg outline-none" 
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block ml-1">
                      Medical Department
                    </label>
                    <select 
                      required
                      className="w-full border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus:ring-0 focus:border-slate-900 transition-all text-lg outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>Select Department</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block ml-1">
                    Symptoms / Concerns
                  </label>
                  <textarea 
                    placeholder="Briefly describe your medical concern..."
                    className="w-full border-0 border-b border-slate-200 bg-transparent rounded-none px-1 min-h-[80px] focus:ring-0 focus:border-slate-900 transition-all text-lg placeholder:text-slate-300 outline-none resize-none" 
                  />
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full md:w-auto px-16 bg-slate-900 text-white hover:bg-slate-800 rounded-full h-16 font-bold text-lg shadow-2xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                  <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest font-medium ml-1">
                    * Our team will call you to confirm the final time slot.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointments;