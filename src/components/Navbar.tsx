import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "919878705823";

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
          ? "bg-white/90 backdrop-blur-md border-b border-[#F0E6E8] shadow-sm"
          : "bg-transparent py-2"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        
        {/* LOGO */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight flex gap-1">
          <span className="text-[#C597A6]">Nostalgia</span>
          <span className="text-stone-700">Cafe</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-medium transition-colors relative py-1 block ${
                  location.pathname === l.to
                    ? "text-[#C597A6]"
                    : "text-stone-500 hover:text-[#D4A5B4]"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-[#D4A5B4]"
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
          className={`hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
            showSolid
              ? "bg-[#D4A5B4] text-white hover:bg-[#C28EA0] hover:shadow-sm"
              : "bg-white/50 backdrop-blur-sm text-stone-600 border border-[#E8D6D9] hover:bg-white hover:border-[#D4A5B4]"
          }`}
        >
          <Phone size={16} />
          Call Us
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 transition-colors text-stone-600 hover:text-[#C597A6]"
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
            className="md:hidden border-t border-[#F0E6E8] bg-white/95 backdrop-blur-xl overflow-hidden shadow-xl"
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
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === l.to
                        ? "bg-[#FDF8F9] text-[#C597A6] shadow-sm border border-[#F0E6E8]"
                        : "text-stone-600 hover:bg-[#FCF9F9] hover:text-[#D4A5B4]"
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
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D4A5B4] text-white text-sm font-medium text-center mt-2 border border-[#D4A5B4] hover:bg-[#C28EA0] transition-colors"
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