import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function AppBody() {
  const [content, setContent] = useState({});
  const [products, setProducts] = useState([]);
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', unit: '', segment: '', product: '', note: '' });
  const [formStatus, setFormStatus] = useState('idle');

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
    fetchData();
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

    // Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

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
      observer.disconnect();
    };
  }, []);
  const fetchData = async () => {
    const { data: contentData } = await supabase.from('site_content').select('*');
    if (contentData) {
      const parsed = {};
      contentData.forEach(item => { parsed[item.section_key] = item.content; });
      setContent(parsed);
    }

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
    <a href="#hero" className="nav-logo">
      <img src="assets/logo.png" alt="Lam Sơn Edutech Logo" style={{"height":"48px"}} />
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
        <h1 className="hero-title" style={{textWrap:"balance"}} dangerouslySetInnerHTML={{ __html: content.hero?.title || '<span>Số hóa Giáo dục</span> đồng&nbsp;hành cùng Giáo&nbsp;viên & Trung&nbsp;tâm phát&nbsp;triển bền&nbsp;vững' }}></h1>
        <p className="hero-desc">
          {content.hero?.description || 'Lam Sơn Edutech (LSE) cung cấp hệ sinh thái giải pháp AI và chuyển đổi số toàn diện — từ phòng học đến phòng họp, từ giáo viên đến nhà quản lý.'}
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

{/*  ─── MISSION ───  */}
<section id="mission">
  <div className="container">
    <div className="mission-inner reveal">
      <div className="mission-label">✦ Sứ mệnh của chúng tôi</div>
      <h2 className="mission-text" style={{textWrap:"balance"}} dangerouslySetInnerHTML={{ __html: content.mission?.title || 'Biến <span>trí tuệ nhân tạo</span> thành người bạn đồng&nbsp;hành của mỗi giáo viên, mỗi học sinh và mỗi tổ chức giáo dục Việt&nbsp;Nam' }}></h2>
      <p className="mission-sub">
        {content.mission?.subtitle || 'Chúng tôi không chỉ xây dựng phần mềm — chúng tôi kiến tạo nền tảng để giáo viên dạy tốt hơn, học sinh học sâu hơn, và nhà trường vận hành thông minh hơn.'}
      </p>
      <div className="mission-pillars">
        <div className="pillar"><span className="pillar-icon">🤖</span> AI tích hợp sâu</div>
        <div className="pillar"><span className="pillar-icon"><svg width="18" height="12" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" style={{"display":"inline-block","verticalAlign":"middle","borderRadius":"2px"}}><rect width="30" height="20" fill="#da251d"/><polygon points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85" fill="#ff0"/></svg></span> Tối ưu cho Việt&nbsp;Nam</div>
        <div className="pillar"><span className="pillar-icon">🚀</span> Triển khai nhanh</div>
        <div className="pillar"><span className="pillar-icon">📊</span> Đo lường kết quả</div>
        <div className="pillar"><span className="pillar-icon">💡</span> Đổi mới liên tục</div>
      </div>
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
        <div className="badge">Về Lam Sơn Edutech</div>
        <h2 className="section-title" style={{"textAlign":"left","marginBottom":"12px","textWrap":"balance"}}>
          Thuộc Tập đoàn Lam Sơn — tiên phong Edtech Việt&nbsp;Nam
        </h2>
        <p style={{"fontSize":"16px","color":"var(--gray-600)","marginBottom":"24px","lineHeight":"1.7"}}>
          Lam Sơn Edutech (LSE) là đơn vị chuyên biệt về công nghệ giáo dục của Tập đoàn Lam Sơn,
          tập trung vào ba mảng cốt lõi: chuyển đổi số trong giáo dục, ứng dụng AI vào dạy – học,
          và phát triển các giải pháp quản lý hiện đại cho nhà trường và trung tâm đào tạo.
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
        <img src="assets/logo.png" alt="Lam Sơn Edutech" style={{"height":"72px","marginBottom":"20px","background":"#fff","borderRadius":"12px","padding":"10px 16px"}} />
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
      <div className="badge">Hệ sinh thái sản phẩm</div>
      <h2 className="section-title">10 Giải pháp AI toàn diện</h2>
      <p className="section-subtitle">
        Từ phòng học đến phòng họp — LSE cung cấp đầy đủ công cụ để giáo viên, nhà trường,
        trung tâm và lập trình viên làm việc thông minh hơn với AI.
      </p>
    </div>
    <div className="product-filter reveal">
      <button className="filter-btn active" data-filter="all">Tất cả (10)</button>
      <button className="filter-btn" data-filter="giaovien">🧑‍🏫 Giáo viên</button>
      <button className="filter-btn" data-filter="nhaTruong">🏫 Nhà trường</button>
      <button className="filter-btn" data-filter="trungTam">📚 Trung tâm</button>
      <button className="filter-btn" data-filter="developer">👨‍💻 Developer</button>
    </div>
    
    {/*  SẢN PHẨM CHIẾN LƯỢC (HERO PRODUCT)  */}
    <div className="hero-product-banner reveal">
      <div>
        <div className="hp-badge">⭐ Sản phẩm chiến lược</div>
        <h3 className="hp-title">Nền Tảng Quản Lý Khảo Thí & Đào Tạo Toàn Diện</h3>
        <p className="hp-desc">
          Hệ sinh thái số "All-in-one" kết nối thi trực tuyến, ôn luyện, học liệu và vận hành doanh thu cho trung tâm đào tạo. Kích hoạt gói tự động, hỗ trợ mạnh mẽ mô hình B2B2C.
        </p>
        <ul className="hp-features">
          <li>Ngân hàng câu hỏi thông minh & tổ chức thi trực tuyến chống gian lận</li>
          <li>Quản lý khóa học, phân phối học liệu số bảo mật</li>
          <li>Tự động hóa hoàn toàn quy trình bán gói & kích hoạt dịch vụ</li>
          <li>Dashboard quản lý đối tác đo lường doanh số & hoa hồng realtime</li>
        </ul>
        <div className="hp-actions">
          <a href="#consult" className="btn btn-primary">Tư vấn ngay →</a>
          <a href="#" className="btn btn-secondary" style={{"borderColor":"rgba(255,255,255,.3)","color":"#fff"}}>Xem Demo Sản Phẩm</a>
        </div>
      </div>
      <div className="hp-visual">
        <div className="hp-mockup">
          <div className="hp-mockup-icon">🏆</div>
          <div className="hp-mockup-text">Hệ Sinh Thái Khảo Thí LSE<br /><span style={{"fontSize":"14px","fontWeight":"400","color":"#fff"}}>Sẵn sàng vận hành 10,000+ học viên</span></div>
        </div>
      </div>
    </div>
    
    <div className="products-grid" id="products-grid">
      {products.map(p => (
        <div key={p.id} className={`product-card reveal ${p.segment === 'Sản phẩm đặc biệt' ? 'featured' : ''}`} data-cat="all">
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
            <a href="#consult" className="btn" style={{background:'var(--navy)',color:'#fff',border:'none', fontSize:'13px', padding:'8px 16px'}}>Tư vấn</a>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="btn" style={{border:'1px solid var(--gray-200)', fontSize:'13px', padding:'8px 16px', color:'var(--navy)'}}>Tìm hiểu thêm</a>}
          </div>
        </div>
      ))}
      {products.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94A3B8' }}>Đang tải sản phẩm...</p>}
    </div>
  </div>
</section>

{/*  ─── CUSTOMERS ───  */}
<section id="customers" className="section">
  <div className="container">
    <div className="text-center reveal">
      <div className="badge">Khách hàng mục tiêu</div>
      <h2 className="section-title">Phục vụ ai?</h2>
      <p className="section-subtitle">LSE có giải pháp phù hợp cho mọi đối tượng trong hệ sinh thái giáo dục Việt Nam.</p>
    </div>
    <div className="customers-grid reveal">
      <div className="customer-card">
        <div className="customer-icon">🧑‍🏫</div>
        <div className="customer-name">Giáo viên / Giảng viên</div>
        <div className="customer-desc">Đang đứng lớp, bận rộn, muốn nâng cao năng lực và tiết kiệm thời gian chuẩn bị bài.</div>
        <div className="customer-needs">
          <span className="customer-need">Soạn bài nhanh</span>
          <span className="customer-need">Ứng dụng AI</span>
          <span className="customer-need">Tiết kiệm thời gian</span>
        </div>
      </div>
      <div className="customer-card">
        <div className="customer-icon">🏫</div>
        <div className="customer-name">Nhà trường / Sở GD</div>
        <div className="customer-desc">Lãnh đạo, ban giám hiệu cần giải pháp tổng thể, tuân thủ chính sách Bộ GD&ĐT, ROI rõ ràng.</div>
        <div className="customer-needs">
          <span className="customer-need">Giải pháp tổng thể</span>
          <span className="customer-need">Báo cáo</span>
          <span className="customer-need">Chính sách BộGD</span>
        </div>
      </div>
      <div className="customer-card">
        <div className="customer-icon">📚</div>
        <div className="customer-name">Trung tâm / Edtech</div>
        <div className="customer-desc">Chủ trung tâm, startup giáo dục cần tăng doanh thu, tối ưu vận hành và marketing hiệu quả.</div>
        <div className="customer-needs">
          <span className="customer-need">Tăng doanh thu</span>
          <span className="customer-need">Tối ưu vận hành</span>
          <span className="customer-need">Marketing</span>
        </div>
      </div>
      <div className="customer-card">
        <div className="customer-icon">🏢</div>
        <div className="customer-name">Doanh nghiệp <span style={{"fontSize":"11px","fontWeight":"500","color":"#888"}}>(sắp ra mắt)</span></div>
        <div className="customer-desc">HR, L&D, CEO SME cần đào tạo nhân sự hiệu quả và chuyển đổi số quy trình nội bộ.</div>
        <div className="customer-needs">
          <span className="customer-need">Đào tạo nhân sự</span>
          <span className="customer-need">Chuyển đổi số</span>
          <span className="customer-need">Quy trình nội bộ</span>
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
        <div className="badge">Tư vấn miễn phí</div>
        <h2 className="consult-title">Sẵn sàng chuyển đổi số cùng LSE?</h2>
        <p className="consult-desc">
          Để lại thông tin — đội ngũ chuyên gia của LSE sẽ liên hệ trong vòng
          <strong style={{"color":"var(--gold)"}}>24 giờ</strong> để tư vấn giải pháp
          phù hợp nhất với đơn vị của bạn.
        </p>
        <ul className="consult-benefits">
          <li><div className="benefit-dot">🎯</div> Tư vấn nhu cầu chuyển đổi số cụ thể</li>
          <li><div className="benefit-dot">🔍</div> Demo trực tiếp sản phẩm phù hợp</li>
          <li><div className="benefit-dot">💰</div> Báo giá minh bạch, không ẩn phí</li>
          <li><div className="benefit-dot">🤝</div> Lộ trình triển khai chi tiết</li>
          <li><div className="benefit-dot">🆓</div> Hoàn toàn miễn phí, không ràng buộc</li>
        </ul>
        <div className="consult-contact">
          <div className="contact-row">📞 <strong>Hotline:</strong> &nbsp;<a href="tel:0936171111" style={{"color":"var(--gold)","fontWeight":"700"}}>0936.171.111</a></div>
          <div className="contact-row">✉️ <strong>Email:</strong> &nbsp;<a href="mailto:edutech.lamson@gmail.com" style={{"color":"var(--gold)","fontWeight":"700"}}>edutech.lamson@gmail.com</a></div>
          <div className="contact-row">🌐 <strong>Website:</strong> &nbsp;<a href="https://lamsonedutech.vn" target="_blank" style={{"color":"var(--gold)","fontWeight":"700"}}>lamsonedutech.vn</a></div>
        </div>
      </div>
      <div className="reveal">
        <div className="form-card">
          <div id="form-main">
            <div className="form-title">📋 Đăng ký nhận tư vấn</div>
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
        <img src="assets/logo.png" alt="Lam Sơn Edutech" style={{"height":"44px","background":"#fff","borderRadius":"8px","padding":"6px 12px","marginBottom":"8px"}} />
        <div className="footer-slogan">Số hóa giáo dục, đồng hành cùng giáo viên & trung tâm phát triển bền vững.<br />Thuộc Tập đoàn Lam Sơn.</div>
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
