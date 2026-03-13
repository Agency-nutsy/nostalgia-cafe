import React, { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import batAnimation from "@/assets/bat.json";
import bloodSplat from "@/assets/blood.png"; 

import vibe1 from "@/assets/vibe-1.jpg";
import vibe2 from "@/assets/vibe-2.jpg";
import vibe3 from "@/assets/vibe-5.jpg";
import vibe4 from "@/assets/vibe-6.jpg";
import vibe5 from "@/assets/vibe-3.jpg";
import vibe6 from "@/assets/vibe-4.jpg";
import vibe7 from "@/assets/vibe-7.jpg";
import vibe8 from "@/assets/vibe-8.jpg";
import vibe9 from "@/assets/vibe-9.jpg";
import vibe10 from "@/assets/vibe-10.jpg";

const c = { name: "Nostalgia Cafe" };
const categories = [ { label: "All", value: "all" }, { label: "📸 Ambiance", value: "ambiance" }, { label: "🍹 Drinks & Food", value: "food" } ];
const galleryImages = [
  { img: vibe1, category: "ambiance" }, { img: vibe2, category: "food" }, { img: vibe3, category: "food" },     
  { img: vibe4, category: "ambiance" }, { img: vibe5, category: "food" }, { img: vibe6, category: "ambiance" }, 
  { img: vibe7, category: "food" }, { img: vibe8, category: "food" }, { img: vibe9, category: "ambiance" }, { img: vibe10, category: "ambiance" }, 
];

const BloodSplat = ({ style, rotate, size, opacity }: any) => (
  <img src={bloodSplat} alt="" className="absolute pointer-events-none select-none z-0 border-none outline-none" style={{ ...style, width: size, height: 'auto', transform: `rotate(${rotate}deg)`, opacity: opacity, filter: 'brightness(0.5) contrast(1.1)' }} />
);

const GalleryPage = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? galleryImages : galleryImages.filter((img) => img.category === active);
  const [swarmId, setSwarmId] = useState(0);
  const [isSwarming, setIsSwarming] = useState(false);
  const [flockOffsets, setFlockOffsets] = useState<{x: number, y: number, d: number}[]>([]);

  const triggerSwarm = useCallback(() => {
    const newOffsets = Array.from({ length: 5 }, () => ({ x: Math.random() * 70 + 50, y: Math.random() * 120 - 60, d: Math.random() * 0.4 }));
    setFlockOffsets(newOffsets); setSwarmId(prev => prev + 1); setIsSwarming(true);
    setTimeout(() => setIsSwarming(false), 6000);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => triggerSwarm(), 4000);
    let timer: NodeJS.Timeout;
    const scheduleNext = () => { const nextDelay = Math.floor(Math.random() * (35000 - 30000 + 1)) + 30000; timer = setTimeout(() => { triggerSwarm(); scheduleNext(); }, nextDelay); };
    scheduleNext();
    return () => { clearTimeout(initialTimer); clearTimeout(timer); };
  }, [triggerSwarm]);

  return (
    <div className="pt-24 bg-[#1a0101] min-h-screen text-stone-300 font-sans selection:bg-[#dc2626] relative overflow-x-hidden">

      {/* ── 30-SPLAT BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
        <BloodSplat style={{ top: '2%', left: '3%' }} size={420} rotate={15} opacity={0.25} />
        <BloodSplat style={{ top: '6%', right: '5%' }} size={300} rotate={-25} opacity={0.2} />
        <BloodSplat style={{ top: '15%', left: '40%' }} size={250} rotate={110} opacity={0.15} />
        <BloodSplat style={{ top: '25%', left: '10%' }} size={350} rotate={45} opacity={0.22} />
        <BloodSplat style={{ top: '30%', right: '15%' }} size={280} rotate={190} opacity={0.18} />
        <BloodSplat style={{ top: '40%', left: '-5%' }} size={320} rotate={-10} opacity={0.2} />
        <BloodSplat style={{ top: '45%', right: '8%' }} size={400} rotate={60} opacity={0.25} />
        <BloodSplat style={{ top: '55%', left: '50%', transform: 'translateX(-50%)' }} size={210} rotate={0} opacity={0.15} />
        <BloodSplat style={{ top: '60%', left: '15%' }} size={380} rotate={130} opacity={0.22} />
        <BloodSplat style={{ top: '68%', right: '-5%' }} size={340} rotate={20} opacity={0.2} />
        <BloodSplat style={{ top: '75%', left: '5%' }} size={290} rotate={200} opacity={0.18} />
        <BloodSplat style={{ top: '82%', right: '12%' }} size={360} rotate={70} opacity={0.23} />
        <BloodSplat style={{ top: '90%', left: '45%' }} size={220} rotate={15} opacity={0.15} />
        <BloodSplat style={{ top: '95%', left: '12%' }} size={450} rotate={-30} opacity={0.25} />
        <BloodSplat style={{ top: '18%', right: '40%' }} size={180} rotate={85} opacity={0.15} />
        <BloodSplat style={{ top: '50%', left: '5%' }} size={200} rotate={45} opacity={0.18} />
        <BloodSplat style={{ top: '85%', right: '5%' }} size={310} rotate={-15} opacity={0.2} />
        <BloodSplat style={{ bottom: '10%', left: '8%' }} size={400} rotate={180} opacity={0.25} />
        <BloodSplat style={{ bottom: '5%', right: '2%' }} size={320} rotate={30} opacity={0.2} />
        <BloodSplat style={{ bottom: '1%', left: '50%', transform: 'translateX(-50%)' }} size={260} rotate={-10} opacity={0.15} />
      </div>

      {/* ── BATS LAYER ── */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {isSwarming && flockOffsets.length > 0 && (
            <React.Fragment key={swarmId}>
              {flockOffsets.map((offset, i) => (
                <motion.div key={`left-bat-${i}`} className="absolute w-[200px] h-auto" style={{ marginLeft: `${offset.x}px`, marginTop: `${offset.y}px` }} initial={{ top: "85%", left: "-15%", opacity: 0 }} animate={{ top: "-20%", left: "115%", opacity: [0, 1, 1, 0] }} transition={{ duration: 4.5, delay: offset.d, ease: "linear" }}>
                  <Lottie animationData={batAnimation} loop={true} />
                </motion.div>
              ))}
              {flockOffsets.map((offset, i) => (
                <motion.div key={`right-bat-${i}`} className="absolute w-[200px] h-auto" style={{ marginRight: `${offset.x}px`, marginTop: `${offset.y}px` }} initial={{ top: "85%", right: "-15%", opacity: 0 }} animate={{ top: "-20%", right: "115%", opacity: [0, 1, 1, 0] }} transition={{ duration: 4.5, delay: offset.d, ease: "linear" }}>
                  <div style={{ transform: "scaleX(-1)" }}><Lottie animationData={batAnimation} loop={true} /></div>
                </motion.div>
              ))}
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>

      {/* ── BANNER ── */}
      <section className="py-20 bg-[#0a0000] relative overflow-hidden border-b border-[#dc2626]/30 z-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#dc2626] opacity-5 blur-[80px]" />
        <div className="container relative z-10 text-center">
          <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3 italic" style={{ textShadow: "0 0 15px #dc2626" }}>Gallery</h1>
          <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-6 rounded-full shadow-[0_0_10px_#dc2626]" />
        </div>
      </section>

      {/* ── FILTER ── */}
      <section className="pt-10 pb-0 bg-transparent relative z-10">
        <div className="container">
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setActive(cat.value)} className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${active === cat.value ? "bg-[#dc2626] text-white border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "bg-black text-stone-400 border-[#dc2626]/30 hover:border-[#dc2626] hover:text-white hover:bg-[#0a0000]"}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-10 bg-transparent relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div key={item.img + i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} layout>
                  <ScrollReveal delay={i * 0.05}>
                    <div className="rounded-2xl overflow-hidden aspect-square group bg-black border border-[#dc2626]/30 shadow-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:-translate-y-1 transition-all relative">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-[#0a0000]/0 group-hover:bg-[#dc2626]/20 transition-colors duration-500 pointer-events-none" />
                    </div>
                  </ScrollReveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;