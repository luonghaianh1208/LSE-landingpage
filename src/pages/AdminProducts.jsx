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

  const seedProducts = async () => {
    if (window.confirm('Hành động này sẽ khôi phục 10 sản phẩm mặc định ban đầu. Bạn có chắc chắn?')) {
      setLoading(true);
      const defaultProducts = [
        { order_index: 1, name: 'Trợ Lý Giáo Viên Toàn Năng', description: 'Trợ lý AI giúp giáo viên soạn giáo án, tạo bài tập, chấm điểm tự động...', segment: 'Giáo viên', status: 'live' },
        { order_index: 2, name: 'Hệ thống mini LMS AI', description: 'Cá nhân hóa lộ trình học tập, cung cấp hệ thống học tập linh hoạt với AI cho học sinh.', segment: 'Giáo viên', status: 'live' },
        { order_index: 3, name: 'Phần mềm quản lí nền nếp học đường', description: 'Giải pháp báo cáo tự động giúp Ban giám hiệu và giáo viên quản lý nền nếp học sinh.', segment: 'Nhà trường', status: 'live' },
        { order_index: 4, name: 'IELTS Master AI', description: 'Tự động hóa khâu chấm bài IELTS, tăng năng suất giáo viên trung tâm.', segment: 'Trung tâm', status: 'live' },
        { order_index: 5, name: 'Tư Vấn Hướng Nghiệp AI', description: 'Phân tích điểm mạnh điểm yếu học sinh, đưa ra lộ trình nghề nghiệp chuẩn xác.', segment: 'Nhà trường', status: 'live' },
        { order_index: 6, name: 'Nền Tảng Quản Lý Khảo Thí', description: 'Ngân hàng câu hỏi thông minh & tổ chức thi trực tuyến chống gian lận.', segment: 'Trung tâm', status: 'live' },
        { order_index: 7, name: 'Robot Học Tập AI', description: 'Robot thông minh giao tiếp tiếng Anh, hỗ trợ tự học cho học sinh.', segment: 'Sản phẩm đặc biệt', status: 'live' },
        { order_index: 8, name: 'Quản Lý Công Việc Nội Bộ', description: 'Chuyển đổi số quy trình quản trị, đào tạo nhân sự cho doanh nghiệp SMEs.', segment: 'Doanh nghiệp', status: 'live' },
        { order_index: 9, name: 'Agent Kit / Subagent Workflow', description: 'Bộ công cụ cho lập trình viên để xây dựng các agent AI linh hoạt.', segment: 'Developer', status: 'live' },
        { order_index: 10, name: 'Tư vấn tổng thể chuyển đổi số', description: 'Dịch vụ tư vấn chuyên sâu lộ trình ứng dụng công nghệ cho tổ chức giáo dục.', segment: 'Khác', status: 'live' }
      ];
      
      const { error } = await supabase.from('products').insert(defaultProducts);
      if (error) {
        alert("Lỗi khôi phục: " + error.message);
      } else {
        alert("Khôi phục thành công 10 sản phẩm!");
        fetchProducts();
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: '#1B2F5E' }}>Quản lý Sản phẩm</h2>
        {products.length === 0 && !loading && (
          <button onClick={seedProducts} style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Khôi phục 10 sản phẩm gốc
          </button>
        )}
      </div>
      
      <form onSubmit={handleSave} style={{ background: '#F0F2F8', padding: '24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', color: '#1B2F5E', marginBottom: '8px' }}>{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <input required type="text" placeholder="Tên sản phẩm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }} />
          <input type="text" placeholder="Link tìm hiểu thêm" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }} />
        </div>
        
        <textarea required placeholder="Mô tả ngắn" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0', minHeight: '80px', fontFamily: 'inherit' }} />
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select value={formData.segment} onChange={e => setFormData({...formData, segment: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}>
            <option>Mầm non</option><option>Tiểu học</option><option>THCS</option><option>THPT</option>
            <option>Giáo viên</option><option>Nhà trường</option><option>Trung tâm</option><option>Đại học</option>
            <option>Doanh nghiệp</option><option>Developer</option><option>Sản phẩm đặc biệt</option><option>Khác</option>
          </select>
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #E2E6F0' }}>
            <option value="live">Đang hoạt động</option>
            <option value="building">Đang phát triển</option>
            <option value="soon">Sắp ra mắt</option>
          </select>
          <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" />
        </div>
        
        <div>
          <button type="submit" disabled={loading} style={{ padding: '10px 24px', background: '#1B2F5E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
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
                {p.image_url ? <img src={p.image_url} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} /> : <div style={{width:'48px', height:'48px', background:'#E2E6F0', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>📦</div>}
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
