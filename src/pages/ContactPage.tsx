import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

// Integrated Aura Cafe Data with Live Links
const c = {
  name: "The Aura Cafe",
  phone: "919871712300",
  phoneDisplay: "+91 98717 12300",
  addressFull: "3, DDA Market Complex, near TPDDL Office, Hudson Lane, GTB Nagar, Delhi, 110033",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Aura+Cafe+Hudson+Lane+Delhi",
  mapsEmbed: "https://maps.google.com/maps?q=The%20Aura%20Cafe%20Hudson%20Lane%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  instagram: "https://www.instagram.com/the_aura_cafe_india/" 
};

const PHONE = c.phone;
const PHONE_DISPLAY = c.phoneDisplay;
const ADDRESS = c.addressFull;
const MAPS_LINK = c.mapsLink;
const MAPS_EMBED = c.mapsEmbed;
const WHATSAPP = `https://wa.me/${PHONE}`;
const INSTAGRAM = c.instagram;

const ContactPage = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FBCFE8]/10 min-h-screen text-gray-800">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Contact Us</h1>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Have a question or want to place an order? Reach out to us directly.
            </p>
            <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            <motion.a
              href={`tel:+${PHONE}`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#FBCFE8] text-gray-900 px-6 py-5 font-semibold text-lg shadow-lg shadow-[#FBCFE8]/20 hover:shadow-xl hover:shadow-[#FBCFE8]/50 transition-all hover:bg-[#f9a8d4]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={22} className="text-[#be185d]" />
              Call Us
            </motion.a>
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white px-6 py-5 font-semibold text-lg shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={22} />
              WhatsApp Us
            </motion.a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info Cards */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#FBCFE8] hover:border-[#be185d] shadow-sm transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FBCFE8]/40 flex items-center justify-center shrink-0 group-hover:bg-[#FBCFE8]/80 transition-colors">
                  <MapPin size={20} className="text-[#be185d]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Address</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{ADDRESS}</p>
                </div>
              </a>

              <a
                href={`tel:+${PHONE}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#FBCFE8] hover:border-[#be185d] shadow-sm transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FBCFE8]/40 flex items-center justify-center shrink-0 group-hover:bg-[#FBCFE8]/80 transition-colors">
                  <Phone size={20} className="text-[#be185d]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Phone</h4>
                  <p className="text-sm text-gray-500">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-white border border-[#FBCFE8] shadow-sm">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#FBCFE8]/20 flex items-center justify-center text-[#be185d] hover:bg-[#FBCFE8] hover:text-gray-900 transition-all duration-300 border border-[#FBCFE8]"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Google Maps */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden border border-[#FBCFE8] shadow-sm h-72 md:h-full min-h-[280px] bg-white p-1">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${c.name} Location`}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;