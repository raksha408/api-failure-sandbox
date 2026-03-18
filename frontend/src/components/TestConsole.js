import React from "react";

function TestConsole({ result }) {
  if (!result) return null;

  const isSuccess = result.status >= 200 && result.status < 300;

  return (
    <div className="glass-panel shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden border border-white/5 relative z-10 p-6 sm:p-8 mt-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Live API Call Result
        </h3>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Status Code</span>
             <span className={`px-3 py-1 text-sm font-bold rounded-lg border ${isSuccess ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
               {result.status}
             </span>
          </div>
          
          <div className="flex flex-col items-end">
             <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Response Time</span>
             <span className="text-sm font-mono text-indigo-300">
               {result.time}ms
             </span>
          </div>
        </div>
      </div>

      <div className="bg-dark-900 rounded-xl border border-white/5 p-4 overflow-x-auto relative">
        <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 select-none pointer-events-none">JSON Response payload</div>
        <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-words mt-4">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default TestConsole;
