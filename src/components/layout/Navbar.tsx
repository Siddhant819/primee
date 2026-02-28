import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">

        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.jpg"
            alt="Prime Hospital Logo"
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-wide">
            Prime Hospital
          </span>
        </Link>

        {/* --- MOBILE BUTTON --- */}
        <button
          className="md:hidden text-emerald-700 hover:text-emerald-900 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* --- NAVIGATION LINKS --- */}
        <div
          className={`
            absolute md:static top-[72px] left-0 w-full md:w-auto 
            bg-white md:bg-transparent md:backdrop-blur-none
            border-b md:border-none border-emerald-100
            px-6 py-8 md:p-0 
            flex flex-col md:flex-row md:items-center md:space-x-8
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? "translate-y-0 opacity-100 visible" 
              : "-translate-y-5 opacity-0 invisible md:translate-y-0 md:opacity-100 md:visible"}
          `}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative text-sm lg:text-base font-medium py-2 md:py-0 transition-all duration-300 ${
                  isActive
                    ? "text-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    } origin-left`}
                  ></span>
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;