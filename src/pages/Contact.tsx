import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  const contactDetails = [
    { icon: MapPin, title: "Address", content: "Biratnagar-4, Morang, Nepal" },
    { icon: Phone, title: "Phone", content: "021-517777 / 9705300777" },
    { icon: Mail, title: "Email", content: "info@primehospital.com.np" },
    { icon: Clock, title: "Availability", content: "Emergency 24/7 | OPD 8AM-5PM" },
  ];

  return (
    <div className="bg-white font-sans antialiased text-slate-900">
      
      {/* --- REFINED SMALL BANNER --- */}
      <section className="relative py-20 md:py-28 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Blurred Abstract Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/5 border border-white/10">
            <p className="text-white/60 text-[9px] font-bold tracking-[0.4em] uppercase">
              Get In Touch
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
            <span className="font-light">Contact</span> <span className="font-bold">Us</span>
          </h1>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* LEFT: INFO & MAP */}
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase">Location</h2>
                <h3 className="text-3xl font-serif text-slate-900 tracking-tight">
                  <span className="font-bold">Reach</span> <span className="font-light opacity-80">Prime Hospital</span>
                </h3>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {contactDetails.map((item) => (
                  <div key={item.title} className="p-7 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-500">
                    <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-5">
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1">{item.title}</h4>
                    <p className="text-slate-900 text-sm font-medium leading-relaxed">{item.content}</p>
                  </div>
                ))}
                
                <a 
                  href="https://facebook.com/primehospitalbrt" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-7 rounded-[2rem] border border-slate-100 bg-blue-50/20 hover:bg-white hover:shadow-lg transition-all duration-500"
                >
                  <Facebook className="text-blue-600 mb-5" size={22} fill="currentColor" />
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1">Facebook</h4>
                  <p className="text-slate-900 text-sm font-medium leading-relaxed">@primehospitalbrt</p>
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl h-64 bg-slate-50 relative group">
                <iframe
                  title="Prime Hospital Biratnagar"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.219803131846!2d87.2797672!3d26.4744444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744766320d7d%3A0xc3f9479630c9a776!2sPrime%20Hospital!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                  className="w-full h-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT: COMPACT FORM CARD */}
            <div className="relative">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden">
                <h3 className="text-2xl font-serif mb-8">
                  <span className="font-light">Send a</span> <span className="font-bold">Message</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase tracking-widest font-bold opacity-40 ml-1">Full Name</Label>
                    <Input 
                      required 
                      placeholder="Your name" 
                      className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-white/20" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] uppercase tracking-widest font-bold opacity-40 ml-1">Email</Label>
                      <Input 
                        required 
                        type="email" 
                        placeholder="you@example.com" 
                        className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] uppercase tracking-widest font-bold opacity-40 ml-1">Subject</Label>
                      <Input 
                        required 
                        placeholder="Inquiry Topic" 
                        className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-white/20" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase tracking-widest font-bold opacity-40 ml-1">Message</Label>
                    <Textarea 
                      required 
                      placeholder="How can we assist you?" 
                      className="bg-white/5 border-white/10 rounded-2xl min-h-[140px] text-white placeholder:text-white/20" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? "Sending..." : (
                      <>
                        Submit Message <Send size={14} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Contact;