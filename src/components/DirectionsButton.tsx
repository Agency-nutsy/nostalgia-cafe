import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DirectionsButton = () => {
  // Live Google Maps link for Kiiza Cafe and Lounge
  const mapsUrl = "https://maps.app.goo.gl/ixVpXR1qz3tq7ErP6"; 

  return (
    <motion.a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[102px] right-[22px] z-40 w-[56px] h-[56px] rounded-full shadow-lg shadow-purple-900/10 hover:shadow-xl hover:shadow-purple-200 hover:scale-105 transition-all duration-300 flex items-center justify-center bg-white border border-[#D8B4FE] hover:bg-[#F5F0FF]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get Directions"
    >
      <MapPin className="w-6 h-6 text-[#A855F7]" />
    </motion.a>
  );
};

export default DirectionsButton;