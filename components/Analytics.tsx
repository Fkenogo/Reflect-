
import React from 'react';
import { AppState } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from 'recharts';

interface AnalyticsProps {
  state: AppState;
}

const Analytics: React.FC<AnalyticsProps> = ({ state }) => {
  // 1. Theme Engagement
  const themeData = Object.entries(state.stats.themesEngaged).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Number(value)
  })).sort((a, b) => Number(b.value) - Number(a.value));

  // 2. Mode Distribution
  const modeCounts: Record<string, number> = {};
  state.journalEntries.forEach(entry => {
    modeCounts[entry.mode] = (modeCounts[entry.mode] || 0) + 1;
  });
  const modeData = Object.entries(modeCounts).map(([name, value]) => ({
    name: name.toUpperCase(),
    value
  }));

  // 3. Trends Over Time (Last 7 days/entries)
  const timelineData = state.journalEntries.slice().reverse().slice(-10).map(entry => ({
    date: new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    feelingsCount: entry.detected_feelings.length,
    themesCount: entry.detected_themes.length
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Insights & Analytics</h2>
        <p className="text-slate-500">Meaningful signals from your journey of self-observation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-simple text-indigo-500"></i>
            Most Engaged Themes
          </h3>
          <div className="h-[300px]">
            {themeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={themeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {themeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">
                Data will appear as you interact with the study chat.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-pie text-emerald-500"></i>
            Study Mode Distribution
          </h3>
          <div className="h-[300px] flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-full">
              {modeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {modeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">No logs found.</div>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {modeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                    <span className="text-xs font-bold text-slate-600">{entry.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-purple-500"></i>
            Observation Velocity
          </h3>
          <div className="h-[300px]">
             {timelineData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={timelineData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                   <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                   <Line type="monotone" dataKey="feelingsCount" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} />
                   <Line type="monotone" dataKey="themesCount" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
                 </LineChart>
               </ResponsiveContainer>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400 italic">Interact more to see timeline trends.</div>
             )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-brain-circuit text-[15rem] -mb-20 -mr-20"></i>
        </div>
        <div className="max-w-2xl relative z-10">
          <h3 className="text-2xl font-bold mb-4 italic">Observation Summary</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            Your journey shows a recurring engagement with <span className="text-indigo-400 font-bold">"{themeData[0]?.name || 'the Law'}"</span>. 
            Neville Goddard teaches that patterns in your feelings are not accidents, but mirror your inner world. 
            Highlighting repetition allows you to notice the states you are currently inhabiting without judgment.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Consistency</p>
              <p className="text-lg font-bold">{state.journalEntries.length > 0 ? 'High' : 'Starting'}</p>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Observation Rate</p>
              <p className="text-lg font-bold">{Math.min(10, state.journalEntries.length)}/10 Stability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
