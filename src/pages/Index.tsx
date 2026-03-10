import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, BookOpen, Star, ArrowRight, Clock, MapPin, Phone, Coffee, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
// Removed heroSlide4 import
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

const c = {
  name: "NOSTALGIA CAFE",
  phone: "919878705823",
  phoneDisplay: "+91 98787 05823",
  addressFull: "F, 21A, F Block Vijay Nagar (opposite NDPL Office), GTB Nagar, Delhi, 110033, India",
  mapsLink: "https://maps.app.goo.gl/QEPbURnF19ad3KqQ6",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.854799748225!2d77.2016860753379!3d28.693989775631174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4af48bad2f%3A0x99ab93f9859654f9!2sNostalgia%20Cafe!5e0!3m2!1sen!2sin!4v1773169819330!5m2!1sen!2sin",
  instagram: "https://www.instagram.com/", 
  hours: "12:00 PM - 10:30 PM, Monday - Sunday",
  hero: {
    badge: "Food. Board Games. Good Vibes.",
    h1: "Welcome to Nostalgia",
    tagline: "Your Cozy Neighborhood Escape.",
    description: "Step into our world of floating candles, comfortable seating, and vintage games. Dive into our versatile menu and relive the good times with friends."
  },
  specialties: [
    { 
      name: "Classic Farmhouse Pizza", 
      price: "₹249", 
      desc: "A crispy, perfectly baked crust loaded with gooey mozzarella, fresh bell peppers, onions, tomatoes, and a kick of spicy jalapeños. Best shared over a game of UNO.", 
      tag: "Crowd Favorite" 
    },
    { 
      name: "Spaghetti Aglio e Olio", 
      price: "₹229", 
      desc: "Classic Italian spaghetti lightly tossed in olive oil, toasted garlic, chili flakes, and fresh herbs, served alongside warm, cheesy garlic bread.", 
      tag: "Chef's Special" 
    },
    { 
      name: "Tandoori Paneer Tikka", 
      price: "₹259", 
      desc: "Soft, melt-in-your-mouth paneer blocks marinated in rich, traditional spices, charred to perfection, and served with classic onion rings.", 
      tag: "Spicy & Smoky" 
    },
    { 
      name: "Loaded Chocolate Frappe", 
      price: "₹210", 
      desc: "A decadent, towering blend of rich cold coffee and chocolate, crowned with a thick layer of cream and crushed chocolate chunks.", 
      tag: "Signature Drink" 
    }
  ],
  features: {
    heading: "The Nostalgia Experience",
    items: [
      { title: "Versatile Menu", desc: "A pocket-friendly mix of Chinese, Italian, Pizzas, Burgers, and signature shakes." },
      { title: "Board Games & Books", desc: "Unplug and unwind. We have a huge collection of board games and novels to keep you entertained." },
      { title: "Aesthetic Vibe", desc: "Warm lighting, checkered floors, and floating candles make for the perfect Instagram backdrop." }
    ]
  },
  ambiance: {
    heading: "Relive The Good Times",
    story: "Located opposite the NDPL Office in GTB Nagar, Nostalgia Cafe is where great food meets an unforgettable, cozy atmosphere. With our warm lighting, vintage decor, and comfortable seating, we're the ultimate pocket-friendly destination for group hangouts, reading sessions, and casual dates."
  },
  cta: {
    heading: "Ready for a Trip Down Memory Lane?",
    subtext: "Join us in Vijay Nagar for exceptional comfort food and a uniquely warm vibe. See you soon!"
  },
  stats: [
    { label: "Cost for Two", value: "₹450" },
    { label: "Board Games", value: "20+" },
    { label: "Hours Open", value: "10.5" },
    { label: "Vibe", value: "100%" }
  ],
  reviews: [
    { name: "Aarav", text: "The warm vibe and the checkered floors look amazing. Great place to play UNO with friends while eating good pizza!", rating: 5, avatar: "A" },
    { name: "Priya", text: "Super pocket-friendly! The cold coffee is a must-try, and I love that they have books you can read while sitting on the comfy couches.", rating: 5, avatar: "P" },
    { name: "Karan", text: "Very cool ambiance. The floating candles remind me of Hogwarts! Definitely coming back for the Chinese food.", rating: 4, avatar: "K" }
  ]
};

const PHONE = c.phone;
const PHONE_DISPLAY = c.phoneDisplay;
const ADDRESS = c.addressFull;
const MAPS_LINK = c.mapsLink;
const MAPS_EMBED = c.mapsEmbed;
const INSTAGRAM = c.instagram;

// Updated array to only include 3 images
const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

const specialties = c.specialties.map((s, i) => ({
  ...s,
  img: [dish1, dish2, dish3, dish4][i]
}));

const reviews = c.reviews;
const stats = c.stats;

const featureIcons = [UtensilsCrossed, BookOpen, Coffee];
const features = c.features.items.map((f, i) => ({ ...f, icon: featureIcons[i] }));

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = React.useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }
  };

  return (
    // Base background for other sections to fade into
    <div className="bg-[#FCF9F9] min-h-screen text-stone-700 font-sans selection:bg-rose-200 selection:text-stone-800 relative">
      
      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-white" // Solid white base for clear photos
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide}
            alt={c.name}
            // All foggy opacity removed from here
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            // Active slide is 100% opaque. No crossfade through white.
            animate={{ opacity: i === currentSlide ? 1 : 0, scale: i === currentSlide ? 1 : 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}
        
        {/* Soft white-to-pink faded overlay removed completely from here. */}

        <div className="relative z-20 container">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-[#C597A6] text-sm font-semibold tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-[#D4A5B4]" />
                {c.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-stone-900 mb-4 leading-tight drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {c.hero.h1}
            </motion.h1>

            <motion.p
              // Darker pink for readability against raw photos
              className="text-xl md:text-2xl text-[#B38092] mb-4 font-display italic drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {c.hero.tagline}
            </motion.p>

            <motion.p
              // Dark gray for readability against raw photos
              className="text-stone-600 mb-10 text-lg max-w-md leading-relaxed drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {c.hero.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a
                href={`tel:+${PHONE}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A5B4] px-8 py-4 font-medium text-white shadow-md hover:bg-[#C28EA0] transition-all duration-300"
              >
                <Phone size={18} />
                Reserve Table
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8D6D9] text-stone-700 bg-white/70 backdrop-blur-sm px-8 py-4 font-medium hover:bg-white hover:border-[#D4A5B4] transition-all duration-300"
              >
                Explore Menu
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#D4A5B4]" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              // Dots logic automatically handles 3 items
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#D4A5B4] w-6" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative -mt-12 z-30 pb-12">
        <div className="container">
          <ScrollReveal>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-[#F0E6E8] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-display font-semibold text-[#C597A6]">{stat.value}</p>
                  <p className="text-xs text-stone-400 mt-2 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#FCF9F9]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#D4A5B4] text-xs font-semibold tracking-widest uppercase">Why Us</span>
              <h2 className="text-3xl font-display font-bold text-stone-800 mt-3">{c.features.heading}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-[#FDF8F9] border border-[#F0E6E8] hover:shadow-sm hover:border-[#E8D6D9] transition-all text-center group">
                  <div className="w-14 h-14 rounded-full bg-white border border-[#F0E6E8] flex items-center justify-center mb-6 mx-auto text-[#D4A5B4] group-hover:bg-[#FDF8F9] transition-colors">
                    <f.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-700 mb-3">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#D4A5B4] text-xs font-semibold tracking-widest uppercase">Our Menu</span>
              <h2 className="text-3xl font-display font-bold text-stone-800 mt-3">Nostalgic Bites</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden bg-[#FDF8F9] border border-[#F0E6E8] group hover:shadow-sm transition-all">
                  <div className="relative overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#C597A6] text-xs font-medium px-3 py-1.5 rounded-full border border-[#F0E6E8]">{s.tag}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-semibold text-stone-700 text-base">{s.name}</h3>
                      <span className="text-sm font-medium text-[#C597A6]">{s.price}</span>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <div className="text-center mt-12">
              <Link to="/menu" className="group inline-flex items-center gap-2 text-[#C597A6] text-sm font-medium hover:text-[#B38092] hover:gap-3 transition-all">
                View Full Menu <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AMBIANCE SPLIT ── */}
      <section className="py-24 bg-[#FDF8F9] overflow-hidden border-y border-[#F0E6E8]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative w-full max-w-lg mx-auto">
                <img src={gallery1} alt="restaurant ambiance" className="rounded-2xl w-full aspect-[4/3] object-cover object-center shadow-sm border-4 border-white opacity-90" loading="lazy" />
                <img src={gallery2} alt="food platter" className="absolute -bottom-10 -right-6 md:-right-10 w-48 h-48 md:w-56 md:h-56 object-cover object-center rounded-2xl border-[8px] border-[#FDF8F9] shadow-sm opacity-95" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="md:pl-8 mt-10 md:mt-0">
                <span className="text-[#D4A5B4] text-xs font-semibold tracking-widest uppercase">Our Vibe</span>
                <h2 className="text-3xl font-display font-bold text-stone-800 mt-3 mb-6">
                  {c.ambiance.heading}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-8">
                  {c.ambiance.story}
                </p>
                <Link to="/about" className="group inline-flex items-center gap-2 text-[#C597A6] text-sm font-medium hover:text-[#B38092] hover:gap-3 transition-all">
                  See Gallery <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#D4A5B4] text-xs font-semibold tracking-widest uppercase">Testimonials</span>
              <h2 className="text-3xl font-display font-bold text-stone-800 mt-3">What The City Says</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-[#FDF8F9] border border-[#F0E6E8] hover:border-[#E8D6D9] transition-all relative mt-4">
                  <div className="absolute -top-5 left-8 text-5xl text-[#F0E6E8] font-display font-serif">"</div>
                  <div className="flex gap-1 mb-5 relative z-10">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-[#D4A5B4] text-[#D4A5B4]" />
                    ))}
                  </div>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed relative z-10 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#F0E6E8] flex items-center justify-center text-[#C597A6] font-medium text-sm">{r.avatar}</div>
                    <p className="font-medium text-stone-700 text-sm">{r.name}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS & LOCATION ── */}
      <section className="py-20 bg-[#FCF9F9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <div className="pr-0 md:pr-10">
                <span className="text-[#D4A5B4] text-xs font-semibold tracking-widest uppercase">Find Us</span>
                <h2 className="text-3xl font-display font-bold text-stone-800 mt-3 mb-10">Drop By Anytime</h2>
                <div className="space-y-4">
                  
                  {/* Address */}
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#F0E6E8] hover:border-[#E8D6D9] transition-all group">
                    <div className="w-10 h-10 rounded-full bg-[#FDF8F9] flex items-center justify-center shrink-0 group-hover:bg-[#F0E6E8] transition-colors">
                      <MapPin size={18} className="text-[#C597A6]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-700 mb-1 text-sm">Address</h4>
                      <p className="text-sm text-stone-500 leading-relaxed">{ADDRESS}</p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#F0E6E8]">
                    <div className="w-10 h-10 rounded-full bg-[#FDF8F9] flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-[#C597A6]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-700 mb-1 text-sm">Opening Hours</h4>
                      <p className="text-sm text-stone-500">{c.hours}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <a href={`tel:+${PHONE}`} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#F0E6E8] hover:border-[#E8D6D9] transition-all group">
                    <div className="w-10 h-10 rounded-full bg-[#FDF8F9] flex items-center justify-center shrink-0 group-hover:bg-[#F0E6E8] transition-colors">
                      <Phone size={18} className="text-[#C597A6]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-700 mb-1 text-sm">Phone</h4>
                      <p className="text-sm text-stone-500">{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="rounded-3xl overflow-hidden border border-[#F0E6E8] w-full h-[350px] md:h-[450px] bg-white flex flex-col p-2 relative">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem', flexGrow: 1 }} 
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${c.name} Location`}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-white border-t border-[#F0E6E8] text-center relative">
        <div className="container max-w-3xl relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-800 mb-5">
              {c.cta.heading}
            </h2>
            <p className="text-stone-500 mb-10 text-base leading-relaxed">
              {c.cta.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A5B4] text-white px-8 py-3.5 font-medium hover:bg-[#C28EA0] transition-all duration-300"
              >
                <Phone size={18} />
                Reserve Table
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8D6D9] text-stone-700 bg-transparent px-8 py-3.5 font-medium hover:bg-[#FDF8F9] hover:border-[#D4A5B4] transition-all duration-300"
              >
                View Menu
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;