import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
      } else {
        setLoginError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  // Check if already authenticated on component mount
  React.useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        error={loginError} 
        loading={loading} 
      />
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPanel;