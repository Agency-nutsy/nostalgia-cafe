import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";

// Integrated Kiiza Cafe & Lounge Data with Live Links
const c = {
  name: "Kiiza Cafe and Lounge",
  nameParts: {
    white: "Kiiza",
    accent: "Cafe"
  },
  phone: "919654133100",
  phoneDisplay: "+91 96541 33100",
  addressFull: "2648 first floor, Hudson Ln, GTB Nagar, Delhi, 110009",
  mapsLink: "https://maps.app.goo.gl/ixVpXR1qz3tq7ErP6",
  instagram: "https://www.instagram.com/kiizadelhicafe/", 
  hours: "11:00 AM - 12:00 AM, Monday - Sunday",
  footerDescription: "Your vibrant lounge in GTB Nagar. Serving up multi-cuisine mastery, electric nights, and premium cocktails every single day.",
  popularItems: [
    "Stuffed Murg Tangdi",
    "Signature Biryani",
    "Peri Peri Chicken Pizza",
    "Classic Dirty Martini"
  ]
};

const Footer = () => {
  return (
    <footer className="bg-[#CF9FFF] text-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-white/30 blur-3xl" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl font-bold mb-4">
              <span className="text-gray-900">{c.nameParts.white}</span>
              <span className="text-white"> {c.nameParts.accent}</span>
            </h3>
            <p className="text-gray-800 text-sm leading-relaxed mb-6 font-medium">
              {c.footerDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-gray-900 hover:bg-white hover:text-[#A855F7] hover:shadow-md transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-900">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/",        label: "Home"    },
                { to: "/menu",    label: "Menu"    },
                { to: "/about",   label: "About"   },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-800 font-medium hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-900">Popular</h4>
            <ul className="space-y-3 text-sm text-gray-800 font-medium">
              {c.popularItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-900">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-800 font-medium">
              <li>
                <a href={c.mapsLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-white" />
                  <span className="leading-relaxed">{c.addressFull}</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${c.phone}`}
                  className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Phone size={18} className="shrink-0 text-white" />
                  {c.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-800 font-medium">© {new Date().getFullYear()} {c.name}. All rights reserved.</p>
          <p className="text-xs text-gray-800 font-medium">{c.hours}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;