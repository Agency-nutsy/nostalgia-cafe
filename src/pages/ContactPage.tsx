import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Lottie from "lottie-react";
import batAnimation from "@/assets/bat.json";
import bloodSplat from "@/assets/blood.png"; // Imported blood asset

// Integrated Nostalgia Cafe Data with Live Links
const c = {
  name: "Nostalgia Cafe",
  phone: "919878705823",
  phoneDisplay: "+91 98787 05823",
  addressFull: "F-21A, Ground Floor, Vijay Nagar, Opp. NDPL Office, Block F, GTB Nagar, Delhi 110009",
  mapsLink: "https://maps.app.goo.gl/YAEX5dzdQMLNnhgcA",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.854798933474!2d77.204261!3d28.693989799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4af48bad2f%3A0x99ab93f9859654f9!2sNostalgia%20Cafe!5e0!3m2!1sen!2sin!4v1773340088337!5m2!1sen!2sin",
  instagram: "https://www.instagram.com/nostalgia__cafe_/?hl=en" 
};

const PHONE = c.phone;
const PHONE_DISPLAY = c.phoneDisplay;
const ADDRESS = c.addressFull;
const MAPS_LINK = c.mapsLink;
const MAPS_EMBED = c.mapsEmbed;
const WHATSAPP = `https://wa.me/${PHONE}`;
const INSTAGRAM = c.instagram;

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

const ContactPage = () => {
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

  return (
    <div className="pt-28 pb-20 bg-[#1a0101] min-h-screen text-stone-300 font-sans selection:bg-[#dc2626] relative">
      
      {/* ── 30-SPLAT HEAVY BLOOD TEXTURE LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top 20% */}
        <BloodSplat style={{ top: '2%', left: '4%' }} size={450} rotate={15} opacity={0.14} />
        <BloodSplat style={{ top: '6%', right: '5%' }} size={320} rotate={-25} opacity={0.11} />
        <BloodSplat style={{ top: '12%', left: '45%' }} size={250} rotate={110} opacity={0.08} />
        <BloodSplat style={{ top: '15%', left: '12%' }} size={380} rotate={45} opacity={0.12} />
        <BloodSplat style={{ top: '18%', right: '20%' }} size={210} rotate={190} opacity={0.09} />
        <BloodSplat style={{ top: '3%', right: '40%' }} size={180} rotate={75} opacity={0.07} />

        {/* Mid-Top 20-40% */}
        <BloodSplat style={{ top: '24%', left: '-5%' }} size={300} rotate={-20} opacity={0.11} />
        <BloodSplat style={{ top: '28%', right: '2%' }} size={400} rotate={60} opacity={0.13} />
        <BloodSplat style={{ top: '32%', left: '50%', transform: 'translateX(-50%)' }} size={260} rotate={0} opacity={0.08} />
        <BloodSplat style={{ top: '36%', left: '15%' }} size={340} rotate={130} opacity={0.12} />
        <BloodSplat style={{ top: '39%', right: '25%' }} size={220} rotate={45} opacity={0.1} />
        <BloodSplat style={{ top: '26%', left: '40%' }} size={150} rotate={-45} opacity={0.07} />

        {/* Center 40-60% */}
        <BloodSplat style={{ top: '44%', right: '-8%' }} size={350} rotate={15} opacity={0.13} />
        <BloodSplat style={{ top: '48%', left: '10%' }} size={420} rotate={-30} opacity={0.1} />
        <BloodSplat style={{ top: '52%', right: '45%' }} size={280} rotate={90} opacity={0.11} />
        <BloodSplat style={{ top: '56%', left: '25%' }} size={310} rotate={210} opacity={0.09} />
        <BloodSplat style={{ top: '59%', right: '10%' }} size={390} rotate={-10} opacity={0.14} />
        <BloodSplat style={{ top: '46%', left: '5%' }} size={200} rotate={80} opacity={0.08} />

        {/* Mid-Bottom 60-80% */}
        <BloodSplat style={{ top: '64%', left: '-2%' }} size={330} rotate={40} opacity={0.12} />
        <BloodSplat style={{ top: '69%', right: '15%' }} size={280} rotate={160} opacity={0.11} />
        <BloodSplat style={{ top: '74%', left: '40%' }} size={360} rotate={-55} opacity={0.13} />
        <BloodSplat style={{ top: '77%', right: '35%' }} size={220} rotate={15} opacity={0.09} />
        <BloodSplat style={{ top: '79%', left: '8%' }} size={410} rotate={70} opacity={0.14} />
        <BloodSplat style={{ top: '66%', right: '5%' }} size={190} rotate={120} opacity={0.07} />

        {/* Bottom 80-100% */}
        <BloodSplat style={{ top: '84%', right: '-5%' }} size={380} rotate={200} opacity={0.13} />
        <BloodSplat style={{ top: '89%', left: '30%' }} size={300} rotate={-40} opacity={0.11} />
        <BloodSplat style={{ top: '93%', right: '20%' }} size={250} rotate={85} opacity={0.09} />
        <BloodSplat style={{ bottom: '1%', left: '50%', transform: 'translateX(-50%)' }} size={450} rotate={180} opacity={0.15} />
        <BloodSplat style={{ bottom: '5%', right: '2%' }} size={320} rotate={30} opacity={0.12} />
        <BloodSplat style={{ bottom: '8%', left: '2%' }} size={290} rotate={-15} opacity={0.1} />
      </div>

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

      <div className="container max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Visit The Crypt</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-2 italic tracking-tight" style={{ textShadow: "0 0 15px #dc2626" }}>Contact Us</h1>
            <p className="text-stone-400 mt-3 max-w-md mx-auto">
              Ready to book a table or plan a party? Reach out to us directly.
            </p>
            <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-6 rounded-full shadow-[0_0_10px_#dc2626]" />
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            <motion.a
              href={`tel:+${PHONE}`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#dc2626] text-white px-6 py-5 font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_#dc2626] transition-all hover:bg-[#b91c1c]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={22} className="text-white" />
              Call Us
            </motion.a>
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white px-6 py-5 font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={22} />
              WhatsApp Us
            </motion.a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Info Cards */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-black border border-[#dc2626]/30 hover:border-[#dc2626]/80 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a0101] flex items-center justify-center shrink-0 group-hover:bg-[#dc2626]/20 transition-colors border border-[#dc2626]/30">
                  <MapPin size={20} className="text-[#dc2626]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1 uppercase tracking-wider">Address</h4>
                  <p className="text-sm text-stone-400 leading-relaxed">{ADDRESS}</p>
                </div>
              </a>

              <a
                href={`tel:+${PHONE}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-black border border-[#dc2626]/30 hover:border-[#dc2626]/80 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a0101] flex items-center justify-center shrink-0 group-hover:bg-[#dc2626]/20 transition-colors border border-[#dc2626]/30">
                  <Phone size={20} className="text-[#dc2626]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1 uppercase tracking-wider">Phone</h4>
                  <p className="text-sm text-stone-400">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-black border border-[#dc2626]/30 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all">
                <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#1a0101] flex items-center justify-center text-[#dc2626] hover:bg-[#dc2626] hover:text-white hover:shadow-[0_0_15px_#dc2626] transition-all duration-300 border border-[#dc2626]/30"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Google Maps */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden border border-[#dc2626]/30 shadow-[0_0_20px_rgba(220,38,38,0.15)] w-full h-[350px] md:h-[450px] bg-[#1a0101] flex flex-col relative group">
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#dc2626]/40 transition-all duration-500 z-10 pointer-events-none rounded-2xl" />
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