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

// --- UPDATED COMPONENT: Interactive Menu Book ---
const MenuBook = ({ categories }: { categories: typeof menuData }) => {
  const [flippedIndex, setFlippedIndex] = useState(0);

  // Close the book automatically when a user switches categories
  useEffect(() => {
    setFlippedIndex(0);
  }, [categories]);

  // Generate pages based on current category selection
  const pages: any[] = [];
  
  // Cover Page
  pages.push({ 
    id: 'cover', 
    type: 'cover', 
    title: "The Aura Cafe", 
    subtitle: categories.length > 1 ? "Complete Menu" : `${categories[0].category} Menu` 
  });

  // Content Pages (chunked 4 items per page so it fits the smaller book height)
  categories.forEach(cat => {
    const chunkSize = 4;
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
    <div className="mt-20 mb-10 flex flex-col items-center">
      <ScrollReveal>
        <div className="text-center mb-8">
          <span className="text-pink-600 text-sm font-semibold tracking-widest uppercase">Interactive Experience</span>
          <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Flip Our Menu Book</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">Click the right side to turn the page forward, and the left side to turn back.</p>
          <div className="h-1 w-16 bg-pink-500 mx-auto mt-4 rounded-full" />
        </div>
      </ScrollReveal>

      {/* Book Container - Made Smaller and Enhanced Perspective */}
      <div className="relative w-full max-w-[340px] md:max-w-[420px] h-[480px] perspective-[2000px] mt-4">
        {/* Binder Spine Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-pink-900/10 rounded-l-2xl shadow-inner z-0 -translate-x-2" />

        {pages.map((page, index) => {
          const isFlipped = index < flippedIndex;
          const isTop = index === flippedIndex;

          return (
            <motion.div
              key={page.id}
              className={`absolute inset-0 origin-left rounded-r-3xl rounded-l-sm border border-pink-200/50 flex flex-col overflow-hidden ${
                page.type === 'cover' || page.type === 'backcover' 
                  ? 'bg-pink-500 text-white shadow-2xl' 
                  : 'bg-[#fffdfa] text-gray-800 shadow-xl'
              }`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transformStyle: "preserve-3d", // Enhances 3D effect
              }}
              initial={false}
              animate={{
                rotateY: isFlipped ? -180 : 0,
                zIndex: isFlipped ? index : pages.length - index,
                boxShadow: isTop ? "20px 0 25px -5px rgba(236, 72, 153, 0.15)" : "none"
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }} // Slower, smoother page turn
            >
              {/* Invisible Click Zones for Turning Pages */}
              <div className="absolute inset-0 flex z-30">
                <div className="w-1/2 h-full cursor-pointer" onClick={() => setFlippedIndex(Math.max(0, index - 1))} title="Previous Page" />
                <div className="w-1/2 h-full cursor-pointer" onClick={() => setFlippedIndex(Math.min(pages.length - 1, index + 1))} title="Next Page" />
              </div>

              {/* Binder Overlay (creates realistic shadow on the left seam) */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />

              {/* Page Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 pointer-events-none">
                
                {page.type === 'cover' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center border-[3px] border-pink-400/60 rounded-2xl p-4 m-1 bg-pink-500/50">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">{page.title}</h1>
                    <div className="w-12 h-1 bg-pink-300 rounded-full mb-6" />
                    <span className="text-pink-100 tracking-widest uppercase text-xs md:text-sm font-semibold">{page.subtitle}</span>
                    <p className="text-pink-100 italic bg-pink-600/50 px-4 py-2 rounded-full text-xs shadow-sm mt-8">Click right to open</p>
                  </div>
                )}

                {page.type === 'content' && (
                  <>
                    <div className="border-b-2 border-pink-100 pb-3 mb-4 mt-1">
                      <h3 className="font-display font-bold text-xl text-pink-600 flex items-center gap-2">
                        <span className="text-2xl drop-shadow-sm">{page.emoji}</span> {page.title}
                      </h3>
                    </div>
                    <div className="space-y-4 flex-1 px-1">
                      {page.items.map((item: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-bold text-gray-800 leading-tight text-[14px]">{item.name}</h4>
                            <span className="font-bold text-pink-600 shrink-0 bg-pink-50 px-2 py-0.5 rounded-md text-[13px]">{item.price}</span>
                          </div>
                          <p className="text-[12px] text-gray-500 leading-snug pr-4">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-[10px] font-semibold text-pink-300/80 mt-2 border-t border-pink-50 pt-3 uppercase tracking-widest">
                      Page {page.pageNum}
                    </div>
                  </>
                )}

                {page.type === 'backcover' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h2 className="font-display text-3xl font-bold mb-3 text-white">The Aura Cafe</h2>
                    <p className="text-pink-100 mb-8 text-md">Thank you for visiting.</p>
                    
                    {/* NEW: Interactive Close Button */}
                    <button 
                      onClick={() => setFlippedIndex(0)}
                      className="pointer-events-auto px-6 py-2.5 rounded-full bg-white text-pink-600 font-semibold text-sm shadow-lg hover:scale-105 hover:bg-pink-50 transition-all"
                    >
                      Close Menu
                    </button>
                    
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setFlippedIndex(Math.max(0, flippedIndex - 1))}
          disabled={flippedIndex === 0}
          className="px-6 py-2 rounded-full bg-white border border-pink-200 text-pink-600 font-semibold text-sm disabled:opacity-50 hover:bg-pink-50 hover:shadow-md transition-all shadow-sm z-30 relative"
        >
          Previous
        </button>
        <button
          onClick={() => setFlippedIndex(Math.min(pages.length - 1, flippedIndex + 1))}
          disabled={flippedIndex === pages.length - 1}
          className="px-6 py-2 rounded-full bg-pink-500 text-white font-semibold text-sm disabled:opacity-50 hover:bg-pink-600 hover:shadow-md transition-all shadow-sm z-30 relative"
        >
          Next Page
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

  return (
    <div className="relative min-h-screen bg-pink-50 text-gray-800">
      
      {/* ── BULLETPROOF CATEGORY BAR (FIXED) ── */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            
            {/* All Button */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 shrink-0 ${
                activeCategory === "all"
                  ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                  : "bg-white border-pink-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 hover:shadow-md"
              }`}
            >
              🍽️ All
            </button>

            {/* Category Buttons */}
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 shrink-0 ${
                  activeCategory === cat.category
                    ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                    : "bg-white border-pink-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 hover:shadow-md"
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
            <span className="text-pink-600 text-sm font-semibold tracking-widest uppercase">Explore</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Our Menu</h1>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Fresh, authentic, and made with love — every single day
            </p>
            <div className="h-1 w-16 bg-pink-500 mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* ── Menu Sections ── */}
        <div className="space-y-12 max-w-2xl mx-auto">
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
                  <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3 border-b border-pink-50 pb-4">
                      <span className="text-2xl">{cat.emoji}</span>
                      {cat.category}
                    </h2>
                    <div className="space-y-2">
                      {cat.items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          className="flex justify-between items-start gap-4 p-3 rounded-xl hover:bg-pink-50/80 transition-colors group"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">
                                {item.name}
                              </h3>
                              {(item as any).popular && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                          <span className="text-sm font-bold text-pink-600 whitespace-nowrap bg-pink-100/50 px-3 py-1 rounded-full border border-pink-100">
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
          <div className="text-center mt-16 p-8 rounded-2xl bg-white border border-pink-200 shadow-sm">
            <p className="text-gray-600 text-sm mb-4 font-medium">Ready to order or book a table?</p>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-8 py-3 font-semibold text-white hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all"
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