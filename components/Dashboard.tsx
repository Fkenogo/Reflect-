
import React from 'react';
import { AppState } from '../types';

interface DashboardProps {
  state: AppState;
  onStartChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onStartChat }) => {
  // 1. Recent Reflections (Last 5 journal entries)
  const recentReflections = state.journalEntries.slice(0, 5);

  // 2. Recurring Feelings (Top 3)
  const feelingCounts: Record<string, number> = {};
  state.journalEntries.forEach(entry => {
    entry.detected_feelings.forEach(feeling => {
      feelingCounts[feeling] = (feelingCounts[feeling] || 0) + 1;
    });
  });
  const recurringFeelings = Object.entries(feelingCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // 3. Themes in Focus (Most linked themes)
  const topThemes = Object.entries(state.stats.themesEngaged)
    .sort(([, a], [, b]) => Number(b) - Number(a))
    .slice(0, 4);

  // 4. Curriculum Progress Calculation
  const currentBook = state.books[0];
  const totalChapters = currentBook?.chapters.length || 0;
  const progressPercentage = totalChapters > 0 
    ? (state.stats.chaptersExplored / totalChapters) * 100 
    : 0;

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 italic tracking-tight">The world is yourself pushed out.</h2>
        <p className="text-slate-500 max-w-2xl text-lg serif italic opacity-80">
          Welcome back to your study sanctuary. Your inner state is being observed with neutral awareness.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Study Progress</p>
            <div className="flex items-end justify-between mb-3">
              <p className="text-3xl font-bold text-slate-900">
                {state.stats.chaptersExplored}
                <span className="text-sm text-slate-400 font-medium"> / {totalChapters} Ch.</span>
              </p>
              <i className="fa-solid fa-bookmark text-indigo-500 text-xl opacity-20"></i>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(79,70,229,0.3)]" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight truncate">
              {currentBook?.book_metadata.title}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Journaled</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-slate-900">{state.journalEntries.length}</p>
              <i className="fa-solid fa-book-sparkles text-amber-500 text-2xl opacity-20"></i>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-2">Inner State Logs</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2 transition-all hover:shadow-md">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Dominant Inner States</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {recurringFeelings.length > 0 ? recurringFeelings.map(([feeling, count]) => (
              <span key={feeling} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100 shadow-sm transition-transform hover:scale-105">
                {feeling} <span className="opacity-40 ml-1">×{count}</span>
              </span>
            )) : <p className="text-slate-300 text-sm italic py-1">No feelings detected yet.</p>}
          </div>
          <p className="text-[9px] text-slate-400 font-bold mt-4 uppercase">Recurring Patterns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left text-slate-300"></i>
              Recent Reflections
            </h3>
            <div className="space-y-4">
              {recentReflections.map(entry => (
                <div key={entry.entry_id} className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • {entry.mode}
                    </span>
                    <div className="flex gap-1">
                      {entry.detected_feelings.map(f => (
                        <span key={f} className="text-[8px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 font-bold uppercase group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">{f}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-base text-slate-800 font-medium mb-3 leading-relaxed italic border-l-2 border-indigo-500/20 pl-4">"{entry.user_input}"</p>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{entry.system_response}</p>
                </div>
              ))}
              {recentReflections.length === 0 && (
                <div className="p-16 border-2 border-dashed border-slate-200 rounded-[32px] text-center text-slate-400 bg-white/50">
                  <i className="fa-solid fa-feather-pointed text-4xl mb-4 opacity-10"></i>
                  <p className="serif italic text-lg">Begin a conversation in REFLECTION or APPLICATION mode to see journal entries here.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-tags text-indigo-600"></i>
              Themes in Focus
            </h3>
            <div className="space-y-6">
              {topThemes.map(([theme, count]) => (
                <div key={theme}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="capitalize text-slate-700 font-semibold text-sm tracking-tight">{theme}</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">{count} refs</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.2)]" 
                      style={{ width: `${Math.min(100, (Number(count) / (Math.max(1, state.journalEntries.length))) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {topThemes.length === 0 && (
                <p className="text-slate-400 text-sm italic text-center py-4">Data will appear as you interact.</p>
              )}
            </div>
            <button 
              onClick={onStartChat}
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200 active:scale-95"
            >
              Continue Study <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:rotate-12 group-hover:scale-110">
               <i className="fa-solid fa-quote-right text-6xl"></i>
             </div>
             <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-4 opacity-60">Insight of the Day</h4>
             <p className="text-indigo-50 text-xl font-medium mb-8 leading-relaxed italic serif">
               "The subconscious accepts as true that which you feel as true."
             </p>
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-white/5 py-2 px-4 rounded-full border border-white/5 inline-block">
               <i className="fa-solid fa-book"></i>
               Feeling Is The Secret
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
