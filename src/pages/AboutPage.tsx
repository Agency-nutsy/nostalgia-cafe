import ScrollReveal from "@/components/ScrollReveal";
import cafeImg from "@/assets/hero-slide-3.jpg";
import heroFood from "@/assets/4.webp";
import gallery1 from "@/assets/1.webp";
import gallery2 from "@/assets/2.webp";
import heroSlide1 from "@/assets/hero.webp";
import heroSlide2 from "@/assets/hero 2.webp";

// Integrated Aura Cafe Data
const c = {
  name: "The Aura Cafe",
  phone: "+919871712300",
  phoneDisplay: "+91 98717 12300",
  addressFull: "3, DDA Market Complex, near TPDDL Office, Hudson Lane, GTB Nagar, Delhi, 110033",
  hours: "11:00 AM - 11:00 PM, Monday - Sunday",
  aboutStory: [
    "Nestled in the vibrant heart of Hudson Lane, GTB Nagar, The Aura Cafe began with a simple vision: to create a peaceful retreat where great food and cozy aesthetics meet.",
    "We are known for our hip, casual, and highly inviting ambiance. From the moment you step through our doors, our modern decor and warm hospitality are designed to make you feel right at home.",
    "Our culinary team takes pride in crafting a diverse global menu. Whether you are craving authentic wood-fired Italian pizza, perfectly tossed Asian noodles, or a comforting cup of specialty coffee, our kitchen delivers.",
    "With a strong focus on high-quality vegetarian options and a family-friendly environment, we cater to quick bites, large group gatherings, and relaxed dinners alike. At The Aura Cafe, every meal is a celebration of flavor and community."
  ],
  valueCards: [
    { title: "Global Flavors", description: "A diverse menu spanning from Italian classics to exotic Asian delights." },
    { title: "Cozy Ambiance", description: "A hip, casual, and peaceful retreat designed for relaxation and great conversations." },
    { title: "Veggie Friendly", description: "An extensive and thoughtful selection of delicious vegetarian dishes." },
    { title: "Warm Hospitality", description: "Family-friendly service that accommodates both intimate dinners and large group celebrations." }
  ]
};

const AboutPage = () => {
  return (
    <div className="pt-24 bg-[#FBCFE8]/10 min-h-screen text-gray-800">

      {/* ── Hero Banner ── */}
      <section className="py-20 bg-[#FBCFE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
        <div className="container relative z-10 text-center">
          <span className="text-gray-700 text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mt-3">
            About {c.name}
          </h1>
          <div className="h-1 w-16 bg-[#be185d]/40 mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* ── Main Image + Story ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Big Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src={cafeImg}
                  alt="Cafe Ambiance"
                  className="rounded-2xl w-full h-[420px] object-cover shadow-xl"
                />
                <img
                  src={heroFood}
                  alt="Food"
                  className="absolute -bottom-8 -right-4 md:-right-8 w-48 h-48 object-cover rounded-2xl border-4 border-white shadow-lg"
                />
              </div>
            </ScrollReveal>

            {/* Right - Story Text */}
            <ScrollReveal direction="right">
              <div className="md:pl-4 mt-8 md:mt-0">
                <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Who We Are</span>
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
      <section className="py-12 bg-[#FBCFE8]/10">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Our Vibe</span>
              <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Inside {c.name}</h2>
              <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[heroSlide1, heroSlide2, gallery1, gallery2].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden aspect-square group shadow-sm">
                  <img
                    src={img}
                    alt={`${c.name} vibe ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Cards ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">Our Values</h2>
              <div className="h-1 w-16 bg-[#FBCFE8] mx-auto mt-4 rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.valueCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-[#FBCFE8]/10 border border-[#FBCFE8] hover:shadow-md transition-shadow text-center h-full">
                  <h3 className="font-display text-xl font-bold mb-3 text-[#be185d]">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Info ── */}
      <section className="py-20 bg-[#FBCFE8]/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Contact */}
            <ScrollReveal direction="left">
              <div className="text-center md:text-left">
                <span className="text-[#be185d] text-sm font-semibold tracking-widest uppercase">Visit Us</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">Come Say Hello</h2>
                <p className="text-gray-600 mb-2 text-lg font-medium">{c.addressFull}</p>
                <p className="text-gray-500 mb-6 text-lg">{c.hours}</p>
                <a
                  href={`tel:${c.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FBCFE8] px-8 py-3 font-semibold text-gray-900 hover:bg-[#f9a8d4] hover:shadow-lg hover:shadow-[#FBCFE8]/50 transition-all"
                >
                  {c.phoneDisplay}
                </a>
              </div>
            </ScrollReveal>

            {/* Right - Image */}
            <ScrollReveal direction="right">
              <img
                src={heroSlide1}
                alt={c.name}
                className="rounded-2xl w-full h-80 object-cover shadow-xl border-4 border-white"
                loading="lazy"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;