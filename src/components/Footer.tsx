import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";

// Integrated Aura Cafe Data with Live Links
const c = {
  name: "The Aura Cafe",
  nameParts: {
    white: "The Aura",
    accent: "Cafe"
  },
  phone: "919871712300",
  phoneDisplay: "+91 98717 12300",
  addressFull: "3, DDA Market Complex, near TPDDL Office, Hudson Lane, GTB Nagar, Delhi, 110033",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Aura+Cafe+Hudson+Lane+Delhi",
  instagram: "https://www.instagram.com/the_aura_cafe_india/", 
  hours: "11:00 AM - 11:00 PM, Monday - Sunday",
  footerDescription: "Your peaceful retreat in GTB Nagar. Serving up global flavors, cozy vibes, and warm hospitality every single day.",
  popularItems: [
    "Honey Chilli Potatoes",
    "Veg Pizza",
    "Peri Peri Chicken Wings",
    "Veg Grilled Sandwich"
  ]
};

const Footer = () => {
  return (
    <footer className="bg-pink-900 text-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl font-bold mb-4">
              <span className="text-white">{c.nameParts.white}</span>
              <span className="text-pink-300"> {c.nameParts.accent}</span>
            </h3>
            <p className="text-pink-100/70 text-sm leading-relaxed mb-6">
              {c.footerDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pink-100/80 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-pink-300/60">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/",        label: "Home"    },
                { to: "/menu",    label: "Menu"    },
                { to: "/about",   label: "About"   },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-pink-100/70 hover:text-pink-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-pink-300/60">Popular</h4>
            <ul className="space-y-3 text-sm text-pink-100/70">
              {c.popularItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-pink-300/60">Contact</h4>
            <ul className="space-y-4 text-sm text-pink-100/70">
              <li>
                <a href={c.mapsLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-pink-300 transition-colors group">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-pink-400 group-hover:text-pink-300" />
                  <span className="leading-relaxed">{c.addressFull}</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${c.phone}`}
                  className="flex items-center gap-3 hover:text-pink-300 transition-colors group">
                  <Phone size={18} className="shrink-0 text-pink-400 group-hover:text-pink-300" />
                  {c.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-100/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-pink-100/50">© {new Date().getFullYear()} {c.name}. All rights reserved.</p>
          <p className="text-xs text-pink-100/50">{c.hours}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;