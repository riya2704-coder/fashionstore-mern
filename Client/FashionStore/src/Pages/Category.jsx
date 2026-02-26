import React, { useState, useMemo, useRef, useEffect } from "react";

/* ─────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────── */
const ALL_PRODUCTS = [
  { id: 1,  name: "Floral Midi Dress",       price: 1299, originalPrice: 2599, category: "Dresses",  sizes: ["XS","S","M","L"],      rating: 4.8, reviews: 124, tag: "Bestseller",   img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&q=80", colors: ["#f9a8d4","#fff","#fde68a"] },
  { id: 2,  name: "Oversized Blazer",         price: 2199, originalPrice: 4399, category: "Tops",     sizes: ["S","M","L","XL"],      rating: 4.6, reviews: 89,  tag: "50% Off",      img: "https://images.unsplash.com/photo-1650392975166-17a883237fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE92ZXJzaXplZCUyMEJsYXplcnxlbnwwfHwwfHx8MA%3D%3D", colors: ["#1f2937","#d1d5db","#92400e"] },
  { id: 3,  name: "Linen Co-ord Set",         price: 1799, originalPrice: 3599, category: "Co-ords",  sizes: ["XS","S","M"],          rating: 4.9, reviews: 203, tag: "New Arrival",  img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80", colors: ["#fef3c7","#d1fae5","#e0e7ff"] },
  { id: 4,  name: "Satin Slip Dress",         price: 999,  originalPrice: 1999, category: "Dresses",  sizes: ["XS","S","M","L","XL"], rating: 4.5, reviews: 67,  tag: "Hot",          img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", colors: ["#f9a8d4","#000","#be185d"] },
  { id: 5,  name: "High-Waist Trousers",      price: 1499, originalPrice: 2499, category: "Bottoms",  sizes: ["S","M","L","XL","2XL"],rating: 4.7, reviews: 156, tag: "Trending",     img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80", colors: ["#1f2937","#fff","#6b7280"] },
  { id: 6,  name: "Printed Wrap Skirt",       price: 849,  originalPrice: 1699, category: "Bottoms",  sizes: ["XS","S","M","L"],      rating: 4.4, reviews: 44,  tag: "Sale",         img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80", colors: ["#fde68a","#f9a8d4","#a7f3d0"] },
  { id: 7,  name: "Ribbed Crop Top",          price: 599,  originalPrice: 999,  category: "Tops",     sizes: ["XS","S","M"],          rating: 4.3, reviews: 88,  tag: "Sale",         img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500&q=80", colors: ["#fff","#000","#f9a8d4"] },
  { id: 8,  name: "Boho Maxi Dress",          price: 2499, originalPrice: 3999, category: "Dresses",  sizes: ["S","M","L","XL"],      rating: 4.9, reviews: 312, tag: "Bestseller",   img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80", colors: ["#fef3c7","#d1fae5","#ede9fe"] },
  { id: 9,  name: "Denim Jacket",             price: 2999, originalPrice: 4999, category: "Tops",     sizes: ["S","M","L","XL","2XL"],rating: 4.8, reviews: 178, tag: "New Arrival",  img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80", colors: ["#3b82f6","#1e3a5f"] },
  { id: 10, name: "Palazzo Pants",            price: 1199, originalPrice: 2199, category: "Bottoms",  sizes: ["S","M","L","XL"],      rating: 4.5, reviews: 92,  tag: "Trending",     img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80", colors: ["#000","#fff","#e11d48"] },
  { id: 11, name: "Flowy Kaftan Top",         price: 1099, originalPrice: 1799, category: "Tops",     sizes: ["S","M","L","XL","2XL"],rating: 4.6, reviews: 61,  tag: "Sale",         img: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500&q=80", colors: ["#fde68a","#f9a8d4"] },
  { id: 12, name: "Matching Blazer Set",      price: 3499, originalPrice: 5999, category: "Co-ords",  sizes: ["XS","S","M","L"],      rating: 4.9, reviews: 245, tag: "Bestseller",   img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80", colors: ["#1f2937","#92400e","#fff"] },
];

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms", "Co-ords"];
const SORT_OPTIONS = [
  { label: "Newest First",    value: "newest" },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc" },
  { label: "Top Rated",       value: "rating" },
  { label: "Most Popular",    value: "popular" },
];
const PRICE_RANGES = [
  { label: "Under ₹1,000",   min: 0,    max: 999 },
  { label: "₹1,000 – ₹2,000",min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,500",min: 2000, max: 3500 },
  { label: "₹3,500+",        min: 3500, max: Infinity },
];

/* ─────────────────────────────────────────
   TAG BADGE COLOR
───────────────────────────────────────── */
const TAG_STYLES = {
  "Bestseller":  "bg-amber-100 text-amber-800",
  "50% Off":     "bg-red-100 text-red-700",
  "New Arrival": "bg-emerald-100 text-emerald-700",
  "Hot":         "bg-orange-100 text-orange-700",
  "Trending":    "bg-purple-100 text-purple-700",
  "Sale":        "bg-pink-100 text-pink-700",
};

/* ─────────────────────────────────────────
   STAR COMPONENT
───────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className="w-3 h-3" viewBox="0 0 20 20" fill={s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────── */
function ProductCard({ product, isGrid, wishlist, toggleWishlist }) {
  const [hovered, setHovered] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  if (!isGrid) {
    /* ── LIST VIEW ── */
    return (
      <div className="bg-white rounded-2xl overflow-hidden flex gap-0 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="relative w-32 sm:w-44 flex-shrink-0 overflow-hidden">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${TAG_STYLES[product.tag] || "bg-gray-100 text-gray-600"}`}>
            {product.tag}
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
              <button onClick={() => toggleWishlist(product.id)} className="flex-shrink-0 mt-0.5">
                <span className="text-lg" style={{ color: wishlist.has(product.id) ? "#e11d48" : "#d1d5db" }}>
                  {wishlist.has(product.id) ? "♥" : "♡"}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Stars rating={product.rating} />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400">{product.rating} ({product.reviews})</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${selectedSize === sz ? "bg-pink-900 text-white border-pink-900" : "border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-600"}`}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-pink-800">₹{product.price.toLocaleString()}</span>
              <span className="text-gray-400 line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-emerald-600 text-xs font-bold">{discount}% off</span>
            </div>
            <button
              onClick={handleAddToBag}
              style={{ fontFamily: "'DM Mono', monospace", transition: "all 0.2s" }}
              className={`text-xs font-bold px-4 py-2 rounded-xl tracking-wider transition-all ${addedToBag ? "bg-emerald-600 text-white" : "bg-gray-900 text-white hover:bg-pink-900"}`}
            >
              {addedToBag ? "✓ Added!" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── GRID VIEW ── */
  return (
    <div
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
      style={{ transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)" }}
      onMouseEnter={e => { setHovered(true); e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { setHovered(false); e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ height: "240px" }}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />

        {/* Tag */}
        <div className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${TAG_STYLES[product.tag] || "bg-gray-100 text-gray-600"}`}>
          {product.tag}
        </div>

        {/* Discount */}
        <div className="absolute top-3 right-10 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
          -{discount}%
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
          style={{ transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ color: wishlist.has(product.id) ? "#e11d48" : "#9ca3af" }} className="text-sm leading-none">
            {wishlist.has(product.id) ? "♥" : "♡"}
          </span>
        </button>

        {/* Quick size picker — shows on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex gap-1 flex-wrap justify-center"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s ease" }}
        >
          {product.sizes.map(sz => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`text-[9px] font-bold px-2 py-1 rounded-lg transition-colors ${selectedSize === sz ? "bg-pink-900 text-white" : "bg-white/90 text-gray-700 hover:bg-pink-100"}`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-1">{product.name}</h3>
        </div>

        <div className="flex items-center gap-1.5 mb-2.5">
          <Stars rating={product.rating} />
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-gray-400">{product.rating} ({product.reviews})</span>
        </div>

        {/* Colors */}
        <div className="flex gap-1.5 mb-3">
          {product.colors.map((c, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full border border-gray-200 flex-shrink-0" style={{ background: c }} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-base sm:text-lg font-bold text-pink-800">₹{product.price.toLocaleString()}</span>
            <span className="text-gray-400 line-through text-xs ml-1.5">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAddToBag}
            style={{ fontFamily: "'DM Mono', monospace", transition: "all 0.2s", fontSize: "9px" }}
            className={`font-bold px-3 py-1.5 rounded-xl tracking-wider ${addedToBag ? "bg-emerald-600 text-white" : "bg-gray-900 text-white hover:bg-pink-900"}`}
          >
            {addedToBag ? "✓ Added!" : "+ Bag"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Category() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]                 = useState("newest");
  const [searchQuery, setSearchQuery]       = useState("");
  const [priceRange, setPriceRange]         = useState(null);     // index or null
  const [isGrid, setIsGrid]                 = useState(true);
  const [wishlist, setWishlist]             = useState(new Set());
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [minPrice, setMinPrice]             = useState(0);
  const [maxPrice, setMaxPrice]             = useState(6000);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── FILTER + SORT ── */
  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (activeCategory !== "All") list = list.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    list = list.filter(p => p.price >= minPrice && p.price <= maxPrice);
    if (priceRange !== null) {
      const r = PRICE_RANGES[priceRange];
      list = list.filter(p => p.price >= r.min && p.price <= r.max);
    }

    switch (sortBy) {
      case "price_asc":  list.sort((a,b) => a.price - b.price); break;
      case "price_desc": list.sort((a,b) => b.price - a.price); break;
      case "rating":     list.sort((a,b) => b.rating - a.rating); break;
      case "popular":    list.sort((a,b) => b.reviews - a.reviews); break;
      default: break; // newest — original order
    }
    return list;
  }, [activeCategory, sortBy, searchQuery, priceRange, minPrice, maxPrice]);

  const clearFilters = () => {
    setActiveCategory("All");
    setSortBy("newest");
    setSearchQuery("");
    setPriceRange(null);
    setMinPrice(0);
    setMaxPrice(6000);
  };

  const hasFilters = activeCategory !== "All" || sortBy !== "newest" || searchQuery || priceRange !== null || minPrice > 0 || maxPrice < 6000;

  /* ── SIDEBAR CONTENT ── */
  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Clear */}
      {hasFilters && (
        <button onClick={clearFilters} style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-pink-600 font-bold border-b border-pink-200 pb-0.5 hover:text-pink-800">
          ✕ Clear All Filters
        </button>
      )}

      {/* Category */}
      <div>
        <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Category</p>
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? "bg-pink-900 text-white" : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"}`}
            >
              <span className="flex items-center justify-between">
                {cat}
                <span className="text-[10px] opacity-60">{cat === "All" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === cat).length}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Quick Picks */}
      <div>
        <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Price Range</p>
        <div className="space-y-1">
          {PRICE_RANGES.map((r, i) => (
            <button
              key={i}
              onClick={() => setPriceRange(priceRange === i ? null : i)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${priceRange === i ? "bg-pink-900 text-white" : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div>
        <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Custom Price</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-pink-800 font-bold">₹{minPrice.toLocaleString()}</span>
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs text-pink-800 font-bold">₹{maxPrice.toLocaleString()}</span>
          </div>
          <input type="range" min={0} max={6000} step={100} value={minPrice}
            onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))}
            className="w-full accent-pink-700 h-1"
          />
          <input type="range" min={0} max={6000} step={100} value={maxPrice}
            onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))}
            className="w-full accent-pink-700 h-1"
          />
        </div>
      </div>

      {/* Sort (in sidebar for mobile) */}
      <div className="lg:hidden">
        <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Sort By</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => setSortBy(opt.value)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${sortBy === opt.value ? "bg-pink-900 text-white" : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes marquee { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
        @keyframes slideIn { from { transform:translateX(-100%) } to { transform:translateX(0) } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .product-animate { animation: fadeIn 0.45s cubic-bezier(0.23,1,0.32,1) both; }
        input[type=range]::-webkit-slider-thumb { width:14px; height:14px; }
        .scrollbar-hide::-webkit-scrollbar { display:none }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }
      `}</style>

      {/* ANNOUNCEMENT */}
      <div className="bg-pink-900 text-white text-[10px] sm:text-xs py-2 tracking-widest font-semibold uppercase overflow-hidden">
        <div style={{ animation: "marquee 22s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
          ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ── PAGE HEADER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-pink-500 mb-1.5 font-bold">
                ✦ Explore
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                All{" "}
                <span className="text-pink-700">
                  {activeCategory === "All" ? "Collections" : activeCategory}
                </span>
              </h1>
            </div>
            {/* Breadcrumb */}
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400 tracking-wider">
              Home &rsaquo; Category {activeCategory !== "All" && `› ${activeCategory}`}
            </p>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-5 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ fontFamily: "'DM Mono', monospace", transition: "all 0.2s", whiteSpace: "nowrap" }}
                className={`text-xs font-bold px-4 py-2 rounded-2xl tracking-wider flex-shrink-0 ${activeCategory === cat ? "bg-pink-900 text-white shadow-lg shadow-pink-200" : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {/* ── TOOLBAR ── */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-gray-100 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">✕</button>
              )}
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="lg:hidden flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2"/>
              </svg>
              Filters {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-pink-600 inline-block" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Result count */}
            <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400 uppercase tracking-wider hidden sm:block">
              {filtered.length} items
            </span>

            {/* Sort — desktop */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="hidden lg:block text-sm bg-gray-100 border-0 rounded-2xl px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Grid / List toggle */}
            <div className="flex bg-gray-100 rounded-2xl overflow-hidden p-1 gap-1">
              <button
                onClick={() => setIsGrid(true)}
                className={`p-2 rounded-xl transition-all ${isGrid ? "bg-white shadow-sm text-pink-700" : "text-gray-400 hover:text-gray-600"}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`p-2 rounded-xl transition-all ${!isGrid ? "bg-white shadow-sm text-pink-700" : "text-gray-400 hover:text-gray-600"}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── LAYOUT: sidebar + products ── */}
        <div className="flex gap-6 lg:gap-8 items-start">

          {/* ── DESKTOP SIDEBAR ── */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 bg-white rounded-3xl p-6 shadow-sm sticky top-6">
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900 mb-6">Filters</p>
            <SidebarContent />
          </aside>

          {/* ── PRODUCTS ── */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-400 text-sm mb-6">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} style={{ fontFamily: "'DM Mono', monospace" }} className="bg-pink-900 text-white px-6 py-2.5 rounded-2xl text-xs font-bold tracking-wider hover:bg-pink-800 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={isGrid ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5" : "flex flex-col gap-3 sm:gap-4"}>
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="product-animate"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <ProductCard
                      product={product}
                      isGrid={isGrid}
                      wishlist={wishlist}
                      toggleWishlist={toggleWishlist}
                    />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />

          {/* Drawer */}
          <div
            className="relative w-72 bg-white h-full overflow-y-auto p-6 shadow-2xl"
            style={{ animation: "slideIn 0.3s cubic-bezier(0.23,1,0.32,1)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold text-gray-900">Filters</p>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">✕</button>
            </div>
            <SidebarContent />
            <button
              onClick={() => setSidebarOpen(false)}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="w-full mt-8 bg-pink-900 text-white py-3 rounded-2xl text-xs font-bold tracking-wider hover:bg-pink-800 transition-colors"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}

      {/* ── WISHLIST TOAST ── */}
      <div
        className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-300"
        style={{
          fontFamily: "'DM Mono', monospace",
          opacity: wishlist.size > 0 ? 1 : 0,
          transform: wishlist.size > 0 ? "translateY(0)" : "translateY(20px)",
          pointerEvents: "none",
        }}
      >
        ♥ {wishlist.size} item{wishlist.size !== 1 ? "s" : ""} in wishlist
      </div>
    </>
  );
}