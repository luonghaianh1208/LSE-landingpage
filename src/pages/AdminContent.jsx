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
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '60px', fontFamily: 'inherit' }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Mô tả ngắn</label>
          <textarea 
            value={content.hero?.description || ''} 
            onChange={e => handleChange('hero', 'description', e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('hero')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Hero</button>
      </div>

      {/* Mission Section */}
      <div style={{ background: '#F0F2F8', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', color: '#1B2F5E', marginBottom: '16px' }}>Phần Sứ mệnh (Mission)</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Tiêu đề Sứ mệnh</label>
          <textarea 
            value={content.mission?.title || ''} 
            onChange={e => handleChange('mission', 'title', e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '60px', fontFamily: 'inherit' }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Mô tả Sứ mệnh</label>
          <textarea 
            value={content.mission?.subtitle || ''} 
            onChange={e => handleChange('mission', 'subtitle', e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }}
          />
        </div>
        
        <button disabled={loading} onClick={() => handleSave('mission')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>Lưu Sứ mệnh</button>
      </div>
    </div>
  );
}
