const CollectionCard = ({ tag, title, desc, bgColor, img }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

        .collection-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: 480px;
          cursor: pointer;
          background: #0a0a0a;
        }

        .collection-card .card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease;
          filter: brightness(0.72) saturate(1.1);
        }

        .collection-card:hover .card-image {
          transform: scale(1.08);
          filter: brightness(0.5) saturate(1.2);
        }

        .collection-card .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.05) 100%
          );
          transition: background 0.5s ease;
        }

        .collection-card:hover .card-overlay {
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.5) 45%,
            rgba(0,0,0,0.1) 100%
          );
        }

        .collection-card .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px;
          z-index: 2;
        }

        .collection-card .card-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }

        .collection-card:hover .card-tag {
          color: #f9a8d4;
        }

        .collection-card .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.15;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 0;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .collection-card:hover .card-title {
          transform: translateY(-4px);
        }

        .collection-card .card-reveal {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                      opacity 0.4s ease 0.1s,
                      margin 0.4s ease;
          margin-top: 0;
        }

        .collection-card:hover .card-reveal {
          max-height: 120px;
          opacity: 1;
          margin-top: 12px;
        }

        .collection-card .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .collection-card .card-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          padding: 9px 18px;
          border-radius: 50px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .collection-card .card-btn:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.4);
          transform: translateX(3px);
        }

        .collection-card .card-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 3;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          padding: 5px 12px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          transition: all 0.3s ease;
        }

        .collection-card:hover .card-badge {
          background: rgba(249,168,212,0.2);
          border-color: rgba(249,168,212,0.4);
          color: #fbcfe8;
        }

        .collection-card .card-corner {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 3;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: white;
          transition: all 0.3s ease;
        }

        .collection-card:hover .card-corner {
          background: rgba(249,168,212,0.25);
          border-color: rgba(249,168,212,0.5);
          transform: scale(1.1);
        }

        .collection-card .card-sideline {
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 0;
          background: linear-gradient(to bottom, #f9a8d4, #be185d);
          z-index: 3;
          transition: height 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 0 2px 2px 0;
        }

        .collection-card:hover .card-sideline {
          height: 100%;
        }
      `}</style>

      <div className="collection-card">
        <img className="card-image" src={img} alt={title} />
        <div className="card-overlay" />
        <div className="card-sideline" />
        <div className="card-badge">✦ {tag}</div>
        <div className="card-corner">♡</div>

        <div className="card-content">
          <div className="card-tag">
            <span style={{ width: 16, height: 1, background: "currentColor", display: "inline-block" }} />
            Collection
          </div>

          <h2 className="card-title">{title}</h2>

          <div className="card-reveal">
            <p className="card-desc">{desc}</p>
            <button className="card-btn">Shop Now →</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionCard;