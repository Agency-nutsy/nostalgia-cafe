import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Leaf, Truck, Star, ArrowRight, Clock, MapPin, Phone, ChefHat } from "lucide-react";
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

// Integrated Aura Cafe Data with Live Map Links
const c = {
  name: "The Aura Cafe",
  phone: "919871712300",
  phoneDisplay: "+91 98717 12300",
  addressFull: "3, DDA Market Complex, near TPDDL Office, Hudson Lane, GTB Nagar, Delhi, 110033",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Aura+Cafe+Hudson+Lane+Delhi",
  mapsEmbed: "https://maps.google.com/maps?q=The%20Aura%20Cafe%20Hudson%20Lane%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hours: "11:00 AM - 11:00 PM, Monday - Sunday",
  hero: {
    badge: "A Peaceful Retreat",
    h1: "Welcome to The Aura Cafe",
    tagline: "Hip, Casual, & Cozy.",
    description: "Experience a warm and inviting atmosphere. Enjoy our global fare featuring everything from classic Italian to exotic Asian flavors."
  },
  specialties: [
    { name: "Veg Pizza", price: "₹219", desc: "A hand-tossed classic loaded with gooey mozzarella cheese and a vibrant mix of fresh, crunchy vegetables, baked to golden perfection.", tag: "Classic Favorite" },
    { name: "Honey Chilli Potatoes", price: "₹219", desc: "Crispy potato fingers tossed in a sticky, sweet, and perfectly spicy honey-chilli glaze, finished with a sprinkle of toasted sesame seeds.", tag: "Sweet & Spicy" },
    { name: "Peri Peri Chicken Wings", price: "₹229", desc: "Juicy, tender chicken wings coated in a bold and fiery peri-peri marinade, roasted until perfectly crisp and bursting with flavor.", tag: "Fiery & Bold" },
    { name: "Veg Grilled Sandwich", price: "₹159", desc: "A classic triple-layered sandwich packed with fresh veggies, zesty sauces, and melted cheese, grilled to a perfect, satisfying crunch.", tag: "Comfort Food" }
  ],
  features: {
    heading: "What Makes Us Special",
    items: [
      { title: "Global Cuisine", desc: "A wide selection of international dishes, with dedicated and delicious options for vegetarians." },
      { title: "Cozy Ambiance", desc: "Modern and stylish decor that creates a hip, casual, and highly family-friendly environment." },
      { title: "Dine, Takeout & Delivery", desc: "Enjoy our food here with free Wi-Fi, or order from the comfort of your home." }
    ]
  },
  ambiance: {
    heading: "A Vibe Like No Other",
    story: "Nestled in Hudson Lane, The Aura Cafe is your low-key, peaceful retreat. Whether you're dropping by for a quick bite, a family brunch, or a relaxed dinner with friends, our stylish space and warm hospitality make every moment special."
  },
  cta: {
    heading: "Ready to Experience The Aura?",
    subtext: "Join us at GTB Nagar for a delightful culinary journey. Reserve your table or order online today."
  },
  stats: [
    { label: "Global Dishes", value: "50+" },
    { label: "Vegetarian Options", value: "100%" },
    { label: "Days a Week", value: "7" },
    { label: "Happy Guests", value: "10k+" }
  ],
  reviews: [
    { name: "Aman", text: "Amazing vibe and great vegetarian options! Perfect for large groups.", rating: 5, avatar: "A" },
    { name: "Priya", text: "Perfect spot for a relaxed dinner with friends. Loved the specialty coffee.", rating: 5, avatar: "P" },
    { name: "Rahul", text: "Very cozy ambiance. Will definitely come back for the pasta and pizza.", rating: 4, avatar: "R" }
  ]
};

const PHONE = c.phone;
const PHONE_DISPLAY = c.phoneDisplay;
const ADDRESS = c.addressFull;
const MAPS_LINK = c.mapsLink;
const MAPS_EMBED = c.mapsEmbed;

const heroSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const specialties = c.specialties.map((s, i) => ({
  ...s,
  img: [dish1, dish2, dish3, dish4][i]
}));

const reviews = c.reviews;
const stats = c.stats;

const featureIcons = [ChefHat, Leaf, Truck];
const features = c.features.items.map((f, i) => ({ ...f, icon: featureIcons[i] }));

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = React.useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500); // Slightly slower rotation so photos can be admired
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
    <div className="bg-[#FBCFE8]/10 min-h-screen text-gray-800">
      
      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
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
        
        {/* FIX: Dark, sleek gradient overlay so photos stay incredibly vibrant and text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/50 to-transparent z-10" />

        <div className="relative z-20 container">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-[#FBCFE8] text-sm font-semibold tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-[#FBCFE8]" />
                {c.hero.badge}
              </span>
            </motion.div>

            {/* Changed text to white so it pops perfectly over the vibrant photos */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[0.95]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {c.hero.h1}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-2 font-display italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {c.hero.tagline}
            </motion.p>

            <motion.p
              className="text-white/80 mb-10 text-lg max-w-md font-medium"
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
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FBCFE8] px-8 py-4 font-semibold text-gray-900 hover:bg-[#f9a8d4] hover:shadow-lg transition-all duration-300"
              >
                Explore Menu
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:+${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FBCFE8] text-[#FBCFE8] bg-black/20 backdrop-blur-sm px-8 py-4 font-semibold hover:bg-[#FBCFE8]/20 transition-all duration-300"
              >
                <Phone size={18} />
                Call Us
              </a>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#FBCFE8] w-8" : "bg-white/40"}`}
            />
          ))}
        </div>

        {/* Scroll Bounce Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#FBCFE8] flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-[#FBCFE8]" />
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative -mt-16 z-30 pb-8">
        <div className="container">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-xl border border-[#FBCFE8] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#be185d]">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#FBCFE8]/10">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">{c.features.heading}</h2>
              <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-white border border-[#FBCFE8] shadow-sm hover:shadow-md transition-shadow text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#FBCFE8]/40 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#FBCFE8]/80 transition-colors">
                    <f.icon size={28} className="text-[#be185d]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-800 mb-3">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
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
            <div className="text-center mb-12">
              <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Our Menu</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">Signature Dishes</h2>
              <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden bg-white border border-[#FBCFE8] shadow-sm group hover:shadow-lg transition-all">
                  <div className="relative overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-[#FBCFE8] text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{s.tag}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-gray-800 text-lg">{s.name}</h3>
                      <span className="text-sm font-bold text-[#be185d] bg-[#FBCFE8]/40 px-3 py-1 rounded-full">{s.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/menu" className="group inline-flex items-center gap-2 text-[#be185d] font-semibold hover:gap-3 transition-all">
                View Full Menu <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AMBIANCE SPLIT ── */}
      <section className="py-20 bg-[#FBCFE8]/10 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative w-full max-w-lg mx-auto">
                <img src={gallery1} alt="restaurant ambiance" className="rounded-2xl w-full aspect-[4/3] object-cover object-center shadow-xl" loading="lazy" />
                <img src={gallery2} alt="food platter" className="absolute -bottom-8 -right-4 md:-right-8 w-40 h-40 md:w-56 md:h-56 object-cover object-center rounded-2xl border-[6px] border-white shadow-2xl" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="md:pl-4">
                <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">
                  {c.ambiance.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {c.ambiance.story}
                </p>
                <Link to="/about" className="group inline-flex items-center gap-2 text-[#be185d] font-semibold hover:gap-3 transition-all">
                  Read Our Story <ArrowRight size={18} />
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
            <div className="text-center mb-12">
              <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">What Our Guests Say</h2>
              <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-[#FBCFE8]/10 border border-[#FBCFE8] hover:shadow-md transition-shadow relative">
                  <div className="absolute -top-3 left-8 text-6xl text-[#FBCFE8] font-display">"</div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-[#be185d] text-[#be185d]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FBCFE8] flex items-center justify-center text-gray-900 font-bold text-sm">{r.avatar}</div>
                    <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS & LOCATION ── */}
      <section className="py-20 bg-[#FBCFE8]/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Find Us</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-8">Visit Our Kitchen</h2>
                <div className="space-y-6">
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#FBCFE8] hover:border-[#be185d] transition-colors shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FBCFE8]/40 flex items-center justify-center shrink-0">
                      <MapPin size={22} className="text-[#be185d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                      <p className="text-sm text-gray-500">{ADDRESS}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#FBCFE8] shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FBCFE8]/40 flex items-center justify-center shrink-0">
                      <Clock size={22} className="text-[#be185d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Opening Hours</h4>
                      <p className="text-sm text-gray-500">{c.hours}</p>
                    </div>
                  </div>
                  <a href={`tel:+${PHONE}`} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#FBCFE8] hover:border-[#be185d] transition-colors shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FBCFE8]/40 flex items-center justify-center shrink-0">
                      <Phone size={22} className="text-[#be185d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-sm text-gray-500">{PHONE_DISPLAY}</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden border border-[#FBCFE8] shadow-lg h-80 bg-white">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
      <section className="py-20 bg-[#FBCFE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              {c.cta.heading}
            </h2>
            <p className="text-gray-700 mb-8 text-lg max-w-lg mx-auto">
              {c.cta.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#be185d] px-8 py-4 font-semibold hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
              >
                <Phone size={18} />
                Call Us Now
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900/20 text-gray-900 px-8 py-4 font-semibold hover:bg-gray-900/5 transition-all duration-300"
              >
                Explore Menu
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;