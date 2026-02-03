
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Dashboard' },
    { id: 'chat', icon: 'fa-comment-dots', label: 'Study Chat' },
    { id: 'library', icon: 'fa-book-open', label: 'Library' },
    { id: 'reflections', icon: 'fa-pen-nib', label: 'Reflections' },
    { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-compass text-indigo-600"></i>
          Reflect
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Goddard Study System</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 transition-transform group-hover:scale-110`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Seeker</p>
            <p className="text-xs text-slate-500">Self-Observation Mode</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
