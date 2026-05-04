import React from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
    if (error) alert(error.message);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#F0F2F8' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(27,47,94,0.12)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ fontSize: '24px', color: '#1B2F5E', marginBottom: '8px' }}>Lam Sơn Edutech</h1>
        <p style={{ color: '#5A6A80', marginBottom: '32px' }}>Đăng nhập trang quản trị (Admin Dashboard)</p>
        <button 
          onClick={handleLogin}
          style={{ width: '100%', padding: '14px', background: '#E5A211', color: '#0F1D3A', border: 'none', borderRadius: '50px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          Đăng nhập bằng Google
        </button>
      </div>
    </div>
  );
}
