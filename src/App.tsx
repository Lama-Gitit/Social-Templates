import { useState } from 'react';
import { Layout } from './components/Layout';
import { TemplateCard } from './components/TemplateCard';
import { AIAssistant } from './components/AIAssistant';
import { RandomGeneratorModal } from './components/RandomGeneratorModal';
import { PLATFORMS } from './data/platforms';
import { Search, Sparkles, ArrowLeft, Check, ChevronRight } from 'lucide-react';

function App() {
  const [activePlatformId, setActivePlatformId] = useState<string | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRandomGeneratorOpen, setIsRandomGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activePlatform = PLATFORMS.find(p => p.id === activePlatformId);

  // Filter platforms for dashboard view
  const filteredPlatforms = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout
      activePlatformId={activePlatformId}
      onSelectPlatform={setActivePlatformId}
      onOpenRandomGenerator={() => setIsRandomGeneratorOpen(true)}
    >
      <div className="flex flex-col gap-8">
        {activePlatform ? (
          // --- Platform View ---
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <button
                  onClick={() => setActivePlatformId(null)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 mb-4 transition-colors group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </button>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <activePlatform.icon size={32} style={{ color: activePlatform.color }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{activePlatform.name}</h2>
                    <p className="text-slate-400 text-sm mt-1">Optimization Guide 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${activePlatform.color}, ${activePlatform.color}dd)`,
                    boxShadow: `0 8px 20px -6px ${activePlatform.color}60`
                  }}
                >
                  <Sparkles size={18} fill="currentColor" />
                  AI Assistant
                </button>
              </div>
            </header>

            {/* Context & Tips */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="md:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold mb-3 text-slate-200">Platform Strategy</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{activePlatform.intro}</p>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
                <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Pro Tips
                </h4>
                <ul className="space-y-3">
                  {activePlatform.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-slate-400 flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activePlatform.templates.map((template, idx) => (
                <TemplateCard
                  key={idx}
                  template={template}
                  platformColor={activePlatform.color}
                />
              ))}
            </div>
          </div>
        ) : (
          // --- Dashboard View ---
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Select a platform to view 2025 optimized templates and sizes</p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Find a platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActivePlatformId(platform.id)}
                  className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-slate-700 hover:shadow-xl hover:shadow-purple-500/5 transition-all text-left flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3.5 rounded-xl bg-slate-950 group-hover:scale-110 transition-transform duration-300 border border-slate-800 group-hover:border-slate-700">
                      <platform.icon size={28} style={{ color: platform.color }} />
                    </div>
                    <div className="p-2 text-slate-600 group-hover:text-purple-400 transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow">{platform.intro}</p>

                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-500 border border-slate-800">
                      {platform.templates.length} Templates
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filteredPlatforms.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500">No platforms found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        platformName={activePlatform?.name || ''}
        platformColor={activePlatform?.color || '#a855f7'}
      />

      <RandomGeneratorModal
        isOpen={isRandomGeneratorOpen}
        onClose={() => setIsRandomGeneratorOpen(false)}
      />
    </Layout>
  )
}

export default App
