import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  const handleLogout = () => {
    // 1. Show the beautiful Toast notification
    setShowToast(true);
    
    // 2. Remove the token
    localStorage.removeItem("token");
    
    // 3. Wait 1.5 seconds so the user can see the message, then redirect
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      {/* 🌟 Custom Premium Toast Notification 🌟 */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce">
          <div className="glass-panel flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/20 border border-green-500/30 bg-dark-800/90 backdrop-blur-xl">
             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <div>
               <h4 className="text-white font-bold text-sm tracking-wide">Logged Out</h4>
               <p className="text-green-400 font-medium text-xs">See you next time!</p>
             </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              Mock<span className="text-indigo-400">API</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/dashboard" className={`transition-colors ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Dashboard</Link>
               <Link to="/create" className={`transition-colors ${location.pathname === '/create' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Create Route</Link>
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-red-400 transition-colors group cursor-pointer"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
