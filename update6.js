const fs = require('fs');
const path = require('path');

let htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const newCSS = `
    /* ─── MODERN BENTO & GLASS UI ─── */
    :root {
      --navy: #0A1128; /* Deeper tech navy */
      --navy-dark: #050B14;
      --navy-light: #162447;
      --bento-bg: #F5F5F7;
      --glass-bg: rgba(255, 255, 255, 0.05);
      --glass-border: rgba(255, 255, 255, 0.1);
    }
    
    /* Hero Glassmorphism */
    #hero {
      position: relative;
      overflow: hidden;
      background: var(--navy-dark);
    }
    #hero::before {
      content: '';
      position: absolute;
      top: -20%; left: -10%;
      width: 50%; height: 70%;
      background: radial-gradient(circle, rgba(244,163,0,0.15) 0%, rgba(244,163,0,0) 70%);
      filter: blur(60px);
      z-index: 0;
      animation: floatBlob 10s ease-in-out infinite alternate;
    }
    #hero::after {
      content: '';
      position: absolute;
      bottom: -20%; right: -10%;
      width: 60%; height: 60%;
      background: radial-gradient(circle, rgba(36,61,120,0.4) 0%, rgba(36,61,120,0) 70%);
      filter: blur(80px);
      z-index: 0;
      animation: floatBlob 15s ease-in-out infinite alternate-reverse;
    }
    @keyframes floatBlob {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(30px, 50px) scale(1.1); }
    }
    .hero-content, .hero-visual { position: relative; z-index: 1; }
    
    /* Glass Product Cards */
    .product-card {
      background: var(--white);
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: var(--radius-lg);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .product-card:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 20px 40px rgba(10, 17, 40, 0.12);
      border-color: rgba(10, 17, 40, 0.1);
    }
    
    /* Bento Box Styles */
    .bento-cell {
      background: var(--bento-bg);
      border-radius: 24px;
      padding: 32px;
      transition: transform 0.3s ease;
    }
    .bento-cell:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.04);
    }
    
    /* Magnetic Buttons */
    .btn {
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease;
    }
    .btn:active { transform: scale(0.96); }

    /* Override mission pillars for Bento */
    .mission-pillars {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 32px;
    }
    .mission-pillars .pillar {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px !important;
      padding: 24px !important;
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
      gap: 12px;
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }
    .mission-pillars .pillar:hover {
      transform: translateY(-4px);
      background: rgba(255,255,255,0.1);
    }
    
    /* Override Stats for Bento */
    .stats-grid .stat-card {
      background: var(--bento-bg);
      border-radius: 24px;
      border: none;
      box-shadow: none;
      transition: transform 0.3s ease;
    }
    .stats-grid .stat-card:hover {
      transform: translateY(-4px);
      background: var(--white);
      box-shadow: 0 16px 40px rgba(0,0,0,0.06);
    }

    /* About Bento Grid */
    .about-bullet {
      background: var(--white);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      border: 1px solid rgba(0,0,0,0.03);
    }
    .about-visual {
      border-radius: 32px;
    }

    /* Infinite Marquee Fix */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      width: 100%;
    }
    .marquee-track {
      display: flex;
      gap: 24px;
      width: max-content;
      animation: marquee 25s linear infinite;
    }
    .marquee-track:hover { animation-play-state: paused; }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-container::before, .marquee-container::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 100px;
      z-index: 2;
      pointer-events: none;
    }
    .marquee-container::before {
      left: 0;
      background: linear-gradient(to right, var(--white), transparent);
    }
    .marquee-container::after {
      right: 0;
      background: linear-gradient(to left, var(--white), transparent);
    }
    .testi-card { min-width: 350px; }
</style>`;

html = html.replace('</style>', newCSS);

// Mission inner layout tweaking
html = html.replace(/<div class="pillar">/g, '<div class="pillar bento-cell">');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Update 6 Applied Successfully');
