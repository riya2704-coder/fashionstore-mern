import React, { useEffect, useRef, useState } from "react";

/* ─── tiny hook: returns true once element enters viewport ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── animated counter ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 24);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Fade-in wrapper ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 500,   suffix: "+", label: "Unique Styles" },
  { value: 8,     suffix: "",  label: "Years of Fashion" },
  { value: 4,     suffix: ".9★", label: "Avg Rating" },
];

const values = [
  {
    icon: "✦",
    title: "Curated Quality",
    desc: "Every piece is hand-selected by our stylists for fit, fabric, and timeless appeal.",
    bg: "bg-[#fdf2f8]",
    accent: "#be185d",
  },
  {
    icon: "♻",
    title: "Sustainable Fashion",
    desc: "We partner with ethical suppliers committed to reducing waste and fair wages.",
    bg: "bg-[#eef4ed]",
    accent: "#166534",
  },
  {
    icon: "◈",
    title: "Trend Forward",
    desc: "Our buyers track global runways so you always have tomorrow's looks today.",
    bg: "bg-[#fbf2e8]",
    accent: "#c2410c",
  },
  {
    icon: "❋",
    title: "Style For All",
    desc: "Sizes XS–4XL. Fashion is for every body — we design with inclusivity at heart.",
    bg: "bg-[#eef5fb]",
    accent: "#1d4ed8",
  },
];

const team = [
  {
    name: "Priya Sharma",
    role: "Founder & Creative Director",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    quote: "Fashion is how you tell your story without saying a word.",
  },
  {
    name: "Aryan Mehta",
    role: "Head of Styling",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "Every collection begins with the question: what do women want to feel?",
  },
  {
    name: "Kavya Nair",
    role: "Sustainability Lead",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
    quote: "Beautiful clothes should never cost the earth — literally.",
  },
];

const timeline = [
  { year: "2016", event: "FashionStore founded in a Mumbai apartment with 12 styles." },
  { year: "2018", event: "Reached 10,000 customers. First physical pop-up in Bandra." },
  { year: "2020", event: "Launched sustainable line. 50% recycled packaging adopted." },
  { year: "2022", event: "500+ styles live. Expanded to 15 Indian cities." },
  { year: "2024", event: "4.9★ rating across 50K+ reviews. Pan-India free shipping." },
];

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-pink-900 text-white text-[10px] sm:text-xs py-2 tracking-widest font-semibold uppercase overflow-hidden">
        <div style={{ animation: "marquee 22s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
          ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* Pink gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #fce7f3 0%, transparent 68%)", opacity: 0.7 }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #fdf2f8 0%, transparent 70%)", opacity: 0.8 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

          {/* LEFT TEXT */}
          <div>
            <Reveal delay={0}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-0.5 bg-pink-400" />
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs font-bold uppercase tracking-widest text-pink-600">
                  Our Story
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6"
              >
                Fashion Is <br />
                <em className="text-pink-700 not-italic">More Than</em> <br />
                Clothes.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                FashionStore was born from a simple belief — everyone deserves to feel incredible in what they wear. Since 2016, we've curated styles that blend contemporary trends with timeless elegance, made accessible to every Indian wardrobe.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <button
                  style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
                  className="bg-pink-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:bg-pink-800 hover:-translate-y-0.5 hover:shadow-pink-200 hover:shadow-xl"
                >
                  Shop Collection →
                </button>
                <button
                  style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
                  className="border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-2xl font-bold text-sm hover:border-pink-300 hover:text-pink-700"
                >
                  Meet the Team
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — image collage */}
          <Reveal delay={0.15} className="relative flex justify-center">
            {/* Main image */}
            <div
              className="w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] rounded-[32px] overflow-hidden shadow-2xl relative z-10"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Fashion"
                className="w-full h-full object-cover"
              />
              {/* overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(136,19,55,0.35) 0%, transparent 50%)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-xl font-bold italic leading-snug">
                  "Wear your confidence"
                </div>
              </div>
            </div>

            {/* Secondary image — offset */}
            <div className="absolute top-12 -right-4 sm:right-4 w-[140px] h-[180px] sm:w-[160px] sm:h-[210px] rounded-[24px] overflow-hidden shadow-xl z-20 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&q=80"
                alt="Style"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat pill */}
            <div className="absolute -left-4 sm:left-0 bottom-10 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 flex items-center gap-3 border border-pink-50">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-lg">🛍️</div>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400 uppercase tracking-wider">Orders Today</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-pink-800">1,284</div>
              </div>
            </div>

            {/* Spinning badge */}
            <div className="absolute -top-4 right-6 sm:right-16 w-20 h-20 z-20">
              <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: "spinSlow 12s linear infinite" }}>
                <defs>
                  <path id="circle" d="M 40,40 m -27,0 a 27,27 0 1,1 54,0 a 27,27 0 1,1 -54,0" />
                </defs>
                <text style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fill: "#be185d", fontWeight: 500 }}>
                  <textPath href="#circle" startOffset="0%">SINCE 2016 ✦ FASHION STORE ✦ </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl">✦</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="bg-pink-900 py-12 sm:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 20px)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl sm:text-5xl font-bold text-white">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-pink-300 text-sm mt-1 font-medium">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <Reveal>
          <div className="text-center mb-12">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">
              ✦ What We Stand For
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              The FashionStore <em className="text-pink-700">Promise</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`${v.bg} rounded-3xl p-6 sm:p-8 h-full group cursor-default`}
                style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
                  style={{ background: v.accent + "18", color: v.accent }}
                >
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900 mb-3">
                  {v.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY / TIMELINE
      ══════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-16 sm:py-20 relative overflow-hidden">
        {/* pink glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(190,24,93,0.2) 0%, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="text-center mb-14">
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">
                ✦ How We Got Here
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Our Journey
              </h2>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Center line — visible on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, transparent, #be185d, #be185d, transparent)" }} />

            <div className="space-y-10 sm:space-y-12">
              {timeline.map((t, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Text card */}
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div
                        className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm inline-block text-left w-full"
                        style={{ transition: "background 0.3s ease" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(190,24,93,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                      >
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-300 text-sm leading-relaxed">
                          {t.event}
                        </p>
                      </div>
                    </div>

                    {/* Year bubble */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-pink-700"
                        style={{ background: "#1a0a10", fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        <span className="text-pink-400 font-bold text-sm">{t.year}</span>
                      </div>
                    </div>

                    {/* Empty spacer for opposite side */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <Reveal>
          <div className="text-center mb-12">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">
              ✦ The People Behind the Brand
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Meet the <em className="text-pink-700">Team</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-50"
                style={{ transition: "box-shadow 0.35s ease" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                {/* Photo */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {/* Dark gradient */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }} />

                  {/* Quote on hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-6 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(136,19,55,0.82)", transition: "opacity 0.4s ease" }}
                  >
                    <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-lg italic text-center font-medium leading-snug">
                      "{member.quote}"
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-pink-600 font-medium tracking-wider uppercase mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20">
        <Reveal>
          <div
            className="rounded-[28px] sm:rounded-[40px] overflow-hidden relative px-8 sm:px-14 lg:px-20 py-14 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
            style={{ background: "linear-gradient(135deg, #881337 0%, #4c0519 100%)" }}
          >
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute right-32 -bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10">
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-3">
                ✦ Join 10,000+ Happy Shoppers
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your Style Journey <br className="hidden sm:block" /> Starts Here.
              </h2>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
                className="bg-white text-pink-900 font-black px-8 py-3.5 rounded-2xl text-sm w-full sm:w-auto hover:scale-105 hover:shadow-2xl"
              >
                Shop Now →
              </button>
              <button
                style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
                className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-2xl text-sm border border-white/25 w-full sm:w-auto hover:bg-white/20"
              >
                View Lookbook
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}