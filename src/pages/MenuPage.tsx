import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const PHONE = "+919654133100";

// Integrated Menu Data extracted directly from Kiiza Cafe menu photos
const menuData = [
  {
    category: "Burgers & Sandwiches",
    emoji: "🍔",
    items: [
      { name: "All Time Allo Tikki Burger", price: "₹189", desc: "Classic potato patty burger" },
      { name: "Grilled Panner Burger", price: "₹199", desc: "Grilled cottage cheese burger" },
      { name: "Juicy Chicken Burger", price: "₹219", desc: "Juicy chicken patty burger", popular: true },
      { name: "Veg Grilled Sandwiches", price: "₹219", desc: "Grilled sandwich with mixed vegetables" },
      { name: "Grilled Paneer Sandwiches", price: "₹259", desc: "Grilled sandwich with paneer filling" },
      { name: "Club Sandwiches", price: "₹259/279", desc: "Classic multi-layered club sandwich" },
      { name: "Grilled Chicken Sandwiches", price: "₹219", desc: "Grilled sandwich with chicken filling" },
      { name: "Chef Special Sandwiches", price: "₹249/299", desc: "Our chef's signature sandwich creation" }
    ]
  },
  {
    category: "Platters & Sizzlers",
    emoji: "🍛",
    items: [
      { name: "Tandoori Veg Fully Loded Platter", price: "₹599", desc: "Assorted tandoori vegetarian appetizers" },
      { name: "Chinese Veg Platter", price: "₹549", desc: "Assorted Chinese vegetarian starters" },
      { name: "Tandoori Non-Veg Platter", price: "₹649", desc: "Assorted tandoori non-vegetarian appetizers", popular: true },
      { name: "Chinese Non-Non Veg Platter", price: "₹649", desc: "Assorted Chinese non-vegetarian starters" },
      { name: "Peri-Peri Sizzler", price: "₹499/549", desc: "Crumb fried cottage cheese/grilled chicken with chilli rice, sauteed vegetables, fries & peri sauce" },
      { name: "Chottage Sheese Sizzler", price: "₹499", desc: "Wok tossed noodles, burnt garlic vegetables, masala fries" },
      { name: "BBQ Sizzler", price: "₹449/549", desc: "Barbequed mushroom / BBQ chicken with spaghetti noodles, sauteed vegetables & BBQ sauce" }
    ]
  },
  {
    category: "Sahi Andaz Vegetarian",
    emoji: "🥘",
    items: [
      { name: "Dal Makhani", price: "₹349", desc: "Classic slow-cooked black lentils", popular: true },
      { name: "Dal Bhukhara", price: "₹309", desc: "Rich and creamy lentil preparation" },
      { name: "Dal Tadka", price: "₹299", desc: "Yellow lentils tempered with spices" },
      { name: "Shahi Paneer", price: "₹349", desc: "Cottage cheese in a rich, creamy tomato gravy" },
      { name: "Kadhai Paneer", price: "₹379", desc: "Paneer cooked with bell peppers and whole spices" },
      { name: "Paneer Lababdar", price: "₹349", desc: "Paneer in a rich, creamy, and tangy gravy" },
      { name: "Paneer Butter Masala", price: "₹399", desc: "Paneer in a classic buttery tomato gravy" },
      { name: "Paneer Tikka Masala", price: "₹399", desc: "Tandoori paneer tikka in a spiced gravy" },
      { name: "Matar Paneer", price: "₹349", desc: "Peas and paneer in a home-style curry" },
      { name: "Paneer Methi Malai", price: "₹349", desc: "Paneer cooked with fenugreek leaves in a creamy sauce" },
      { name: "Malai Kofta", price: "₹349", desc: "Cottage cheese dumplings in a rich creamy gravy" },
      { name: "Paneer Bhurji", price: "₹349", desc: "Scrambled paneer with onions, tomatoes, and spices" },
      { name: "Tawa Chaap", price: "₹349", desc: "Soya chaap cooked on a flat griddle with spices" },
      { name: "Masala Chaap", price: "₹349", desc: "Soya chaap in a rich, spiced gravy" },
      { name: "Mix Veg", price: "₹349", desc: "Assorted seasonal vegetables cooked with spices" }
    ]
  },
  {
    category: "Sahi Andaz Non-Vegetarian",
    emoji: "🍗",
    items: [
      { name: "Butter Chicken", price: "₹449", desc: "Classic tandoori chicken in a rich buttery tomato gravy", popular: true },
      { name: "Kadhai Chicken", price: "₹449", desc: "Chicken cooked with bell peppers and whole spices" },
      { name: "Tawa Chicken", price: "₹439", desc: "Spiced chicken cooked on a flat griddle" },
      { name: "Rara Chicken", price: "₹479", desc: "Chicken pieces cooked in a minced chicken gravy" },
      { name: "Chicken Rogen", price: "₹479", desc: "Chicken cooked in a rich, aromatic Kashmiri-style gravy" },
      { name: "Chicken Tikka Masala", price: "₹469", desc: "Tandoori chicken tikka cooked in a spiced gravy" },
      { name: "Bhatti Ka Murga Masala", price: "₹469", desc: "Charcoal-grilled chicken cooked in a robust masala" },
      { name: "Murga Maharaja", price: "₹499", desc: "A royal chicken delicacy" },
      { name: "Mutton Rogan Josh", price: "₹499", desc: "Classic Kashmiri mutton curry" }
    ]
  },
  {
    category: "Biryani & Rice",
    emoji: "🍚",
    items: [
      { name: "Veg Biryani", price: "₹319", desc: "Aromatic basmati rice cooked with mixed vegetables and spices" },
      { name: "Chicken Biryani", price: "₹369", desc: "Flavorful basmati rice cooked with spiced chicken", popular: true },
      { name: "Hydrabadi Biryani", price: "₹389", desc: "Authentic Hyderabadi-style spiced biryani" },
      { name: "Mutton Biryani", price: "₹409", desc: "Aromatic basmati rice cooked with tender mutton" },
      { name: "Fried Rice", price: "₹279", desc: "Wok-tossed rice with vegetables/meat" },
      { name: "Corn Fried Rice", price: "₹299", desc: "Wok-tossed rice with sweet corn" }
    ]
  },
  {
    category: "Raita & Breads",
    emoji: "🥐",
    items: [
      { name: "Mix Veg Raita", price: "₹159", desc: "Yogurt mixed with chopped vegetables" },
      { name: "Boondi Raita", price: "₹149", desc: "Yogurt mixed with crispy gram flour pearls" },
      { name: "Plain Curd", price: "₹99", desc: "Fresh, plain yogurt" },
      { name: "Pineapple Raita", price: "₹189", desc: "Yogurt mixed with sweet pineapple chunks" },
      { name: "Plain Roti", price: "₹20", desc: "Whole wheat flatbread" },
      { name: "Butter Roti", price: "₹25", desc: "Whole wheat flatbread brushed with butter" },
      { name: "Pyaz Roti", price: "₹45", desc: "Flatbread stuffed with onions" },
      { name: "Laccha Paratha", price: "₹55", desc: "Flaky, layered whole wheat flatbread" },
      { name: "Garlic Laccha Paratha", price: "₹60", desc: "Layered flatbread flavored with garlic" },
      { name: "Mirchi Paratha", price: "₹55", desc: "Layered flatbread flavored with chilli" },
      { name: "Pudina Paratha", price: "₹50", desc: "Layered flatbread flavored with mint" },
      { name: "Stuffed Paratha", price: "₹80", desc: "Flatbread stuffed with a savory filling" },
      { name: "Plain Naan", price: "₹55", desc: "Leavened flatbread baked in a tandoor" },
      { name: "Butter Naan", price: "₹60", desc: "Leavened flatbread brushed with butter", popular: true },
      { name: "Garlic Naan", price: "₹75", desc: "Leavened flatbread topped with garlic" },
      { name: "Stuffed Naan", price: "₹90", desc: "Leavened flatbread stuffed with a savory filling" },
      { name: "Chicken Keema Naan", price: "₹140", desc: "Leavened flatbread stuffed with minced chicken" }
    ]
  },
  {
    category: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Margherita Pizza", price: "₹299", desc: "Pizza sauce, mozzarella & fresh basil leaves" },
      { name: "Exotica Veg Pizza", price: "₹389", desc: "Pizza sauce, mozzarella, bell peppers, onion, mushrooms, broccoli & paneer" },
      { name: "Primavera Veg Pizza", price: "₹389", desc: "Pizza sauce, mozzarella, bell peppers, zucchini & mushroom" },
      { name: "Hawaiian Pizza", price: "₹389", desc: "Pizza sauce, mozzarella, corn & pineapple" },
      { name: "Paneer Tikka Pizza", price: "₹399", desc: "Pizza sauce, mozzarella, roasted bell pepper, onion & paneer tikka", popular: true },
      { name: "Chicken Tikka Pizza", price: "₹399", desc: "Pizza sauce, mozzarella, roasted chicken, onion & mozzarella" },
      { name: "Diavola Non-Veg", price: "₹399", desc: "Pizza sauce, mozzarella, spicy sausage, onion & chillies" },
      { name: "Peri-Peri Chicken Pizza", price: "₹419", desc: "Pizza sauce, mozzarella, roasted chicken, onion & jalapeno with peri-peri sauce" },
      { name: "Milano Non-Veg", price: "₹419", desc: "Pizza sauce, mozzarella, chicken salami, chicken sausage & roasted chicken" }
    ]
  },
  {
    category: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Arrabiata", price: "₹399/519", desc: "Pasta in a spicy tomato sauce" },
      { name: "Mama Rosa", price: "₹399/519", desc: "Pasta in a creamy tomato sauce (pink sauce)", popular: true },
      { name: "Aglio Olio", price: "₹299/319", desc: "Pasta tossed with olive oil, garlic, and chilli flakes" },
      { name: "Spaghetti", price: "₹349/379", desc: "Classic long, thin pasta" }
    ]
  },
  {
    category: "Healthy Salad",
    emoji: "🥗",
    items: [
      { name: "Green Salad", price: "₹149", desc: "Fresh mixed greens and vegetables" },
      { name: "Ceasar Salad", price: "₹199/269", desc: "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing" },
      { name: "Greek Salad", price: "₹239/279", desc: "Tomatoes, cucumbers, onion, feta cheese, and olives" },
      { name: "Grilled Peri-Peri Chicken Salad", price: "₹299", desc: "Mixed greens topped with spicy grilled peri-peri chicken", popular: true },
      { name: "Plain Peanut", price: "₹139", desc: "Roasted plain peanuts" },
      { name: "Masala Peanut", price: "₹179", desc: "Roasted peanuts mixed with spices, onions, and tomatoes" },
      { name: "Masala Papad", price: "₹159", desc: "Crispy lentil wafer topped with a spicy onion-tomato mix" }
    ]
  },
  {
    category: "Momos",
    emoji: "🥟",
    items: [
      { name: "Steamed Momo", price: "₹239/259", desc: "Classic steamed dumplings" },
      { name: "Pan Fried Momo", price: "₹279/299", desc: "Dumplings pan-fried until crispy on the bottom" },
      { name: "Deep Fried Momo", price: "₹279/299", desc: "Crispy, deep-fried dumplings" },
      { name: "Tandoori Momo", price: "₹299/349", desc: "Dumplings marinated in spices and roasted in a tandoor", popular: true },
      { name: "Steamed Mutton Momo", price: "₹349", desc: "Steamed dumplings filled with minced mutton" }
    ]
  },
  {
    category: "Soups",
    emoji: "🥣",
    items: [
      { name: "Cream Of Tomato", price: "₹199/229", desc: "Classic creamy tomato soup" },
      { name: "Hot & Sour", price: "₹209/249", desc: "Spicy and tangy Asian-style soup" },
      { name: "Manchow", price: "₹209/249", desc: "Spicy, dark brown soup with crispy noodles", popular: true },
      { name: "Sweet Corn", price: "₹209/249", desc: "Thick soup made with sweet corn kernels" },
      { name: "Talumein", price: "₹209/249", desc: "Clear soup with noodles and vegetables" }
    ]
  },
  {
    category: "Starters (Chilli & Dry)",
    emoji: "🌶️",
    items: [
      { name: "Chilli Potato", price: "₹279", desc: "Crispy potatoes tossed in a spicy chilli sauce" },
      { name: "Chilli Crispy Corn", price: "₹279", desc: "Crispy fried corn kernels tossed with spices" },
      { name: "Chilli Paneer Dry/Gravy", price: "₹329/339", desc: "Paneer cubes tossed with peppers and onions" },
      { name: "Chilli Mushroom", price: "₹329", desc: "Crispy mushrooms in a spicy soy glaze" },
      { name: "Manchurian Dry/Gravy", price: "₹299/349", desc: "Vegetable dumplings in a savory soy-based sauce" },
      { name: "Salt & Pepper Veg", price: "₹349", desc: "Crispy veggies tossed with salt and pepper seasoning" },
      { name: "Chilli Chaap", price: "₹299", desc: "Soya chaap tossed in chilli sauce" },
      { name: "Chilli Chicken", price: "₹399", desc: "Classic spicy Indo-Chinese chicken dish", popular: true },
      { name: "Chicken Lollipop", price: "₹409", desc: "Spicy, deep-fried chicken wings" },
      { name: "Drums Of Heaven", price: "₹409", desc: "Crispy chicken lollipops tossed in sweet and spicy sauce" },
      { name: "Lemon Chicken", price: "₹399", desc: "Tangy and savory lemon glazed chicken" },
      { name: "Chicken Salt & Pepper", price: "₹399", desc: "Crispy chicken tossed with salt and pepper" },
      { name: "Chicken Manchurian", price: "₹399", desc: "Chicken dumplings in a savory soy-based sauce" }
    ]
  },
  {
    category: "Tandoori Khazana",
    emoji: "🍢",
    items: [
      { name: "Paneer Tikka", price: "₹349", desc: "Cottage cheese marinated in spices and grilled in a tandoor" },
      { name: "Malai Paneer Tikka", price: "₹379", desc: "Cottage cheese marinated in a creamy, mildly spiced mixture" },
      { name: "Peri-Peri Chaap", price: "₹349", desc: "Soya chaap marinated in spicy peri-peri sauce" },
      { name: "Tandoori Chaap", price: "₹319", desc: "Soya chaap marinated in classic tandoori spices" },
      { name: "Masala Malai Chaap", price: "₹339", desc: "Soya chaap in a rich, creamy, and spiced marinade" },
      { name: "Afghani Chaap", price: "₹339", desc: "Soya chaap marinated in a rich, creamy, and nutty mixture" },
      { name: "Stuffed Chaap", price: "₹369", desc: "Soya chaap stuffed with a savory filling" },
      { name: "Tandoori Mushroom", price: "₹299", desc: "Mushrooms marinated in spices and grilled in a tandoor" },
      { name: "Chicken Tikka", price: "₹399", desc: "Boneless chicken chunks marinated in spices and grilled", popular: true },
      { name: "Peri-Peri Chicken Tikka", price: "₹409", desc: "Chicken tikka with a spicy peri-peri kick" },
      { name: "Chicken Malai Tikka", price: "₹409", desc: "Chicken chunks in a creamy, mildly spiced marinade" },
      { name: "Juicy Chicken Wings", price: "₹419", desc: "Tender and flavorful chicken wings" },
      { name: "Peri-Peri Chicken Wings", price: "₹419", desc: "Chicken wings with a spicy peri-peri flavor" },
      { name: "Chicken Banjara Tikka", price: "₹419", desc: "Chicken tikka marinated in a robust, spicy mixture" },
      { name: "Tandoori Chicken H/F", price: "₹399/599", desc: "Classic bone-in chicken marinated in yogurt and spices" },
      { name: "Afghani Chicken H/F", price: "₹399/599", desc: "Bone-in chicken in a rich, creamy marinade" }
    ]
  },
  {
    category: "Kabab",
    emoji: "🧆",
    items: [
      { name: "Veg Shami Kabab", price: "₹289", desc: "Vegetarian patties made with lentils and spices" },
      { name: "Hara Bhara Kabab", price: "₹279", desc: "Healthy green vegetable patties" },
      { name: "Burashi Kabab", price: "₹299", desc: "Flavorful vegetarian kabab" },
      { name: "Mashroom Glauti Kabab", price: "₹309", desc: "Melt-in-the-mouth mushroom kababs" },
      { name: "Veg Seekh Kabab", price: "₹289", desc: "Minced vegetable skewers roasted in the tandoor" },
      { name: "Rosali Kabab", price: "₹399", desc: "Flavorful and succulent kabab" },
      { name: "Chicken Sheek", price: "₹399", desc: "Minced chicken skewers roasted in the tandoor", popular: true },
      { name: "Mutton Seekh", price: "₹449", desc: "Juicy minced mutton skewers with aromatic spices" },
      { name: "Chicken Gilafi", price: "₹409", desc: "Chicken seekh kabab coated with bell peppers and onions" }
    ]
  },
  {
    category: "Appetizers",
    emoji: "🥟",
    items: [
      { name: "Spring Roll", price: "₹279", desc: "Crispy rolls stuffed with seasoned vegetables/meat" },
      { name: "Paneer Tikka Spring Roll", price: "₹299", desc: "Crispy rolls filled with paneer tikka" },
      { name: "Cigar Roll", price: "₹299", desc: "Crispy, thin rolls with a savory filling" },
      { name: "Crispy Peri-Peri Corn", price: "₹249", desc: "Crispy corn kernels with spicy peri-peri seasoning" },
      { name: "Crispy Peri-Peri Fries", price: "₹279", desc: "French fries tossed in spicy peri-peri seasoning", popular: true },
      { name: "Crispy Plain Fries", price: "₹239", desc: "Classic golden French fries" },
      { name: "Baked Nachos With Salsa", price: "₹269", desc: "Nachos baked with cheese and served with salsa" },
      { name: "Cheese Nachos With Salsa", price: "₹279", desc: "Nachos loaded with cheese, served with salsa" },
      { name: "Cheese Garlic Bread", price: "₹279", desc: "Toasted garlic bread topped with melted cheese" },
      { name: "Samurai With Garlic Loaf", price: "₹299", desc: "Flavorful topping served on a garlic loaf" },
      { name: "Chicken Fingers", price: "₹369", desc: "Crispy fried strips of chicken breast" },
      { name: "Chicken Cheese Nachos", price: "₹329", desc: "Nachos topped with chicken, cheese, and salsa" },
      { name: "Chicken Samurai", price: "₹329", desc: "Flavorful chicken appetizer" },
      { name: "Chicken Garlic Bread Chees", price: "₹299", desc: "Garlic bread topped with chicken and cheese" }
    ]
  },
  {
    category: "Baked & Grilled",
    emoji: "🔥",
    items: [
      { name: "Cottage Cheese Steak", price: "₹389", desc: "Grilled paneer steak" },
      { name: "Lasagne", price: "₹359/449", desc: "Layered pasta baked with cheese and vegetables/meat", popular: true },
      { name: "Chicken Lemon Charmoula", price: "₹449", desc: "Chicken marinated in a zesty lemon charmoula sauce" },
      { name: "Fish & Chips", price: "₹409", desc: "Classic battered and fried fish served with fries" },
      { name: "Chicken Shawarmaa Platter", price: "₹409", desc: "Platter of sliced, spiced chicken shawarma" },
      { name: "Grilled Chicken", price: "₹409", desc: "Tender grilled chicken breast" },
      { name: "Grilled Fish With Lemon Butter", price: "₹549", desc: "Grilled fish fillet served with a lemon butter sauce" }
    ]
  },
  {
    category: "Noodles",
    emoji: "🍜",
    items: [
      { name: "Veg Noodles", price: "₹289", desc: "Stir-fried noodles with mixed vegetables" },
      { name: "Hakka Noodle", price: "₹299/339", desc: "Classic Indo-Chinese style stir-fried noodles", popular: true },
      { name: "Singapuri Noodle", price: "₹319/349", desc: "Spicy noodles flavored with curry powder" },
      { name: "Chilli Garlic Noodles", price: "₹319/349", desc: "Spicy and garlicky stir-fried noodles" },
      { name: "Street Style Noodles", price: "₹289/319", desc: "Noodles prepared in a popular Indian street-food style" }
    ]
  }
];

// --- Interactive Menu Book ---
const MenuBook = ({ categories }: { categories: typeof menuData }) => {
  const [flippedIndex, setFlippedIndex] = useState(0);
  useEffect(() => { setFlippedIndex(0); }, [categories]);
  const pages: any[] = [];
  pages.push({ id: 'cover', type: 'cover', title: "Kiiza Lounge", subtitle: categories.length > 1 ? "Complete Menu" : `${categories[0].category} Menu` });
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
          <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Interactive Experience</span>
          <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Flip Our Menu Book</h2>
          <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
        </div>
      </ScrollReveal>
      <div className="relative w-full max-w-[600px] flex justify-center mt-4 perspective-[2000px]">
        <div className="relative w-[160px] xs:w-[180px] sm:w-[240px] md:w-[280px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[440px]">
          <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gray-900/10 rounded-full shadow-inner z-0 -translate-x-1/2" />
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
                <div className={`absolute inset-0 flex flex-col overflow-hidden rounded-r-2xl rounded-l-sm border border-[#D8B4FE] shadow-lg ${page.type === 'cover' || page.type === 'backcover' ? 'bg-[#CF9FFF] text-slate-900' : 'bg-white text-gray-800'}`} style={{ backfaceVisibility: "hidden" }}>
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                  <div className="p-4 md:p-6 flex-1 flex flex-col pointer-events-none">
                    {page.type === 'cover' && <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-white/50 rounded-xl p-2 md:p-3 m-1 bg-white/20"><h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">{page.title}</h1><div className="w-8 h-1 bg-[#A855F7]/40 rounded-full mb-4" /><span className="text-slate-800 tracking-widest uppercase text-[10px] md:text-xs font-bold">{page.subtitle}</span></div>}
                    {page.type === 'content' && <><div className="border-b-2 border-[#E9D5FF] pb-2 mb-3"><h3 className="font-display font-bold text-sm sm:text-lg text-[#A855F7] flex items-center gap-1.5"><span className="text-lg sm:text-xl drop-shadow-sm">{page.emoji}</span><span className="truncate">{page.title}</span></h3></div><div className="space-y-3 flex-1 px-1">{page.items.map((item: any, i: number) => (<div key={i}><div className="flex justify-between items-start gap-1 mb-1"><h4 className="font-bold text-gray-800 leading-tight text-[11px] sm:text-[13px]">{item.name}</h4><span className="font-bold text-[#A855F7] shrink-0 bg-[#F5F0FF] px-1.5 py-0.5 rounded text-[10px] sm:text-[12px]">{item.price}</span></div><p className="text-[9px] sm:text-[11px] text-gray-500 leading-snug pr-2 line-clamp-2">{item.desc}</p></div>))}</div><div className="text-center text-[9px] sm:text-[10px] font-semibold text-[#A855F7]/70 mt-2 border-t border-[#E9D5FF]/50 pt-2 uppercase tracking-widest">Page {page.pageNum}</div></>}
                    {page.type === 'backcover' && <div className="flex-1 flex flex-col items-center justify-center text-center"><h2 className="font-display text-xl sm:text-2xl font-bold mb-2 text-slate-900">Kiiza Cafe & Lounge</h2><p className="text-slate-800 text-[10px] sm:text-sm font-medium">Thank you for visiting.</p></div>}
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-l-2xl rounded-r-sm border border-[#D8B4FE] bg-[#E9D5FF] shadow-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}><div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" /><div className="opacity-10 text-center pointer-events-none"><span className="font-display text-3xl sm:text-4xl font-bold text-[#A855F7] -rotate-12 block">Kiiza</span></div></div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={() => setFlippedIndex(Math.max(0, flippedIndex - 1))} disabled={flippedIndex === 0} className="px-6 py-2 rounded-full bg-white border border-[#D8B4FE] text-[#A855F7] font-semibold text-sm disabled:opacity-50 hover:bg-[#F5F0FF] transition-all">Previous</button>
        <button onClick={() => setFlippedIndex(Math.min(pages.length, flippedIndex + 1))} disabled={flippedIndex === pages.length} className="px-6 py-2 rounded-full bg-[#CF9FFF] text-gray-900 font-semibold text-sm disabled:opacity-50 hover:bg-[#b07dff] transition-all">{flippedIndex === pages.length ? "Closed" : "Next Page"}</button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const isLockActive = useRef(false);

  // Force scroll to top whenever the active category is switched manually
  useEffect(() => {
    // Only scroll to top if we are NOT in the "All" view (filtering view)
    if (activeCategory !== "all" && !activeCategory.startsWith("scroll-")) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeCategory]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-141px 0px -75% 0px', // Adjusted to look for sections right at the header line
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
    // 1. Lock the observer and update the target category immediately
    isLockActive.current = true;
    setActiveCategory(category);
    
    // 2. Identify target ID for "All" vs Specific sections
    const targetId = category === "all" ? "menu-header-start" : category;
    const element = document.getElementById(targetId);

    if (element) {
      // 3. Precise scroll calculation
      const headerOffset = 150; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // 4. Release lock ONLY after smooth scroll finishes
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
    <div className="relative min-h-screen bg-[#F5F0FF] text-gray-800 font-sans">
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#D8B4FE] shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button onClick={() => handleCategoryChange("all")} className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all shrink-0 ${isTabActive("all") ? "bg-[#CF9FFF] text-gray-900 border-[#CF9FFF]" : "bg-white border-[#D8B4FE] text-gray-700 hover:bg-[#F5F0FF]"}`}>🍽️ All</button>
            {menuData.map((cat) => (
              <button key={cat.category} onClick={() => handleCategoryChange(cat.category)} className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all shrink-0 ${isTabActive(cat.category) ? "bg-[#CF9FFF] text-gray-900 border-[#CF9FFF]" : "bg-white border-[#D8B4FE] text-gray-700 hover:bg-[#F5F0FF]"}`}><span>{cat.emoji}</span><span>{cat.category}</span></button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-[140px] md:pt-[160px] pb-20 container">
        <ScrollReveal>
          <div className="text-center mb-10 mt-2" id="menu-header-start" ref={(el) => (sectionRefs.current["menu-header-start"] = el)}>
            <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Explore</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Our Menu</h1>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">Fresh, authentic, and crafted to perfection</p>
            <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-12 max-w-2xl mx-auto scroll-mt-32">
          <AnimatePresence mode="wait">
            {filtered.map((cat, catIdx) => (
              <motion.div key={cat.category} id={cat.category} ref={(el) => (sectionRefs.current[cat.category] = el)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25, delay: catIdx * 0.05 }}>
                <ScrollReveal delay={catIdx * 0.05}>
                  <div className="bg-white rounded-2xl border border-[#D8B4FE] shadow-sm p-6 md:p-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3 border-b border-[#E9D5FF] pb-4"><span className="text-2xl">{cat.emoji}</span>{cat.category}</h2>
                    <div className="space-y-2">
                      {cat.items.map((item, i) => (
                        <motion.div key={item.name} className="flex justify-between items-start gap-4 p-3 rounded-xl hover:bg-[#F5F0FF] transition-all group" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                          <div className="flex-1"><div className="flex items-center gap-2"><h3 className="font-semibold text-gray-800 text-sm group-hover:text-[#A855F7] transition-colors">{item.name}</h3>{(item as any).popular && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E9D5FF] text-[#A855F7] px-2 py-0.5 rounded-full">Popular</span>}</div><p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p></div>
                          <span className="text-sm font-bold text-[#A855F7] whitespace-nowrap bg-[#F5F0FF] px-3 py-1 rounded-full border border-[#D8B4FE]">{item.price}</span>
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
          <div className="text-center mt-16 p-8 rounded-2xl bg-white border border-[#D8B4FE] shadow-sm">
            <p className="text-gray-600 text-sm mb-4 font-medium">Ready to order or book a table?</p>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-[#CF9FFF] px-8 py-3 font-semibold text-gray-900 hover:bg-[#b07dff] transition-all"><Phone size={18} />Call Us</a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default MenuPage;