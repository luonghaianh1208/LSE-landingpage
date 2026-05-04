import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('site_content').select('*');
    if (data) {
      const parsed = {};
      data.forEach(item => { parsed[item.section_key] = item.content; });
      setContent(parsed);
    }
    setLoading(false);
  };

  const handleChange = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async (section) => {
    setLoading(true);
    let payload = { ...content[section] };

    // Xử lý upload logo nếu đang lưu section global và có file mới
    if (section === 'global' && logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `logo-${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('product-images').upload(fileName, logoFile);
      if (!error) {
        const { data: pubData } = supabase.storage.from('product-images').getPublicUrl(fileName);
        payload.logo_url = pubData.publicUrl;
        handleChange('global', 'logo_url', pubData.publicUrl);
        setLogoFile(null); // reset file input sau khi up xong
      } else {
        alert("Lỗi upload logo: " + error.message);
      }
    }

    const { error } = await supabase
      .from('site_content')
      .upsert({ section_key: section, content: payload });
    
    setLoading(false);
    if (error) alert("Lỗi lưu: " + error.message);
    else alert("Đã lưu thành công!");
  };

  if (loading && Object.keys(content).length === 0) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#1B2F5E', marginBottom: '24px' }}>Quản lý Nội dung (CMS)</h2>
      
      {/* Global Settings Section */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #E2E6F0' }}>
        <h3 style={{ fontSize: '18px', color: '#1B2F5E', marginBottom: '16px' }}>Cài đặt chung (Global Settings)</h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Logo Website</label>
            {content.global?.logo_url && (
              <img src={content.global.logo_url} alt="Logo" style={{ height: '40px', marginBottom: '8px', display: 'block', background: '#F0F2F8', padding: '4px', borderRadius: '4px' }} />
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setLogoFile(e.target.files[0])}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #E2E6F0' }}
            />
            <small style={{ color: '#5A6A80' }}>*Chọn file ảnh để thay logo hiện tại (Lưu vào Supabase Storage)</small>
          </div>

          <div style={{ flex: '1 1 300px', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Hotline</label>
            <input 
              type="text"
              value={content.global?.hotline || ''} 
              onChange={e => handleChange('global', 'hotline', e.target.value)}
              placeholder="VD: 0936.171.111"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}
            />
          </div>

          <div style={{ flex: '1 1 300px', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Email liên hệ</label>
            <input 
              type="text"
              value={content.global?.email || ''} 
              onChange={e => handleChange('global', 'email', e.target.value)}
              placeholder="VD: edutech.lamson@gmail.com"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}
            />
          </div>

          <div style={{ flex: '1 1 100%', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Địa chỉ Hà Nội</label>
            <input 
              type="text"
              value={content.global?.address_hn || ''} 
              onChange={e => handleChange('global', 'address_hn', e.target.value)}
              placeholder="VD: Ô 15–Đ13, KĐT Geleximco, Hoài Đức, Hà Nội"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}
            />
          </div>

          <div style={{ flex: '1 1 100%', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Địa chỉ Hải Phòng</label>
            <input 
              type="text"
              value={content.global?.address_hp || ''} 
              onChange={e => handleChange('global', 'address_hp', e.target.value)}
              placeholder="VD: 870–872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}
            />
          </div>
        </div>
        
        <button disabled={loading} onClick={() => handleSave('global')} style={{ padding: '10px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '16px' }}>
          {loading ? 'Đang lưu...' : 'Lưu Cài đặt chung'}
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ background: '#F0F2F8', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', color: '#1B2F5E', marginBottom: '16px' }}>Phần Hero (Đầu trang)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Tiêu đề chính</label>
          <textarea 
            value={content.hero?.title || ''} 
            onChange={e => handleChange('hero', 'title', e.target.value)}
            placeholder="VD: SỐ HÓA GIÁO DỤC – VẬN HÀNH TRUNG TÂM NHƯ MỘT DOANH NGHIỆP CÔNG NGHỆ"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '60px', fontFamily: 'inherit' }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Mô tả ngắn</label>
          <textarea 
            value={content.hero?.description || ''} 
            onChange={e => handleChange('hero', 'description', e.target.value)}
            placeholder="VD: Giảm 70% vận hành – tăng 3 lần hiệu suất – kiểm soát toàn bộ hệ thống"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('hero')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Hero</button>
      </div>

      {/* Pain Points Section */}
      <div style={{ background: '#FFF3CD', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #FFEEBA' }}>
        <h3 style={{ fontSize: '18px', color: '#856404', marginBottom: '16px' }}>Phần Nỗi đau (Pain Points)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#856404' }}>Tiêu đề</label>
          <input 
            value={content.pain_points?.title || ''} 
            onChange={e => handleChange('pain_points', 'title', e.target.value)}
            placeholder="VD: Bạn có đang gặp tình trạng:"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFEEBA' }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#856404' }}>Các nỗi đau (Mỗi dòng 1 ý)</label>
          <textarea 
            value={content.pain_points?.items || ''} 
            onChange={e => handleChange('pain_points', 'items', e.target.value)}
            placeholder="Quản lý rối&#10;Sai sót dữ liệu&#10;Tốn người&#10;Không scale được"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFEEBA', minHeight: '100px', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#856404' }}>Câu chốt chi phí</label>
          <input 
            value={content.pain_points?.cost_note || ''} 
            onChange={e => handleChange('pain_points', 'cost_note', e.target.value)}
            placeholder="VD: Chi phí thực sự bạn đang mất mỗi tháng là bao nhiêu?"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFEEBA' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('pain_points')} style={{ padding: '10px 24px', background: '#856404', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Nỗi đau</button>
      </div>

      {/* AI Section */}
      <div style={{ background: '#E0F2FE', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #BAE6FD' }}>
        <h3 style={{ fontSize: '18px', color: '#0369A1', marginBottom: '16px' }}>Phần AI (Nhân sự số)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#0369A1' }}>Tiêu đề AI</label>
          <input 
            value={content.ai_section?.title || ''} 
            onChange={e => handleChange('ai_section', 'title', e.target.value)}
            placeholder="VD: AI KHÔNG CHỈ HỖ TRỢ – AI TRỞ THÀNH NHÂN SỰ SỐ"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BAE6FD' }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#0369A1' }}>Tính năng AI (Mỗi dòng 1 ý)</label>
          <textarea 
            value={content.ai_section?.features || ''} 
            onChange={e => handleChange('ai_section', 'features', e.target.value)}
            placeholder="Tạo đề tự động&#10;Soạn bài nhanh&#10;Phân tích học sinh"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BAE6FD', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#0369A1' }}>Câu chốt AI</label>
          <input 
            value={content.ai_section?.closing || ''} 
            onChange={e => handleChange('ai_section', 'closing', e.target.value)}
            placeholder="VD: AI giúp giảm tải cho giáo viên và tăng hiệu quả gấp nhiều lần"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BAE6FD' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('ai_section')} style={{ padding: '10px 24px', background: '#0369A1', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Section AI</button>
      </div>

      {/* Mission Section (Về Chúng Tôi) */}
      <div style={{ background: '#F0F2F8', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', color: '#1B2F5E', marginBottom: '16px' }}>Phần Về Chúng Tôi (Mission)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Tiêu đề</label>
          <textarea 
            value={content.mission?.title || ''} 
            onChange={e => handleChange('mission', 'title', e.target.value)}
            placeholder="VD: LAM SƠN EDUTECH – ĐƠN VỊ PHÁT TRIỂN HỆ ĐIỀU HÀNH GIÁO DỤC"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '60px', fontFamily: 'inherit' }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Mô tả Sứ mệnh / Hệ sinh thái</label>
          <textarea 
            value={content.mission?.subtitle || ''} 
            onChange={e => handleChange('mission', 'subtitle', e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('mission')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Về Chúng Tôi</button>
      </div>

      {/* ROI Section */}
      <div style={{ background: '#DCFCE7', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #BBF7D0' }}>
        <h3 style={{ fontSize: '18px', color: '#166534', marginBottom: '16px' }}>Phần ROI (Tỷ suất đầu tư)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#166534' }}>Tình huống mẫu</label>
          <input 
            value={content.roi_section?.title || ''} 
            onChange={e => handleChange('roi_section', 'title', e.target.value)}
            placeholder="VD: Trung tâm 500 học viên:"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BBF7D0' }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#166534' }}>Kết quả (Mỗi dòng 1 ý)</label>
          <textarea 
            value={content.roi_section?.stats || ''} 
            onChange={e => handleChange('roi_section', 'stats', e.target.value)}
            placeholder="Giảm 4 nhân sự&#10;Tiết kiệm 40 triệu/tháng"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BBF7D0', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#166534' }}>Thời gian hoàn vốn</label>
          <input 
            value={content.roi_section?.payback || ''} 
            onChange={e => handleChange('roi_section', 'payback', e.target.value)}
            placeholder="VD: Hoàn vốn 1–3 tháng"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #BBF7D0' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('roi_section')} style={{ padding: '10px 24px', background: '#166534', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu ROI</button>
      </div>

      {/* Case Study Section */}
      <div style={{ background: '#F3E8FF', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #E9D5FF' }}>
        <h3 style={{ fontSize: '18px', color: '#6B21A8', marginBottom: '16px' }}>Phần Case Study (Trước - Sau)</h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#6B21A8' }}>TRƯỚC (Before)</label>
            <textarea 
              value={content.case_study?.before || ''} 
              onChange={e => handleChange('case_study', 'before', e.target.value)}
              placeholder="VD: Nhập điểm thủ công mất 3 ngày, sai sót 15%"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E9D5FF', minHeight: '80px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ flex: '1 1 300px', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#6B21A8' }}>SAU (After)</label>
            <textarea 
              value={content.case_study?.after || ''} 
              onChange={e => handleChange('case_study', 'after', e.target.value)}
              placeholder="VD: AI chấm điểm tự động trong 30s, độ chuẩn xác 100%"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E9D5FF', minHeight: '80px', fontFamily: 'inherit' }}
            />
          </div>
        </div>
        
        <button disabled={loading} onClick={() => handleSave('case_study')} style={{ padding: '10px 24px', background: '#6B21A8', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Case Study</button>
      </div>

      {/* Final CTA Section */}
      <div style={{ background: '#FEE2E2', padding: '24px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #FECACA' }}>
        <h3 style={{ fontSize: '18px', color: '#991B1B', marginBottom: '16px' }}>Đòn chốt cuối (Form Đăng ký)</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#991B1B' }}>Câu giục giã (Mỗi dòng 1 ý)</label>
          <textarea 
            value={content.final_cta?.text || ''} 
            onChange={e => handleChange('final_cta', 'text', e.target.value)}
            placeholder="Không cần quyết định hôm nay.&#10;Chỉ cần thử 7 ngày.&#10;Kết quả sẽ tự trả lời."
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FECACA', minHeight: '100px', fontFamily: 'inherit' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('final_cta')} style={{ padding: '10px 24px', background: '#991B1B', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Đòn chốt</button>
      </div>
    </div>
  );
}
