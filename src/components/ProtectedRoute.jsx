import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkRole = async (session) => {
      if (!session) {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (mounted) {
        setIsAdmin(data?.role === 'admin');
        setLoading(false);
      }
    };

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session);
    });

    // Listen for auth changes (like returning from Google OAuth)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkRole(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang xác thực quyền Admin...</div>;
  
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
}
