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
      className="fixed bottom-[102px] right-[22px] z-40 w-[56px] h-[56px] rounded-full flex items-center justify-center bg-black border border-[#dc2626]/30 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_#dc2626] transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get Directions"
    >
      {/* Red Pin with a subtle glow on hover */}
      <MapPin className="w-6 h-6 text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626] transition-all" />
      
      {/* Subtle outer pulse effect */}
      <div className="absolute inset-0 rounded-full bg-[#dc2626] opacity-0 group-hover:opacity-5 blur-md transition-opacity" />
    </motion.a>
  );
};

export default DirectionsButton;