import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Skull, Ghost } from "lucide-react";

// Integrated Spooky Nostalgia Cafe Data
const c = {
  name: "Nostalgia Cafe",
  nameParts: {
    primary: "Nostalgia",
    accent: "Cafe"
  },
  phone: "919878705823",
  phoneDisplay: "+91 98787 05823",
  addressFull: "F, 21A, F Block Vijay Nagar (opposite NDPL Office), GTB Nagar, Delhi, 110033",
  mapsLink: "https://maps.app.goo.gl/QEPbURnF19ad3KqQ6",
  instagram: "https://www.instagram.com/nostalgia__cafe_/?hl=en", 
  hours: "12:00 PM - 10:30 PM, Monday - Sunday",
  footerDescription: "GTB Nagar's most immersive horror cafe. Step into the shadows for comfort food, board games, and an atmosphere you'll never forget... or escape.",
  popularItems: [
    "Cursed Cold Coffee",
    "Bloody Arrabbiata Penne",
    "The Final Burger",
    "Chilli Paneer (Spiced in Hell)"
  ]
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-stone-400 relative overflow-hidden border-t border-[#dc2626]/20">
      
      {/* Cursed Ambient Elements */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626]/50 to-transparent shadow-[0_0_15px_#dc2626]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#450a0a]/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-black blur-3xl pointer-events-none" />

      {/* Global Scanline (Consistent with Home/Navbar) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px]" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl font-bold mb-6 flex items-center gap-2 italic uppercase tracking-tighter">
              <span className="text-[#dc2626] drop-shadow-[0_0_10px_#dc2626]">{c.nameParts.primary}</span>
              <span className="text-white">{c.nameParts.accent}</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 font-medium">
              {c.footerDescription}
            </p>
            <div className="flex gap-4">
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#dc2626] hover:border-[#dc2626] hover:shadow-[0_0_15px_#dc2626] transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-black mb-6 text-xs uppercase tracking-[0.3em] text-white italic">Navigate</h4>
            <ul className="space-y-4 text-sm">
              {[
                { to: "/",        label: "Home"    },
                { to: "/menu",    label: "Menu"    },
                { to: "/about",   label: "About"   },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-stone-500 font-bold hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                    <span className="w-0 h-px bg-[#dc2626] group-hover:w-4 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items */}
          <div>
            <h4 className="font-black mb-6 text-xs uppercase tracking-[0.3em] text-white italic">Cursed Bites</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              {c.popularItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Skull size={14} className="text-[#dc2626]/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-6 text-xs uppercase tracking-[0.3em] text-white italic">Find Us</h4>
            <ul className="space-y-6 text-sm text-stone-500 font-medium">
              <li>
                <a href={c.mapsLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-white transition-colors group">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626]" />
                  <span className="leading-relaxed">{c.addressFull}</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${c.phone}`}
                  className="flex items-center gap-4 hover:text-white transition-colors group">
                  <Phone size={20} className="shrink-0 text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626]" />
                  {c.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-stone-600 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {c.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-red-900 font-black uppercase tracking-widest animate-pulse">
            <Ghost size={14} />
            <span>{c.hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;