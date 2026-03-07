import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

import vibe1 from "@/assets/vibe-1.jpg";
import vibe2 from "@/assets/vibe-2.jpg";
import vibe3 from "@/assets/vibe-5.jpg";
import vibe4 from "@/assets/vibe-6.jpg";
import vibe5 from "@/assets/vibe-3.jpg";
import vibe6 from "@/assets/vibe-4.jpg";
import vibe7 from "@/assets/vibe-7.jpg";
import vibe8 from "@/assets/vibe-8.jpg";

// Integrated Aura Cafe Data
const c = {
  name: "The Aura Cafe"
};

const categories = [
  { label: "All", value: "all" },
  { label: "🏡 Ambiance", value: "ambiance" },
  { label: "🍽️ Food & Drinks", value: "food" },
];

const galleryImages = [
  { img: vibe1, category: "ambiance" },
  { img: vibe2, category: "ambiance" },
  { img: vibe3, category: "food" },
  { img: vibe4, category: "food" },
  { img: vibe5, category: "ambiance" },
  { img: vibe6, category: "ambiance" },
  { img: vibe7, category: "food" },
  { img: vibe8, category: "food" },
];

const GalleryPage = () => {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === active);

  return (
    <div className="pt-24 bg-pink-50 min-h-screen text-gray-800">

      {/* ── Hero Banner ── */}
      <section className="py-20 bg-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-400/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-600/50 blur-3xl" />
        <div className="container relative z-10 text-center">
          <span className="text-pink-100 text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3">
            Gallery
          </h1>
          <div className="h-1 w-16 bg-pink-200 mx-auto mt-6 rounded-full" />
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
                    ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                    : "bg-white text-gray-700 border-pink-200 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="py-10">
        <div className="container">
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <ScrollReveal delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden group bg-white border border-pink-100 shadow-sm relative">
                    <img
                      src={item.img}
                      alt={`${c.name} gallery ${i + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/10 transition-colors duration-500" />
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