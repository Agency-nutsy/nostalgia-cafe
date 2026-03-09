import ScrollReveal from "@/components/ScrollReveal";
import cafeImg from "@/assets/hero-slide-3.jpg";
import heroFood from "@/assets/4.webp";
import gallery1 from "@/assets/1.webp";
import gallery2 from "@/assets/2.webp";
import heroSlide1 from "@/assets/hero.webp";
import heroSlide2 from "@/assets/hero 2.webp";

// Integrated Kiiza Cafe & Lounge Data
const c = {
  name: "Kiiza Cafe and Lounge",
  phone: "+919654133100",
  phoneDisplay: "+91 96541 33100",
  addressFull: "2648 first floor, Hudson Ln, GTB Nagar, Delhi, 110009",
  hours: "11:00 AM - 12:00 AM, Monday - Sunday",
  aboutStory: [
    "Located in the energetic heart of Hudson Lane, KIIZA CAFE AND LOUNGE is more than just a place to eat—it's an experience. We set out to create a vibrant destination where exceptional multi-cuisine dining meets an unforgettable lounge atmosphere.",
    "Our space is designed to captivate. With striking neon decor, plush seating, and a hip, cozy vibe, Kiiza is the perfect backdrop for everything from casual afternoon hangouts to high-energy late-night celebrations with friends.",
    "Our culinary team has crafted an extensive menu that truly offers something for everyone. From authentic North Indian tandoori dishes and comforting Italian pastas to zesty Chinese stir-fries and expertly mixed cocktails, our kitchen delivers bold flavors with every order.",
    "Whether you're here to enjoy the live music, unwind with a signature mocktail, or feast on our famous Stuffed Murg Tangdi, our commitment to warm hospitality and electric vibes ensures that every visit to Kiiza is one to remember."
  ],
  valueCards: [
    { title: "Multi-Cuisine Mastery", description: "A diverse and expertly curated menu featuring North Indian, Chinese, Italian, and Mughlai flavors." },
    { title: "Electric Atmosphere", description: "A vibrant, neon-lit lounge environment complete with live music and cozy seating." },
    { title: "Premium Bar & Lounge", description: "An extensive selection of fine wines, beers, and expertly crafted signature cocktails." },
    { title: "Unforgettable Nights", description: "The perfect destination in GTB Nagar for celebrations, parties, and late-night unwinding." }
  ]
};

const AboutPage = () => {
  return (
    <div className="pt-24 bg-[#F5F0FF] min-h-screen text-gray-800 font-sans">

      {/* ── Hero Banner ── */}
      <section className="py-20 bg-white relative overflow-hidden border-b border-[#D8B4FE]">
        {/* Soft, airy decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E9D5FF] blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F5F0FF] blur-[80px]" />
        
        <div className="container relative z-10 text-center">
          <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mt-3">
            About {c.name}
          </h1>
          <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* ── Main Image + Story ── */}
      <section className="py-20 bg-[#F5F0FF]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Big Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src={cafeImg}
                  alt="Cafe Ambiance"
                  className="rounded-2xl w-full h-[420px] object-cover shadow-xl border-4 border-white"
                />
                <img
                  src={heroFood}
                  alt="Food"
                  className="absolute -bottom-8 -right-4 md:-right-8 w-48 h-48 object-cover rounded-2xl border-[6px] border-[#F5F0FF] shadow-xl"
                />
              </div>
            </ScrollReveal>

            {/* Right - Story Text */}
            <ScrollReveal direction="right">
              <div className="md:pl-4 mt-8 md:mt-0">
                <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">
                  Our Story
                </h2>
                {c.aboutStory.slice(0, 2).map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-lg mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Remaining Story Paragraphs */}
          <div className="max-w-3xl mx-auto">
            {c.aboutStory.slice(2).map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">{para}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="py-12 bg-[#E9D5FF]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
              <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Inside {c.name}</h2>
              <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[heroSlide1, heroSlide2, gallery1, gallery2].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden aspect-square group shadow-md border-2 border-white/50 hover:border-white transition-all">
                  <img
                    src={img}
                    alt={`${c.name} vibe ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Cards ── */}
      <section className="py-20 bg-[#F5F0FF]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">Our Values</h2>
              <div className="h-1 w-16 bg-[#CF9FFF] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.valueCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-[#D8B4FE] hover:shadow-lg hover:shadow-purple-900/5 hover:-translate-y-1 transition-all text-center h-full group">
                  <div className="w-16 h-16 rounded-2xl bg-[#F5F0FF] border border-[#D8B4FE] flex items-center justify-center mb-6 mx-auto group-hover:bg-[#E9D5FF] transition-colors">
                     <div className="w-8 h-8 rounded-full bg-[#A855F7] opacity-80" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-gray-900 group-hover:text-[#A855F7] transition-colors">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Info ── */}
      <section className="py-20 bg-white border-t border-[#D8B4FE]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Contact */}
            <ScrollReveal direction="left">
              <div className="text-center md:text-left">
                <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">Visit Us</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">Come Say Hello</h2>
                <p className="text-gray-600 mb-2 text-lg font-medium">{c.addressFull}</p>
                <p className="text-gray-500 mb-6 text-lg">{c.hours}</p>
                <a
                  href={`tel:${c.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#CF9FFF] px-8 py-3 font-semibold text-gray-900 hover:bg-[#b07dff] hover:shadow-lg hover:shadow-purple-200 transition-all"
                >
                  {c.phoneDisplay}
                </a>
              </div>
            </ScrollReveal>

            {/* Right - Image (FIXED LAYOUT) */}
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl w-full h-[300px] md:h-[400px] bg-gray-100">
                <img
                  src={heroSlide1}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;