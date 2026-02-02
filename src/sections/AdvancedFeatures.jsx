import { useState } from 'react';
import SystemMonitor from '../components/SystemMonitor';
import CodePlayground from '../components/CodePlayground';
import FileTree from '../components/FileTree';
import GlitchText from '../components/GlitchText';
import { Activity, Code2, FolderTree, Sparkles, Cpu, Zap } from 'lucide-react';

const advancedFeatures = [
  {
    id,
    name,
    icon,
    description,
    component,
  },
  {
    id,
    name,
    icon,
    description,
    component,
  },
  {
    id,
    name,
    icon,
    description,
    component,
  },
];

const techSpecs = [
  { label, value, icon,
  { label, value, icon,
  { label, value, Python, TS, Rust', icon,
  { label, value, icon,
];

export default function AdvancedFeatures() {
  const [activeTab, setActiveTab] = useState('monitor');
  const ActiveComponent = advancedFeatures.find(f => f.id === activeTab)?.component || SystemMonitor;

  return (
    <div className="min-h-screen py-20 px-4 sm) => {
            const Icon = spec.icon;
            return (
              <div 
                key={spec.label}
                className="bg-terminal-bg-light border border-terminal-border rounded-lg p-4 text-center hover);
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {advancedFeatures.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-terminal-purple/20 border-terminal-purple text-terminal-purple'
                    : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover="w-5 h-5" />
                <span className="font-medium">{feature.name}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Description */}
        <div className="text-center mb-8">
          <p className="text-terminal-text-dim">
            {advancedFeatures.find(f => f.id === activeTab)?.description}
          </p>
        </div>

        {/* Active Component */}
        <div className="animate-fade-in">
          <ActiveComponent />
        </div>

        {/* Feature Highlights */}
        <div className="grid md="bg-terminal-bg-light border border-terminal-border rounded-lg p-6 hover="w-12 h-12 bg-terminal-green/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-terminal-green" />
            </div>
            <h3 className="text-lg font-semibold text-terminal-text mb-2">
              Lightning Fast
            </h3>
            <p className="text-terminal-text-dim text-sm">
              Built with Go for maximum performance. Sub-50ms startup time and 
              minimal memory footprint.
            </p>
          </div>

          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6 hover="w-12 h-12 bg-terminal-blue/20 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-terminal-blue" />
            </div>
            <h3 className="text-lg font-semibold text-terminal-text mb-2">
              AI Powered
            </h3>
            <p className="text-terminal-text-dim text-sm">
              Integrated AI assistant helps with debugging, code generation, 
              and explanations in real-time.
            </p>
          </div>

          <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6 hover="w-12 h-12 bg-terminal-purple/20 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-terminal-purple" />
            </div>
            <h3 className="text-lg font-semibold text-terminal-text mb-2">
              Multi-Language
            </h3>
            <p className="text-terminal-text-dim text-sm">
              First-class support for Go, Python, TypeScript, Rust, and more. 
              One tool for all your projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

