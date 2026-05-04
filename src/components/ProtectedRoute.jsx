import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    let mounted = true;

    const checkRole = async (session) => {
      if (!session) {
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      if (mounted) setIsAuthenticated(true);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (mounted) {
          if (error) {
            setDebugInfo(`Lỗi truy vấn: ${error.message} (UID: ${session.user.id})`);
          } else if (!data) {
            setDebugInfo(`Không tìm thấy profile cho UID: ${session.user.id}`);
          } else {
            setDebugInfo(`Profile Role: "${data.role}" (UID: ${session.user.id})`);
            setIsAdmin(data.role === 'admin');
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setDebugInfo(`Exception: ${err.message}`);
          setLoading(false);
        }
      }
    };

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkRole(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang xác thực quyền Admin...</div>;
  
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  if (!isAdmin) return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1B2F5E' }}>Truy cập bị từ chối</h2>
      <p>Tài khoản của bạn chưa được cấp quyền Admin.</p>
      <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginTop: '10px', fontSize: '14px', wordBreak: 'break-all' }}>
        <strong>Thông tin gỡ lỗi:</strong> {debugInfo}
      </div>
      <button 
        onClick={() => supabase.auth.signOut()}
        style={{ padding: '10px 20px', background: '#E5A211', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
      >
        Đăng xuất
      </button>
    </div>
  );

  return <Outlet />;
}
