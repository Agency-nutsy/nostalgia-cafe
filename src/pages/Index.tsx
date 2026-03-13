import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, BookOpen, Star, MapPin, Phone, Coffee, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react"; 
import ScrollReveal from "@/components/ScrollReveal";

// Assets
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

// Animations
import ghostAnimation from "@/assets/ghost.json";
import spookyGhostLoader from "@/assets/Spooky Ghost Loader.json"; 
import batAnimation from "@/assets/bat.json"; 
import bloodSplat from "@/assets/blood.png"; 

// The Exact Coffin Shape
const COFFIN_PATH = "polygon(25% 0%, 75% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)";

// ── HELPER FOR BLOOD PLACEMENT ──
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
      filter: 'brightness(0.5) contrast(1.15)' 
    }}
  />
);

// Top Reviews from Google Maps (4 & 5 Stars Only)
const reviews = [
  {
    name: "Arjun Sharma",
    rating: 5,
    text: "The vibe here is unmatched! The floating candles and the whole board game collection make it the perfect spot to chill with friends. Highly recommend their pizzas!",
  },
  {
    name: "Priya Verma",
    rating: 5,
    text: "Literally the coziest cafe in GTB Nagar. It's super pocket-friendly and the aesthetic is just 10/10. Perfect for a nostalgic evening.",
  },
  {
    name: "Rohan Mehra",
    rating: 4,
    text: "Great place for a group hangout. The Peri Peri fries and Shakes are delicious. Love that they have so many board games to keep us busy.",
  },
  {
    name: "Ishita Kapoor",
    rating: 5,
    text: "Stepping into this cafe feels like entering a different world. The interior is beautiful and the staff is very welcoming. A must-visit!",
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

  // ── REVIEWS CAROUSEL LOGIC ──
  const [reviewIdx, setReviewIdx] = useState(0);
  const nextReview = () => setReviewIdx((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setReviewIdx((prev) => (prev - 1 + reviews.length) % reviews.length);

  // ── AMBIENT BATS LOGIC ──
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
    const initialTimer = setTimeout(() => {
      triggerSwarm();
    }, 4000); 

    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const nextDelay = Math.floor(Math.random() * (35000 - 30000 + 1)) + 30000;
      timer = setTimeout(() => {
        triggerSwarm();
        scheduleNext();
      }, nextDelay);
    };

    scheduleNext();
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer);
    };
  }, [triggerSwarm]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(p => (p + 1) % 3), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a0101] min-h-screen text-stone-300 relative overflow-x-hidden selection:bg-[#dc2626]">
      
      {/* ── AMBIENT BATS LAYER ── */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {isSwarming && flockOffsets.length > 0 && (
            <React.Fragment key={swarmId}>
              {flockOffsets.map((offset, i) => (
                <motion.div
                  key={`left-bat-${i}`}
                  className="absolute w-[200px] h-auto" 
                  style={{ marginLeft: `${offset.x}px`, marginTop: `${offset.y}px` }}
                  initial={{ top: "85%", left: "-15%", opacity: 0 }}
                  animate={{ top: "-20%", left: "115%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4.5, delay: offset.d, ease: "linear" }}
                >
                  <Lottie animationData={batAnimation} loop={true} />
                </motion.div>
              ))}
              {flockOffsets.map((offset, i) => (
                <motion.div
                  key={`right-bat-${i}`}
                  className="absolute w-[200px] h-auto"
                  style={{ marginRight: `${offset.x}px`, marginTop: `${offset.y}px` }}
                  initial={{ top: "85%", right: "-15%", opacity: 0 }}
                  animate={{ top: "-20%", right: "115%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4.5, delay: offset.d, ease: "linear" }}
                >
                  <div style={{ transform: "scaleX(-1)" }}>
                    <Lottie animationData={batAnimation} loop={true} />
                  </div>
                </motion.div>
              ))}
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.img 
            key={i} src={slide} 
            className="absolute inset-0 w-full h-full object-cover" 
            animate={{ opacity: i === currentSlide ? 1 : 0 }} 
            transition={{ duration: 1.2 }} 
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#1a0101] z-10" />
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <BloodSplat style={{ bottom: '2%', left: '5%' }} size={350} rotate={15} opacity={0.12} />
           <BloodSplat style={{ bottom: '5%', right: '8%' }} size={280} rotate={-20} opacity={0.1} />
        </div>

        <div className="container relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#dc2626] text-xs font-bold tracking-[0.4em] mb-6 block uppercase drop-shadow-[0_0_10px_#dc2626]">Food. Board Games. Good Vibes.</span>
            <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-6 uppercase italic tracking-tighter" style={{ textShadow: "0 0 20px #dc2626" }}>Welcome to Nostalgia</h1>
            <p className="text-xl md:text-2xl text-white mb-4 italic font-display">Your Cozy Neighborhood Escape.</p>
            <p className="max-w-xl text-stone-400 mb-10 leading-relaxed font-display">Step into our world of floating candles, comfortable seating, and vintage games. Relive the good times with friends at GTB Nagar.</p>
            <div className="flex flex-wrap gap-6">
              <a href="tel:919878705823" className="bg-[#dc2626] text-white px-10 py-4 font-bold uppercase tracking-widest hover:shadow-[0_0_20px_#dc2626] transition-all">Reserve Table</a>
              <Link to="/menu" className="border-2 border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">The Menu</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR (Red Section) ── */}
      <section className="py-24 bg-[#1a0101] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <BloodSplat style={{ top: '10%', left: '20%' }} size={400} rotate={45} opacity={0.15} />
           <BloodSplat style={{ bottom: '15%', right: '15%' }} size={320} rotate={110} opacity={0.12} />
           <BloodSplat style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} size={250} rotate={0} opacity={0.08} />
        </div>

        <div className="container relative z-10">
          <div className="absolute inset-0 pointer-events-none z-50">
            <motion.div
              className="absolute w-20 h-20"
              style={{ x: "-50%", y: "-50%" }} 
              animate={{
                top: ["0%", "0%", "100%", "100%", "0%"],
                left: ["0%", "100%", "100%", "0%", "0%"],
              }}
              transition={{
                duration: 20, 
                repeat: Infinity,
                ease: "linear", 
                times: [0, 0.4, 0.5, 0.9, 1] 
              }}
            >
              <Lottie animationData={ghostAnimation} loop={true} className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-[#dc2626]/30 bg-black/40 backdrop-blur-sm relative">
            {[
              { label: "Cost for Two", value: "₹450" },
              { label: "Board Games", value: "20+" },
              { label: "Hours Open", value: "10.5" },
              { label: "Vibe", value: "100%" }
            ].map((stat) => (
              <div key={stat.label} className="p-10 text-center border-r border-b border-[#dc2626]/10 last:border-0">
                <p className="text-4xl md:text-5xl font-display font-black text-white" style={{ textShadow: "0 0-10px #dc2626" }}>{stat.value}</p>
                <p className="text-[10px] text-[#dc2626] font-bold uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (Subtle Red Section) ── */}
      <section className="py-32 bg-black/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <BloodSplat style={{ top: '20%', left: '5%' }} size={300} rotate={160} opacity={0.1} />
           <BloodSplat style={{ bottom: '20%', right: '5%' }} size={350} rotate={20} opacity={0.12} />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Versatile Menu", desc: "A pocket-friendly mix of Chinese, Italian, Pizzas, Burgers, and shakes.", icon: UtensilsCrossed },
              { title: "Board Games & Books", desc: "Unplug and unwind with our huge collection of board games and novels.", icon: BookOpen },
              { title: "Aesthetic Vibe", desc: "Warm lighting, checkered floors, and floating candles for the perfect vibe.", icon: Coffee }
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative h-full group">
                  <div className="absolute inset-0 pointer-events-none z-50">
                    <motion.div
                      className="absolute w-12 h-12"
                      style={{ x: "-50%", y: "-50%" }}
                      animate={{
                        top: ["0%", "0%", "100%", "100%", "0%"],
                        left: ["0%", "100%", "100%", "0%", "0%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.25, 0.5, 0.75, 1]
                      }}
                    >
                      <Lottie animationData={ghostAnimation} loop={true} className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  <div className="p-12 bg-black border border-white/5 hover:border-[#dc2626]/40 transition-all text-center h-full">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 mx-auto text-[#dc2626] group-hover:shadow-[0_0_20px_#dc2626] transition-all"><f.icon size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase">{f.title}</h3>
                    <p className="text-stone-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE BITES (Black Section) ── */}
      <section className="py-40 bg-black">
        <div className="container text-center">
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-24 uppercase italic" style={{ textShadow: "0 0 20px #dc2626" }}>Signature Bites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[dish1, dish2, dish3, dish4].map((img, i) => (
              <ScrollReveal key={i}>
                <div className="group relative flex flex-col items-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none z-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-24 transition-all duration-700 ease-out">
                    <Lottie animationData={spookyGhostLoader} loop={true} />
                  </div>
                  <div className="w-full max-w-[280px] aspect-[2/3] transition-all duration-500 hover:drop-shadow-[0_0_25px_#dc2626] relative z-10">
                    <div className="w-full h-full bg-[#1a0101] relative" style={{ clipPath: COFFIN_PATH }}>
                      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm italic font-display">Cursed Item {i + 1}</h3>
                    <span className="text-[#dc2626] font-mono text-xs font-bold">₹249</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMBIANCE SECTION (Red Section) ── */}
      <section className="py-40 bg-[#1a0101] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <BloodSplat style={{ top: '5%', right: '10%' }} size={420} rotate={-45} opacity={0.15} />
           <BloodSplat style={{ bottom: '10%', left: '5%' }} size={380} rotate={130} opacity={0.13} />
           <BloodSplat style={{ top: '40%', left: '40%' }} size={250} rotate={10} opacity={0.1} />
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative flex justify-center">
            <div className="w-full max-w-sm aspect-[3/4] hover:drop-shadow-[0_0_30px_#dc2626] transition-all duration-500">
              <div className="w-full h-full bg-black" style={{ clipPath: COFFIN_PATH }}>
                <img src={gallery1} className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-4 w-48 h-64 hover:drop-shadow-[0_0_20px_#dc2626] transition-all duration-500">
               <div className="w-full h-full bg-black border-4 border-[#1a0101]" style={{ clipPath: COFFIN_PATH }}>
                  <img src={gallery2} className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
          <div className="text-center md:text-left font-display">
            <h2 className="text-4xl font-display font-bold text-white mb-8 uppercase italic" style={{ textShadow: "0 0-10px #dc2626" }}>Relive The Good Times</h2>
            <p className="text-stone-400 leading-relaxed mb-10 text-xl italic">Located opposite the NDPL Office in GTB Nagar, Nostalgia Cafe is where great food meets an unforgettable, cozy atmosphere.</p>
            <Link to="/gallery" className="text-[#dc2626] font-black uppercase text-sm tracking-[0.4em] hover:tracking-[0.6em] transition-all border-b border-[#dc2626] pb-1">Explore Gallery →</Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS SECTION (New Carousel) ── */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-16 uppercase italic" style={{ textShadow: "0 0 15px #dc2626" }}>Voices From The Crypt</h2>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto px-12">
            <div className="absolute top-0 left-0 text-[#dc2626]/20 -translate-x-4 -translate-y-8">
              <Quote size={80} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#1a0101]/40 border border-[#dc2626]/30 p-10 md:p-16 rounded-3xl backdrop-blur-sm shadow-[0_0_20px_rgba(220,38,38,0.1)]"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[reviewIdx].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-[#dc2626] text-[#dc2626]" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white italic font-display leading-relaxed mb-8">
                  "{reviews[reviewIdx].text}"
                </p>
                <h4 className="text-[#dc2626] font-bold uppercase tracking-widest text-sm">
                  — {reviews[reviewIdx].name}
                </h4>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Buttons */}
            <button 
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full border border-[#dc2626]/50 flex items-center justify-center text-white hover:bg-[#dc2626] hover:shadow-[0_0_15px_#dc2626] transition-all z-20"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full border border-[#dc2626]/50 flex items-center justify-center text-white hover:bg-[#dc2626] hover:shadow-[0_0_15px_#dc2626] transition-all z-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="mt-12">
             <a 
               href="https://maps.app.goo.gl/FJ2LZBoiFk5SLKpG6" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-stone-500 hover:text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em] transition-colors"
             >
               View All Google Reviews →
             </a>
          </div>
        </div>
      </section>

      {/* ── VISIT THE CRYPT ── */}
      <section className="py-40 bg-black">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white uppercase italic tracking-widest" style={{ textShadow: "0 0 10px #dc2626" }}>Visit the Crypt</h2>
            <div className="space-y-8">
               <a 
                 href="https://www.google.com/maps/search/Nostalgia+Cafe,+Vijay+Nagar,+Delhi" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-start justify-center md:justify-start gap-6 group hover:text-white transition-colors"
               >
                  <MapPin size={24} className="text-[#dc2626] mt-1 shrink-0" />
                  <p className="text-stone-300 text-xl font-display leading-tight group-hover:text-white transition-colors">
                    F-21A, Ground Floor, Vijay Nagar,<br />
                    Opp. NDPL Office, Block F, GTB Nagar,<br />
                    Delhi 110009
                  </p>
               </a>
               <div className="flex items-center justify-center md:justify-start gap-6 group">
                  <Phone size={24} className="text-[#dc2626]" />
                  <p className="text-stone-300 text-xl font-display">+91 98787 05823</p>
               </div>
            </div>
          </div>

          <div className="h-[450px] border border-[#dc2626]/20 bg-black shadow-2xl overflow-hidden relative group">
             <iframe 
               src="https://maps.google.com/maps?q=Nostalgia+Cafe,+Vijay+Nagar,+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             />
             <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[#dc2626]/30 transition-all duration-500" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;