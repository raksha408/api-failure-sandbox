import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    if(email) {
      setTimeout(() => setSubmitted(true), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-900">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 glass-panel p-10 rounded-3xl shadow-2xl border border-white/5 m-4 text-center">
        
        <div className="w-16 h-16 bg-dark-800 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
           <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Reset Password</h2>
        <p className="text-sm text-gray-400 mb-8">Enter your email and we'll send you reset instructions.</p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-green-400 mb-2">Check your email</h3>
            <p className="text-sm text-gray-300 mb-6">We've sent a recovery link to {email}</p>
            <Link to="/" className="text-indigo-400 font-bold hover:text-white transition-colors">← Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="email"
              required
              placeholder="Developer email..."
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="w-full py-4 text-sm font-bold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-1">Send Reset Link</button>
            <div className="pt-4"><Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">Wait, I remember my password</Link></div>
          </form>
        )}
      </div>
    </div>
  );
}
export default ForgotPassword;
