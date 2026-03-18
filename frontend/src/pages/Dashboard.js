import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TestConsole from "../components/TestConsole"; // ✅ Added TestConsole component import

function Dashboard() {
  const navigate = useNavigate();

  const [apis, setApis] = useState([]);
  const [result, setResult] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchApis();
    setResult(null);
  }, []);

  const fetchApis = async () => {
    try {
      setIsLoadingDashboard(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/apis", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApis(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load APIs");
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const deleteApi = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this endpoint forever?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      await API.delete(`/apis/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setResult(null);
      fetchApis();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  const testApi = async (apiId) => {
    try {
      setLoadingTest(true);
      const start = Date.now();
      
      const res = await fetch(`http://localhost:5000/api/apis/mock/${apiId}`);

      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = "Raw text or Invalid JSON";
      }

      const end = Date.now();
      setResult({ status: res.status, data, time: end - start });

    } catch (err) {
      console.error(err);
      setResult({ status: "Error", data: err.message, time: 0 });
    } finally {
      setLoadingTest(false);
    }
  };

  const copyUrl = (id) => {
    const url = `http://localhost:5000/api/apis/mock/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); 
  };

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) return "bg-green-500/10 text-green-400 border-green-500/20";
    if (code >= 400 && code < 500) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    if (code >= 500) return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col font-sans text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        
        {/* Neon Ambient Light */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="md:flex md:items-center md:justify-between mb-8 relative z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight">Mock APIs Dashboard</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Manage your active mocked routes, view logs, and configure frontend synthetic integrations.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={() => navigate("/create")}
              className="ml-3 inline-flex items-center px-5 py-2.5 border border-transparent rounded-xl shadow-lg shadow-indigo-500/25 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Endpoint
            </button>
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="glass-panel shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden border border-white/5 relative z-10">
          <div className="min-w-full divide-y divide-white/5">
            
            <div className="bg-dark-800/50 text-xs font-bold tracking-wider text-left text-gray-400 uppercase px-6 py-5 grid grid-cols-12 gap-4 border-b border-white/5">
              <div className="col-span-3">API Title</div>
              <div className="col-span-3">Endpoint URL</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-right">Delay</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-white/5 bg-dark-900/50">
              {isLoadingDashboard ? (
                <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center">
                   <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                   Loading endpoints...
                </div>
              ) : apis.length === 0 ? (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-dark-800 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <svg className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">No endpoints found</h3>
                  <p className="mt-2 text-sm text-gray-400 mb-8 max-w-sm mx-auto">Get started by creating a new mock API route to supercharge your frontend development.</p>
                  <button
                    onClick={() => navigate("/create")}
                    className="inline-flex items-center px-6 py-3 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 text-sm font-bold rounded-xl text-white bg-indigo-500/10 hover:bg-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:border-indigo-500/50"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Your First Route
                  </button>
                </div>
              ) : (
                apis.map((api) => (
                  <div key={api._id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-dark-800/80 transition-colors duration-200 group">
                    
                    <div className="col-span-3">
                      <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                        {api.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 font-mono">
                        ID: {api._id.slice(-6)}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          GET
                        </span>
                        <span className="text-sm text-gray-300 font-mono truncate max-w-[150px]">
                          /{api.endpoint}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(api.statusCode)}`}>
                        <div className={`mr-1.5 w-1.5 h-1.5 rounded-full ${api.statusCode >= 500 ? 'bg-red-400' : api.statusCode >= 400 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                        {api.statusCode}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <span className="text-sm text-gray-400 font-mono flex items-center bg-dark-800 px-2 py-1 rounded-md border border-white/5">
                         <svg className="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {api.delay}ms
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Copy Public URL"
                        onClick={() => copyUrl(api._id)}
                        className={`p-2 rounded-xl border focus:outline-none transition-all ${copiedId === api._id ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-dark-800 border-white/10 text-gray-400 hover:bg-dark-700 hover:text-white'}`}
                      >
                       {copiedId === api._id ? (
                           <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                       ) : (
                           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                       )}
                      </button>

                      <button
                        title="Test Endpoint"
                        onClick={() => testApi(api._id)}
                        className="p-2 bg-dark-800 border-white/10 border rounded-xl text-gray-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all focus:outline-none"
                      >
                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </button>

                      <button
                        title="Delete Endpoint"
                        onClick={() => deleteApi(api._id)}
                        className="p-2 bg-dark-800 border-white/10 border rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all focus:outline-none"
                      >
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ✅ LIVE TEST CONSOLE INTEGRATION ✅ */}
        <div className="relative z-10 pb-12 mt-8">
          {loadingTest ? (
            <div className="glass-panel shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden border border-white/5 p-12 flex flex-col justify-center items-center">
              <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-300 font-bold tracking-wide">Executing remote mock test...</span>
            </div>
          ) : result ? (
            <TestConsole result={result} />
          ) : null}
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
