
import React, { useState, useMemo } from 'react';
import { AppState, JournalEntry, StudyMode } from '../types';

interface ReflectionsProps {
  state: AppState;
}

const Reflections: React.FC<ReflectionsProps> = ({ state }) => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [filterMode, setFilterMode] = useState<StudyMode | 'all'>('all');
  const [themeSearch, setThemeSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const filteredEntries = useMemo(() => {
    let entries = [...state.journalEntries];

    // Filter by mode
    if (filterMode !== 'all') {
      entries = entries.filter(e => e.mode === filterMode);
    }

    // Filter by theme/feeling search
    if (themeSearch.trim()) {
      const search = themeSearch.toLowerCase();
      entries = entries.filter(e => 
        e.detected_themes.some(t => t.toLowerCase().includes(search)) ||
        e.detected_feelings.some(f => f.toLowerCase().includes(search)) ||
        e.user_input.toLowerCase().includes(search)
      );
    }

    // Filter by date
    if (startDate) {
      entries = entries.filter(e => new Date(e.timestamp) >= new Date(startDate));
    }
    if (endDate) {
      entries = entries.filter(e => new Date(e.timestamp) <= new Date(endDate));
    }

    // Sort
    entries.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return entries;
  }, [state.journalEntries, filterMode, themeSearch, startDate, endDate, sortOrder]);

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Journaling History</h2>
          <p className="text-slate-500 italic">"The state of consciousness is the only reality."</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select 
            className="text-xs font-bold border rounded-lg px-3 py-2 bg-white"
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
          >
            <option value="all">All Modes</option>
            {Object.values(StudyMode).map(mode => (
              <option key={mode} value={mode}>{mode.toUpperCase()}</option>
            ))}
          </select>
          <select
            className="text-xs font-bold border rounded-lg px-3 py-2 bg-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="mb-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search feelings, themes, or content..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={themeSearch}
            onChange={(e) => setThemeSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Range:</span>
          <input 
            type="date" 
            className="text-[10px] border rounded-lg px-2 py-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-slate-300">to</span>
          <input 
            type="date" 
            className="text-[10px] border rounded-lg px-2 py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {(filterMode !== 'all' || themeSearch || startDate || endDate) && (
          <button 
            onClick={() => {
              setFilterMode('all');
              setThemeSearch('');
              setStartDate('');
              setEndDate('');
            }}
            className="text-xs text-indigo-600 font-bold hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logs Found: {filteredEntries.length}</h3>
          </div>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredEntries.map(entry => (
              <button
                key={entry.entry_id}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full p-5 rounded-2xl text-left border transition-all ${
                  selectedEntry?.entry_id === entry.entry_id
                    ? 'bg-white border-indigo-200 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(entry.timestamp).toLocaleDateString()}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    entry.mode === 'reflection' ? 'bg-amber-100 text-amber-700' : 
                    entry.mode === 'application' ? 'bg-emerald-100 text-emerald-700' :
                    entry.mode === 'study' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
                  }`}>{entry.mode}</span>
                </div>
                <p className="text-sm font-bold text-slate-800 line-clamp-1 italic">"{entry.user_input}"</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {entry.detected_feelings.slice(0, 2).map(f => (
                    <span key={f} className="text-[8px] text-slate-400 border border-slate-200 px-1 rounded uppercase">{f}</span>
                  ))}
                </div>
              </button>
            ))}
            {filteredEntries.length === 0 && (
              <div className="p-8 text-center text-slate-400 italic bg-slate-50 rounded-2xl">
                No logs matching your filters.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedEntry ? (
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                <div>
                  <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Journal Entry</h3>
                  <p className="text-sm text-slate-400 font-medium">{new Date(selectedEntry.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Linked Concept</p>
                  <p className="text-sm font-bold text-slate-800">{selectedEntry.linked_principles[0] || 'General Awareness'}</p>
                </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">The Input</h4>
                  <div className="p-6 bg-slate-50 rounded-2xl italic text-lg text-slate-700 leading-relaxed border-l-4 border-indigo-400">
                    "{selectedEntry.user_input}"
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Reject's Observation</h4>
                  <p className="text-slate-800 leading-relaxed text-lg serif">
                    {selectedEntry.system_response}
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-50">
                  <section>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Feelings</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.detected_feelings.map(f => (
                        <span key={f} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">{f}</span>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Linked Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.detected_themes.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-200">{t}</span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-[40px]">
              <div>
                <i className="fa-solid fa-feather text-5xl mb-6 opacity-20"></i>
                <p className="text-xl font-medium serif italic">Select a journal entry to review its contents.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reflections;
