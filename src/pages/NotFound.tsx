import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Ghost, Home } from "lucide-react";
import { motion } from "framer-motion";
import bloodSplat from "@/assets/blood.png"; 

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Attempted access to dead route:", location.pathname);
  }, [location.pathname]);

  // ── HELPER FOR BLOOD PLACEMENT (No containers, just the image) ──
  const BloodSplat = ({ style, rotate, size, opacity }: any) => (
    <img 
      src={bloodSplat}
      alt=""
      className="absolute pointer-events-none select-none z-0 border-none outline-none bg-transparent"
      style={{ 
        ...style, 
        width: size, 
        height: 'auto', 
        transform: `rotate(${rotate}deg)`, 
        opacity: opacity,
        filter: 'brightness(0.6) contrast(1.2)' 
      }}
    />
  );

  return (
    <div className="relative min-h-screen w-full bg-[#1a0101] text-stone-300 font-sans overflow-hidden flex items-center justify-center">
      
      {/* ── BLOOD TEXTURE LAYER (9-POINT BALANCED GRID) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Row */}
        <BloodSplat style={{ top: '5%', left: '5%' }} size={350} rotate={15} opacity={0.25} />
        <BloodSplat style={{ top: '-8%', left: '50%', transform: 'translateX(-50%)' }} size={250} rotate={110} opacity={0.15} />
        <BloodSplat style={{ top: '10%', right: '2%' }} size={300} rotate={-45} opacity={0.2} />

        {/* Middle Row */}
        <BloodSplat style={{ top: '40%', left: '-5%' }} size={280} rotate={80} opacity={0.18} />
        {/* Faint Center Splash */}
        <BloodSplat style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} size={220} rotate={0} opacity={0.12} />
        <BloodSplat style={{ top: '45%', right: '-10%' }} size={320} rotate={190} opacity={0.22} />

        {/* Bottom Row */}
        <BloodSplat style={{ bottom: '5%', left: '10%' }} size={180} rotate={45} opacity={0.3} />
        <BloodSplat style={{ bottom: '-5%', left: '45%' }} size={300} rotate={-20} opacity={0.15} />
        <BloodSplat style={{ bottom: '15%', right: '5%' }} size={350} rotate={130} opacity={0.25} />
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="text-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-[#dc2626] shadow-[0_0_30px_rgba(220,38,38,0.3)] border border-[#dc2626]/20">
            <Ghost size={48} />
          </div>
        </motion.div>
        
        <motion.h1 
          className="mb-2 text-7xl md:text-9xl font-display font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="mb-4 text-2xl md:text-3xl font-display font-semibold text-[#dc2626] italic uppercase tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Page Buried
        </motion.h2>
        
        <motion.p 
          className="mb-8 text-lg text-stone-400 max-w-md mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The route you requested has been consumed by the abyss.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-10 py-4 font-bold uppercase tracking-widest text-sm text-white hover:bg-[#b91c1c] hover:shadow-[0_0_40px_#dc2626] transition-all duration-300"
          >
            <Home size={18} />
            Return to Living
          </Link>
        </motion.div>
      </div>

      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#dc2626] opacity-[0.04] blur-[150px] z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#dc2626] opacity-[0.04] blur-[150px] z-0" />
    </div>
  );
};

export default NotFound;