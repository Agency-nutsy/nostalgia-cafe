import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const PHONE = "+919871712300";

// Integrated Menu Data extracted directly from Aura Cafe menu photos
const menuData = [
  {
    category: "Starters (Veg)",
    emoji: "🥗",
    items: [
      { name: "Chilly Potato", price: "₹289", desc: "Crispy potatoes tossed in a spicy chilli sauce" },
      { name: "Veg Manchurian Gravy", price: "₹299", desc: "Vegetable dumplings in a savory soy-based gravy" },
      { name: "Chilly Paneer", price: "₹319", desc: "Paneer cubes tossed with peppers and onions" },
      { name: "Chilly Mushroom", price: "₹319", desc: "Crispy mushrooms in a spicy soy glaze" },
      { name: "Veg Salt & Pepper", price: "₹319", desc: "Crispy veggies tossed with salt and pepper seasoning" },
      { name: "Veg Manchurian Dry", price: "₹319", desc: "Crispy vegetable dumplings" },
      { name: "Honey Chilly Potato", price: "₹319", desc: "Sweet and spicy crispy potato fingers", popular: true },
      { name: "Chilly Chaap", price: "₹329", desc: "Soya chaap tossed in chilli sauce" },
      { name: "Hara Bhara Kabab", price: "₹339", desc: "Healthy green vegetable patties" },
      { name: "Aura Kurkuri Chaap (Spl.)", price: "₹339", desc: "Our signature crispy soya chaap", popular: true }
    ]
  },
  {
    category: "Starters (Non-Veg)",
    emoji: "🍗",
    items: [
      { name: "Chicken Spring Roll", price: "₹399", desc: "Crispy rolls stuffed with seasoned chicken" },
      { name: "Chicken Salt & Pepper", price: "₹319", desc: "Crispy chicken tossed with salt and pepper" },
      { name: "Chicken Wings BBQ", price: "₹319", desc: "Juicy wings glazed in classic BBQ sauce" },
      { name: "Chicken Wings Peri Peri", price: "₹329", desc: "Spicy peri peri glazed wings", popular: true },
      { name: "Chilly Chicken", price: "₹329", desc: "Classic spicy Indo-Chinese chicken dish" },
      { name: "Crispy Honey Chicken", price: "₹339", desc: "Sweet and crispy chicken bites" },
      { name: "Chicken Lolipop", price: "₹339", desc: "Spicy, deep-fried chicken wings" },
      { name: "Lemon Chicken", price: "₹349", desc: "Tangy and savory lemon glazed chicken" },
      { name: "Drums of Heaven", price: "₹349", desc: "Crispy chicken lollipops tossed in sweet and spicy sauce" },
      { name: "Aura Kurkura Chicken (Spl.)", price: "₹349", desc: "Our signature crispy chicken", popular: true }
    ]
  },
  {
    category: "Quick Bites",
    emoji: "🍟",
    items: [
      { name: "Garlic Breads", price: "₹219", desc: "Classic toasted garlic bread" },
      { name: "French Fries", price: "₹229", desc: "Crispy golden potato fries" },
      { name: "Masala Fries", price: "₹239", desc: "Fries tossed in Indian spices" },
      { name: "Peri Peri Fries", price: "₹249", desc: "Spicy peri peri seasoned fries", popular: true },
      { name: "Garlic Breads With Cheese", price: "₹269", desc: "Garlic bread topped with melted cheese" },
      { name: "Nachos Salsa Chat", price: "₹269", desc: "Crispy nachos served with tangy salsa" },
      { name: "Cheese Baked Nachos", price: "₹289", desc: "Nachos baked with a generous layer of cheese" },
      { name: "Cheese Fries", price: "₹299", desc: "French fries loaded with melted cheese" }
    ]
  },
  {
    category: "Pasta & Burgers",
    emoji: "🍝",
    items: [
      { name: "Penne Arrabiata", price: "₹219", desc: "Pasta cooked in a spicy tomato sauce" },
      { name: "Penne Alfredo", price: "₹219", desc: "Pasta in a rich, creamy white sauce", popular: true },
      { name: "Mix Sauce Pasta", price: "₹219", desc: "Perfect blend of red and white sauces" },
      { name: "Spaghetti Aglio Olio", price: "₹189", desc: "Classic olive oil, garlic, and chilli flakes" },
      { name: "Penne Pesto Cream", price: "₹189", desc: "Pasta in a creamy basil pesto sauce" },
      { name: "Veg Club Burger", price: "₹120", desc: "Classic triple-decker vegetable burger" },
      { name: "Peri Peri Burger", price: "₹140", desc: "Spicy burger with bold peri peri seasoning" },
      { name: "Non Veg Club Burger", price: "₹160", desc: "Triple-decker chicken burger" },
      { name: "Aura BBQ Burger", price: "₹220", desc: "Our signature burger loaded with BBQ sauce", popular: true },
      { name: "Open Cheese Burger", price: "₹220", desc: "Open-faced burger generously loaded with cheese" }
    ]
  },
  {
    category: "Pizzas & Momos",
    emoji: "🍕",
    items: [
      { name: "Margherita Pizza", price: "₹219", desc: "Classic cheese and tomato base" },
      { name: "Farm House Pizza", price: "₹249", desc: "Loaded with fresh assorted vegetables" },
      { name: "Paneer Tikka Pizza", price: "₹269", desc: "Topped with perfectly spiced paneer tikka" },
      { name: "Chicken Tikka Pizza", price: "₹299", desc: "Topped with flavorful chicken tikka" },
      { name: "BBQ Chicken Pizza", price: "₹319", desc: "Smoky BBQ chicken topping" },
      { name: "Aura Special Pizza", price: "₹349", desc: "Our fully loaded signature pizza", popular: true },
      { name: "Veg Steam/Fried Momo", price: "₹120 / ₹140", desc: "Classic vegetable dumplings" },
      { name: "Paneer Steam/Fried Momo", price: "₹150 / ₹170", desc: "Momos stuffed with fresh cottage cheese" },
      { name: "Chicken Steam/Fried Momo", price: "₹160 / ₹180", desc: "Savory chicken filled dumplings" },
      { name: "Kurkure Momo (Veg/Chicken)", price: "₹200 / ₹220", desc: "Extra crispy fried momos", popular: true }
    ]
  },
  {
    category: "Main Course",
    emoji: "🍛",
    items: [
      { name: "Chilli Mushroom Babycorn Gravy", price: "₹275", desc: "Mushrooms and baby corn cooked in a spicy gravy" },
      { name: "Chilli Paneer Gravy", price: "₹275", desc: "Cottage cheese cubes tossed in spicy gravy" },
      { name: "Chicken Steak", price: "₹285", desc: "Tender grilled chicken steak" },
      { name: "American Chicken Gravy", price: "₹285", desc: "Chicken prepared in a rich American-style gravy" },
      { name: "Gravy Manchurian (Veg/Chicken)", price: "₹199", desc: "Classic Indo-Chinese savory gravy" },
      { name: "Veg Lasagna", price: "₹235", desc: "Layered pasta baked with vegetables and cheese" },
      { name: "Chicken Lasagna", price: "₹295", desc: "Layered pasta baked with minced chicken and cheese", popular: true }
    ]
  }
];

// --- PERFECTED COMPONENT: 2-Sided Interactive Menu Book ---
const MenuBook = ({ categories }: { categories: typeof menuData }) => {
  const [flippedIndex, setFlippedIndex] = useState(0);

  useEffect(() => {
    setFlippedIndex(0);
  }, [categories]);

  const pages: any[] = [];
  
  // Cover Page
  pages.push({ 
    id: 'cover', 
    type: 'cover', 
    title: "The Aura Cafe", 
    subtitle: categories.length > 1 ? "Complete Menu" : `${categories[0].category} Menu` 
  });

  // Reduced items per page so everything fits perfectly in the new realistic double-spread format
  categories.forEach(cat => {
    const chunkSize = 3; 
    for (let i = 0; i < cat.items.length; i += chunkSize) {
      pages.push({
        id: `${cat.category}-${i}`,
        type: 'content',
        title: cat.category,
        emoji: cat.emoji,
        items: cat.items.slice(i, i + chunkSize),
        pageNum: pages.length 
      });
    }
  });

  // Back Cover Page
  pages.push({ id: 'backcover', type: 'backcover' });

  return (
    <div className="mt-20 mb-10 flex flex-col items-center overflow-hidden w-full relative z-10">
      <ScrollReveal>
        <div className="text-center mb-8">
          <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Interactive Experience</span>
          <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Flip Our Menu Book</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">Click the right side to turn the page forward, and the left side to turn back.</p>
          <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
        </div>
      </ScrollReveal>

      {/* Centered Book Container for the 2-Page Spread */}
      <div className="relative w-full max-w-[600px] flex justify-center mt-4 perspective-[2000px]">
        
        {/* Right Half (Pages hinge from the left edge of this div) */}
        <div className="relative w-[160px] xs:w-[180px] sm:w-[240px] md:w-[280px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[440px]">
          
          {/* Binder Spine Shadow underneath */}
          <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gray-900/10 rounded-full shadow-inner z-0 -translate-x-1/2" />

          {pages.map((page, index) => {
            const isFlipped = index < flippedIndex;
            
            // FIX: Lowered the z-index so the book stays safely UNDER the sticky category bar and navbar
            const isTopLeaf = index === flippedIndex || index === flippedIndex - 1;
            const dynamicZIndex = isTopLeaf ? 20 : 10 - Math.abs(flippedIndex - index);

            return (
              <motion.div
                key={page.id}
                className="absolute inset-0 origin-left cursor-pointer"
                style={{ transformStyle: "preserve-3d" }} 
                initial={false}
                animate={{
                  rotateY: isFlipped ? -180 : 0,
                  zIndex: dynamicZIndex,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={() => {
                  // Click on left stack turns page back, right stack turns page forward
                  if (isFlipped) setFlippedIndex(Math.max(0, index));
                  else setFlippedIndex(Math.min(pages.length, index + 1));
                }}
              >
                {/* ── FRONT OF LEAF (Right Side) ── */}
                <div 
                  className={`absolute inset-0 flex flex-col overflow-hidden rounded-r-2xl rounded-l-sm border border-[#FBCFE8] shadow-lg ${
                    page.type === 'cover' || page.type === 'backcover' ? 'bg-[#FBCFE8] text-gray-900' : 'bg-[#fffdfa] text-gray-800'
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                  
                  <div className="p-4 md:p-6 flex-1 flex flex-col pointer-events-none">
                    {page.type === 'cover' && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-white/50 rounded-xl p-2 md:p-3 m-1 bg-white/30">
                        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">{page.title}</h1>
                        <div className="w-8 h-1 bg-[#be185d]/40 rounded-full mb-4" />
                        <span className="text-gray-700 tracking-widest uppercase text-[10px] md:text-xs font-semibold">{page.subtitle}</span>
                      </div>
                    )}

                    {page.type === 'content' && (
                      <>
                        <div className="border-b-2 border-[#FBCFE8] pb-2 mb-3">
                          <h3 className="font-display font-bold text-sm sm:text-lg text-[#be185d] flex items-center gap-1.5">
                            <span className="text-lg sm:text-xl drop-shadow-sm">{page.emoji}</span> 
                            <span className="truncate">{page.title}</span>
                          </h3>
                        </div>
                        <div className="space-y-3 flex-1 px-1">
                          {page.items.map((item: any, i: number) => (
                            <div key={i}>
                              <div className="flex justify-between items-start gap-1 mb-1">
                                <h4 className="font-bold text-gray-800 leading-tight text-[11px] sm:text-[13px]">{item.name}</h4>
                                <span className="font-bold text-[#be185d] shrink-0 bg-[#FBCFE8]/30 px-1.5 py-0.5 rounded text-[10px] sm:text-[12px]">{item.price}</span>
                              </div>
                              <p className="text-[9px] sm:text-[11px] text-gray-500 leading-snug pr-2 line-clamp-2">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="text-center text-[9px] sm:text-[10px] font-semibold text-[#be185d]/70 mt-2 border-t border-[#FBCFE8]/50 pt-2 uppercase tracking-widest">
                          Page {page.pageNum}
                        </div>
                      </>
                    )}

                    {page.type === 'backcover' && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-2 text-gray-900">The Aura Cafe</h2>
                        <p className="text-gray-700 text-[10px] sm:text-sm">Thank you for visiting.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── BACK OF LEAF (Left Side) ── */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-l-2xl rounded-r-sm border border-[#FBCFE8] bg-[#FBCFE8]/30 shadow-lg"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                  <div className="opacity-10 text-center pointer-events-none">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#be185d] -rotate-12 block">Aura</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setFlippedIndex(Math.max(0, flippedIndex - 1))}
          disabled={flippedIndex === 0}
          className="px-6 py-2 rounded-full bg-white border border-[#FBCFE8] text-[#be185d] font-semibold text-sm disabled:opacity-50 hover:bg-[#FBCFE8]/30 hover:shadow-md transition-all shadow-sm z-30 relative"
        >
          Previous
        </button>
        <button
          onClick={() => setFlippedIndex(Math.min(pages.length, flippedIndex + 1))}
          disabled={flippedIndex === pages.length}
          className="px-6 py-2 rounded-full bg-[#FBCFE8] text-gray-900 font-semibold text-sm disabled:opacity-50 hover:bg-[#f9a8d4] hover:shadow-md transition-all shadow-sm z-30 relative"
        >
          {flippedIndex === pages.length ? "Closed" : "Next Page"}
        </button>
      </div>
    </div>
  );
};
// ---------------------------------------------

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? menuData
    : menuData.filter((cat) => cat.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const menuStartEl = document.getElementById("menu-content-start");
    if (menuStartEl) {
      const y = menuStartEl.getBoundingClientRect().top + window.scrollY - 140; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBCFE8]/10 text-gray-800">
      
      {/* ── BULLETPROOF CATEGORY BAR ── */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#FBCFE8] shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            
            <button
              onClick={() => handleCategoryChange("all")}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 shrink-0 ${
                activeCategory === "all"
                  ? "bg-[#FBCFE8] text-gray-900 border-[#FBCFE8] shadow-sm"
                  : "bg-white border-[#FBCFE8]/80 text-gray-700 hover:bg-[#FBCFE8]/40 hover:text-[#be185d] hover:border-[#be185d]/30 hover:shadow-md"
              }`}
            >
              🍽️ All
            </button>

            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => handleCategoryChange(cat.category)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 shrink-0 ${
                  activeCategory === cat.category
                    ? "bg-[#FBCFE8] text-gray-900 border-[#FBCFE8] shadow-sm"
                    : "bg-white border-[#FBCFE8]/80 text-gray-700 hover:bg-[#FBCFE8]/40 hover:text-[#be185d] hover:border-[#be185d]/30 hover:shadow-md"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN PAGE CONTENT ── */}
      <div className="pt-[140px] md:pt-[160px] pb-20 container">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10 mt-2">
            <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Explore</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Our Menu</h1>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Fresh, authentic, and made with love — every single day
            </p>
            <div className="h-1 w-16 bg-[#be185d] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* ── Menu Sections (Anchor target for scrolling) ── */}
        <div id="menu-content-start" className="space-y-12 max-w-2xl mx-auto scroll-mt-32">
          <AnimatePresence mode="wait">
            {filtered.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, delay: catIdx * 0.05 }}
              >
                <ScrollReveal delay={catIdx * 0.05}>
                  <div className="bg-white rounded-2xl border border-[#FBCFE8] shadow-sm p-6 md:p-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3 border-b border-[#FBCFE8]/40 pb-4">
                      <span className="text-2xl">{cat.emoji}</span>
                      {cat.category}
                    </h2>
                    <div className="space-y-2">
                      {cat.items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          className="flex justify-between items-start gap-4 p-3 rounded-xl hover:bg-[#FBCFE8]/20 transition-colors group"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-[#be185d] transition-colors">
                                {item.name}
                              </h3>
                              {(item as any).popular && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FBCFE8]/60 text-[#be185d] px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                          <span className="text-sm font-bold text-[#be185d] whitespace-nowrap bg-[#FBCFE8]/30 px-3 py-1 rounded-full border border-[#FBCFE8]/50">
                            {item.price}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── INTERACTIVE MENU BOOKLET ── */}
        <MenuBook categories={filtered} />

        {/* Call CTA */}
        <ScrollReveal>
          <div className="text-center mt-16 p-8 rounded-2xl bg-white border border-[#FBCFE8] shadow-sm">
            <p className="text-gray-600 text-sm mb-4 font-medium">Ready to order or book a table?</p>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#FBCFE8] px-8 py-3 font-semibold text-gray-900 hover:bg-[#f9a8d4] hover:shadow-lg hover:shadow-[#FBCFE8]/50 transition-all"
            >
              <Phone size={18} />
              Call Us
            </a>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default MenuPage;