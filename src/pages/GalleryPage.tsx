import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

// Ensure these point to your actual image files
import vibe1 from "@/assets/vibe-1.jpg";
import vibe2 from "@/assets/vibe-2.jpg";
import vibe3 from "@/assets/vibe-5.jpg";
import vibe4 from "@/assets/vibe-6.jpg";
import vibe5 from "@/assets/vibe-3.jpg";
import vibe6 from "@/assets/vibe-4.jpg";
import vibe7 from "@/assets/vibe-7.jpg";
import vibe8 from "@/assets/vibe-8.jpg";
import vibe9 from "@/assets/vibe-9.jpg";
import vibe10 from "@/assets/vibe-10.jpg";

// Integrated Kiiza Cafe & Lounge Data
const c = {
  name: "Kiiza Cafe and Lounge"
};

const categories = [
  { label: "All", value: "all" },
  { label: "📸 Ambiance", value: "ambiance" },
  { label: "🍹 Drinks & Food", value: "food" },
];

const galleryImages = [
  { img: vibe1, category: "ambiance" }, 
  { img: vibe2, category: "food" }, 
  { img: vibe3, category: "food" },     
  { img: vibe4, category: "ambiance" },     
  { img: vibe5, category: "food" }, 
  { img: vibe6, category: "ambiance" }, 
  { img: vibe7, category: "food" },     
  { img: vibe8, category: "food" },     
  { img: vibe9, category: "ambiance" }, 
  { img: vibe10, category: "ambiance" }, 
];

const GalleryPage = () => {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === active);

  return (
    <div className="pt-24 bg-[#F5F0FF] min-h-screen text-gray-800 font-sans">

      {/* ── Hero Banner ── */}
      <section className="py-20 bg-white relative overflow-hidden border-b border-[#D8B4FE]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E9D5FF] blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F5F0FF] blur-[80px]" />
        
        <div className="container relative z-10 text-center">
          <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mt-3">
            Gallery
          </h1>
          <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="pt-10 pb-0">
        <div className="container">
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  active === cat.value
                    ? "bg-[#CF9FFF] text-gray-900 border-[#CF9FFF] shadow-lg shadow-purple-200"
                    : "bg-white text-gray-700 border-[#D8B4FE] hover:border-[#CF9FFF] hover:text-[#A855F7] hover:bg-[#F5F0FF]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFECTED GRID LAYOUT ── */}
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <div key={i}>
                <ScrollReveal delay={i * 0.05}>
                  <div className="rounded-2xl overflow-hidden aspect-square group bg-white border border-[#D8B4FE] shadow-sm hover:shadow-lg hover:shadow-purple-900/10 hover:-translate-y-1 transition-all relative">
                    <img
                      src={item.img}
                      alt={`${c.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-[#CF9FFF]/20 transition-colors duration-500" />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default GalleryPage;