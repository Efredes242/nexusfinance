import React from 'react';
import { APP_TITLE_PREFIX, APP_TITLE_SUFFIX, APP_SUBTITLE } from '../config/constants';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: 'dashboard' | 'presupuesto' | 'tarjetas' | 'metas' | 'config' | 'admin' | 'annual';
  setActiveTab: (tab: 'dashboard' | 'presupuesto' | 'tarjetas' | 'metas' | 'config' | 'admin' | 'annual') => void;
  user: any;
  netFlow: number;
  formatMoney: (amount: number) => string;
  onExport: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  user,
  netFlow,
  formatMoney,
  onExport,
  onLogout
}) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 glass 
      lg:static lg:m-4 lg:mr-0 lg:rounded-[2.5rem] lg:h-[calc(100vh-2rem)]
      flex flex-col p-r-r lg:border border-white/5 shadow-2xl 
      transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Mobile Close Button */}
      <button 
        onClick={() => setSidebarOpen(false)}
        className="absolute top-4 right-4 lg:hidden text-slate-400 hover:text-white"
      >
        <i className="fas fa-times text-xl"></i>
      </button>

      <div className="flex flex-row items-center justify-center gap-3 mb-12 group mt-6 lg:mt-4 w-full">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500 shine-hover cursor-pointer shrink-0"
        >
          <i className="fas fa-gem text-white text-lg"></i>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-outfit font-black tracking-wide leading-none text-white">{APP_TITLE_PREFIX}<span className="text-blue-500">{APP_TITLE_SUFFIX}</span></h1>
          {APP_SUBTITLE && <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5 block">{APP_SUBTITLE}</span>}
        </div>
      </div>

      <nav className="space-y-3 flex-1 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
        {[
          { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
          { id: 'presupuesto', icon: 'fa-receipt', label: 'Movimientos' },
          { id: 'tarjetas', icon: 'fa-credit-card', label: 'Cuotas / Tarjetas' },
          { id: 'metas', icon: 'fa-bullseye', label: 'Metas de Ahorro' },
          { id: 'config', icon: 'fa-cog', label: 'Configuración' },
          ...(user.role === 'admin' ? [{ id: 'admin', icon: 'fa-users-cog', label: 'Admin Panel' }] : [])
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {
              setActiveTab(item.id as any);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
              activeTab === item.id 
              ? 'bg-gradient-to-r from-blue-600/20 to-transparent text-white shadow-lg shadow-blue-500/10 translate-x-1 border-l-4 border-blue-500' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute inset-0 bg-blue-500/5 blur-xl"></div>
            )}
            <i className={`fas ${item.icon} text-lg w-6 relative z-10 ${activeTab === item.id ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}`}></i>
            <span className="font-bold text-sm relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <button 
          onClick={onExport}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 group"
      >
          <i className="fas fa-file-excel text-lg w-6 group-hover:scale-110 transition-transform"></i>
          <span className="font-bold text-sm">Exportar Excel</span>
      </button>

      <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 group mb-4"
      >
          <i className="fas fa-sign-out-alt text-lg w-6 group-hover:scale-110 transition-transform"></i>
          <span className="font-bold text-sm">Cerrar Sesión</span>
      </button>

      <div className="mt-auto space-y-4">
        <div className="glass p-6 rounded-3xl border border-blue-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1 relative z-10">Balance Mensual</span>
          <p className={`text-2xl font-black relative z-10 ${netFlow >= 0 ? 'text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]'}`}>
            {formatMoney(netFlow)}
          </p>
        </div>
      </div>
    </aside>
  );
};
