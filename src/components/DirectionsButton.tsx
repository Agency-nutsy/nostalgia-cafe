import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DirectionsButton = () => {
  // Live Google Maps link for Nostalgia Cafe
  const mapsUrl = "https://maps.app.goo.gl/QEPbURnF19ad3KqQ6"; 

  return (
    <motion.a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[102px] right-[22px] z-40 w-[56px] h-[56px] rounded-full shadow-md shadow-[#D4A5B4]/20 hover:shadow-lg hover:shadow-[#D4A5B4]/40 hover:scale-105 transition-all duration-300 flex items-center justify-center bg-white border border-[#F0E6E8] hover:bg-[#FDF8F9]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get Directions"
    >
      <MapPin className="w-6 h-6 text-[#C597A6]" />
    </motion.a>
  );
};

export default DirectionsButton;