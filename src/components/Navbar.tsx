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
    <>
      <style>{`
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #dc2626, 0 0 20px #dc2626;
          }
          20%, 22%, 24%, 55% { text-shadow: none; }
        }
        .neon-flicker { animation: neonFlicker 4s infinite; }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          showSolid
            ? "bg-[#1a0101]/95 backdrop-blur-md border-b border-[#dc2626]/20 shadow-[0_0_30px_rgba(0,0,0,0.9)]"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          
          {/* LOGO (Eyes removed from here) */}
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-2xl font-bold tracking-tighter flex items-center gap-1 group">
              <span className="text-[#dc2626] drop-shadow-[0_0_8px_#dc2626] uppercase italic neon-flicker">Nostalgia</span>
              <span className="text-white uppercase italic">Cafe</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative py-1 block ${
                    location.pathname === l.to ? "text-white" : "text-stone-500 hover:text-[#dc2626]"
                  }`}
                >
                  {l.label}
                  {location.pathname === l.to && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#dc2626] shadow-[0_0_10px_#dc2626]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={`tel:${PHONE}`}
            className="hidden md:inline-flex items-center gap-2 px-8 py-3 bg-[#dc2626] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            <Phone size={12} /> Reserve
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white hover:text-[#dc2626]">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a0101] border-t border-[#dc2626]/20 overflow-hidden"
            >
              <ul className="flex flex-col p-6 gap-4">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-2xl font-black uppercase italic tracking-tighter ${
                        location.pathname === l.to ? "text-[#dc2626]" : "text-white/40"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;