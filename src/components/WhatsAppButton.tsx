import { motion } from "framer-motion";
import whatsappLogo from "@/assets/whatsapp-logo.jpg";

const WhatsAppButton = () => (
  <motion.a
    // Live WhatsApp link for Kiiza Cafe and Lounge
    href="https://wa.me/919654133100"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp Us"
    className="fixed bottom-6 right-[22px] z-50 w-[56px] h-[56px] rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow overflow-hidden"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <img src={whatsappLogo} alt="WhatsApp" className="w-full h-full object-cover rounded-full" />
  </motion.a>
);

export default WhatsAppButton;