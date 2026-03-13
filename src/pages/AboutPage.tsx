import React, { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Lottie from "lottie-react";
import batAnimation from "@/assets/bat.json";
import ghostAnimation from "@/assets/ghost.json"; 
import bloodSplat from "@/assets/blood.png"; 

import cafeImg from "@/assets/hero-slide-3.jpg";
import heroFood from "@/assets/4.webp";
import gallery1 from "@/assets/1.webp";
import gallery2 from "@/assets/2.webp";
import heroSlide1 from "@/assets/hero.webp";
import heroSlide2 from "@/assets/hero 2.webp";

const c = {
  name: "Nostalgia Cafe",
  phone: "+919878705823",
  phoneDisplay: "+91 98787 05823",
  addressFull: "F-21A, Ground Floor, Vijay Nagar, Opp. NDPL Office, Block F, GTB Nagar, Delhi 110009",
  hours: "12:00 PM - 10:30 PM, Monday - Sunday",
  aboutStory: [
    "Step into our world of floating candles, comfortable seating, and vintage games. Located opposite the NDPL Office in GTB Nagar, Nostalgia Cafe is where great food meets an unforgettable, cozy atmosphere.",
    "We set out to create a vibrant neighborhood escape where friends can unplug, unwind, and relive the good times. Our space is designed to captivate with warm lighting, checkered floors, and an aesthetic vibe that feels right at home in the crypt.",
    "Our culinary team has crafted a versatile, pocket-friendly menu that truly offers something for everyone. From comforting Italian pizzas and pastas to zesty Chinese stir-fries, juicy burgers, and shakes, our kitchen delivers bold flavors with every order.",
    "Whether you're here to dive into our huge collection of novels and board games, or feast on our signature cursed bites, our commitment to warm hospitality ensures every visit to Nostalgia is one to remember."
  ],
  valueCards: [
    { title: "Versatile Menu", description: "A pocket-friendly mix of Chinese, Italian, Pizzas, Burgers, and signature shakes." },
    { title: "Board Games & Books", description: "Unplug and unwind with our huge collection of classic board games and novels." },
    { title: "Aesthetic Vibe", description: "Warm lighting, checkered floors, and floating candles for the perfect cozy crypt atmosphere." },
    { title: "Unforgettable Nights", description: "The perfect neighborhood destination in GTB Nagar for celebrations and late-night unwinding." }
  ]
};

const BloodSplat = ({ style, rotate, size, opacity }: any) => (
  <img 
    src={bloodSplat}
    alt=""
    className="absolute pointer-events-none select-none z-0 border-none outline-none"
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

const AboutPage = () => {
  const [swarmId, setSwarmId] = useState(0);
  const [isSwarming, setIsSwarming] = useState(false);
  const [flockOffsets, setFlockOffsets] = useState<{x: number, y: number, d: number}[]>([]);

  const triggerSwarm = useCallback(() => {
    const newOffsets = Array.from({ length: 5 }, () => ({
      x: Math.random() * 70 + 50,  
      y: Math.random() * 120 - 60, 
      d: Math.random() * 0.4       
    }));
    setFlockOffsets(newOffsets);
    setSwarmId(prev => prev + 1);
    setIsSwarming(true);
    setTimeout(() => setIsSwarming(false), 6000);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => triggerSwarm(), 4000); 
    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const nextDelay = Math.floor(Math.random() * (35000 - 30000 + 1)) + 30000;
      timer = setTimeout(() => { triggerSwarm(); scheduleNext(); }, nextDelay);
    };
    scheduleNext();
    return () => { clearTimeout(initialTimer); clearTimeout(timer); };
  }, [triggerSwarm]);

  return (
    <div className="pt-24 bg-[#1a0101] min-h-screen text-stone-300 font-sans selection:bg-[#dc2626] relative overflow-x-hidden">
      
      {/* ── 30-SPLAT BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
        <BloodSplat style={{ top: '1%', left: '5%' }} size={450} rotate={15} opacity={0.25} />
        <BloodSplat style={{ top: '5%', right: '2%' }} size={320} rotate={-25} opacity={0.2} />
        <BloodSplat style={{ top: '10%', left: '40%' }} size={250} rotate={110} opacity={0.15} />
        <BloodSplat style={{ top: '15%', right: '12%' }} size={380} rotate={45} opacity={0.22} />
        <BloodSplat style={{ top: '20%', left: '8%' }} size={210} rotate={190} opacity={0.18} />
        <BloodSplat style={{ top: '25%', right: '40%' }} size={180} rotate={75} opacity={0.15} />
        <BloodSplat style={{ top: '30%', left: '20%' }} size={300} rotate={-20} opacity={0.2} />
        <BloodSplat style={{ top: '35%', right: '5%' }} size={420} rotate={60} opacity={0.25} />
        <BloodSplat style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }} size={260} rotate={0} opacity={0.15} />
        <BloodSplat style={{ top: '45%', left: '10%' }} size={340} rotate={130} opacity={0.22} />
        <BloodSplat style={{ top: '50%', right: '15%' }} size={220} rotate={45} opacity={0.18} />
        <BloodSplat style={{ top: '55%', left: '40%' }} size={350} rotate={15} opacity={0.23} />
        <BloodSplat style={{ top: '60%', right: '10%' }} size={310} rotate={210} opacity={0.15} />
        <BloodSplat style={{ top: '65%', left: '5%' }} size={390} rotate={-10} opacity={0.24} />
        <BloodSplat style={{ top: '70%', right: '25%' }} size={330} rotate={40} opacity={0.2} />
        <BloodSplat style={{ top: '75%', left: '15%' }} size={280} rotate={160} opacity={0.18} />
        <BloodSplat style={{ top: '80%', right: '40%' }} size={360} rotate={-55} opacity={0.23} />
        <BloodSplat style={{ top: '85%', left: '25%' }} size={220} rotate={15} opacity={0.15} />
        <BloodSplat style={{ top: '90%', right: '8%' }} size={410} rotate={70} opacity={0.24} />
        <BloodSplat style={{ top: '95%', left: '50%', transform: 'translateX(-50%)' }} size={190} rotate={120} opacity={0.15} />
        <BloodSplat style={{ bottom: '10%', left: '15%' }} size={400} rotate={45} opacity={0.25} />
        <BloodSplat style={{ bottom: '5%', right: '10%' }} size={350} rotate={110} opacity={0.2} />
        <BloodSplat style={{ bottom: '1%', left: '45%' }} size={300} rotate={-45} opacity={0.15} />
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

      {/* ── HERO BANNER ── */}
      <section className="py-20 bg-[#0a0000] relative overflow-hidden border-b border-[#dc2626]/30 z-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#dc2626] opacity-5 blur-[80px]" />
        <div className="container relative z-10 text-center">
          <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3 italic" style={{ textShadow: "0 0 15px #dc2626" }}>About {c.name}</h1>
          <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-6 rounded-full shadow-[0_0_10px_#dc2626]" />
        </div>
      </section>

      {/* ── MAIN STORY ── */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <ScrollReveal direction="left">
              <div className="relative">
                <img src={cafeImg} className="rounded-2xl w-full h-[420px] object-cover shadow-[0_0_20px_rgba(220,38,38,0.15)] border-2 border-[#dc2626]/20" />
                <img src={heroFood} className="absolute -bottom-8 -right-4 md:-right-8 w-48 h-48 object-cover rounded-2xl border-[4px] border-[#1a0101] shadow-[0_0_20px_rgba(220,38,38,0.2)]" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="md:pl-4 mt-8 md:mt-0">
                <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6 italic">Our Story</h2>
                {c.aboutStory.slice(0, 2).map((para, i) => <p key={i} className="text-stone-400 leading-relaxed text-lg mb-4">{para}</p>)}
              </div>
            </ScrollReveal>
          </div>
          <div className="max-w-3xl mx-auto">
            {c.aboutStory.slice(2).map((para, i) => <ScrollReveal key={i} delay={i * 0.15}><p className="text-stone-400 leading-relaxed text-lg mb-6">{para}</p></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION (SLOW GHOST PATROL) ── */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="container relative">
          
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 italic">Our Values</h2>
              <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-4 rounded-full shadow-[0_0_10px_#dc2626]" />
            </div>
          </ScrollReveal>

          <div className="relative p-1">
            <div className="absolute inset-0 pointer-events-none z-20">
              <motion.div
                className="absolute w-20 h-20"
                style={{ x: "-50%", y: "-50%" }} 
                animate={{
                  top: ["0%", "0%", "100%", "100%", "0%"],
                  left: ["0%", "100%", "100%", "0%", "0%"],
                }}
                transition={{
                  duration: 25, // Synchronized slow speed
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.25, 0.5, 0.75, 1] 
                }}
              >
                <Lottie 
                  animationData={ghostAnimation} 
                  loop={true} 
                  className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-80" 
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.valueCards.map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl bg-black border border-[#dc2626]/30 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:-translate-y-1 transition-all text-center h-full group relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#dc2626] opacity-5 blur-[40px] pointer-events-none group-hover:opacity-20 transition-opacity duration-700 rounded-full" />
                    <div className="w-16 h-16 rounded-2xl bg-[#1a0101] border border-[#dc2626]/30 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#dc2626]/10 transition-colors relative z-10">
                       <div className="w-8 h-8 rounded-full bg-[#dc2626] shadow-[0_0_10px_#dc2626]" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-[#dc2626] transition-colors relative z-10">{card.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed relative z-10">{card.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-20 bg-[#0a0000] border-t border-[#dc2626]/30 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="text-center md:text-left">
                <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Visit The Crypt</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6 italic" style={{ textShadow: "0 0 10px #dc2626" }}>Come Say Hello</h2>
                <p className="text-stone-300 mb-2 text-lg font-medium leading-relaxed">{c.addressFull}</p>
                <p className="text-stone-500 mb-6 text-lg">{c.hours}</p>
                <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-8 py-3 font-bold uppercase tracking-widest text-white hover:shadow-[0_0_20px_#dc2626] transition-all">
                  <Phone size={18} /> {c.phoneDisplay}
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden border border-[#dc2626]/30 shadow-[0_0_20px_rgba(220,38,38,0.15)] w-full h-[300px] md:h-[400px] bg-[#1a0101] group relative">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#dc2626]/40 transition-all duration-500 z-10 pointer-events-none rounded-2xl" />
                <img src={heroSlide1} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;