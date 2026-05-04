import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function AppBody() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', unit: '', segment: '', product: '', note: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const heroProduct = products.find(p => p.segment === 'Sản phẩm chiến lược');
  const filteredProducts = products.filter(p => p.id !== heroProduct?.id && (activeFilter === 'all' || p.segment === activeFilter));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.email || !formState.segment) {
      alert('Vui lòng điền các trường bắt buộc');
      return;
    }
    setFormStatus('loading');
    const payload = {
      full_name: formState.name, phone: formState.phone, email: formState.email,
      unit: formState.unit, segment: formState.segment, product_interest: formState.product,
      note: formState.note, submitted_at: new Date().toISOString(), source: 'landing-page-react'
    };
    const { error } = await supabase.from('leads').insert([payload]);
    if (error) {
      alert('Lỗi: ' + error.message);
      setFormStatus('idle');
    } else {
      setFormStatus('success');
    }
  };

  
  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    // Navbar scroll
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('back-top');
    const onScroll = () => {
      if(navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
      if(backTop) backTop.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);

    // Reveal observer logic moved to a separate useEffect


    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if(hamburger && navLinks) {
      hamburger.onclick = () => navLinks.classList.toggle('open');
      navLinks.querySelectorAll('a').forEach(a => a.onclick = () => navLinks.classList.remove('open'));
    }

    if(backTop) backTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    // Reveal observer for dynamic content
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products, activeFilter]);

  const fetchProducts = async () => {
    const { data: prodData } = await supabase.from('products').select('*').eq('status', 'live').order('order_index', { ascending: true });
    if (prodData) {
      setProducts(prodData);
    }
  };

  return (
    <>


{/*  Confetti container  */}
<div id="confetti-wrap"></div>

{/*  ─── NAVBAR ───  */}
<nav id="navbar">
  <div className="nav-inner">
    <a href="#hero" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img src="/assets/logo.png" alt="Lam Sơn Edutech Logo" style={{ height: '48px' }} />
    </a>
    <ul className="nav-links" id="nav-links">
      <li><a href="#about">Về chúng tôi</a></li>
      <li><a href="#products">Sản phẩm</a></li>
      <li><a href="#customers">Khách hàng</a></li>
      <li><a href="#consult">Liên hệ</a></li>
    </ul>
    <a href="#consult" className="btn btn-primary nav-cta nav-cta-desktop" style={{"padding":"10px 22px","fontSize":"14px"}}>
      Tư vấn miễn phí
    </a>
    <button className="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

{/*  ─── HERO ───  */}
<section id="hero">
  <div className="container">
    <div className="hero-grid">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <svg width="18" height="12" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" style={{"display":"inline-block","verticalAlign":"middle","marginRight":"4px","borderRadius":"2px"}}><rect width="30" height="20" fill="#da251d"/><polygon points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85" fill="#ff0"/></svg> Công nghệ giáo dục Việt Nam
        </div>
        <h1 className="hero-title" style={{textWrap:"balance"}}>
          <span style={{ color: '#E5A211' }}>Số hóa Giáo dục</span> đồng hành cùng Trung tâm phát triển bền vững
        </h1>
        <p className="hero-desc">
          LSE cung cấp hệ điều hành chuyển đổi số toàn diện — từ phòng học đến phòng họp, giúp các tổ chức giáo dục tăng gấp 3 hiệu suất và giảm 70% chi phí vận hành.
        </p>
        <div className="hero-btns">
          <a href="#consult" className="btn btn-primary" style={{"fontSize":"16px","padding":"16px 32px"}}>
            Nhận tư vấn miễn phí →
          </a>
          <a href="#products" className="btn btn-secondary" style={{"fontSize":"16px","padding":"16px 32px"}}>
            Khám phá sản phẩm
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-num">10+</div>
            <div className="hero-stat-label">Sản phẩm<br />công nghệ</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">4</div>
            <div className="hero-stat-label">Phân khúc<br />khách hàng</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">2</div>
            <div className="hero-stat-label">Cơ sở<br />HN & HP</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">AI</div>
            <div className="hero-stat-label">Tích hợp<br />mọi sản phẩm</div>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card-stack">
          <div className="hero-card hero-card-main">
            <div className="hero-card-tag">🤖 Hệ sinh thái sản phẩm AI</div>
            <div className="hero-card-title">Lam Sơn Edutech Platform</div>
            <div className="hero-card-desc">10 giải pháp công nghệ — phủ sóng toàn bộ hành trình giáo dục Việt Nam</div>
            <div className="hero-product-list">
              <span className="hero-product-chip">🧑‍🏫 Trợ Lý GV</span>
              <span className="hero-product-chip">🎓 Hệ thống mini LMS AI cá nhân hóa lộ trình học tập</span>
              <span className="hero-product-chip">🏫 Nề Nếp AI</span>
              <span className="hero-product-chip">🌍 IELTS AI</span>
              <span className="hero-product-chip">🚀 Hướng Nghiệp</span>
              <span className="hero-product-chip">🤖 Robot AI</span>
              <span className="hero-product-chip">📋 Quản lý NV</span>
              <span className="hero-product-chip">🏆 Khảo Thí</span>
              <span className="hero-product-chip">⚡ Agent Kit</span>
              <span className="hero-product-chip">🔧 Subagent</span>
            </div>
          </div>
          <div className="hero-float-card">
            ✅ Đã triển khai thực tế tại trường học & trung tâm
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── PAIN POINTS ───  */}
<section className="section pain-section">
  <div className="container text-center reveal">
    <div className="badge" style={{ background: '#FEF2F2', color: '#DC2626', borderColor: '#FECACA' }}>Thực trạng vận hành</div>
    <h2 className="section-title">Nỗi đau của Giáo dục truyền thống</h2>
    <div className="pain-grid">
      <div className="pain-image" style={{ gridColumn: '1 / -1', marginBottom: '24px' }}>
        <img src="/assets/pain_points.png" alt="Sự quá tải trong giáo dục truyền thống" style={{ width: '100%', maxWidth: '700px', margin: '0 auto', borderRadius: '16px', boxShadow: '0 8px 32px rgba(220, 38, 38, 0.1)' }} />
      </div>
      <div className="pain-card">
        <div className="pain-icon">📄</div>
        <div className="pain-title">Quản lý phân mảnh</div>
        <div style={{ color: '#5A6A80' }}>Dữ liệu lưu trữ rải rác trên nhiều file Excel, Zalo, Drive khiến việc tra cứu mất hàng giờ đồng hồ.</div>
      </div>
      <div className="pain-card">
        <div className="pain-icon">⏳</div>
        <div className="pain-title">Tốn thời gian chấm bài</div>
        <div className="pain-desc" style={{ color: '#5A6A80' }}>Giáo viên kiệt sức vì phải chấm điểm thủ công, dẫn đến hiệu suất giảng dạy trên lớp giảm sút.</div>
      </div>
      <div className="pain-card">
        <div className="pain-icon">📉</div>
        <div className="pain-title">Thiếu báo cáo Real-time</div>
        <div className="pain-desc" style={{ color: '#5A6A80' }}>Ban Giám Hiệu, Chủ Trung tâm không nắm được tình hình doanh thu và chất lượng học sinh tức thì.</div>
      </div>
      <div className="pain-card">
        <div className="pain-icon">🤖</div>
        <div className="pain-title">Tụt hậu công nghệ</div>
        <div className="pain-desc" style={{ color: '#5A6A80' }}>Sử dụng công cụ rời rạc, cũ kỹ khiến trung tâm mất lợi thế cạnh tranh và không thể mở rộng quy mô.</div>
      </div>
    </div>
    <div className="pain-cost reveal">
      Chi phí ẩn do sai sót dữ liệu và vận hành thủ công đang ăn mòn lợi nhuận của bạn mỗi ngày.
    </div>
  </div>
</section>

{/*  ─── AI SECTION ───  */}
<section className="section" style={{ background: '#FAFAFA' }}>
  <div className="container text-center reveal">
    <div className="badge" style={{ background: '#E0F2FE', color: '#0369A1', borderColor: '#BAE6FD' }}>Công nghệ lõi</div>
    <h2 className="section-title">AI – Nhân Sự Số Đắc Lực Nhất Của Bạn</h2>
    
    <div style={{ marginBottom: '40px' }} className="reveal">
      <img src="/assets/ai_tech.png" alt="Hệ sinh thái AI LSE" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '16px', boxShadow: '0 8px 32px rgba(3, 105, 161, 0.15)' }} />
    </div>

    <div className="ai-flow-container">
      <div className="ai-step reveal">
        <div className="ai-step-icon">⚡</div>
        <div className="ai-step-title">Tạo đề tự động (30s)</div>
      </div>
      <div className="ai-step reveal">
        <div className="ai-step-icon">🤖</div>
        <div className="ai-step-title">Chấm điểm & Phân tích AI</div>
      </div>
      <div className="ai-step reveal">
        <div className="ai-step-icon">📈</div>
        <div className="ai-step-title">Báo cáo năng lực cá nhân hóa</div>
      </div>
    </div>
    <div className="ai-closing reveal">
      Giải phóng 80% áp lực hành chính để tập trung 100% vào chuyên môn giảng dạy.
    </div>
  </div>
</section>

{/*  ─── STATS ───  */}
<section id="stats" className="section-sm">
  <div className="container">
    <div className="stats-grid reveal">
      <div className="stat-card">
        <div className="stat-num">10<span>+</span></div>
        <div className="stat-label">Sản phẩm công nghệ<br />đang vận hành</div>
      </div>
      <div className="stat-card">
        <div className="stat-num"><span>100%</span></div>
        <div className="stat-label">Tích hợp AI<br />vào sản phẩm</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">4<span>+</span></div>
        <div className="stat-label">Phân khúc khách hàng<br />được phục vụ</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">2<span>TP</span></div>
        <div className="stat-label">Cơ sở hoạt động:<br />Hà Nội & Hải Phòng</div>
      </div>
    </div>
  </div>
</section>

{/*  ─── ABOUT ───  */}
<section id="about" className="section">
  <div className="container">
    <div className="about-grid">
      <div className="about-text reveal">
        <div className="badge">Đơn vị phát triển</div>
        <h2 className="section-title" style={{"textAlign":"left","marginBottom":"12px","textWrap":"balance"}}>
          Hệ Điều Hành Giáo Dục Toàn Diện
        </h2>
        <p style={{"fontSize":"16px","color":"var(--gray-600)","marginBottom":"24px","lineHeight":"1.7"}}>
          Lam Sơn Edutech không bán phần mềm rời rạc. Chúng tôi cung cấp một hệ điều hành công nghệ nơi mọi dữ liệu từ tuyển sinh, giảng dạy đến tài chính đều được đồng bộ và tối ưu hóa bằng trí tuệ nhân tạo.
        </p>
        <div className="about-bullets">
          <div className="about-bullet">
            <div className="bullet-icon">🎓</div>
            <div>
              <div className="bullet-title">Chuyên sâu giáo dục Việt Nam</div>
              <div className="bullet-desc">Toàn bộ sản phẩm được thiết kế theo chương trình GDPT 2018 và đặc thù văn hóa giáo dục Việt Nam.</div>
            </div>
          </div>
          <div className="about-bullet">
            <div className="bullet-icon">🤖</div>
            <div>
              <div className="bullet-title">AI là lõi công nghệ</div>
              <div className="bullet-desc">Mọi sản phẩm đều tích hợp trí tuệ nhân tạo — từ Gemini AI đến Local-first AI cho robot phần cứng.</div>
            </div>
          </div>
          <div className="about-bullet">
            <div className="bullet-icon">⚡</div>
            <div>
              <div className="bullet-title">Triển khai thực tế, không lý thuyết</div>
              <div className="bullet-desc">Nhiều sản phẩm đã vận hành tại trường học và trung tâm — không chỉ trên paper.</div>
            </div>
          </div>
          <div className="about-bullet">
            <div className="bullet-icon">🌱</div>
            <div>
              <div className="bullet-title">Đồng hành dài hạn</div>
              <div className="bullet-desc">LSE không chỉ bán phần mềm — chúng tôi đồng hành triển khai, đào tạo và hỗ trợ liên tục.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-visual reveal">
        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '20px'}}>Lam Sơn <span style={{color: '#ff0'}}>Edutech</span></div>
        <div className="about-mission-quote">
          "Số hóa giáo dục, đồng hành cùng giáo viên & trung tâm phát triển bền vững"
        </div>
        <div className="about-tags">
          <span className="about-tag">Edtech</span>
          <span className="about-tag">AI in Education</span>
          <span className="about-tag">Chuyển đổi số</span>
          <span className="about-tag">PWA / Web App</span>
          <span className="about-tag">GDPT 2018</span>
          <span className="about-tag">Gemini AI</span>
          <span className="about-tag">Local AI</span>
          <span className="about-tag">B2B2C</span>
        </div>
        <div className="about-locations">
          <div className="loc-item"><div className="loc-dot"></div><span><strong style={{"color":"#fff"}}>CS1:</strong> 870–872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng</span></div>
          <div className="loc-item"><div className="loc-dot"></div><span><strong style={{"color":"#fff"}}>CS2:</strong> Ô 15–Đ13, KĐT Geleximco, Lê Trọng Tấn, Hoài Đức, Hà Nội</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── PRODUCTS ───  */}
<section id="products" className="section">
  <div className="container">
    <div className="text-center reveal">
      <div className="badge">Hệ điều hành trung tâm</div>
      <h2 className="section-title">10 Giải pháp Vận hành toàn diện</h2>
      <p className="section-subtitle">
        Từ phòng học đến phòng họp — LSE cung cấp đầy đủ công cụ để giáo viên, nhà trường,
        trung tâm vận hành như một doanh nghiệp công nghệ.
      </p>
    </div>
    <div className="product-filter reveal">
      <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tất cả</button>
      <button className={`filter-btn ${activeFilter === 'Giáo viên' ? 'active' : ''}`} onClick={() => setActiveFilter('Giáo viên')}>🧑‍🏫 Giáo viên</button>
      <button className={`filter-btn ${activeFilter === 'Nhà trường' ? 'active' : ''}`} onClick={() => setActiveFilter('Nhà trường')}>🏫 Nhà trường</button>
      <button className={`filter-btn ${activeFilter === 'Trung tâm' ? 'active' : ''}`} onClick={() => setActiveFilter('Trung tâm')}>📚 Trung tâm</button>
      <button className={`filter-btn ${activeFilter === 'Developer' ? 'active' : ''}`} onClick={() => setActiveFilter('Developer')}>👨‍💻 Developer</button>
    </div>
    
    {/*  SẢN PHẨM CHIẾN LƯỢC (HERO PRODUCT)  */}
    {heroProduct && (
      <div className="hero-product-banner reveal">
        <div>
          <div className="hp-badge">⭐ Sản phẩm chiến lược</div>
          <h3 className="hp-title">{heroProduct.name}</h3>
          <p className="hp-desc">{heroProduct.description}</p>
          <div className="hp-actions">
            <a href="#consult" className="btn btn-primary">Tư vấn ngay →</a>
            {heroProduct.link && <a href={heroProduct.link} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{"borderColor":"rgba(255,255,255,.3)","color":"#fff"}}>Xem chi tiết</a>}
          </div>
        </div>
        <div className="hp-visual">
          <div className="hp-mockup" style={{ padding: heroProduct.image_url ? '0' : '30px', overflow: 'hidden' }}>
            {heroProduct.image_url ? (
              <img src={heroProduct.image_url} alt={heroProduct.name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius: '16px'}} />
            ) : (
              <>
                <div className="hp-mockup-icon">🏆</div>
                <div className="hp-mockup-text">{heroProduct.name}<br /><span style={{"fontSize":"14px","fontWeight":"400","color":"#fff"}}>Giải pháp công nghệ cốt lõi</span></div>
              </>
            )}
          </div>
        </div>
      </div>
    )}
    
    <div className="products-grid" id="products-grid">
      {filteredProducts.map(p => (
        <div key={p.id} className={`product-card reveal ${p.segment === 'Sản phẩm đặc biệt' ? 'featured' : ''}`}>
          <div className="product-header">
            <div className="product-icon" style={{ overflow: 'hidden' }}>
              {p.image_url ? <img src={p.image_url} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📦'}
            </div>
            <div className="product-badges">
              <span className={`status-badge ${p.status === 'live' ? 'status-live' : p.status === 'building' ? 'status-building' : 'status-soon'}`}>
                {p.status === 'live' ? '✅ Đang hoạt động' : p.status === 'building' ? '🔬 Thử nghiệm' : '🔜 Sắp ra mắt'}
              </span>
              <span className="segment-badge">{p.segment}</span>
            </div>
          </div>
          <div className="product-name">{p.name}</div>
          <div className="product-desc">{p.description}</div>
          <div className="product-actions" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E2E6F0', display: 'flex', gap: '8px' }}>
            <a href="#consult" className="btn" style={{background:'var(--navy)',color:'#fff',border:'none', fontSize:'13px', padding:'8px 16px'}}>Đăng ký Demo</a>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="btn" style={{border:'1px solid var(--gray-200)', fontSize:'13px', padding:'8px 16px', color:'var(--navy)'}}>Tìm hiểu thêm</a>}
          </div>
        </div>
      ))}
      {products.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94A3B8' }}>Đang tải sản phẩm...</p>}
    </div>
  </div>
</section>

{/*  ─── ROI SECTION ───  */}
<section className="roi-section">
  <div className="container text-center reveal">
    <div className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}>Hiệu quả đầu tư</div>
    <h2 className="section-title" style={{ color: '#FFF' }}>Kết quả thực tế cho Trung tâm quy mô 500 Học viên</h2>
    
    <div className="roi-grid">
      <div className="roi-card reveal">
        <div className="roi-value">3x</div>
        <div className="roi-label">Tăng hiệu suất làm việc của Giáo viên</div>
      </div>
      <div className="roi-card reveal">
        <div className="roi-value">4</div>
        <div className="roi-label">Giảm nhân sự vận hành hệ thống</div>
      </div>
      <div className="roi-card reveal">
        <div className="roi-value">40M</div>
        <div className="roi-label">Tiết kiệm chi phí vận hành mỗi tháng</div>
      </div>
    </div>
    
    <div className="roi-payback reveal">
      Chỉ mất trung bình 2.5 tháng để hoàn vốn đầu tư nền tảng.
    </div>
  </div>
</section>

{/*  ─── CASE STUDY ───  */}
<section className="section" id="case-study" style={{ background: '#F0F2F8' }}>
  <div className="container text-center reveal">
    <div className="badge">Khác biệt cốt lõi</div>
    <h2 className="section-title">Sự chuyển mình mạnh mẽ</h2>
    
    <div style={{ marginBottom: '40px' }}>
      <img src="/assets/case_study.png" alt="Tăng trưởng doanh thu và tự động hóa" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }} />
    </div>

    <div className="cs-cards-container text-left reveal">
      <div className="cs-card">
        <div className="cs-card-header">
          <div className="cs-icon">📝</div>
          <div className="cs-title">Chấm chữa bài & Khảo thí</div>
        </div>
        <div className="cs-body">
          <div className="cs-before-item"><span className="cs-label-red">Trước đây:</span> Chấm bài IELTS Speaking/Writing thủ công, mất 3-5 ngày/đề, giáo viên luôn trong trạng thái quá tải.</div>
          <div className="cs-after-item"><span className="cs-label-green">LSE AI:</span> Chấm tự động cực chuẩn bằng AI chỉ trong 30 giây, giải phóng 80% thời gian cho giáo viên.</div>
        </div>
      </div>
      <div className="cs-card">
        <div className="cs-card-header">
          <div className="cs-icon">👨‍👩‍👧‍👦</div>
          <div className="cs-title">Quản lý Học viên (CRM)</div>
        </div>
        <div className="cs-body">
          <div className="cs-before-item"><span className="cs-label-red">Trước đây:</span> CSKH chậm trễ, không nắm được tiến độ học tập, tỷ lệ tái đăng ký (Retention Rate) thấp dưới 40%.</div>
          <div className="cs-after-item"><span className="cs-label-green">LSE AI:</span> Báo cáo năng lực cá nhân hóa tự động gửi qua Zalo, tỷ lệ tái đăng ký tăng vọt lên 85%.</div>
        </div>
      </div>
      <div className="cs-card">
        <div className="cs-card-header">
          <div className="cs-icon">📊</div>
          <div className="cs-title">Nền nếp & Vận hành</div>
        </div>
        <div className="cs-body">
          <div className="cs-before-item"><span className="cs-label-red">Trước đây:</span> Ban Giám Hiệu mù mờ thông tin, số liệu thống kê doanh thu, điểm danh rời rạc trên Excel.</div>
          <div className="cs-after-item"><span className="cs-label-green">LSE AI:</span> Dashboard Real-time mọi chỉ số trực quan, kiểm soát toàn bộ hoạt động trung tâm qua 1 màn hình.</div>
        </div>
      </div>
    </div>
  </div>
</section>


{/*  ─── TESTIMONIALS ───  */}
<section id="testimonials" className="section">
  <div className="text-center reveal">
    <div className="badge">Phản hồi khách hàng</div>
    <h2 className="section-title">Niềm tin từ hệ sinh thái giáo dục</h2>
    <p className="section-subtitle">Hàng ngàn giáo viên, học sinh và nhà quản lý đã trải nghiệm sự khác biệt mà công nghệ AI của Lam Sơn Edutech mang lại.</p>
  </div>
  <div className="marquee-container reveal">
    <div className="marquee-track">
      <div className="testi-card">
        <div className="testi-quote">"Từ khi dùng Trợ Lý Giáo Viên Toàn Năng, tôi không còn thức đêm soạn giáo án. AI xử lý cấu trúc bài giảng quá thông minh, chuẩn xác."</div>
        <div className="testi-author">
          <div className="testi-avatar">👩‍🏫</div>
          <div className="testi-info"><span className="testi-name">Cô Nguyễn H. Phương</span><span className="testi-role">Giáo viên Toán cấp 3</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Tôi rất bất ngờ với Phần mềm quản lí nền nếp học đường. Báo cáo tự động mỗi tuần giúp Ban Giám Hiệu nắm bắt tình hình tức thì, không phải chờ giáo viên nộp sổ."</div>
        <div className="testi-author">
          <div className="testi-avatar">👨‍💼</div>
          <div className="testi-info"><span className="testi-name">Thầy Phạm V. Tuấn</span><span className="testi-role">Hiệu phó trường THPT</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Hệ thống Khảo thí và Hệ thống mini LMS AI cá nhân hóa lộ trình học tập giúp trung tâm mình tự động hóa khâu chấm bài IELTS. Doanh thu tăng 30% vì giáo viên nhận được nhiều lớp hơn."</div>
        <div className="testi-author">
          <div className="testi-avatar">🏢</div>
          <div className="testi-info"><span className="testi-name">Anh Lê T. Phong</span><span className="testi-role">Giám đốc Trung tâm Anh Ngữ</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Robot Học Tập AI thực sự là người bạn tuyệt vời của con trai mình. Bé tự tin giao tiếp, hay đặt câu hỏi hơn và không còn lười học từ vựng nữa."</div>
        <div className="testi-author">
          <div className="testi-avatar">👨‍👩‍👦</div>
          <div className="testi-info"><span className="testi-name">Chị Trần M. Lan</span><span className="testi-role">Phụ huynh học sinh Tiểu học</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Bài test hướng nghiệp AI siêu chuẩn! Nó không chỉ chỉ ra nghề hợp với em mà còn cảnh báo những ngành dễ bị AI thay thế để em chọn trường đúng đắn hơn."</div>
        <div className="testi-author">
          <div className="testi-avatar">🎓</div>
          <div className="testi-info"><span className="testi-name">Bạn Hoàng D. Anh</span><span className="testi-role">Học sinh lớp 12</span></div>
        </div>
      </div>
      
      {/*  Duplicate for infinite scrolling  */}
      <div className="testi-card">
        <div className="testi-quote">"Từ khi dùng Trợ Lý Giáo Viên Toàn Năng, tôi không còn thức đêm soạn giáo án. AI xử lý cấu trúc bài giảng quá thông minh, chuẩn xác."</div>
        <div className="testi-author">
          <div className="testi-avatar">👩‍🏫</div>
          <div className="testi-info"><span className="testi-name">Cô Nguyễn H. Phương</span><span className="testi-role">Giáo viên Toán cấp 3</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Tôi rất bất ngờ với Phần mềm quản lí nền nếp học đường. Báo cáo tự động mỗi tuần giúp Ban Giám Hiệu nắm bắt tình hình tức thì, không phải chờ giáo viên nộp sổ."</div>
        <div className="testi-author">
          <div className="testi-avatar">👨‍💼</div>
          <div className="testi-info"><span className="testi-name">Thầy Phạm V. Tuấn</span><span className="testi-role">Hiệu phó trường THPT</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Hệ thống Khảo thí và Hệ thống mini LMS AI cá nhân hóa lộ trình học tập giúp trung tâm mình tự động hóa khâu chấm bài IELTS. Doanh thu tăng 30% vì giáo viên nhận được nhiều lớp hơn."</div>
        <div className="testi-author">
          <div className="testi-avatar">🏢</div>
          <div className="testi-info"><span className="testi-name">Anh Lê T. Phong</span><span className="testi-role">Giám đốc Trung tâm Anh Ngữ</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Robot Học Tập AI thực sự là người bạn tuyệt vời của con trai mình. Bé tự tin giao tiếp, hay đặt câu hỏi hơn và không còn lười học từ vựng nữa."</div>
        <div className="testi-author">
          <div className="testi-avatar">👨‍👩‍👦</div>
          <div className="testi-info"><span className="testi-name">Chị Trần M. Lan</span><span className="testi-role">Phụ huynh học sinh Tiểu học</span></div>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-quote">"Bài test hướng nghiệp AI siêu chuẩn! Nó không chỉ chỉ ra nghề hợp với em mà còn cảnh báo những ngành dễ bị AI thay thế để em chọn trường đúng đắn hơn."</div>
        <div className="testi-author">
          <div className="testi-avatar">🎓</div>
          <div className="testi-info"><span className="testi-name">Bạn Hoàng D. Anh</span><span className="testi-role">Học sinh lớp 12</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── WHY LSE ───  */}
<section id="why" className="section">
  <div className="container">
    <div className="text-center reveal">
      <div className="badge">Tại sao chọn LSE?</div>
      <h2 className="section-title">Khác biệt cốt lõi</h2>
      <p className="section-subtitle">Không phải phần mềm đơn thuần — LSE là đối tác chuyển đổi số giáo dục dài hạn của bạn.</p>
    </div>
    <div className="why-grid">
      <div className="why-card reveal">
        <div className="why-num">01</div>
        <div className="why-title">AI tích hợp thực sự, không chỉ là tên gọi</div>
        <div className="why-desc">Toàn bộ 10 sản phẩm của LSE đều tích hợp AI vào nghiệp vụ cốt lõi — không phải chỉ là chatbot hay "tính năng thêm". AI là lõi vận hành của từng giải pháp.</div>
      </div>
      <div className="why-card reveal">
        <div className="why-num">02</div>
        <div className="why-title">Thiết kế riêng cho giáo dục Việt Nam</div>
        <div className="why-desc">Từ chuẩn CV 5512, chương trình GDPT 2018 đến đặc thù văn hóa lớp học — mọi chi tiết đều được tối ưu cho ngữ cảnh Việt Nam, không phải bản dịch từ nước ngoài.</div>
      </div>
      <div className="why-card reveal">
        <div className="why-num">03</div>
        <div className="why-title">Đã thực chiến tại trường học & trung tâm</div>
        <div className="why-desc">Không chỉ là demo — các sản phẩm của LSE đã và đang vận hành thực tế tại nhiều trường THPT và trung tâm đào tạo, được kiểm chứng bởi người dùng thực.</div>
      </div>
      <div className="why-card reveal">
        <div className="why-num">04</div>
        <div className="why-title">Hệ sinh thái đồng bộ, không rời rạc</div>
        <div className="why-desc">Các sản phẩm LSE được thiết kế để hoạt động cùng nhau trong một hệ sinh thái — giáo viên, nhà trường, trung tâm có thể triển khai nhiều giải pháp tích hợp liền mạch.</div>
      </div>
      <div className="why-card reveal">
        <div className="why-num">05</div>
        <div className="why-title">Triển khai nhanh, không cần hạ tầng phức tạp</div>
        <div className="why-desc">Tất cả sản phẩm chạy trên nền web, PWA hoặc cloud — không yêu cầu server riêng hay đội IT phức tạp. Đơn vị nhỏ vẫn dùng được ngay sau vài giờ thiết lập.</div>
      </div>
      <div className="why-card reveal">
        <div className="why-num">06</div>
        <div className="why-title">Đội ngũ đồng hành, không bán xong bỏ</div>
        <div className="why-desc">LSE cam kết đồng hành từ tư vấn, triển khai, đào tạo đến hỗ trợ vận hành liên tục. Mục tiêu của chúng tôi là đơn vị của bạn thực sự hưởng lợi từ công nghệ.</div>
      </div>
    </div>
  </div>
</section>

{/*  ─── CONSULT FORM ───  */}
<section id="consult">
  <div className="container">
    <div className="consult-grid">
      <div className="consult-left reveal">
        <div className="badge">Đăng ký Demo</div>
        <h2 className="consult-title">Đăng ký demo để:</h2>
        <ul className="consult-benefits" style={{ fontSize: '18px', marginTop: '24px' }}>
          <li><div className="benefit-dot">👁️</div> Xem toàn bộ hệ thống thực tế</li>
          <li><div className="benefit-dot">💡</div> Nhận tư vấn 1-1 từ chuyên gia</li>
          <li><div className="benefit-dot">📈</div> Có lộ trình chuyển đổi số riêng</li>
        </ul>
        <div className="consult-contact" style={{ marginTop: '40px' }}>
          <div className="contact-row">📞 <strong>Hotline:</strong> &nbsp;<a href="tel:0936171111" style={{"color":"var(--gold)","fontWeight":"700"}}>0936.171.111</a></div>
          <div className="contact-row">✉️ <strong>Email:</strong> &nbsp;<a href="mailto:edutech.lamson@gmail.com" style={{"color":"var(--gold)","fontWeight":"700"}}>edutech.lamson@gmail.com</a></div>
          <div className="contact-row">🌐 <strong>Website:</strong> &nbsp;<a href="https://lamsonedutech.vn" target="_blank" style={{"color":"var(--gold)","fontWeight":"700"}}>lamsonedutech.vn</a></div>
        </div>
      </div>
      <div className="reveal">
        <div className="form-card">
          <div className="final-cta-quote">Không cần quyết định hôm nay.<br/>Chỉ cần thử 7 ngày.<br/>Kết quả sẽ tự trả lời.</div>
          <div id="form-main">
            <div className="form-title">📋 Đăng ký nhận tư vấn & Demo</div>
            <form id="consult-form" onSubmit={handleFormSubmit} style={{ display: formStatus === "success" ? "none" : "block" }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="f-name">Họ và tên <span className="req">*</span></label>
                  <input className="form-input" id="f-name" type="text" placeholder="Nguyễn Văn A" value={formState.name} onChange={e=>setFormState({...formState, name: e.target.value})} />
                  <div className="form-error" id="err-name">Vui lòng nhập họ tên</div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="f-phone">Số điện thoại <span className="req">*</span></label>
                  <input className="form-input" id="f-phone" type="tel" placeholder="0912 345 678" value={formState.phone} onChange={e=>setFormState({...formState, phone: e.target.value})} />
                  <div className="form-error" id="err-phone">SĐT không hợp lệ (phải bắt đầu 03/05/07/08/09)</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-email">Email <span className="req">*</span></label>
                <input className="form-input" id="f-email" type="email" placeholder="email@truong.edu.vn" value={formState.email} onChange={e=>setFormState({...formState, email: e.target.value})} />
                <div className="form-error" id="err-email">Email không hợp lệ</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="f-unit">Đơn vị / Tổ chức</label>
                  <input className="form-input" id="f-unit" type="text" placeholder="Trường THPT / Trung tâm..." value={formState.unit} onChange={e=>setFormState({...formState, unit: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="f-segment">Bạn là <span className="req">*</span></label>
                  <select className="form-select" id="f-segment" value={formState.segment} onChange={e=>setFormState({...formState, segment: e.target.value})}>
                    <option value="">-- Chọn đối tượng --</option>
                    <option>Giáo viên / Giảng viên</option>
                    <option>Ban giám hiệu / Quản lý trường</option>
                    <option>Chủ trung tâm / Giám đốc Edtech</option>
                    <option>Lập trình viên / Developer</option>
                    <option>Doanh nghiệp (HR / L&D)</option>
                    <option>Khác</option>
                  </select>
                  <div className="form-error" id="err-segment">Vui lòng chọn đối tượng</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-product">Sản phẩm quan tâm</label>
                <select className="form-select" id="f-product" value={formState.product} onChange={e=>setFormState({...formState, product: e.target.value})}>
                  <option value="">-- Chọn sản phẩm (có thể bỏ qua) --</option>
                  <option>Trợ Lý Giáo Viên Toàn Năng</option>
                  <option>Hệ thống mini LMS AI cá nhân hóa lộ trình học tập</option>
                  <option>Phần mềm quản lí nền nếp học đường</option>
                  <option>IELTS Master AI</option>
                  <option>Tư Vấn Hướng Nghiệp AI</option>
                  <option>Nền Tảng Quản Lý Khảo Thí</option>
                  <option>Robot Học Tập AI</option>
                  <option>Quản Lý Công Việc Nội Bộ</option>
                  <option>Agent Kit / Subagent Workflow</option>
                  <option>Tư vấn tổng thể chuyển đổi số</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-note">Nội dung cần tư vấn</label>
                <textarea className="form-textarea" id="f-note" placeholder="Mô tả ngắn về nhu cầu hoặc câu hỏi của bạn..." value={formState.note} onChange={e=>setFormState({...formState, note: e.target.value})}></textarea>
              </div>
              <button type="submit" className="form-submit" id="submit-btn">
                <span id="submit-text">{formStatus === "loading" ? "Đang gửi..." : "Gửi đăng ký tư vấn →"}</span>
                <div className="spinner" id="submit-spinner" style={{"display":"none"}}></div>
              </button>
              <p className="form-note">🔒 Thông tin của bạn được bảo mật tuyệt đối. LSE cam kết không chia sẻ với bên thứ ba.</p>
            </form>
          </div>
          <div id="form-success" className={formStatus === "success" ? "show" : ""}>
            <div className="success-icon">🎉</div>
            <div className="success-title">Đăng ký thành công!</div>
            <div className="success-desc">
              Cảm ơn bạn đã quan tâm đến <strong>Lam Sơn Edutech</strong>.<br />
              Chuyên gia tư vấn sẽ liên hệ với bạn trong vòng <strong>24 giờ</strong>.<br /><br />
              Trong thời gian chờ, bạn có thể liên hệ trực tiếp qua:<br />
              📞 <a href="tel:0936171111" style={{"color":"var(--gold)","fontWeight":"700"}}>0936.171.111</a> &nbsp;|&nbsp;
              ✉️ <a href="mailto:edutech.lamson@gmail.com" style={{"color":"var(--gold)","fontWeight":"700"}}>edutech.lamson@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ─── FOOTER ───  */}
<footer id="footer">
  <div className="container">
    <div className="footer-grid">
      <div>
        <img src="/assets/logo.png" alt="Lam Sơn Edutech Logo" style={{ height: '48px', marginBottom: '16px', background: '#fff', padding: '6px 12px', borderRadius: '8px' }} />
        <div className="footer-slogan">Số hóa giáo dục, đồng hành cùng trung tâm phát triển bền vững.<br />Thuộc Tập đoàn Lam Sơn.</div>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" className="social-btn" title="Facebook">📘</a>
          <a href="https://zalo.me" target="_blank" className="social-btn" title="Zalo">💬</a>
          <a href="https://linkedin.com" target="_blank" className="social-btn" title="LinkedIn">💼</a>
          <a href="https://lamsonedutech.vn" target="_blank" className="social-btn" title="Website">🌐</a>
        </div>
      </div>
      <div>
        <div className="footer-heading">Sản phẩm</div>
        <ul className="footer-links">
          <li><a href="#products">Trợ Lý Giáo Viên</a></li>
          <li><a href="#products">Hệ thống mini LMS AI cá nhân hóa lộ trình học tập</a></li>
          <li><a href="#products">Phần mềm quản lí nền nếp học đường</a></li>
          <li><a href="#products">IELTS Master AI</a></li>
          <li><a href="#products">Tư Vấn Hướng Nghiệp AI</a></li>
          <li><a href="#products">Nền Tảng Khảo Thí</a></li>
          <li><a href="#products">Robot Học Tập AI</a></li>
          <li><a href="#products">Agent Kit & Subagent</a></li>
        </ul>
      </div>
      <div>
        <div className="footer-heading">Khách hàng</div>
        <ul className="footer-links">
          <li><a href="#customers">Giáo viên</a></li>
          <li><a href="#customers">Nhà trường / Sở GD</a></li>
          <li><a href="#customers">Trung tâm đào tạo</a></li>
          <li><a href="#customers">Doanh nghiệp</a></li>
          <li><a href="#customers">Lập trình viên</a></li>
        </ul>
        <div className="footer-heading" style={{"marginTop":"24px"}}>Công ty</div>
        <ul className="footer-links">
          <li><a href="#about">Về chúng tôi</a></li>
          <li><a href="#why">Tại sao chọn LSE</a></li>
          <li><a href="#consult">Liên hệ tư vấn</a></li>
        </ul>
      </div>
      <div>
        <div className="footer-heading">Liên hệ</div>
        <ul className="footer-contact footer-links">
          <li>📞 <a href="tel:0936171111">0936.171.111</a></li>
          <li>✉️ <a href="mailto:edutech.lamson@gmail.com">edutech.lamson@gmail.com</a></li>
          <li>🌐 <a href="https://lamsonedutech.vn" target="_blank">lamsonedutech.vn</a></li>
          <li>📍 870–872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng</li>
          <li>📍 Ô 15–Đ13, KĐT Geleximco, Hoài Đức, Hà Nội</li>
        </ul>
      </div>
    </div>
    <div className="footer-divider"></div>
    <div className="footer-bottom">
      <div className="footer-copy">© 2026 Lam Sơn Edutech. Thuộc Tập đoàn Lam Sơn. All rights reserved.</div>
      <div className="footer-legal">
        <a href="#">Chính sách bảo mật</a>
        <a href="#">Điều khoản sử dụng</a>
        <a href="#">Sitemap</a>
      </div>
    </div>
  </div>
</footer>

{/*  Back to top  */}
<div id="back-top" title="Lên đầu trang">↑</div>



    </>
  );
}
