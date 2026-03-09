import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Music, Star, ArrowRight, Clock, MapPin, Phone, GlassWater, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

// Integrated Kiiza Cafe & Lounge Data
const c = {
  name: "KIIZA CAFE AND LOUNGE",
  phone: "919654133100",
  phoneDisplay: "+91 96541 33100",
  addressFull: "2648 first floor, Hudson Ln, GTB Nagar, Delhi, 110009, India",
  mapsLink: "https://maps.app.goo.gl/ixVpXR1qz3tq7ErP6",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8894428581843!2d77.2056357!3d28.6929536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd41fdcf3533%3A0xe7d2c457f3d64cd!2sKIIZA%20CAFE%20AND%20LOUNGE!5e0!3m2!1sen!2sin!4v1773041180994!5m2!1sen!2sin",
  instagram: "https://www.instagram.com/kiizadelhicafe/",
  hours: "11:00 AM - 12:00 AM, Monday - Sunday",
  hero: {
    badge: "Eat. Drink. Lounge.",
    h1: "Welcome to Kiiza",
    tagline: "Hip, Cozy, & Vibrant.",
    description: "Experience Hudson Lane's premier lounge. Dive into our multi-cuisine menu, enjoy live music, and soak in the electric vibes."
  },
  // Updated with the new dish names, descriptions, and accurate pricing
  specialties: [
    { name: "Spicy Chilli Chicken", price: "₹399", desc: "Crispy chicken chunks wok-tossed with fresh bell peppers, onions, and a fiery dark soy-chilli glaze.", tag: "Chef's Special" },
    { name: "Honey Chilli Potato", price: "₹279", desc: "Golden, crispy potato fingers coated in a sticky, sweet, and spicy sauce, garnished with fresh spring onions.", tag: "Crowd Favorite" },
    { name: "Classic Chicken Tikka", price: "₹399", desc: "Tender boneless chicken marinated in yogurt and traditional aromatic spices, roasted to smoky perfection in the tandoor.", tag: "Tandoori Special" },
    { name: "Classic Cold Coffee", price: "₹229", desc: "A thick, creamy blend of rich espresso and milk, generously drizzled with dark chocolate syrup and served chilled.", tag: "Refreshing" }
  ],
  features: {
    heading: "The Kiiza Experience",
    items: [
      { title: "Multi-Cuisine Menu", desc: "A curated selection of North Indian, Chinese, Italian, and Mughlai dishes." },
      { title: "Live Music & Vibe", desc: "Cozy seating, stunning interiors, and live entertainment to elevate your evening." },
      { title: "Premium Lounge", desc: "Fully stocked bar serving beer, wine, and expertly crafted cocktails." }
    ]
  },
  ambiance: {
    heading: "Vibrant Nights Await",
    story: "Located in the heart of Hudson Lane, KIIZA CAFE AND LOUNGE is where great food meets an unforgettable atmosphere. With our stunning decor, plush seating, and eclectic mix of music, we are the ultimate destination for celebrations, casual hangouts, and late-night unwinding."
  },
  cta: {
    heading: "Ready for the Kiiza Vibe?",
    subtext: "Join us in GTB Nagar for exceptional food and electric nights. Book your table now."
  },
  stats: [
    { label: "Cuisines", value: "4+" },
    { label: "Live Music", value: "Daily" },
    { label: "Hours Open", value: "13" },
    { label: "Google Rating", value: "4.5★" }
  ],
  reviews: [
    { name: "Rahul", text: "Amazing vibe and great food! The Stuffed Murg Tangdi is a must-try.", rating: 5, avatar: "R" },
    { name: "Sneha", text: "Perfect spot for a birthday party. Live music was fantastic and the drinks were top-notch.", rating: 5, avatar: "S" },
    { name: "Vikram", text: "Very cool ambiance. Hip and casual lounge, definitely coming back.", rating: 4, avatar: "V" }
  ]
};

const PHONE = c.phone;
const PHONE_DISPLAY = c.phoneDisplay;
const ADDRESS = c.addressFull;
const MAPS_LINK = c.mapsLink;
const MAPS_EMBED = c.mapsEmbed;
const INSTAGRAM = c.instagram;

const heroSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const specialties = c.specialties.map((s, i) => ({
  ...s,
  img: [dish1, dish2, dish3, dish4][i]
}));

const reviews = c.reviews;
const stats = c.stats;

const featureIcons = [UtensilsCrossed, Music, GlassWater];
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
    <div className="bg-[#F5F0FF] min-h-screen text-gray-800 font-sans">
      
      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-gray-900"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide}
            alt={c.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === currentSlide ? 1 : 0, scale: i === currentSlide ? 1 : 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 container">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-[#A855F7] text-sm font-semibold tracking-widest uppercase mb-6 drop-shadow-sm">
                <span className="w-8 h-px bg-gradient-to-r from-purple-800 to-[#A855F7]" />
                {c.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 leading-[0.95] drop-shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {c.hero.h1}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[#E9D5FF] mb-4 font-display italic drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {c.hero.tagline}
            </motion.p>

            <motion.p
              className="text-white/90 mb-12 text-lg max-w-md font-medium leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {c.hero.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a
                href={`tel:+${PHONE}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#CF9FFF] px-8 py-4 font-semibold text-gray-900 hover:bg-[#b07dff] hover:shadow-xl hover:shadow-purple-400 transition-all duration-300"
              >
                <Phone size={18} />
                Reserve Table
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white bg-black/10 backdrop-blur-sm px-8 py-4 font-semibold hover:bg-black/20 hover:border-[#CF9FFF] hover:text-[#CF9FFF] transition-all duration-300"
              >
                Explore Menu
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#CF9FFF] w-8 shadow-[0_0_12px_rgba(207,159,255,1)]" : "bg-white/70 hover:bg-white"}`}
            />
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative -mt-16 z-30 pb-8">
        <div className="container">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-[#D8B4FE] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#A855F7]">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#E9D5FF]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">{c.features.heading}</h2>
              <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-white border border-[#D8B4FE] shadow-sm hover:shadow-lg hover:shadow-purple-900/5 hover:-translate-y-1 transition-all text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center mb-6 mx-auto group-hover:bg-[#E9D5FF] transition-colors">
                    <f.icon size={28} className="text-[#A855F7]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ── */}
      <section className="py-20 bg-[#F5F0FF]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Our Menu</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">Signature Dishes</h2>
              <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden bg-white border border-[#D8B4FE] shadow-sm group hover:shadow-lg hover:shadow-purple-900/15 transition-all">
                  <div className="relative overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-[#F5F0FF] text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-[#D8B4FE]">{s.tag}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-gray-900 text-lg">{s.name}</h3>
                      <span className="text-sm font-bold text-[#A855F7] bg-[#E9D5FF] px-3 py-1 rounded-full">{s.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/menu" className="group inline-flex items-center gap-2 text-[#A855F7] font-semibold hover:text-[#9333EA] hover:gap-3 transition-all">
                View Full Menu <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AMBIANCE SPLIT ── */}
      <section className="py-20 bg-[#E9D5FF] overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative w-full max-w-lg mx-auto">
                <img src={gallery1} alt="restaurant ambiance" className="rounded-2xl w-full aspect-[4/3] object-cover object-center shadow-xl border-4 border-white" loading="lazy" />
                <img src={gallery2} alt="food platter" className="absolute -bottom-8 -right-4 md:-right-8 w-40 h-40 md:w-56 md:h-56 object-cover object-center rounded-2xl border-[6px] border-[#E9D5FF] shadow-xl" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="md:pl-4">
                <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">
                  {c.ambiance.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {c.ambiance.story}
                </p>
                <Link to="/about" className="group inline-flex items-center gap-2 text-[#A855F7] font-semibold hover:text-[#9333EA] hover:gap-3 transition-all">
                  See Gallery <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-[#F5F0FF]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">What The City Says</h2>
              <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-white border border-[#D8B4FE] hover:shadow-lg hover:shadow-purple-900/5 transition-all relative mt-6">
                  <div className="absolute -top-6 left-8 text-6xl text-[#D8B4FE] font-display opacity-50">"</div>
                  <div className="flex gap-1 mb-4 relative z-10">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed relative z-10">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E9D5FF] flex items-center justify-center text-[#A855F7] font-bold text-sm border border-[#D8B4FE]">{r.avatar}</div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS & LOCATION ── */}
      <section className="py-20 bg-[#E9D5FF]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Find Us</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-8">Join The Party</h2>
                <div className="space-y-6">
                  
                  {/* Address */}
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D8B4FE] hover:border-[#CF9FFF] hover:shadow-sm transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center shrink-0 group-hover:bg-[#E9D5FF] transition-colors">
                      <MapPin size={22} className="text-[#A855F7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-sm text-gray-500">{ADDRESS}</p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D8B4FE] shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center shrink-0">
                      <Clock size={22} className="text-[#A855F7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Opening Hours</h4>
                      <p className="text-sm text-gray-500">{c.hours}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <a href={`tel:+${PHONE}`} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D8B4FE] hover:border-[#CF9FFF] hover:shadow-sm transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center shrink-0 group-hover:bg-[#E9D5FF] transition-colors">
                      <Phone size={22} className="text-[#A855F7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-sm text-gray-500">{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D8B4FE] hover:border-[#CF9FFF] hover:shadow-sm transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center shrink-0 group-hover:bg-[#E9D5FF] transition-colors">
                      <Instagram size={22} className="text-[#A855F7]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                      <p className="text-sm text-gray-500">@kiizadelhicafe</p>
                    </div>
                  </a>

                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl w-full h-[350px] md:h-[450px] bg-gray-100 flex flex-col">
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
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-white border-t border-[#D8B4FE] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E9D5FF] blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F5F0FF] blur-[80px]" />
        
        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              {c.cta.heading}
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-lg mx-auto">
              {c.cta.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CF9FFF] text-gray-900 px-8 py-4 font-semibold hover:shadow-lg hover:shadow-purple-300 hover:bg-[#b07dff] transition-all duration-300"
              >
                <Phone size={18} />
                Reserve Table
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D8B4FE] text-[#A855F7] bg-[#F5F0FF] px-8 py-4 font-semibold hover:bg-[#E9D5FF] hover:border-[#CF9FFF] transition-all duration-300"
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