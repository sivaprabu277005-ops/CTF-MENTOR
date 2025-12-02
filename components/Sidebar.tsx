import React from 'react';
import { CtfCategory } from '../types';
import { CATEGORY_DESCRIPTIONS, COMMON_TOOLS } from '../constants';
import { Shield, Cpu, Code, Lock, Search, Globe, FileDigit, Terminal } from 'lucide-react';

interface SidebarProps {
  selectedCategory: CtfCategory;
  onSelectCategory: (category: CtfCategory) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<CtfCategory, React.ReactNode> = {
  [CtfCategory.GENERAL]: <Shield size={18} />,
  [CtfCategory.CRYPTO]: <Lock size={18} />,
  [CtfCategory.WEB]: <Globe size={18} />,
  [CtfCategory.REV]: <Cpu size={18} />,
  [CtfCategory.PWN]: <Terminal size={18} />,
  [CtfCategory.FORENSICS]: <FileDigit size={18} />,
  [CtfCategory.OSINT]: <Search size={18} />,
};

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 z-30 transform transition-transform duration-300 ease-in-out md:transform-none flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-green-400 font-mono tracking-tight flex items-center gap-2">
            <Terminal className="text-green-500" />
            CTF_MENTOR
          </h1>
          <p className="text-xs text-slate-500 mt-1">v1.0.0 // SYSTEM_ONLINE</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              Modules
            </h3>
            <div className="space-y-1">
              {Object.values(CtfCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {categoryIcons[cat]}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Context Info */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-sm font-medium text-slate-200 mb-2 flex items-center gap-2">
               Info: {selectedCategory}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {CATEGORY_DESCRIPTIONS[selectedCategory]}
            </p>
          </div>

          {/* Tools Suggestions */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              Recommended Tools
            </h3>
            <div className="flex flex-wrap gap-2 px-1">
              {COMMON_TOOLS[selectedCategory].map((tool) => (
                <span 
                  key={tool} 
                  className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 text-center">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Documentation
            </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;