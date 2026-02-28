import { Link } from "react-router-dom";
import { Cross, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-emerald-50">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-emerald-800 rounded-lg">
              <Cross className="h-6 w-6 text-emerald-300" />
            </div>
            <span className="text-xl font-bold tracking-wide">
              Prime Hospital
            </span>
          </div>
          <p className="text-emerald-200/80 text-sm leading-relaxed">
            Providing world-class healthcare services in Biratnagar, Nepal since 2005.
            Your health, our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-emerald-100">
            Quick Links
          </h4>
          <div className="flex flex-col gap-3 text-sm text-emerald-200/80">
            {[
              { name: "About Us", path: "/about" },
              { name: "Departments", path: "/departments" },
              { name: "Our Doctors", path: "/doctors" },
              { name: "Book Appointment", path: "/appointments" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-emerald-100">
            Contact Info
          </h4>
          <div className="flex flex-col gap-4 text-sm text-emerald-200/80">

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-emerald-400" />
              <span>Biratnagar, Morang, Nepal</span>
            </div>

            <a
              href="tel:021517777"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              021-517777
            </a>

            <a
              href="tel:9705300777"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              9705300777
            </a>

            <a
              href="mailto:info@primehospital.com.np"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              info@primehospital.com.np
            </a>

          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-emerald-100">
            Working Hours
          </h4>
          <div className="flex flex-col gap-3 text-sm text-emerald-200/80">

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-emerald-400" />
              OPD: Sun–Fri, 8AM–5PM
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-emerald-400" />
              Emergency: 24/7
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-emerald-400" />
              Pharmacy: 24/7
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-emerald-800 mt-14 pt-6 text-center text-sm text-emerald-300/70">
        © {new Date().getFullYear()} Prime Hospital, Biratnagar. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;