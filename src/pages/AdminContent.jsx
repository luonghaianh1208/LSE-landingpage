import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

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
    const { error } = await supabase
      .from('site_content')
      .upsert({ section_key: section, content: content[section] });
    
    if (error) alert("Lỗi lưu: " + error.message);
    else alert("Đã lưu thành công!");
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#1B2F5E', marginBottom: '24px' }}>Quản lý Nội dung (CMS)</h2>
      
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
        
        <button onClick={() => handleSave('hero')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Lưu Hero</button>
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
        
        <button onClick={() => handleSave('mission')} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Lưu Sứ mệnh</button>
      </div>
    </div>
  );
}
