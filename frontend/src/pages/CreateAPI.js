import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateAPI() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [delay, setDelay] = useState(1000);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!name || !endpoint) {
      setFeedback({ type: "error", message: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.post("/apis", { name, endpoint, method: "GET", response: { message: `${name} response` }, statusCode, delay, isError },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback({ type: "success", message: "Mock API Created Successfully!" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setFeedback({ type: "error", message: err.response?.data?.msg || "Server error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-12 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glow behind the card */}
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="glass-panel rounded-3xl shadow-2xl border border-white/5 overflow-hidden">
          
          <div className="px-8 py-8 border-b border-white/5 bg-dark-800/50">
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              Create Mock Route
            </h2>
            <p className="mt-2 text-sm text-gray-400 ml-12">Configure your new API endpoint behaviors and synthetic delays.</p>
          </div>

          <form onSubmit={handleCreate} className="p-8 space-y-8 bg-dark-900/50">
            
            {feedback.message && (
              <div className={`p-4 rounded-xl flex items-center border ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                <p className="text-sm font-semibold">{feedback.message}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">API Document Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:bg-dark-700"
                  placeholder="e.g. Get User Profile Data"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Endpoint Path</label>
                <div className="flex bg-dark-800 border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-dark-700 transition-all">
                  <span className="inline-flex items-center px-4 bg-dark-900 border-r border-white/10 text-gray-500 sm:text-sm font-mono whitespace-nowrap">
                    /api/mock/
                  </span>
                  <input
                    type="text"
                    required
                    className="flex-1 w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
                    placeholder="users/profile"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Status Code</label>
                <input
                  type="number"
                  min="100" max="599"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-indigo-400 font-bold font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:bg-dark-700"
                  value={statusCode}
                  onChange={(e) => setStatusCode(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Delay (ms)</label>
                <input
                  type="number"
                  min="0" step="100"
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:bg-dark-700 font-mono"
                  value={delay}
                  onChange={(e) => setDelay(Number(e.target.value))}
                />
              </div>

              <div className="sm:col-span-2 pt-6 pb-2 border-t border-white/5">
                <div className="flex items-center p-4 bg-dark-800/50 rounded-xl border border-white/5 hover:bg-dark-800 transition-colors">
                  <input
                    id="isError"
                    type="checkbox"
                    className="h-5 w-5 text-indigo-500 rounded border-white/10 bg-dark-900 focus:ring-indigo-500 focus:ring-offset-dark-900 cursor-pointer"
                    checked={isError}
                    onChange={(e) => setIsError(e.target.checked)}
                  />
                  <div className="ml-4 flex flex-col cursor-pointer" onClick={() => setIsError(!isError)}>
                    <label className="font-bold text-gray-200 cursor-pointer cursor-pointer">Simulate Error Response</label>
                    <span className="text-xs text-gray-500 mt-0.5">Force failure to test frontend error states</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="py-3 px-6 rounded-xl text-sm font-bold text-gray-400 bg-dark-800 hover:bg-dark-700 border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-dark-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-8 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Save Route"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAPI;
