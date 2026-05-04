import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('submitted_at', { ascending: false });
    
    if (!error) setLeads(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    fetchLeads();
  };

  const updateNote = async (id, note) => {
    await supabase.from('leads').update({ care_notes: note }).eq('id', id);
  };

  // Analytics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new' || !l.status).length;
  const segmentStats = leads.reduce((acc, l) => {
    const seg = l.segment || 'Khác';
    acc[seg] = (acc[seg] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: '#1B2F5E', marginBottom: '24px' }}>Khách hàng cần tư vấn</h2>
      
      {/* Analytics Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', border: '1px solid #E2E6F0', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#5A6A80', fontSize: '14px', marginBottom: '8px' }}>Tổng số Lead</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B2F5E' }}>{totalLeads}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E2E6F0', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#5A6A80', fontSize: '14px', marginBottom: '8px' }}>Lead Mới (Chưa XL)</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#DC2626' }}>{newLeads}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E2E6F0', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', gridColumn: 'span 2' }}>
          <div style={{ color: '#5A6A80', fontSize: '14px', marginBottom: '12px' }}>Phân bổ theo đối tượng</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {Object.entries(segmentStats).map(([seg, count]) => (
              <div key={seg} style={{ background: '#F0F2F8', padding: '6px 12px', borderRadius: '50px', fontSize: '13px', color: '#1B2F5E', fontWeight: '500' }}>
                {seg}: <span style={{ color: '#E5A211', fontWeight: 'bold' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#F0F2F8', color: '#5A6A80' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Ngày gửi</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Khách hàng</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Liên hệ</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Sản phẩm quan tâm</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Trạng thái</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #E2E6F0' }}>Ghi chú CSKH</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #E2E6F0' }}>
                <td style={{ padding: '16px 12px', color: '#5A6A80' }}>
                  {new Date(lead.submitted_at).toLocaleDateString('vi-VN')}
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ fontWeight: '600', color: '#1B2F5E' }}>{lead.full_name}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{lead.unit} - {lead.segment}</div>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <div>{lead.phone}</div>
                  <div style={{ color: '#5A6A80' }}>{lead.email}</div>
                </td>
                <td style={{ padding: '16px 12px', fontWeight: '500' }}>
                  {lead.product_interest}
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <select 
                    value={lead.status || 'new'} 
                    onChange={e => updateStatus(lead.id, e.target.value)}
                    style={{ 
                      padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E6F0',
                      background: lead.status === 'converted' ? '#dcfce7' : (lead.status === 'lost' ? '#fee2e2' : '#fff'),
                      color: lead.status === 'converted' ? '#15803d' : (lead.status === 'lost' ? '#b91c1c' : '#1B2F5E')
                    }}
                  >
                    <option value="new">Mới</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="converted">Đã chốt</option>
                    <option value="lost">Từ chối</option>
                  </select>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <textarea 
                    defaultValue={lead.care_notes || ''}
                    onBlur={e => updateNote(lead.id, e.target.value)}
                    placeholder="Nhập ghi chú..."
                    style={{ width: '100%', padding: '8px', border: '1px solid #E2E6F0', borderRadius: '6px', minHeight: '60px', fontFamily: 'inherit' }}
                  />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>Chưa có yêu cầu tư vấn nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
