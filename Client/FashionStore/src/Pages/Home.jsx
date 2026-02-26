import React, { useEffect, useState } from "react";
import CollectionCard from "../Components/CollectionCard";

export default function Home() {

  /* ========================= COLLECTION DATA ========================= */
  const collectionsData = [
    {
      tag: "Etiam vel augue",
      title: "Nullam quis ante",
      desc: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget.",
      bgColor: "bg-[#f6f2ed]",
      img: "https://images.unsplash.com/photo-1585386959984-a41552262c9d",
    },
    {
      tag: "Maecenas tempus",
      title: "Sed fringilla mauris",
      desc: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget.",
      bgColor: "bg-[#eef4ed]",
      img: "https://images.unsplash.com/photo-1616628182501-75b5bce8fd70",
    },
    {
      tag: "Aenean commodo",
      title: "Fusce vulputate eleifend",
      desc: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget.",
      bgColor: "bg-[#fbf2e8]",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    },
    {
      tag: "Pellentesque auctor",
      title: "Vestibulum dapibus nunc",
      desc: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget.",
      bgColor: "bg-[#eef5fb]",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ];

  /* ========================= BRANDS ========================= */
  const brands = ["Zara", "H&M", "Mango", "Gucci", "Prada", "Versace", "Dior", "Chanel"];

  /* ========================= TRENDING PRODUCTS ========================= */
  const trendingProducts = [
    {
      name: "Floral Midi Dress",
      price: "₹1,299",
      originalPrice: "₹2,599",
      tag: "Bestseller",
      img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400",
    },
    {
      name: "Oversized Blazer",
      price: "₹2,199",
      originalPrice: "₹4,399",
      tag: "50% Off",
      img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=400",
    },
    {
      name: "Linen Co-ord Set",
      price: "₹1,799",
      originalPrice: "₹3,599",
      tag: "New Arrival",
      img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400",
    },
    {
      name: "Satin Slip Dress",
      price: "₹999",
      originalPrice: "₹1,999",
      tag: "Hot",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    },
  ];

  /* ========================= COUNTDOWN LOGIC ========================= */
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 5);

  const calculateTimeLeft = () => {
    const difference = offerEndDate - new Date();
    if (difference <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===================== ANNOUNCEMENT BAR ===================== */}
      <div className="bg-pink-900 text-white text-[10px] sm:text-xs text-center py-2 tracking-widest font-semibold uppercase overflow-hidden">
        <div style={{ animation: "marquee 20s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
          ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      {/*
        Mobile  : single column, image below text
        Tablet  : single column, image below (md)
        Desktop : 2-col grid (lg)
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden">

        {/* Background blob — hidden on mobile to avoid overflow */}
        <div
          className="hidden sm:block absolute -top-20 -right-20 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #fce7f3 0%, transparent 70%)", opacity: 0.6, zIndex: 0 }}
        />

        {/* LEFT — always full width on mobile */}
        <div className="space-y-5 relative z-10 text-center lg:text-left">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="w-8 h-0.5 bg-pink-400 hidden sm:block" />
            <span
              className="text-xs font-bold uppercase tracking-widest text-pink-600"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Season's Best Deals
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}
          >
            Up To{" "}
            <span className="relative inline-block">
              <span className="text-pink-600">50% Off</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M0 6 Q100 0 200 6" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="text-gray-900">This Season</span>
          </h1>

          <p
            className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Curabitur aliquet quam id dui posuere blandit. Explore our handpicked styles for every occasion — from casual to glam.
          </p>

          <div className="flex gap-3 sm:gap-4 items-center flex-wrap justify-center lg:justify-start">
            <button
              className="bg-pink-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold text-sm shadow-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s", letterSpacing: "0.02em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#9f1239"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(159,18,57,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#881337"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
            >
              Shop Sale →
            </button>
            <button
              className="border-2 border-gray-200 text-gray-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f9a8d4"; e.currentTarget.style.color = "#be185d"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
            >
              New Arrivals
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 sm:gap-8 pt-2 justify-center lg:justify-start">
            {[["10K+", "Happy Customers"], ["500+", "Styles"], ["4.9★", "Avg Rating"]].map(([val, label]) => (
              <div key={label}>
                <div className="text-lg sm:text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</div>
                <div className="text-xs text-gray-400 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* COUNTDOWN */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 sm:mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              ⏱ Offer ends in:
            </p>
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Sec" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-pink-100 w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-2xl shadow-sm"
                >
                  <span
                    className="text-xl sm:text-2xl font-black text-pink-800"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — shown below text on mobile, side-by-side on desktop */}
        <div className="relative flex justify-center items-center z-10 mt-8 lg:mt-0">
          <div
            className="w-[300px] h-[380px] sm:w-[360px] sm:h-[450px] lg:w-[420px] lg:h-[520px] rounded-[32px] sm:rounded-[40px] overflow-hidden relative shadow-2xl"
            style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)" }}
          >
            <img
              src="https://www.tracerindia.com/cdn/shop/files/1_4a4b1a1c-2868-4df9-a96c-6bb901400756.jpg"
              alt="Product"
              className="w-full h-full object-contain"
              style={{ transition: "transform 0.6s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
            {/* Floating tag */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white rounded-2xl shadow-md px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="text-[10px] sm:text-xs text-gray-400 font-medium">Starting from</div>
              <div className="text-base sm:text-lg font-black text-pink-700" style={{ fontFamily: "'Playfair Display', serif" }}>₹499</div>
            </div>
            {/* Bottom badge */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-pink-900 text-white rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
              <div className="text-[10px] sm:text-xs font-bold tracking-wider">LIMITED STOCK</div>
            </div>
          </div>

          {/* Decorative dots — only on sm+ */}
          <div className="hidden sm:grid absolute -bottom-6 -left-6 grid-cols-5 gap-2 opacity-30">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BRAND STRIP ===================== */}
      <section className="border-y border-gray-100 py-5 sm:py-6 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
              Featured Brands
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {/* Scrollable on mobile, wrap on desktop */}
          <div className="flex gap-6 sm:gap-10 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 scrollbar-hide">
            {brands.map(brand => (
              <span
                key={brand}
                className="text-sm font-bold text-gray-300 uppercase tracking-widest cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{ fontFamily: "'Playfair Display', serif", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#9f1239"}
                onMouseLeave={e => e.currentTarget.style.color = "#d1d5db"}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== COLLECTIONS ===================== */}
      {/*
        Mobile  : 1 col
        Tablet  : 2 col
        Desktop : 4 col
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-1 sm:mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
              ✦ Curated For You
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>
              Our Collections
            </h2>
          </div>
          <a href="#" className="text-xs sm:text-sm font-bold text-pink-700 border-b-2 border-pink-200 pb-0.5 hover:border-pink-600 transition-colors whitespace-nowrap ml-4">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {collectionsData.map((item, index) => (
            <CollectionCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* ===================== TRENDING NOW ===================== */}
      {/*
        Mobile  : 1 col (scroll horizontally) or 2 col
        Tablet  : 2 col
        Desktop : 4 col
      */}
      <section className="bg-[#fdf2f8] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-1 sm:mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                🔥 Hot Right Now
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>
                Trending Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {trendingProducts.map((product, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm cursor-pointer"
                style={{ transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
              >
                <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-gray-50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-pink-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:py-1 rounded-full">
                    {product.tag}
                  </div>
                  <button
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-md text-gray-400 text-sm"
                    style={{ transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#e11d48"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
                  >
                    ♡
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{product.name}</h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-pink-700 font-black text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{product.price}</span>
                    <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
                  </div>
                  <button
                    className="w-full mt-2 sm:mt-3 bg-gray-900 text-white rounded-xl py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'DM Mono', monospace", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#9f1239"}
                    onMouseLeave={e => e.currentTarget.style.background = "#111827"}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NEWSLETTER BANNER ===================== */}
      {/*
        Mobile  : stacked (text above, form below)
        Desktop : side by side
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div
          className="rounded-[28px] sm:rounded-[40px] overflow-hidden relative flex flex-col lg:flex-row items-center justify-between px-8 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-14 gap-8 lg:gap-0"
          style={{ background: "linear-gradient(135deg, #881337 0%, #4c0519 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-40 -bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 text-center lg:text-left">
            <p className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
              Exclusive Member Offer
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get Extra 10% Off <br className="hidden sm:block" /> On Your First Order
            </h2>
          </div>

          <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="rounded-2xl px-4 sm:px-5 py-3 text-sm bg-white/10 text-white placeholder-pink-200 border border-white/20 outline-none w-full sm:w-64"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                className="bg-white text-pink-900 rounded-2xl px-6 py-3 text-sm font-black w-full sm:w-auto"
                style={{ fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = ""; }}
              >
                Claim Now
              </button>
            </div>
            <p className="text-pink-300/60 text-xs text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== GLOBAL STYLES ===================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Hide scrollbar for brand strip on mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}