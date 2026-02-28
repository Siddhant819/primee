import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-2xl py-4 shadow-md border-b border-slate-100" 
          : "bg-white py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.jpg"
            alt="Prime Hospital Logo"
            className="h-12 w-auto object-contain transition-transform duration-700 group-hover:rotate-[360deg]"
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-tighter text-slate-950">
              <span className="font-light">PRIME</span> <span className="font-black">HOSPITAL</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.5em] text-slate-400 mt-1 uppercase">Biratnagar</span>
          </div>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-[12px] uppercase tracking-[0.25em] transition-all duration-300 hover:scale-110 ${
                  isActive 
                    ? "text-slate-950 font-black" 
                    : "text-slate-500 font-bold hover:text-slate-950"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex flex-col items-center">
                  {link.name}
                  <span
                    className={`h-[3px] bg-slate-950 mt-1 transition-all duration-500 rounded-full ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* --- MOBILE BUTTON --- */}
        <button
          className="md:hidden text-slate-950 p-2 hover:bg-slate-50 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>

        {/* --- MOBILE MENU --- */}
        <div
          className={`
            fixed inset-0 top-[88px] w-full bg-white/95 backdrop-blur-xl
            px-10 py-12 flex flex-col space-y-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden
            ${isOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"}
          `}
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={({ isActive }) => 
                `text-4xl font-serif tracking-tight border-b border-slate-100 pb-4 ${
                  isActive ? "font-black text-slate-950" : "font-light text-slate-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-10">
            <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">Emergency Contact</p>
            <a href="tel:021517777" className="text-2xl font-black text-red-600">021-517777</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;