import { useState } from 'react';
import SystemMonitor from '../components/SystemMonitor';
import FileTree from '../components/FileTree';
import GlitchText from '../components/GlitchText';
import { Activity, Code2, FolderTree, Sparkles, Cpu, Zap } from 'lucide-react';

const CodePlaygroundPlaceholder = () => (
  <div className="terminal-window h-[400px] flex items-center justify-center bg-terminal-bg-light border-terminal-border">
    <div className="text-center space-y-4">
      <Code2 className="w-12 h-12 text-terminal-blue mx-auto opacity-50" />
      <p className="text-terminal-text-dim font-mono">Code Playground Terminal Initializing...</p>
    </div>
  </div>
);

const advancedFeatures = [
  {
    id: 'monitor',
    name: 'System Monitor',
    icon: Activity,
    description: 'Real-time tracking of CPU, memory, and running processes with zero overhead.',
    component: SystemMonitor,
  },
  {
    id: 'files',
    name: 'File Explorer',
    icon: FolderTree,
    description: 'Lightning-fast file navigation with built-in preview and git status integration.',
    component: FileTree,
  },
  {
    id: 'editor',
    name: 'Code Editor',
    icon: Code2,
    description: 'Integrated multi-language editor with AI-powered completions and error checking.',
    component: CodePlayground,
  },
];

const techSpecs = [
  { label: 'Language', value: 'Go 1.21+', icon: Terminal },
  { label: 'Latency', value: '< 1ms', icon: Zap },
  { label: 'Supported', value: 'Go, TS, Py, Rust', icon: Code2 },
  { label: 'Architecture', value: 'Micro-kernel', icon: Cpu },
];

export default function AdvancedFeatures() {
  const [activeTab, setActiveTab] = useState('monitor');
  const feature = advancedFeatures.find(f => f.id === activeTab) || advancedFeatures[0];
  const ActiveComponent = feature.component;

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-terminal-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <GlitchText
            text="Advanced Capabilities"
            className="text-4xl font-bold text-terminal-text mb-4"
          />
          <p className="text-terminal-text-dim max-w-2xl mx-auto">
            Experience the power of a modern terminal workspace designed for the 21st century.
          </p>
        </div>

        {/* Tech Specs Shelf */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {techSpecs.map((spec) => (
            <div key={spec.label} className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6 hover:shadow-glow-blue transition-all duration-300">
              <spec.icon className="w-5 h-5 text-terminal-blue mb-4 opacity-70" />
              <div className="text-[10px] uppercase tracking-widest text-terminal-text-dim mb-1 font-mono">{spec.label}</div>
              <div className="text-terminal-text font-bold text-lg">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Feature Tabs Container */}
        <div className="bg-terminal-bg-light border border-terminal-border rounded-2xl p-4 lg:p-8 backdrop-blur-sm relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {advancedFeatures.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${activeTab === f.id
                  ? 'bg-terminal-purple/10 border-terminal-purple text-terminal-purple shadow-glow-purple'
                  : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover:text-terminal-text hover:border-terminal-text'
                  }`}
              >
                <f.icon className={`w-5 h-5 ${activeTab === f.id ? 'animate-pulse' : ''}`} />
                {f.name}
              </button>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-terminal-text-dim text-lg leading-relaxed italic">
              "{feature.description}"
            </p>
          </div>

          <div className="relative transition-all duration-500 transform">
            <div key={activeTab} className="animate-fade-in">
              <ActiveComponent />
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: 'Native Performance',
              desc: 'Engineered in Go to deliver blazing fast response times with zero latency.',
              icon: Zap,
              color: 'text-terminal-green'
            },
            {
              title: 'AI Integrated',
              desc: 'Context-aware AI assistance built directly into the terminal core.',
              icon: Sparkles,
              color: 'text-terminal-purple'
            },
            {
              title: 'Tool Convergence',
              desc: 'All your development tools and environments unified in one place.',
              icon: Cpu,
              color: 'text-terminal-blue'
            }
          ].map((item, i) => (
            <div key={i} className="space-y-4 p-4">
              <div className={`p-3 bg-white/5 rounded-xl w-fit ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-terminal-text">{item.title}</h4>
              <p className="text-terminal-text-dim leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
