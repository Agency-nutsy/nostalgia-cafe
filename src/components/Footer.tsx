import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";

// Integrated Nostalgia Cafe Data
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
  footerDescription: "Your cozy, pink-hued neighborhood spot in GTB Nagar. Come for the comfort food, stay for the board games, novels, and unforgettable aesthetic.",
  popularItems: [
    "Signature Cold Coffee",
    "Spicy Arrabbiata Penne",
    "Classic Veggie Burger",
    "Chilli Paneer Dry"
  ]
};

const Footer = () => {
  return (
    <footer className="bg-[#FCF9F9] text-stone-700 relative overflow-hidden border-t border-[#F0E6E8]">
      {/* Soft ambient background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8D6D9] to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#FDF8F9] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-white blur-3xl pointer-events-none" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl font-bold mb-4 flex gap-1.5">
              <span className="text-[#C597A6]">{c.nameParts.primary}</span>
              <span className="text-stone-700">{c.nameParts.accent}</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 font-medium">
              {c.footerDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white border border-[#F0E6E8] flex items-center justify-center text-[#C597A6] hover:bg-[#D4A5B4] hover:text-white hover:border-[#D4A5B4] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-800">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/",        label: "Home"    },
                { to: "/menu",    label: "Menu"    },
                { to: "/about",   label: "About"   },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-stone-500 font-medium hover:text-[#C597A6] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-800">Popular</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              {c.popularItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-stone-800">Contact</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li>
                <a href={c.mapsLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-[#C597A6] transition-colors group">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#D4A5B4]" />
                  <span className="leading-relaxed">{c.addressFull}</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${c.phone}`}
                  className="flex items-center gap-3 hover:text-[#C597A6] transition-colors group">
                  <Phone size={18} className="shrink-0 text-[#D4A5B4]" />
                  {c.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F0E6E8] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 font-medium">© {new Date().getFullYear()} {c.name}. All rights reserved.</p>
          <p className="text-xs text-stone-400 font-medium">{c.hours}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;