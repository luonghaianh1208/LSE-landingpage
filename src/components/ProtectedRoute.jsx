import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      return;
    }

    // Check role in profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (data && data.role === 'admin') {
      setIsAdmin(true);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>;
  
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
}
