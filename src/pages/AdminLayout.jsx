import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Users, Package, FileText, LogOut, ExternalLink } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menu = [
    { name: 'Khách hàng (CRM)', path: '/admin/leads', icon: <Users size={18} /> },
    { name: 'Sản phẩm', path: '/admin/products', icon: <Package size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F0F2F8', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: '260px', background: '#1B2F5E', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#E5A211', fontSize: '12px', letterSpacing: '2px', marginBottom: '4px' }}>ADMIN PANEL</div>
          LSE Dashboard
        </div>
        
        <div style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menu.map(item => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
                  borderRadius: '8px', color: isActive ? '#fff' : 'rgba(255,255,255,0.7)', 
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  textDecoration: 'none', fontWeight: isActive ? '600' : '500',
                  transition: '0.2s'
                }}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>
            <ExternalLink size={16} /> Xem trang chủ
          </a>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px', padding: 0 }}>
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', minHeight: 'calc(100vh - 64px)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
