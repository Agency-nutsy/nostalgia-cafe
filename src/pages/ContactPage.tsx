import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

// Integrated Kiiza Cafe & Lounge Data with Live Links
const c = {
  name: "Kiiza Cafe and Lounge",
  phone: "919654133100",
  phoneDisplay: "+91 96541 33100",
  addressFull: "2648 first floor, Hudson Ln, GTB Nagar, Delhi, 110009",
  mapsLink: "https://maps.app.goo.gl/ixVpXR1qz3tq7ErP6",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8894428581843!2d77.2056357!3d28.6929536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd41fdcf3533%3A0xe7d2c457f3d64cd!2sKIIZA%20CAFE%20AND%20LOUNGE!5e0!3m2!1sen!2sin!4v1773041180994!5m2!1sen!2sin",
  instagram: "https://www.instagram.com/kiizadelhicafe/" 
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
    <div className="pt-28 pb-20 bg-[#F5F0FF] min-h-screen text-gray-800 font-sans">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Contact Us</h1>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Ready to book a table or plan a party? Reach out to us directly.
            </p>
            <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            <motion.a
              href={`tel:+${PHONE}`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#CF9FFF] text-gray-900 px-6 py-5 font-semibold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all hover:bg-[#b07dff]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={22} className="text-gray-900" />
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
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#D8B4FE] hover:border-[#CF9FFF] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#E9D5FF] transition-colors border border-[#D8B4FE]">
                  <MapPin size={20} className="text-[#A855F7]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{ADDRESS}</p>
                </div>
              </a>

              <a
                href={`tel:+${PHONE}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#D8B4FE] hover:border-[#CF9FFF] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#E9D5FF] transition-colors border border-[#D8B4FE]">
                  <Phone size={20} className="text-[#A855F7]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Phone</h4>
                  <p className="text-sm text-gray-500">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-white border border-[#D8B4FE] shadow-sm hover:shadow-md transition-all">
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#F5F0FF] flex items-center justify-center text-[#A855F7] hover:bg-[#CF9FFF] hover:text-gray-900 transition-all duration-300 border border-[#D8B4FE]"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Google Maps Fix applied here */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl w-full h-[350px] md:h-[450px] bg-gray-100 flex flex-col">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, flexGrow: 1 }}
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