import { useEffect, useState } from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';
import App from '../App.jsx';
import AuthPage from '../auth/AuthPage.jsx';
import AdminDashboard from '../admin/AdminDashboard.jsx';

function getUser() { try { return JSON.parse(localStorage.getItem('campusUser') || 'null'); } catch { return null; } }
function go(path) { if (window.location.pathname !== path) { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); } }

export default function AppRouter() {
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState(getUser);

  useEffect(() => { 
    const onPop = () => setPath(window.location.pathname); 
    window.addEventListener('popstate', onPop); 
    return () => window.removeEventListener('popstate', onPop); 
  }, []);

  const authenticated = Boolean(localStorage.getItem('campusToken') && user);

  useEffect(() => {
    if (!authenticated && path !== '/signup' && path !== '/login' && path !== '/') {
      go('/login');
    }
    if (authenticated && user?.role === 'admin' && path !== '/admin/dashboard' && path !== '/student/dashboard') {
      go('/admin/dashboard');
    }
    if (authenticated && user?.role !== 'admin' && path !== '/student/dashboard') {
      go('/student/dashboard');
    }
  }, [authenticated, path, user]);

  const authenticate = (nextUser) => { 
    setUser(nextUser); 
    go(nextUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'); 
  };

  const logout = () => { 
    localStorage.removeItem('campusToken'); 
    localStorage.removeItem('campusUser'); 
    setUser(null); 
    go('/login'); 
  };

  if (!authenticated) {
    return <AuthPage key={path} initialMode={path === '/signup' ? 'signup' : 'login'} onAuthenticated={authenticate}/>;
  }

  // Admin user in Admin Dashboard
  if (user.role === 'admin' && path !== '/student/dashboard') {
    return (
      <AdminDashboard 
        user={user} 
        onLogout={logout} 
        onSwitchToStudentView={() => go('/student/dashboard')} 
      />
    );
  }

  // Student view (also viewable by admin if they switched to student view)
  return (
    <div>
      {user.role === 'admin' && (
        <div style={{position:'fixed',zIndex:1000,top:12,left:16,display:'flex',alignItems:'center',gap:8,background:'#0f2e22',border:'1px solid #10b981',color:'#a7f3d0',padding:'8px 14px',borderRadius:12,fontSize:12,boxShadow:'0 4px 18px #0004'}}>
          <button 
            onClick={() => go('/admin/dashboard')} 
            style={{display:'flex',alignItems:'center',gap:6,background:'#10b981',color:'#022c22',border:0,borderRadius:8,padding:'5px 10px',cursor:'pointer',fontWeight:700}}
          >
            <ArrowLeft size={14}/> Back to Admin Console
          </button>
          <span>Previewing Student Experience</span>
        </div>
      )}
      <App user={user} onLogout={logout}/>
    </div>
  );
}
