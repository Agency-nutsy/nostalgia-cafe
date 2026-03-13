import React, { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Lottie from "lottie-react";
import ghostAnimation from "@/assets/ghost.json";
import batAnimation from "@/assets/bat.json";
import bloodSplat from "@/assets/blood.png"; 

const PHONE = "+919878705823";

// The Exact Coffin Shape Path
const COFFIN_PATH = "polygon(25% 0%, 75% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)";

// Integrated Menu Data
const menuData = [
  {
    category: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Margherita (Mini/Reg/Large)", price: "₹199/249/349", desc: "Classic cheese pizza" },
      { name: "Golden Corn (Mini/Reg/Large)", price: "₹229/269/379", desc: "Golden corn topping" },
      { name: "Onion (Mini/Reg/Large)", price: "₹229/269/379", desc: "Fresh onion topping" },
      { name: "Capsicum (Mini/Reg/Large)", price: "₹229/269/379", desc: "Fresh capsicum topping" },
      { name: "Tomato (Mini/Reg/Large)", price: "₹229/269/379", desc: "Fresh tomato topping" },
      { name: "Veggie Delight (Reg/Large)", price: "₹369/499", desc: "Onion, Tomato, Capsicum" },
      { name: "Veggie Delux (Reg/Large)", price: "₹369/499", desc: "Onion, Tomato, Mushroom" },
      { name: "Veg Spicy (Reg/Large)", price: "₹399/539", desc: "Onion, Jalapeno, Green Chillies, Red Paprika", popular: true },
      { name: "Peppy Paneer (Reg/Large)", price: "₹449/599", desc: "Capsicum, Red Paprika, Paneer" },
      { name: "Tandori Chicken (Reg/Large)", price: "₹499/639", desc: "Onion, Capsicum, Red Paprika, Tandori Chicken" },
      { name: "Mexican (Reg/Large)", price: "₹419/559", desc: "Onion, Tomato, Jalapeno, Black Olive" },
      { name: "Veggie Overload (Reg/Large)", price: "₹429/569", desc: "Onion, Tomato, Capsicum, Jalapeno, Corn, Black Olive, Mushroom" },
      { name: "Tandoori Paneer (Reg/Large)", price: "₹489/669", desc: "Onion, Capsicum, Red Paprika, Paneer Tandoori" },
      { name: "Chicken Kabab (Reg/Large)", price: "₹519/699", desc: "Onion, Green Chilli, Chicken Kabab" }
    ]
  },
  {
    category: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Mac & Cheese", price: "₹379", desc: "Classic cheesy macaroni" },
      { name: "Masala Macroni", price: "₹319", desc: "Indian style spiced macaroni" },
      { name: "Aglio e olio", price: "₹349", desc: "Olive oil, garlic, and chilli flakes" },
      { name: "Paneer Makhani Pasta", price: "₹399", desc: "Pasta in rich paneer makhani gravy", popular: true },
      { name: "Red Sauce Pasta", price: "₹349", desc: "Pasta in tangy tomato sauce" },
      { name: "White Sauce Pasta", price: "₹369", desc: "Pasta in creamy white sauce" },
      { name: "Mix Sauce Pasta", price: "₹389", desc: "Perfect blend of red and white sauce" }
    ]
  },
  {
    category: "Burgers & Sandwiches",
    emoji: "🍔",
    items: [
      { name: "Veg Burger", price: "₹199", desc: "Classic vegetarian patty burger" },
      { name: "Chicken Burger", price: "₹229", desc: "Juicy chicken patty burger" },
      { name: "Cheesy Veg Burger", price: "₹249", desc: "Veg burger loaded with cheese", popular: true },
      { name: "Cheesy Chicken Burger", price: "₹279", desc: "Chicken burger loaded with cheese" },
      { name: "Cheese Sandwich", price: "₹179", desc: "Classic grilled cheese sandwich" },
      { name: "Cheese & Corn Sandwich", price: "₹189", desc: "Grilled sandwich with cheese and corn" },
      { name: "Veg Sandwich", price: "₹199", desc: "Healthy mixed vegetable sandwich" }
    ]
  },
  {
    category: "Starters & Fries",
    emoji: "🍟",
    items: [
      { name: "Plain Maggie", price: "₹169", desc: "Classic instant noodles" },
      { name: "Veg Maggie", price: "₹189", desc: "Instant noodles with mixed vegetables" },
      { name: "Chicken Maggie", price: "₹239", desc: "Instant noodles with chicken chunks" },
      { name: "Cheese Garlic Bread", price: "₹189", desc: "Toasted garlic bread topped with cheese" },
      { name: "Stuffed Garlic Bread", price: "₹199", desc: "Garlic bread stuffed with savory fillings" },
      { name: "Veg Cigar Roll", price: "₹199", desc: "Crispy rolls with vegetable filling" },
      { name: "Baked Nachos", price: "₹199", desc: "Crispy nachos baked with cheese and toppings" },
      { name: "Harabhara Kabab", price: "₹219", desc: "Healthy green vegetable patties" },
      { name: "Chicken Popcorn", price: "₹279", desc: "Crispy bite-sized chicken pieces", popular: true },
      { name: "Chicken Seekh Kabab", price: "₹259", desc: "Minced chicken skewers" },
      { name: "Plain Salted Fries", price: "₹169", desc: "Classic golden French fries" },
      { name: "Peri Peri Fries", price: "₹189", desc: "Fries tossed in spicy peri-peri seasoning" },
      { name: "Cheesy Fries", price: "₹249", desc: "Fries loaded with melted cheese" },
      { name: "Tandoori Fries", price: "₹249", desc: "Fries with a tandoori spice twist" }
    ]
  },
  {
    category: "Momos",
    emoji: "🥟",
    items: [
      { name: "Steam Momo (Veg/Paneer/Chicken)", price: "₹169/199/219", desc: "Classic steamed dumplings", popular: true },
      { name: "Fried Momo (Veg/Paneer/Chicken)", price: "₹169/199/219", desc: "Crispy deep-fried dumplings" },
      { name: "Pan-Fried Momo (Veg/Paneer/Chicken)", price: "₹189/219/239", desc: "Dumplings pan-fried until crispy" },
      { name: "Kurkure Momo (Veg/Paneer/Chicken)", price: "₹219/239/259", desc: "Extra crunchy coated dumplings" },
      { name: "Chilli Momo (Veg/Paneer/Chicken)", price: "₹219/239/259", desc: "Momos tossed in spicy chilli sauce" },
      { name: "Momo Platter (Veg/Paneer/Chicken)", price: "₹549/659/819", desc: "2 Steam, 2 Fried, 2 Kurkure, 2 Chilli, 2 Afghani, 2 Tandoori" }
    ]
  },
  {
    category: "Chinese",
    emoji: "🍜",
    items: [
      { name: "Veg Noodles", price: "₹199", desc: "Stir-fried noodles with mixed vegetables" },
      { name: "Chicken Noodles", price: "₹239", desc: "Stir-fried noodles with chicken" },
      { name: "Veg Hakka Noodles", price: "₹209", desc: "Classic Indo-Chinese style stir-fried noodles" },
      { name: "Veg Chilli Garlic Noodles", price: "₹219", desc: "Spicy and garlicky stir-fried noodles" },
      { name: "Veg Singapuri Noodles", price: "₹219", desc: "Spicy noodles flavored with curry powder" },
      { name: "Veg Butter garlic Noodles", price: "₹249", desc: "Indo-Chinese style noodles with rich butter garlic flavor" },
      { name: "Veg Fried Rice", price: "₹219", desc: "Classic Indo-Chinese style wok-tossed fried rice" },
      { name: "Chicken Fried Rice", price: "₹249", desc: "Wok-tossed fried rice with juicy chicken chunks" },
      { name: "Chilli Soupy Noodles", price: "₹249", desc: "Noodles in rich, spicy and flavorful broth" },
      { name: "Chilli Potato", price: "₹249", desc: "Crispy deep fried potatoes tossed in spicy chilli sauce", popular: true },
      { name: "Honey Chilli Potato", price: "₹299", desc: "Crispy potatoes tossed in spicy chilli sauce with a hint of honey" },
      { name: "Veg Manchurian Dry/Gravy", price: "₹289/299", desc: "Vegetable dumplings tossed in authentic Manchurian sauce" },
      { name: "Chilli Paneer Dry/Gravy", price: "₹349/359", desc: "Fresh cottage cheese cubes tossed with capsicum and onion in spicy chilli sauce" },
      { name: "Chicken Manchurian Dry/Gravy", price: "₹349/359", desc: "Juicy chicken dumplings tossed in authentic Manchurian sauce" },
      { name: "Chilli Chicken Dry/Gravy", price: "₹369/379", desc: "Juicy chicken chunks tossed with capsicum and onion in spicy chilli sauce" }
    ]
  },
  {
    category: "Soups & Salads",
    emoji: "🥗",
    items: [
      { name: "Veg Greek Salad", price: "₹249", desc: "A traditional Greek salad consisting of sliced cucumbers, tomatoes, green bell peppers, red onion, olives, and feta cheese" },
      { name: "Chicken Greek Salad", price: "₹299", desc: "Classic Greek salad topped with juicy grilled chicken chunks" },
      { name: "Veg Ceaser Salad", price: "₹269", desc: "Classic Caesar salad with crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing" },
      { name: "Chicken Ceaser Salad", price: "₹319", desc: "Classic Caesar salad topped with juicy grilled chicken chunks" },
      { name: "Veg Pasta Salad", price: "₹289", desc: "Freshly boiled pasta tossed with fresh veggies and dressed to perfection" },
      { name: "Tomato Soup", price: "₹249", desc: "Classic tangy and smooth tomato soup served with croutons" },
      { name: "Manchao Soup", price: "₹299", desc: "A popular Indo-Chinese soup known for its spicy and tangy flavor profile, topped with crispy noodles" },
      { name: "Chicken Soup", price: "₹269", desc: "A comforting soup made with chicken broth, tender chicken chunks, and aromatic vegetables" },
      { name: "Curd Chicken Soup", price: "₹319", desc: "A unique and flavorful soup made with chicken broth and yogurt, giving it a tangy twist" }
    ]
  },
  {
    category: "Platters",
    emoji: "🍛",
    items: [
      { name: "Jai Veeru (for 2)", price: "₹499/599", desc: "1 Single topping mini pizza + 4 momos + Small Fries + 2 Pepsi" },
      { name: "Raj Simran (for 2)", price: "₹1169/1319", desc: "Small Pasta + 2 Burger + Small Fries + 2 Shakes/Cold Coffee", popular: true },
      { name: "Dhamaal (for 4)", price: "₹1199", desc: "1 Regular single topping Pizza + 1 Veg Noddles + 1 Sandwich + 1 Chilli Potato + 4 Pepsi" },
      { name: "F.R.I.E.N.D.S (for 6)", price: "₹2399/2779", desc: "1 Large Pizza + 1 Pasta + 2 Fries + 2 Sandwich + 6 Mini Shakes/Mini Mojito" },
      { name: "Nostalgia Special (for 2)", price: "₹1299/1399", desc: "1 Pasta + 1 Regular Pizza + 1 Fries + 2 Slush" }
    ]
  },
  {
    category: "Combos",
    emoji: "🥤",
    items: [
      { name: "Poo Bani Parvati", price: "₹579", desc: "1 Regular Single topping pizza + small Pasta + 2 Pepsi" },
      { name: "Mera pehla pyaar adhoora reh gya", price: "₹619", desc: "4 Mini Single topping Pizza + 4 Pepsi" },
      { name: "Tu Dekh Le", price: "₹579", desc: "Veg Noodles + Chilli Potato + 2 Pepsi" },
      { name: "Muje Nahi Pta", price: "₹619", desc: "Veg Noodles + Veg Manchurian + 2 Pepsi" },
      { name: "Jo tu Bole", price: "₹609", desc: "Veg Noodles + Chicken Manchurian + 2 Pepsi" },
      { name: "Kuch bhi", price: "₹679", desc: "Veg Noodles + Chilli Paneer + 2 Pepsi", popular: true },
      { name: "Party Teri taraf se", price: "₹699", desc: "Veg Noodles + Chilli Chicken + 2 Pepsi" },
      { name: "Mini Combo: Veg Noodles + Veg Manchurian", price: "₹265", desc: "Quick bite combo" },
      { name: "Mini Combo: Veg Noodles + Chicken Manchurian", price: "₹295", desc: "Quick bite combo" },
      { name: "Mini Combo: Veg Noodles + Chilli Potato", price: "₹245", desc: "Quick bite combo" },
      { name: "Mini Combo: Veg Noodles + Chilli Paneer", price: "₹275", desc: "Quick bite combo" },
      { name: "Mini Combo: Veg Noodles + Chilli Chicken", price: "₹295", desc: "Quick bite combo" }
    ]
  }
];

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
      filter: 'brightness(0.5) contrast(1.2)' 
    }}
  />
);

// --- Interactive Menu Book ---
const MenuBook = ({ categories }: { categories: typeof menuData }) => {
  const [flippedIndex, setFlippedIndex] = useState(0);
  useEffect(() => { setFlippedIndex(0); }, [categories]);
  const pages: any[] = [];
  pages.push({ id: 'cover', type: 'cover', title: "Nostalgia Cafe", subtitle: categories.length > 1 ? "Complete Menu" : `${categories[0].category} Menu` });
  categories.forEach(cat => {
    const chunkSize = 3; 
    for (let i = 0; i < cat.items.length; i += chunkSize) {
      pages.push({ id: `${cat.category}-${i}`, type: 'content', title: cat.category, emoji: cat.emoji, items: cat.items.slice(i, i + chunkSize), pageNum: pages.length });
    }
  });
  pages.push({ id: 'backcover', type: 'backcover' });

  return (
    <div className="mt-20 mb-10 flex flex-col items-center overflow-hidden w-full relative z-10">
      <ScrollReveal>
        <div className="text-center mb-8">
          <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Interactive Experience</span>
          <h2 className="text-3xl font-display font-bold text-white mt-2">Flip Our Menu Book</h2>
          <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-4 rounded-full" />
        </div>
      </ScrollReveal>
      <div className="relative w-full max-w-[600px] flex justify-center mt-4 perspective-[2000px]">
        {/* ROD REMOVED FROM HERE */}
        <div className="relative w-[160px] xs:w-[180px] sm:w-[240px] md:w-[280px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[440px]">
          {pages.map((page, index) => {
            const isFlipped = index < flippedIndex;
            const dynamicZIndex = (index === flippedIndex || index === flippedIndex - 1) ? 20 : 10 - Math.abs(flippedIndex - index);
            return (
              <motion.div
                key={page.id}
                className="absolute inset-0 origin-left cursor-pointer"
                style={{ transformStyle: "preserve-3d" }} 
                initial={false}
                animate={{ rotateY: isFlipped ? -180 : 0, zIndex: dynamicZIndex }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={() => isFlipped ? setFlippedIndex(Math.max(0, index)) : setFlippedIndex(Math.min(pages.length, index + 1))}
              >
                {/* FRONT FACE OF PAGE */}
                <div 
                  className={`absolute inset-0 flex flex-col overflow-hidden border border-[#dc2626]/30 shadow-lg ${page.type === 'cover' || page.type === 'backcover' ? 'bg-[#dc2626] text-white' : 'bg-black text-stone-300'}`} 
                  style={{ backfaceVisibility: "hidden", clipPath: COFFIN_PATH }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
                  <div className="p-4 md:p-6 flex-1 flex flex-col pointer-events-none items-center justify-center pt-10 pb-10">
                    {page.type === 'cover' && <div className="flex-1 flex flex-col items-center justify-center text-center rounded-xl p-2 md:p-3 m-1 bg-black/20 w-full"><h1 className="font-display text-lg sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">{page.title}</h1><div className="w-8 h-1 bg-white/40 rounded-full mb-4" /><span className="text-stone-200 tracking-widest uppercase text-[10px] md:text-xs font-bold">{page.subtitle}</span></div>}
                    {page.type === 'content' && <><div className="border-b-2 border-[#dc2626]/30 pb-2 mb-3 w-full text-center"><h3 className="font-display font-bold text-xs sm:text-base text-[#dc2626] flex items-center justify-center gap-1.5"><span className="text-sm sm:text-lg drop-shadow-sm">{page.emoji}</span><span className="truncate">{page.title}</span></h3></div><div className="space-y-3 flex-1 px-4 w-full">{page.items.map((item: any, i: number) => (<div key={i} className="text-center"><div className="flex flex-col items-center gap-1 mb-1"><h4 className="font-bold text-stone-200 leading-tight text-[10px] sm:text-[12px]">{item.name}</h4><span className="font-bold text-[#dc2626] bg-[#1a0101] border border-[#dc2626]/30 px-1.5 py-0.5 rounded text-[9px] sm:text-[11px]">{item.price}</span></div><p className="text-[8px] sm:text-[10px] text-stone-500 leading-snug line-clamp-1">{item.desc}</p></div>))}</div><div className="text-center text-[8px] sm:text-[9px] font-semibold text-[#dc2626]/70 mt-2 border-t border-[#dc2626]/30 pt-2 uppercase tracking-widest">Page {page.pageNum}</div></>}
                    {page.type === 'backcover' && <div className="flex-1 flex flex-col items-center justify-center text-center"><h2 className="font-display text-lg sm:text-2xl font-bold mb-2 text-white">Nostalgia Cafe</h2><p className="text-stone-200 text-[9px] sm:text-xs font-medium">Thank you for visiting.</p></div>}
                  </div>
                </div>
                
                {/* BACK FACE OF PAGE (WHEN FLIPPED) */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden border border-[#dc2626]/30 bg-[#0a0000] shadow-lg" 
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", clipPath: COFFIN_PATH }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
                  <div className="opacity-10 text-center pointer-events-none">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#dc2626] -rotate-12 block">Nostalgia</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={() => setFlippedIndex(Math.max(0, flippedIndex - 1))} disabled={flippedIndex === 0} className="px-6 py-2 rounded-full bg-black border border-[#dc2626]/30 text-[#dc2626] font-semibold text-sm disabled:opacity-50 hover:bg-[#1a0101] transition-all">Previous</button>
        <button onClick={() => setFlippedIndex(Math.min(pages.length, flippedIndex + 1))} disabled={flippedIndex === pages.length} className="px-6 py-2 rounded-full bg-[#dc2626] text-white font-semibold text-sm disabled:opacity-50 hover:shadow-[0_0_15px_#dc2626] transition-all">{flippedIndex === pages.length ? "Closed" : "Next Page"}</button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const isLockActive = useRef(false);

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
    if (activeCategory !== "all" && !activeCategory.startsWith("scroll-")) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeCategory]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-141px 0px -75% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isLockActive.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveCategory("scroll-" + id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs.current).forEach((ref) => { if (ref) observer.observe(ref); });

    return () => observer.disconnect();
  }, []);

  const isAllView = activeCategory === "all" || activeCategory.startsWith("scroll-");
  const filtered = isAllView ? menuData : menuData.filter((cat) => cat.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    isLockActive.current = true;
    setActiveCategory(category);
    
    const targetId = category === "all" ? "menu-header-start" : category;
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 150; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setTimeout(() => {
        isLockActive.current = false;
      }, 1000);
    } else {
      isLockActive.current = false;
    }
  };

  const isTabActive = (catName: string) => {
    if (catName === "all") return activeCategory === "all" || activeCategory === "scroll-menu-header-start";
    return activeCategory === catName || activeCategory === `scroll-${catName}`;
  };

  return (
    <div className="relative min-h-screen bg-[#1a0101] text-stone-300 font-sans selection:bg-[#dc2626]">
      
      {/* ── 30-SPLAT HEAVY BLOOD TEXTURE LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 0% - 20% scroll depth */}
        <BloodSplat style={{ top: '1%', left: '3%' }} size={450} rotate={10} opacity={0.14} />
        <BloodSplat style={{ top: '5%', right: '5%' }} size={320} rotate={-15} opacity={0.1} />
        <BloodSplat style={{ top: '10%', left: '45%' }} size={250} rotate={110} opacity={0.08} />
        <BloodSplat style={{ top: '14%', left: '12%' }} size={380} rotate={45} opacity={0.12} />
        <BloodSplat style={{ top: '18%', right: '15%' }} size={210} rotate={190} opacity={0.09} />
        <BloodSplat style={{ top: '2%', right: '40%' }} size={180} rotate={75} opacity={0.07} />

        {/* 20% - 40% scroll depth */}
        <BloodSplat style={{ top: '24%', left: '-5%' }} size={300} rotate={-20} opacity={0.11} />
        <BloodSplat style={{ top: '28%', right: '2%' }} size={400} rotate={60} opacity={0.13} />
        <BloodSplat style={{ top: '32%', left: '50%', transform: 'translateX(-50%)' }} size={260} rotate={0} opacity={0.08} />
        <BloodSplat style={{ top: '35%', left: '15%' }} size={340} rotate={130} opacity={0.12} />
        <BloodSplat style={{ top: '38%', right: '20%' }} size={220} rotate={45} opacity={0.1} />
        <BloodSplat style={{ top: '26%', left: '40%' }} size={150} rotate={-45} opacity={0.07} />

        {/* 40% - 60% scroll depth */}
        <BloodSplat style={{ top: '44%', right: '-8%' }} size={350} rotate={15} opacity={0.13} />
        <BloodSplat style={{ top: '48%', left: '10%' }} size={420} rotate={-30} opacity={0.1} />
        <BloodSplat style={{ top: '52%', right: '45%' }} size={280} rotate={90} opacity={0.11} />
        <BloodSplat style={{ top: '55%', left: '25%' }} size={310} rotate={210} opacity={0.09} />
        <BloodSplat style={{ top: '58%', right: '10%' }} size={390} rotate={-10} opacity={0.14} />
        <BloodSplat style={{ top: '46%', left: '5%' }} size={200} rotate={80} opacity={0.08} />

        {/* 60% - 80% scroll depth */}
        <BloodSplat style={{ top: '64%', left: '-2%' }} size={330} rotate={40} opacity={0.12} />
        <BloodSplat style={{ top: '68%', right: '15%' }} size={280} rotate={160} opacity={0.11} />
        <BloodSplat style={{ top: '72%', left: '40%' }} size={360} rotate={-55} opacity={0.13} />
        <BloodSplat style={{ top: '75%', right: '35%' }} size={220} rotate={15} opacity={0.09} />
        <BloodSplat style={{ top: '78%', left: '8%' }} size={410} rotate={70} opacity={0.14} />
        <BloodSplat style={{ top: '66%', right: '5%' }} size={190} rotate={120} opacity={0.07} />

        {/* 80% - 100% scroll depth */}
        <BloodSplat style={{ top: '84%', right: '-5%' }} size={380} rotate={200} opacity={0.13} />
        <BloodSplat style={{ top: '88%', left: '30%' }} size={300} rotate={-40} opacity={0.11} />
        <BloodSplat style={{ top: '92%', right: '20%' }} size={250} rotate={85} opacity={0.09} />
        <BloodSplat style={{ top: '96%', left: '50%', transform: 'translateX(-50%)' }} size={450} rotate={180} opacity={0.15} />
        <BloodSplat style={{ bottom: '2%', right: '2%' }} size={320} rotate={30} opacity={0.12} />
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

      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#dc2626]/30 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button onClick={() => handleCategoryChange("all")} className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all shrink-0 ${isTabActive("all") ? "bg-[#dc2626] text-white border-[#dc2626]" : "bg-black border-[#dc2626]/30 text-stone-400 hover:bg-[#1a0101]"}`}>🍽️ All</button>
            {menuData.map((cat) => (
              <button key={cat.category} onClick={() => handleCategoryChange(cat.category)} className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all shrink-0 ${isTabActive(cat.category) ? "bg-[#dc2626] text-white border-[#dc2626]" : "bg-black border-[#dc2626]/30 text-stone-400 hover:bg-[#1a0101]"}`}><span>{cat.emoji}</span><span>{cat.category}</span></button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-[140px] md:pt-[160px] pb-20 container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 mt-2" id="menu-header-start" ref={(el) => (sectionRefs.current["menu-header-start"] = el)}>
            <span className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase">Explore</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">Our Menu</h1>
            <p className="text-stone-400 mt-3 max-w-md mx-auto">Fresh, authentic, and crafted to perfection</p>
            <div className="h-1 w-16 bg-[#dc2626] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-12 max-w-2xl mx-auto scroll-mt-32">
          <AnimatePresence>
            {filtered.map((cat, catIdx) => (
              <motion.div key={cat.category} id={cat.category} ref={(el) => (sectionRefs.current[cat.category] = el)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25, delay: catIdx * 0.05 }}>
                <ScrollReveal delay={catIdx * 0.05}>
                  <div className="bg-black rounded-2xl border border-[#dc2626]/30 shadow-[0_0_15px_rgba(220,38,38,0.05)] p-6 md:p-8 relative group">
                    
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dc2626] opacity-5 blur-[60px] pointer-events-none group-hover:opacity-20 transition-opacity duration-700 rounded-full" />
                    
                    {/* GHOST CORNERS */}
                    <div className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                      <Lottie animationData={ghostAnimation} loop={true} />
                    </div>
                    <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20" style={{ transform: "scaleX(-1)" }}>
                      <Lottie animationData={ghostAnimation} loop={true} />
                    </div>
                    <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                      <Lottie animationData={ghostAnimation} loop={true} />
                    </div>
                    <div className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20" style={{ transform: "scaleX(-1)" }}>
                      <Lottie animationData={ghostAnimation} loop={true} />
                    </div>

                    <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3 border-b border-[#dc2626]/20 pb-4 relative z-10"><span className="text-2xl">{cat.emoji}</span>{cat.category}</h2>
                    <div className="space-y-2 relative z-10">
                      {cat.items.map((item, i) => (
                        <motion.div key={item.name} className="flex justify-between items-start gap-4 p-3 rounded-xl hover:bg-[#1a0101] transition-all group/item" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                          <div className="flex-1"><div className="flex items-center gap-2"><h3 className="font-semibold text-stone-200 text-sm group-hover/item:text-[#dc2626] transition-colors">{item.name}</h3>{(item as any).popular && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#dc2626]/20 text-[#dc2626] px-2 py-0.5 rounded-full">Popular</span>}</div><p className="text-xs text-stone-500 mt-1 leading-relaxed">{item.desc}</p></div>
                          <span className="text-sm font-bold text-[#dc2626] whitespace-nowrap bg-[#1a0101] px-3 py-1 rounded-full border border-[#dc2626]/30">{item.price}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <MenuBook categories={filtered} />

        <ScrollReveal>
          <div className="text-center mt-16 p-8 rounded-2xl bg-black border border-[#dc2626]/30 shadow-sm">
            <p className="text-stone-400 text-sm mb-4 font-medium">Ready to order or book a table?</p>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-8 py-3 font-semibold text-white hover:shadow-[0_0_15px_#dc2626] transition-all"><Phone size={18} />Call Us</a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default MenuPage;