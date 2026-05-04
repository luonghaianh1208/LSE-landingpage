const fs = require('fs');
let code = fs.readFileSync('src/AppBody.jsx', 'utf8');

// Replace Hero Title & Desc
const heroRegex = /<h1 className="hero-title"[^>]*>[\s\S]*?<\/h1>\s*<p className="hero-desc">[\s\S]*?<\/p>/;
const dynamicHero = `<h1 className="hero-title" style={{textWrap:"balance"}} dangerouslySetInnerHTML={{ __html: content.hero?.title || '<span>Số hóa Giáo dục</span> đồng&nbsp;hành cùng Giáo&nbsp;viên & Trung&nbsp;tâm phát&nbsp;triển bền&nbsp;vững' }}></h1>
        <p className="hero-desc">
          {content.hero?.description || 'Lam Sơn Edutech (LSE) cung cấp hệ sinh thái giải pháp AI và chuyển đổi số toàn diện — từ phòng học đến phòng họp, từ giáo viên đến nhà quản lý.'}
        </p>`;
code = code.replace(heroRegex, dynamicHero);

// Replace Mission Title & Desc
const missionRegex = /<h2 className="mission-text"[^>]*>[\s\S]*?<\/h2>\s*<p className="mission-sub">[\s\S]*?<\/p>/;
const dynamicMission = `<h2 className="mission-text" style={{textWrap:"balance"}} dangerouslySetInnerHTML={{ __html: content.mission?.title || 'Biến <span>trí tuệ nhân tạo</span> thành người bạn đồng&nbsp;hành của mỗi giáo viên, mỗi học sinh và mỗi tổ chức giáo dục Việt&nbsp;Nam' }}></h2>
      <p className="mission-sub">
        {content.mission?.subtitle || 'Chúng tôi không chỉ xây dựng phần mềm — chúng tôi kiến tạo nền tảng để giáo viên dạy tốt hơn, học sinh học sâu hơn, và nhà trường vận hành thông minh hơn.'}
      </p>`;
code = code.replace(missionRegex, dynamicMission);

// Replace Products Grid
const productsRegex = /<div className="products-grid" id="products-grid">[\s\S]*?<\/section>/;
const dynamicProducts = `<div className="products-grid" id="products-grid">
      {products.map(p => (
        <div key={p.id} className={\`product-card reveal \${p.segment === 'Sản phẩm đặc biệt' ? 'featured' : ''}\`} data-cat="all">
          <div className="product-header">
            <div className="product-icon" style={{ overflow: 'hidden' }}>
              {p.image_url ? <img src={p.image_url} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📦'}
            </div>
            <div className="product-badges">
              <span className={\`status-badge \${p.status === 'live' ? 'status-live' : p.status === 'building' ? 'status-building' : 'status-soon'}\`}>
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
</section>`;
code = code.replace(productsRegex, dynamicProducts);

fs.writeFileSync('src/AppBody.jsx', code);
console.log('Dynamic replacements done.');
