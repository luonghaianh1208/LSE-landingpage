import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', link: '', segment: 'Tiểu học', status: 'live' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('order_index', { ascending: true });
    setProducts(data || []);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = formData.image_url;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('product-images').upload(fileName, file);
      if (!error) {
        const { data: pubData } = supabase.storage.from('product-images').getPublicUrl(fileName);
        imageUrl = pubData.publicUrl;
      } else {
        alert("Lỗi upload ảnh: " + error.message);
      }
    }

    const payload = { ...formData, image_url: imageUrl };

    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId);
    } else {
      await supabase.from('products').insert([payload]);
    }
    
    setEditingId(null);
    setFormData({ name: '', description: '', link: '', segment: 'Tiểu học', status: 'live' });
    setFile(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa sản phẩm này?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setFormData({ name: p.name, description: p.description, link: p.link || '', segment: p.segment || 'Tiểu học', status: p.status || 'live', image_url: p.image_url });
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#1B2F5E', marginBottom: '24px' }}>Quản lý Sản phẩm</h2>
      
      <form onSubmit={handleSave} style={{ background: '#F0F2F8', padding: '24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', color: '#1B2F5E', marginBottom: '8px' }}>{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <input required type="text" placeholder="Tên sản phẩm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }} />
          <input type="text" placeholder="Link tìm hiểu thêm" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }} />
        </div>
        
        <textarea required placeholder="Mô tả ngắn" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }} />
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select value={formData.segment} onChange={e => setFormData({...formData, segment: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}>
            <option>Mầm non</option><option>Tiểu học</option><option>THCS</option><option>THPT</option><option>Trung tâm</option><option>Đại học</option>
          </select>
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}>
            <option value="live">Đang hoạt động</option>
            <option value="building">Đang phát triển</option>
            <option value="soon">Sắp ra mắt</option>
          </select>
          <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" />
        </div>
        
        <div>
          <button type="submit" style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            {editingId ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {setEditingId(null); setFormData({name:'',description:'',link:'',segment:'',status:'live'})}} style={{ marginLeft: '12px', padding: '10px 24px', background: 'transparent', color: '#5A6A80', border: '1px solid #E2E6F0', borderRadius: '6px', cursor: 'pointer' }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#F0F2F8', color: '#5A6A80' }}>
            <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Ảnh</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Tên & Cấp bậc</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Mô tả</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Trạng thái</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #E2E6F0' }}>
              <td style={{ padding: '16px 12px' }}>
                {p.image_url ? <img src={p.image_url} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} /> : <div style={{width:'48px', height:'48px', background:'#E2E6F0', borderRadius:'8px'}}></div>}
              </td>
              <td style={{ padding: '16px 12px' }}>
                <div style={{ fontWeight: 'bold', color: '#1B2F5E' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{p.segment}</div>
              </td>
              <td style={{ padding: '16px 12px', maxWidth: '300px' }}>{p.description}</td>
              <td style={{ padding: '16px 12px' }}>{p.status}</td>
              <td style={{ padding: '16px 12px' }}>
                <button onClick={() => editProduct(p)} style={{ marginRight: '8px', padding: '6px 12px', background: '#E2E6F0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(p.id)} style={{ padding: '6px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
