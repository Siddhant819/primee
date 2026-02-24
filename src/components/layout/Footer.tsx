import { Link } from "react-router-dom";
import { Cross, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cross className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">Prime Hospital</span>
          </div>
          <p className="text-background/70 text-sm leading-relaxed">
            Providing world-class healthcare services in Biratnagar, Nepal since 2005. Your health, our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-background/70">
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/departments" className="hover:text-primary transition-colors">Departments</Link>
            <Link to="/doctors" className="hover:text-primary transition-colors">Our Doctors</Link>
            <Link to="/appointments" className="hover:text-primary transition-colors">Book Appointment</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm text-background/70">
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" /> Biratnagar, Morang, Nepal</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> 021-517777</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> 9705300777</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> info@primehospital.com.np</div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Working Hours</h4>
          <div className="flex flex-col gap-2 text-sm text-background/70">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /> OPD: Sun–Fri, 8AM–5PM</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /> Emergency: 24/7</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /> Pharmacy: 24/7</div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20 mt-12 pt-6 text-center text-sm text-background/50">
        © {new Date().getFullYear()} Prime Hospital, Biratnagar. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
