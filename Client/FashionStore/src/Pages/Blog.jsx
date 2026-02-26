import React, { useState, useMemo, useRef, useEffect } from "react";

/* ══════════════════════════════════════════
   BLOG DATA
══════════════════════════════════════════ */
const POSTS = [
  {
    id: 1,
    title: "10 Ways to Style a Midi Dress for Every Occasion",
    slug: "style-midi-dress",
    excerpt: "From boardroom to brunch, discover how one versatile piece can transform your entire wardrobe. Our stylists break down the art of dressing up and down.",
    category: "Style Guide",
    author: { name: "Priya Sharma", avatar: "P", role: "Creative Director" },
    date: "Feb 20, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&q=85",
    tags: ["Midi Dress", "Styling", "Versatile"],
    featured: true,
    likes: 284,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sustainable Fashion in 2026",
    slug: "sustainable-fashion-2026",
    excerpt: "How to build a wardrobe that looks good and does good. We explore the brands, fabrics, and habits making eco-fashion the future.",
    category: "Sustainability",
    author: { name: "Kavya Nair", avatar: "K", role: "Sustainability Lead" },
    date: "Feb 15, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=85",
    tags: ["Sustainable", "Eco Fashion", "2026 Trends"],
    featured: false,
    likes: 196,
  },
  {
    id: 3,
    title: "Spring/Summer 2026: The Trends You Need to Know",
    slug: "ss-2026-trends",
    excerpt: "Pastels are back, bold prints are bolder, and comfort is king. Our buyers just returned from the runway — here's everything that caught their eye.",
    category: "Trends",
    author: { name: "Aryan Mehta", avatar: "A", role: "Head of Styling" },
    date: "Feb 10, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85",
    tags: ["SS2026", "Trends", "Runway"],
    featured: false,
    likes: 312,
  },
  {
    id: 4,
    title: "Capsule Wardrobe: 15 Pieces, Infinite Outfits",
    slug: "capsule-wardrobe-guide",
    excerpt: "Stop overthinking your outfits. A capsule wardrobe is the answer to morning chaos — and we've built the perfect one for the Indian woman.",
    category: "Style Guide",
    author: { name: "Priya Sharma", avatar: "P", role: "Creative Director" },
    date: "Feb 4, 2026",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85",
    tags: ["Capsule", "Minimalism", "Style Guide"],
    featured: false,
    likes: 421,
  },
  {
    id: 5,
    title: "How to Care for Your Linen & Cotton Clothes",
    slug: "fabric-care-guide",
    excerpt: "Natural fabrics need natural care. Here's our complete guide to keeping your cottons crisp, your linens luxurious, and your clothes lasting longer.",
    category: "Care & Tips",
    author: { name: "Kavya Nair", avatar: "K", role: "Sustainability Lead" },
    date: "Jan 28, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
    tags: ["Fabric Care", "Cotton", "Linen"],
    featured: false,
    likes: 138,
  },
  {
    id: 6,
    title: "Dressing for Your Body: A Confidence-First Approach",
    slug: "body-positive-dressing",
    excerpt: "Forget the 'flattering' rules. Real style confidence comes from wearing what makes you feel extraordinary — and we'll show you exactly how.",
    category: "Body Positivity",
    author: { name: "Aryan Mehta", avatar: "A", role: "Head of Styling" },
    date: "Jan 22, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=85",
    tags: ["Body Positive", "Confidence", "Inclusivity"],
    featured: false,
    likes: 503,
  },
  {
    id: 7,
    title: "The Art of Accessorising Indian Fusion Wear",
    slug: "accessorising-fusion-wear",
    excerpt: "Bridging traditional and contemporary aesthetics is an art. We show you how the right accessories can elevate any Indo-western look to runway level.",
    category: "Accessories",
    author: { name: "Priya Sharma", avatar: "P", role: "Creative Director" },
    date: "Jan 16, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=85",
    tags: ["Accessories", "Fusion", "Indian Wear"],
    featured: false,
    likes: 267,
  },
];

const CATEGORIES = ["All", "Style Guide", "Trends", "Sustainability", "Care & Tips", "Body Positivity", "Accessories"];

const CATEGORY_COLORS = {
  "Style Guide":    { bg: "bg-pink-100",    text: "text-pink-800" },
  "Trends":         { bg: "bg-purple-100",  text: "text-purple-800" },
  "Sustainability": { bg: "bg-emerald-100", text: "text-emerald-800" },
  "Care & Tips":    { bg: "bg-amber-100",   text: "text-amber-800" },
  "Body Positivity":{ bg: "bg-rose-100",    text: "text-rose-800" },
  "Accessories":    { bg: "bg-blue-100",    text: "text-blue-800" },
};

/* ── Intersection observer for reveal ── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Category badge ── */
function CategoryBadge({ category, size = "sm" }) {
  const styles = CATEGORY_COLORS[category] || { bg: "bg-gray-100", text: "text-gray-700" };
  return (
    <span
      className={`${styles.bg} ${styles.text} ${size === "lg" ? "text-xs px-3.5 py-1.5" : "text-[10px] px-2.5 py-1"} font-bold rounded-full uppercase tracking-wider`}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {category}
    </span>
  );
}

/* ── Author avatar ── */
function Avatar({ author, showRole = false }) {
  const colors = { P: "#be185d", K: "#059669", A: "#7c3aed" };
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ background: colors[author.avatar] || "#6b7280", fontFamily: "'Cormorant Garamond', serif" }}
      >
        {author.avatar}
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs font-bold text-gray-800 leading-tight">{author.name}</p>
        {showRole && <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-gray-400 uppercase tracking-wider">{author.role}</p>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   FEATURED POST (hero card)
════════════════════════════════════════ */
function FeaturedPost({ post }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <Reveal>
      <div
        className="relative rounded-[32px] overflow-hidden cursor-pointer group"
        style={{
          minHeight: 480,
          transition: "box-shadow 0.4s ease",
          boxShadow: hovered ? "0 32px 80px rgba(0,0,0,0.18)" : "0 4px 24px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <img
          src={post.img}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)" }}
        />

        {/* Top badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
          >
            ✦ Featured
          </span>
          <CategoryBadge category={post.category} />
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:bg-white/20"
        >
          <span className="text-base" style={{ color: liked ? "#f43f5e" : "white" }}>
            {liked ? "♥" : "♡"}
          </span>
        </button>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Avatar author={post.author} />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/50 uppercase tracking-wider">·</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/50 uppercase tracking-wider">{post.date}</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/50 uppercase tracking-wider">·</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/50 uppercase tracking-wider">{post.readTime}</span>
            </div>

            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}
              className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-3"
            >
              {post.title}
            </h2>

            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-white/70 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2"
            >
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                style={{ fontFamily: "'DM Mono', monospace', transition: 'all 0.2s'" }}
                className="bg-white text-gray-900 text-xs font-black px-5 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-pink-50 transition-colors"
              >
                Read Article →
              </button>
              <div className="flex items-center gap-1.5">
                <span style={{ color: liked ? "#f43f5e" : "rgba(255,255,255,0.5)" }} className="text-sm">♥</span>
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/50">{post.likes + (liked ? 1 : 0)} likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ════════════════════════════════════════
   REGULAR BLOG CARD
════════════════════════════════════════ */
function BlogCard({ post, delay = 0, variant = "grid" }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (variant === "list") {
    return (
      <Reveal delay={delay}>
        <div
          className="bg-white rounded-2xl overflow-hidden flex gap-0 shadow-sm cursor-pointer group"
          style={{ transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.1)" : "" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-36 sm:w-48 flex-shrink-0 overflow-hidden">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ transition: "transform 0.6s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
          </div>
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge category={post.category} />
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400">{post.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }} className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 hidden sm:block">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <Avatar author={post.author} />
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                  className="flex items-center gap-1 text-xs transition-colors"
                  style={{ color: liked ? "#f43f5e" : "#9ca3af", fontFamily: "'DM Mono', monospace" }}
                >
                  {liked ? "♥" : "♡"} {post.likes + (liked ? 1 : 0)}
                </button>
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <div
        className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm cursor-pointer group flex flex-col h-full"
        style={{ transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? "0 24px 56px rgba(0,0,0,0.1)" : "" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
          {/* Dark overlay on hover */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.2)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
          />
          {/* Category */}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
          {/* Like */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform hover:scale-110"
          >
            <span className="text-sm" style={{ color: liked ? "#f43f5e" : "#9ca3af" }}>
              {liked ? "♥" : "♡"}
            </span>
          </button>
          {/* Read time */}
          <div
            className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white rounded-full px-2.5 py-1"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
          >
            {post.readTime}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }}
            className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2 flex-shrink-0"
          >
            {post.title}
          </h3>
          <p
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1 mb-4"
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[9px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full uppercase tracking-wider hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50 flex-shrink-0">
            <Avatar author={post.author} showRole />
            <div className="flex items-center gap-1.5">
              <span style={{ color: liked ? "#f43f5e" : "#9ca3af" }} className="text-xs">
                {liked ? "♥" : "♡"}
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-400">
                {post.likes + (liked ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [isGrid, setIsGrid]                 = useState(true);
  const [email, setEmail]                   = useState("");
  const [subscribed, setSubscribed]         = useState(false);

  const featuredPost = POSTS.find(p => p.featured);
  const regularPosts = POSTS.filter(p => !p.featured);

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = activeCategory !== "All";

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    // When searching: search ALL posts (including featured)
    // When only category filtering: only regular posts
    let list = (isSearching) ? [...POSTS] : [...regularPosts];

    if (activeCategory !== "All") {
      list = list.filter(p => p.category === activeCategory);
    }

    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-pink-900 text-white text-[10px] sm:text-xs py-2 tracking-widest font-semibold uppercase overflow-hidden">
        <div style={{ animation: "marquee 22s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
          ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #fce7f3 0%, transparent 70%)", opacity: 0.7 }} />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #fdf2f8 0%, transparent 70%)", opacity: 0.8 }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-10 relative z-10">
          <div
            className="text-center"
            style={{ animation: "fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both" }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-10 h-0.5 bg-pink-300" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-[0.22em] text-pink-500 font-bold">
                FashionStore Editorial
              </span>
              <span className="w-10 h-0.5 bg-pink-300" />
            </div>

            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.03em" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-4"
            >
              Style. <em className="text-pink-700">Stories.</em> <br className="hidden sm:block" />Inspiration.
            </h1>

            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8"
            >
              Your go-to destination for fashion insights, trend reports, styling tips, and sustainable living — straight from our team of experts.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search articles, topics, tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-gray-100 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">✕</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED POST
      ══════════════════════════════════════ */}
      {!isSearching && !isFiltering && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-60 pb-10">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* ══════════════════════════════════════
          CATEGORY FILTER + TOOLBAR
      ══════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Category pills — scrollable */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ fontFamily: "'DM Mono', monospace", transition: "all 0.2s", whiteSpace: "nowrap" }}
                  className={`text-[10px] sm:text-xs font-bold px-3.5 sm:px-4 py-2 rounded-2xl uppercase tracking-wider flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-pink-900 text-white shadow-md shadow-pink-200"
                      : "bg-gray-100 text-gray-500 hover:bg-pink-100 hover:text-pink-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid/List toggle */}
            <div className="flex bg-gray-100 rounded-xl overflow-hidden p-1 gap-0.5 flex-shrink-0">
              <button
                onClick={() => setIsGrid(true)}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${isGrid ? "bg-white shadow-sm text-pink-700" : "text-gray-400"}`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${!isGrid ? "bg-white shadow-sm text-pink-700" : "text-gray-400"}`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT AREA
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="flex gap-8 xl:gap-12 items-start">

          {/* ── POSTS GRID / LIST ── */}
          <main className="flex-1 min-w-0">
            {/* Result header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                {(isSearching || isFiltering) ? (
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900">{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""} found
                    {activeCategory !== "All" && <span> in <span className="text-pink-700 font-bold">{activeCategory}</span></span>}
                    {isSearching && <span> for "<span className="text-pink-700 font-bold">{searchQuery}</span>"</span>}
                  </p>
                ) : (
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Latest Articles
                  </p>
                )}
              </div>
              {(isSearching || isFiltering) && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[10px] text-pink-600 font-bold hover:underline uppercase tracking-wider"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">✍️</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-400 text-sm mb-6">Try a different search or category.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="bg-pink-900 text-white px-6 py-2.5 rounded-2xl text-xs font-bold tracking-wider hover:bg-pink-800 transition-colors"
                >
                  View All Articles
                </button>
              </div>
            ) : isGrid ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} delay={i * 0.07} variant="grid" />
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="flex flex-col gap-4">
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} delay={i * 0.05} variant="list" />
                ))}
              </div>
            )}
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col gap-5 w-64 xl:w-72 flex-shrink-0 sticky top-20">

            {/* Popular posts */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900 mb-4">
                🔥 Most Loved
              </p>
              <div className="space-y-4">
                {[...POSTS].sort((a,b) => b.likes - a.likes).slice(0,4).map((post, i) => (
                  <div key={post.id} className="flex gap-3 cursor-pointer group">
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-2xl font-bold text-gray-100 leading-none flex-shrink-0 w-6 group-hover:text-pink-200 transition-colors"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs font-bold text-gray-800 leading-snug group-hover:text-pink-700 transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-gray-400">{post.readTime}</span>
                        <span className="text-[9px] text-rose-400">♥ {post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories sidebar */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900 mb-4">Browse Topics</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c !== "All").map(cat => {
                  const styles = CATEGORY_COLORS[cat] || { bg: "bg-gray-100", text: "text-gray-700" };
                  const count = POSTS.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`${styles.bg} ${styles.text} text-[10px] font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75`}
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {cat} <span className="opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mini newsletter */}
            <div
              className="rounded-3xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #881337 0%, #4c0519 100%)" }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
              <div className="relative z-10">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-xl font-bold mb-1">Stay Inspired</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-pink-200 text-xs mb-4 leading-relaxed">Get weekly style tips in your inbox.</p>
                {subscribed ? (
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-emerald-300 text-xs font-bold">✓ You're subscribed!</p>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/10 text-white placeholder-pink-300/60 border border-white/20 text-xs outline-none focus:border-white/40"
                    />
                    <button
                      onClick={handleSubscribe}
                      style={{ fontFamily: "'DM Mono', monospace" }}
                      className="w-full bg-white text-pink-900 py-2.5 rounded-xl text-xs font-black tracking-wider hover:bg-pink-50 transition-colors"
                    >
                      Subscribe →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags cloud */}
            <div className="bg-gray-50 rounded-3xl p-5">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-gray-900 mb-4">Popular Tags</p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(POSTS.flatMap(p => p.tags))].map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSearchQuery(tag); setActiveCategory("All"); }}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-[10px] bg-white text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWSLETTER SECTION (full width)
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        <Reveal>
          <div
            className="rounded-[28px] sm:rounded-[40px] overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a0a10 100%)" }}
          >
            {/* Pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 24px)" }} />
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(190,24,93,0.25) 0%, transparent 70%)" }} />

            <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-12 sm:py-16 text-center">
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-[0.22em] text-pink-400 font-bold mb-3">✦ Weekly Editorial</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Never Miss a <em className="text-pink-400">Style Story</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Join 25,000+ fashion lovers who receive our weekly style digest — trends, tips, exclusive looks, and behind-the-scenes stories.
              </p>

              {subscribed ? (
                <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 rounded-2xl px-6 py-3.5">
                  <span>✓</span>
                  <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm font-bold">You're on the list! Welcome to the community.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-white/8 border border-white/15 text-white placeholder-gray-500 text-sm outline-none focus:border-pink-500/40 focus:bg-white/10 transition-all"
                  />
                  <button
                    onClick={handleSubscribe}
                    style={{ fontFamily: "'DM Sans', sans-serif', transition: 'all 0.2s'" }}
                    className="bg-pink-700 hover:bg-pink-600 text-white font-bold px-6 py-3.5 rounded-2xl text-sm whitespace-nowrap hover:shadow-lg hover:shadow-pink-900/50 transition-all"
                  >
                    Subscribe Free →
                  </button>
                </div>
              )}

              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-gray-600 mt-4 uppercase tracking-wider">
                No spam · Unsubscribe anytime · 25K+ readers
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}