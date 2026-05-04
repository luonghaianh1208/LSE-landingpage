const fs = require('fs');
const path = require('path');

// --- Update index.html ---
let htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Logo replacement
const oldLogo = `<div class="nav-logo-icon">🎓</div>
      <span>Lam Sơn Edutech</span>`;
const newLogo = `<img src="assets/logo.png" alt="Lam Sơn Edutech Logo" style="height: 48px;">`;
html = html.replace(oldLogo, newLogo);

// For About section visual logo
const oldAboutLogo = `<div class="about-logo-large">Lam Sơn<br /><span>Edutech</span></div>`;
const newAboutLogo = `<img src="assets/logo.png" alt="Lam Sơn Edutech" style="height: 80px; margin-bottom: 20px; filter: brightness(0) invert(1);">`;
html = html.replace(oldAboutLogo, newAboutLogo);

// 2. Renaming
html = html.replace(/CheAI LMS/g, 'Hệ thống mini LMS AI cá nhân hóa lộ trình học tập');
html = html.replace(/Nề Nếp Học Đường AI/g, 'Phần mềm quản lí nền nếp học đường');

// 3. Robot Học Tập AI Styling
// Find the Robot card
html = html.replace(/<div class="product-card reveal" data-cat="nhaTruong">\s*<div class="product-header">\s*<div class="product-icon">🤖<\/div>/, `<div class="product-card reveal featured-robot" data-cat="nhaTruong">
        <div class="product-header">
          <div class="product-icon">🤖</div>`);

// Also change its CTA buttons to match featured style (it already has normal buttons)
// We need to target the specific block for Robot AI to change buttons to primary
// Actually, it's easier to just add CSS for `.featured-robot`
const robotCss = `
    /* ─── FEATURED ROBOT ─── */
    .product-card.featured-robot {
      background: linear-gradient(145deg, #1A1A2E 0%, #16213E 100%);
      color: var(--white);
      border: 1px solid #0F3460;
      box-shadow: 0 8px 32px rgba(233, 69, 96, 0.2);
    }
    .featured-robot::before { opacity: 1; background: linear-gradient(90deg, #E94560, #FF6B6B); }
    .featured-robot .product-icon { background: rgba(233, 69, 96, 0.2); color: #FF6B6B; }
    .featured-robot .product-name { color: var(--white); }
    .featured-robot .product-desc { color: rgba(255,255,255,.7); }
    .featured-robot .product-features li { color: rgba(255,255,255,.7); }
    .featured-robot .status-live { background: rgba(233, 69, 96, 0.2); color: #FF6B6B; }
    .featured-robot .segment-badge { background: rgba(255,255,255,.12); color: rgba(255,255,255,.7); }
    .featured-robot .product-actions .btn-outline[style*="background:var(--navy)"] { background: #E94560 !important; color: #fff !important; }
    .featured-robot .product-actions .btn-outline[style*="border:1px solid var(--gray-200)"] { border-color: rgba(255,255,255,.3) !important; color: #fff !important; }
`;
html = html.replace('</style>', robotCss + '\n  </style>');

// 4. Supabase Setup
// Inject Supabase JS
const supabaseScript = `
<!-- Supabase Connection -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
  
  if(SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
      const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('consult-form');
        const submitBtn = document.getElementById('consult-submit');
        const successMsg = document.getElementById('form-success');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              submitBtn.disabled = true;
              submitBtn.innerHTML = '<div class="spinner"></div> Đang gửi...';
              
              const name = document.getElementById('c-name').value;
              const phone = document.getElementById('c-phone').value;
              const unit = document.getElementById('c-unit').value;
              const role = document.getElementById('c-role').value;
              const interest = document.getElementById('c-interest').value;
              const notes = document.getElementById('c-notes').value;
              
              try {
                  const { data, error } = await supabase
                      .from('contacts')
                      .insert([
                          { name, phone, unit, role, interest, notes }
                      ]);
                      
                  if (error) throw error;
                  
                  form.style.display = 'none';
                  successMsg.classList.add('show');
              } catch (error) {
                  console.error('Lỗi khi gửi form:', error);
                  alert('Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ Hotline.');
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = 'Gửi thông tin tư vấn →';
              }
            });
        }
      });
  } else {
      console.log('Supabase keys not configured yet.');
  }
</script>
`;
// Remove old vanilla script and replace with supabase
html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, supabaseScript);

fs.writeFileSync(htmlPath, html, 'utf8');

// --- Update MD Files ---
const dir = path.join(__dirname, 'San-Pham');
if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.md')) {
            let fp = path.join(dir, file);
            let content = fs.readFileSync(fp, 'utf8');
            content = content.replace(/CheAI LMS/g, 'Hệ thống mini LMS AI cá nhân hóa lộ trình học tập');
            content = content.replace(/Nề Nếp Học Đường AI/g, 'Phần mềm quản lí nền nếp học đường');
            fs.writeFileSync(fp, content, 'utf8');
        }
    }
}

// Update BRAND GUIDELINE
let brandPath = path.join(__dirname, 'BRAND_GUIDELINE_LSE.md');
if (fs.existsSync(brandPath)) {
    let brandContent = fs.readFileSync(brandPath, 'utf8');
    brandContent = brandContent.replace(/CheAI LMS/g, 'Hệ thống mini LMS AI cá nhân hóa lộ trình học tập');
    brandContent = brandContent.replace(/Nề Nếp Học Đường AI/g, 'Phần mềm quản lí nền nếp học đường');
    fs.writeFileSync(brandPath, brandContent, 'utf8');
}

console.log('Successfully updated HTML and MD files.');
