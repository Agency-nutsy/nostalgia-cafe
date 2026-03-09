import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "919654133100";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-white/90 backdrop-blur-md border-b border-[#D8B4FE] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        
        {/* LOGO */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          <span className={showSolid ? "text-[#A855F7]" : "text-white drop-shadow-md"}>Kiiza</span>
          <span className={showSolid ? "text-gray-900" : "text-white/90 drop-shadow-md"}> Cafe</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-semibold transition-colors relative py-1 block ${
                  location.pathname === l.to
                    ? showSolid ? "text-[#A855F7]" : "text-[#CF9FFF]"
                    : showSolid ? "text-gray-600 hover:text-[#A855F7]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full ${showSolid ? "bg-[#A855F7]" : "bg-[#CF9FFF]"}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={`tel:+${PHONE}`}
          className={`hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
            showSolid
              ? "bg-[#CF9FFF] text-gray-900 hover:bg-[#b07dff] hover:shadow-lg hover:shadow-purple-200"
              : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
          }`}
        >
          <Phone size={16} />
          Call Us
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 transition-colors ${showSolid ? "text-gray-800 hover:text-[#A855F7]" : "text-white hover:text-[#CF9FFF]"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#D8B4FE] bg-white/95 backdrop-blur-xl overflow-hidden shadow-xl"
          >
            <ul className="flex flex-col p-4 gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                      location.pathname === l.to
                        ? "bg-[#F5F0FF] text-[#A855F7] shadow-sm border border-[#D8B4FE]"
                        : "text-gray-700 hover:bg-[#F5F0FF] hover:text-[#A855F7]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <a
                  href={`tel:+${PHONE}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#CF9FFF] text-gray-900 text-sm font-bold text-center mt-2 border border-[#CF9FFF] hover:bg-[#b07dff] transition-colors"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;