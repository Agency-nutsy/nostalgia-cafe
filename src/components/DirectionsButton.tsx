import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DirectionsButton = () => {
  // Live Google Maps link for The Aura Cafe
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=The+Aura+Cafe+Hudson+Lane+Delhi"; 

  return (
    <motion.a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[102px] right-[22px] z-40 w-[56px] h-[56px] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center bg-white border border-pink-100"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get Directions"
    >
      <MapPin className="w-6 h-6 text-pink-600" />
    </motion.a>
  );
};

export default DirectionsButton;