import React, { useState, useRef, useEffect } from "react";

/* ── Intersection reveal hook ── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
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
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── FAQ Accordion ── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-2xl overflow-hidden"
      style={{ transition: "border-color 0.3s ease", borderColor: open ? "rgba(249,168,212,0.3)" : "rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left gap-4"
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm sm:text-base font-semibold text-white/90 leading-snug">
          {q}
        </span>
        <span
          className="text-pink-400 text-xl leading-none flex-shrink-0"
          style={{ transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="px-5 sm:px-6 pb-5 text-sm text-white/55 leading-relaxed"
        >
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQS = [
  { q: "What are your delivery timelines?", a: "Standard delivery takes 2–4 business days across India. Express delivery (next business day) is available for ₹99 extra. Orders placed before 2 PM are dispatched the same day." },
  { q: "How do I return or exchange a product?", a: "You can return any product within 15 days of delivery, provided the original tags are intact and the item is unworn. Raise a return request from your account dashboard or contact us directly." },
  { q: "Do you offer Cash on Delivery?", a: "Yes! COD is available for all orders across India. A nominal COD fee of ₹49 applies, which is waived for orders above ₹1,499." },
  { q: "Can I track my order?", a: "Absolutely. Once your order is dispatched, you'll receive a tracking link via SMS and email. You can also track it live from your account under 'My Orders'." },
  { q: "How do I find my correct size?", a: "Each product page has a detailed size guide with measurements in inches and centimetres. If you're between sizes, we recommend sizing up. Our team is also happy to help — just chat with us." },
];

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);

  const subjects = [
    "Order Issue", "Return / Exchange", "Product Query",
    "Size Help", "Bulk / Wholesale", "Press & Media", "Other",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject)        e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  };

  const contactCards = [
    {
      icon: "💬",
      title: "Live Chat",
      detail: "Chat with us now",
      sub: "Available 9 AM – 9 PM IST",
      action: "Start Chat",
      accent: "#be185d",
      accentBg: "rgba(190,24,93,0.12)",
    },
    {
      icon: "📧",
      title: "Email Us",
      detail: "hello@fashionstore.in",
      sub: "We reply within 4 hours",
      action: "Send Email",
      accent: "#0891b2",
      accentBg: "rgba(8,145,178,0.12)",
    },
    {
      icon: "📞",
      title: "Call Us",
      detail: "+91 98765 43210",
      sub: "Mon–Sat, 10 AM – 7 PM",
      action: "Call Now",
      accent: "#059669",
      accentBg: "rgba(5,150,105,0.12)",
    },
    {
      icon: "📍",
      title: "Visit Store",
      detail: "Bandra West, Mumbai",
      sub: "Open 7 days, 11 AM – 9 PM",
      action: "Get Directions",
      accent: "#d97706",
      accentBg: "rgba(217,119,6,0.12)",
    },
  ];

  const socials = [
    { name: "Instagram", icon: "📸", handle: "@fashionstore.in", color: "#e1306c" },
    { name: "Pinterest",  icon: "📌", handle: "FashionStore",     color: "#e60023" },
    { name: "WhatsApp",   icon: "💚", handle: "+91 98765 43210",  color: "#25d366" },
    { name: "YouTube",    icon: "▶",  handle: "FashionStore TV",  color: "#ff0000" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes marquee  { 0%{transform:translateX(0)}  100%{transform:translateX(-50%)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both; }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 13px 16px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field:focus {
          border-color: rgba(249,168,212,0.55);
          background: rgba(255,255,255,0.09);
        }
        .input-field.error { border-color: rgba(239,68,68,0.6); }
        select.input-field option { background: #1a0a10; color: white; }
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-pink-900 text-white text-[10px] sm:text-xs py-2 tracking-widest font-semibold uppercase overflow-hidden">
        <div style={{ animation: "marquee 22s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
          ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp; ✦ Free Shipping On Orders Above ₹999 &nbsp;&nbsp;&nbsp; ✦ Use Code SALE50 For Extra 10% Off &nbsp;&nbsp;&nbsp; ✦ New Arrivals Every Friday &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* ══════════════════════════════════════
          DARK HERO HEADER
      ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a0510 60%, #0d0d0d 100%)" }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "200px" }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-60 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(190,24,93,0.22) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(190,24,93,0.08) 0%, transparent 70%)" }} />

        {/* Spinning badge */}
        <div className="absolute top-12 right-8 sm:right-16 w-20 h-20 hidden sm:block">
          <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: "spin 14s linear infinite" }}>
            <defs>
              <path id="cc" d="M 40,40 m -27,0 a 27,27 0 1,1 54,0 a 27,27 0 1,1 -54,0" />
            </defs>
            <text style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fill: "rgba(249,168,212,0.5)", fontWeight: 500 }}>
              <textPath href="#cc" startOffset="0%">GET IN TOUCH ✦ FASHION STORE ✦ </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">✉</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 relative z-10">
          <div
            className="max-w-2xl"
            style={{ animation: "fadeUp 0.65s cubic-bezier(0.23,1,0.32,1) both" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-pink-500" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold">
                We'd Love to Hear From You
              </span>
            </div>

            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.025em" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-5"
            >
              Let's <em className="text-pink-400">Talk</em><br />
              Fashion.
            </h1>

            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Whether you have a question about an order, need styling advice, or just want to say hello — our team is always here for you.
            </p>
          </div>

          {/* Contact info cards row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-14">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 sm:p-5 cursor-pointer border"
                style={{
                  background: activeInfo === i ? card.accentBg : "rgba(255,255,255,0.04)",
                  borderColor: activeInfo === i ? card.accent + "55" : "rgba(255,255,255,0.08)",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  transform: activeInfo === i ? "translateY(-4px)" : "translateY(0)",
                  animation: `fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 0.08}s both`,
                }}
                onMouseEnter={() => setActiveInfo(i)}
                onMouseLeave={() => setActiveInfo(null)}
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: card.accen }}>
                  {card.title}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/90 text-xs sm:text-sm font-semibold leading-snug mb-1">
                  {card.detail}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/35 text-[10px] sm:text-xs mb-3">
                  {card.sub}
                </p>
                <button
                  style={{ fontFamily: "'DM Mono', monospace", borderColor: card.accent + "44", color: card.accent, transition: "all 0.2s" }}
                  className="text-[10px] font-bold border rounded-xl px-3 py-1.5 uppercase tracking-wider hover:opacity-80"
                >
                  {card.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT FORM + SIDEBAR
      ══════════════════════════════════════ */}
      <section
        className="relative"
        style={{ background: "linear-gradient(180deg, #120508 0%, #0d0d0d 100%)" }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* ── FORM (3 cols) ── */}
            <Reveal className="lg:col-span-3">
              <div
                className="rounded-3xl overflow-hidden border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Form header */}
                <div
                  className="px-6 sm:px-8 pt-7 pb-6 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(190,24,93,0.07)" }}
                >
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-pink-400 font-bold mb-1">
                    ✦ Send a Message
                  </p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl sm:text-3xl font-bold text-white">
                    We Reply Within <em className="text-pink-400">4 Hours</em>
                  </h2>
                </div>

                {submitted ? (
                  /* Success state */
                  <div className="px-6 sm:px-8 py-14 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-5">
                      ✓
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                      Thanks for reaching out, <span className="text-white font-semibold">{form.name.split(" ")[0]}</span>. Our team will get back to you at <span className="text-pink-400">{form.email}</span> within 4 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      style={{ fontFamily: "'DM Mono', monospace" }}
                      className="text-xs font-bold text-pink-400 border border-pink-500/30 px-5 py-2.5 rounded-2xl hover:bg-pink-900/20 transition-colors uppercase tracking-wider"
                    >
                      Send Another →
                    </button>
                  </div>
                ) : (
                  <div className="px-6 sm:px-8 py-7 space-y-5">
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontFamily: "'DM Mono', monospace" }} className="block text-[10px] uppercase tracking-wider text-white/45 font-bold mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Priya Sharma"
                          value={form.name}
                          onChange={e => handleChange("name", e.target.value)}
                          className={`input-field ${errors.name ? "error" : ""}`}
                        />
                        {errors.name && <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-red-400 text-[11px] mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label style={{ fontFamily: "'DM Mono', monospace" }} className="block text-[10px] uppercase tracking-wider text-white/45 font-bold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="priya@email.com"
                          value={form.email}
                          onChange={e => handleChange("email", e.target.value)}
                          className={`input-field ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-red-400 text-[11px] mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={{ fontFamily: "'DM Mono', monospace" }} className="block text-[10px] uppercase tracking-wider text-white/45 font-bold mb-2">
                        Subject *
                      </label>
                      <select
                        value={form.subject}
                        onChange={e => handleChange("subject", e.target.value)}
                        className={`input-field ${errors.subject ? "error" : ""}`}
                      >
                        <option value="">Select a topic...</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-red-400 text-[11px] mt-1.5">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-wider text-white/45 font-bold">
                          Your Message *
                        </label>
                        <span style={{ fontFamily: "'DM Mono', monospace" }} className={`text-[10px] ${form.message.length > 480 ? "text-red-400" : "text-white/25"}`}>
                          {form.message.length}/500
                        </span>
                      </div>
                      <textarea
                        placeholder="Tell us how we can help you..."
                        value={form.message}
                        maxLength={500}
                        rows={5}
                        onChange={e => handleChange("message", e.target.value)}
                        className={`input-field resize-none ${errors.message ? "error" : ""}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />
                      {errors.message && <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-red-400 text-[11px] mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="relative w-full py-4 rounded-2xl font-bold text-sm overflow-hidden"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: submitting
                          ? "rgba(190,24,93,0.4)"
                          : "linear-gradient(135deg, #881337 0%, #be185d 100%)",
                        color: "white",
                        transition: "all 0.3s ease",
                        letterSpacing: "0.02em",
                        boxShadow: submitting ? "none" : "0 8px 28px rgba(190,24,93,0.35)",
                      }}
                    >
                      {/* Shimmer effect */}
                      {!submitting && (
                        <span
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)", animation: "shimmer 2.5s infinite" }}
                        />
                      )}
                      <span className="relative z-10">
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span style={{ animation: "pulse 0.8s infinite", display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "white" }} />
                            Sending your message...
                          </span>
                        ) : (
                          "Send Message →"
                        )}
                      </span>
                    </button>

                    <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-white/25 text-center tracking-wider uppercase">
                      🔒 Your data is safe with us · We never share your info
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* ── SIDEBAR (2 cols) ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Store details card */}
              <Reveal delay={0.1}>
                <div
                  className="rounded-3xl p-5 sm:p-6 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-pink-400 font-bold mb-4">
                    📍 Our Store
                  </p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-white mb-4">
                    FashionStore, Mumbai
                  </h3>

                  <div className="space-y-3.5">
                    {[
                      { icon: "🏠", label: "Address", val: "Shop 14, Linking Road, Bandra West, Mumbai – 400050" },
                      { icon: "🕐", label: "Store Hours", val: "Mon–Sun: 11:00 AM – 9:00 PM" },
                      { icon: "📞", label: "Phone", val: "+91 98765 43210" },
                      { icon: "📧", label: "Email",   val: "hello@fashionstore.in" },
                      { icon: "🚇", label: "Nearest Metro", val: "Bandra Station (5 min walk)" },
                    ].map(({ icon, label, val }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                        <div>
                          <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-0.5">{label}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/75 text-xs sm:text-sm leading-snug">{val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Map placeholder */}
              <Reveal delay={0.15}>
                <div
                  className="rounded-3xl overflow-hidden relative cursor-pointer group border"
                  style={{ height: 180, borderColor: "rgba(255,255,255,0.08)", background: "#111" }}
                >
                  {/* Fake map grid */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                  />
                  {/* Roads */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                    <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
                    <line x1="200" y1="0" x2="200" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
                    <line x1="0" y1="45" x2="400" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
                    <line x1="0" y1="135" x2="400" y2="135" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
                    <line x1="100" y1="0" x2="100" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
                    <line x1="300" y1="0" x2="300" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
                  </svg>
                  {/* Pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center text-white text-lg shadow-lg shadow-pink-900/60"
                        style={{ animation: "pulse 2s ease-in-out infinite" }}
                      >
                        📍
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-white/60 bg-black/60 px-2 py-1 rounded-full uppercase tracking-wider">
                          FashionStore
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                  >
                    <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white text-xs font-bold border border-white/30 px-4 py-2 rounded-2xl uppercase tracking-widest">
                      Open in Maps →
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Social links */}
              <Reveal delay={0.2}>
                <div
                  className="rounded-3xl p-5 sm:p-6 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-pink-400 font-bold mb-4">
                    ✦ Follow Us
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {socials.map(s => (
                      <button
                        key={s.name}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border transition-all group"
                        style={{
                          borderColor: "rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.03)",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "55"; e.currentTarget.style.background = s.color + "12"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                      >
                        <span className="text-base">{s.icon}</span>
                        <div className="text-left min-w-0">
                          <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-white/35 uppercase tracking-wider">{s.name}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/70 text-[11px] font-medium truncate">{s.handle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════ */}
      <section
        style={{ background: "#0a0a0a" }}
        className="relative overflow-hidden"
      >
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-32 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(190,24,93,0.15) 0%, transparent 70%)" }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold mb-3">
                ✦ Quick Answers
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Frequently Asked <em className="text-pink-400">Questions</em>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <FAQ q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div
              className="mt-10 rounded-2xl p-5 sm:p-6 text-center border"
              style={{ background: "rgba(190,24,93,0.07)", borderColor: "rgba(190,24,93,0.2)" }}
            >
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/60 text-sm mb-3">
                Still have questions? Our team is happy to help.
              </p>
              <button
                style={{ fontFamily: "'DM Mono', monospace', transition: 'all 0.2s'" }}
                className="bg-pink-800 hover:bg-pink-700 text-white text-xs font-bold px-6 py-2.5 rounded-2xl uppercase tracking-wider transition-colors"
              >
                Chat with Support →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════ */}
      <section style={{ background: "#070707" }} className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Ready to explore?
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/40 text-sm">
                  Discover 500+ styles crafted for every occasion.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  style={{ fontFamily: "'DM Sans', sans-serif', transition: 'all 0.25s'" }}
                  className="bg-white text-gray-900 font-bold px-7 py-3 rounded-2xl text-sm hover:bg-pink-50 transition-colors hover:shadow-lg"
                >
                  Shop Now →
                </button>
                <button
                  style={{ fontFamily: "'DM Sans', sans-serif', transition: 'all 0.25s'" }}
                  className="border border-white/15 text-white/70 font-bold px-7 py-3 rounded-2xl text-sm hover:border-white/30 hover:text-white transition-all"
                >
                  New Arrivals
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}