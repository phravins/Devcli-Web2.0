import { useState } from 'react';
import { Copy, Check, Apple, Monitor, Terminal, Download, Cpu, Zap } from 'lucide-react';

const installMethods = [
  {
    id: 'shell',
    name: 'Shell Script',
    icon: Terminal,
    command: 'curl -fsSL https://devcli.sh/install.sh | sh',
    description: 'Recommended for Linux and macOS. Automatically detects your platform.',
  },
  {
    id: 'brew',
    name: 'Homebrew',
    icon: Download,
    command: 'brew install phravins/tap/devcli',
    description: 'The easiest way to install and manage DevCLI on macOS.',
  },
  {
    id: 'go',
    name: 'Go Install',
    icon: Cpu,
    command: 'go install github.com/phravins/devcli@latest',
    description: 'Install directly from source if you have Go 1.21+ installed.',
  },
  {
    id: 'npm',
    name: 'NPM',
    icon: Zap,
    command: 'npm install -g @devcli/cli',
    description: 'Install via NPM if you prefer managing your tools with Node.js.',
  },
];

const platformSupport = [
  { name: 'Linux', archs: ['AMD64', 'ARM64', 'ARMv7'], status: 'supported' },
  { name: 'macOS', archs: ['Intel', 'Apple Silicon'], status: 'supported' },
  { name: 'Windows', archs: ['AMD64', 'ARM64'], status: 'supported' },
  { name: 'BSD', archs: ['AMD64'], status: 'beta' },
];

const systemRequirements = [
  { label: 'OS', value: 'Linux, macOS, Windows' },
  { label: 'Architecture', value: 'x86_64, ARM64' },
  { label: 'RAM', value: '50MB minimum' },
  { label: 'Disk', value: '100MB free space' },
];

export default function Installation() {
  const [activeMethod, setActiveMethod] = useState(installMethods[0]);
  const [copied, setCopied] = useState(null);

  const copyCommand = (command, id) => {
    navigator.clipboard.writeText(command);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div id="install" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-terminal-text mb-4">Installation</h2>
          <p className="text-terminal-text-dim max-w-2xl mx-auto">
            Get DevCLI running on your machine in seconds with our simple installation methods.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Install Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Install Tabs */}
            <div className="flex flex-wrap gap-2">
              {installMethods.map((method) => {
                const Icon = method.icon;
                const isActive = method.id === activeMethod.id;

                return (
                  <button
                    key={method.id}
                    onClick={() => setActiveMethod(method)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-200 ${isActive
                        ? 'bg-terminal-green/10 border-terminal-green text-terminal-green shadow-sm'
                        : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover:text-terminal-text hover:border-terminal-text'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {method.name}
                  </button>
                );
              })}
            </div>

            {/* Command Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-terminal-text-dim text-xs font-mono">
                  {activeMethod.name.toLowerCase().replace(' ', '_')}.sh
                </span>
              </div>
              <div className="terminal-body space-y-4">
                <p className="text-terminal-text-dim text-sm italic">
                  # {activeMethod.description}
                </p>
                <div className="bg-terminal-bg-light rounded-lg p-4 border border-terminal-border group relative">
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-green font-mono select-none">$</span>
                    <code className="text-terminal-text flex-1 text-sm font-mono break-all leading-relaxed">
                      {activeMethod.command}
                    </code>
                    <button
                      onClick={() => copyCommand(activeMethod.command, activeMethod.id)}
                      className="p-1.5 text-terminal-text-dim hover:text-terminal-green transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied === activeMethod.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Install', desc: 'Run the command above to install the binary.' },
                { step: '2', title: 'Initialize', desc: 'Run `devcli init` to set up your environment.' },
                { step: '3', title: 'Build', desc: 'Start building faster with your new toolkit.' },
              ].map((s) => (
                <div key={s.step} className="bg-terminal-bg-light border border-terminal-border rounded-lg p-5 hover:border-terminal-blue transition-colors">
                  <div className="w-8 h-8 bg-terminal-blue/20 rounded-full flex items-center justify-center text-terminal-blue font-bold text-sm mb-4">
                    {s.step}
                  </div>
                  <h4 className="text-terminal-text font-bold mb-2">{s.title}</h4>
                  <p className="text-terminal-text-dim text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Platforms */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-sm font-bold text-terminal-text mb-6 uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4 text-terminal-blue" />
                OS Support
              </h3>
              <div className="space-y-4">
                {platformSupport.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between border-b border-terminal-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <div className="text-terminal-text text-sm font-medium">{platform.name}</div>
                      <div className="text-[10px] text-terminal-text-dim font-mono">
                        {platform.archs.join(', ')}
                      </div>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${platform.status === 'supported'
                        ? 'bg-terminal-green/10 border-terminal-green/30 text-terminal-green'
                        : 'bg-terminal-yellow/10 border-terminal-yellow/30 text-terminal-yellow'
                      }`}>
                      {platform.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-sm font-bold text-terminal-text mb-6 uppercase tracking-widest">
                System Specs
              </h3>
              <div className="space-y-3">
                {systemRequirements.map((req) => (
                  <div key={req.label} className="flex justify-between items-center text-xs">
                    <span className="text-terminal-text-dim font-mono">{req.label}</span>
                    <span className="text-terminal-text text-right font-medium">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
