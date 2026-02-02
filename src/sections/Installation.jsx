import { useState } from 'react';
import { Copy, Check, Terminal, Download, Package, Apple, Monitor } from 'lucide-react';

// interface InstallMethod {
  id= [
  {
    id,
    name)',
    icon,
    command,
    description,
  },
  {
    id,
    name)',
    icon,
    command,
    description,
  },
  {
    id,
    name)',
    icon,
    command,
    description,
  },
  {
    id,
    name,
    icon,
    command,
    description,
  },
  {
    id,
    name,
    icon,
    command,
    description,
  },
];

const platformSupport = [
  { name, archs, 'ARM64', 'ARMv7'], status,
  { name, archs, 'Apple Silicon'], status,
  { name, archs, 'ARM64'], status,
  { name, archs, status,
];

const systemRequirements = [
  { label, value, required,
  { label, value, required,
  { label, value, required,
  { label, value, required,
];

export default function Installation() {
  const [activeMethod, setActiveMethod] = useState(installMethods[0]);
  const [copied, setCopied] = useState(null);

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm) => {
                const Icon = method.icon;
                const isActive = method.id === activeMethod.id;
                
                return (
                  <button
                    key={method.id}
                    onClick={() => setActiveMethod(method)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-terminal-green/10 border-terminal-green text-terminal-green'
                        : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover="w-4 h-4" />
                    {method.name}
                  </button>
                );
              })}
            </div>

            {/* Command Display */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-terminal-text-dim text-sm">
                  {activeMethod.name}
                </span>
              </div>
              <div className="terminal-body">
                <p className="text-terminal-text-dim text-sm mb-4">
                  {activeMethod.description}
                </p>
                <div className="bg-terminal-bg-light rounded-lg p-4 border border-terminal-border">
                  <div className="flex items-start gap-3">
                    <code className="text-terminal-text flex-1 text-sm whitespace-pre-wrap">
                      {activeMethod.command}
                    </code>
                    <button
                      onClick={() => copyCommand(activeMethod.command, activeMethod.id)}
                      className="p-2 text-terminal-text-dim hover="Copy to clipboard"
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

            {/* Installation Steps */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-terminal-text mb-4">
                Post-Installation
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-terminal-green/20 rounded-full flex items-center justify-center text-terminal-green font-mono text-sm">
                    1
                  </div>
                  <div>
                    <p className="text-terminal-text font-medium">Verify installation</p>
                    <code className="text-terminal-text-dim text-sm mt-1 block">
                      devcli --version
                    </code>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-terminal-green/20 rounded-full flex items-center justify-center text-terminal-green font-mono text-sm">
                    2
                  </div>
                  <div>
                    <p className="text-terminal-text font-medium">Run first-time setup</p>
                    <code className="text-terminal-text-dim text-sm mt-1 block">
                      devcli init
                    </code>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-terminal-green/20 rounded-full flex items-center justify-center text-terminal-green font-mono text-sm">
                    3
                  </div>
                  <div>
                    <p className="text-terminal-text font-medium">Explore available commands</p>
                    <code className="text-terminal-text-dim text-sm mt-1 block">
                      devcli --help
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Platform Support */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-terminal-text mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-terminal-blue" />
                Platform Support
              </h3>
              <div className="space-y-3">
                {platformSupport.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div>
                      <span className="text-terminal-text">{platform.name}</span>
                      <span className="text-terminal-text-dim text-xs block">
                        {platform.archs.join(', ')}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      platform.status === 'supported'
                        ? 'bg-terminal-green/20 text-terminal-green'
                        : 'bg-terminal-yellow/20 text-terminal-yellow'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Requirements */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-terminal-text mb-4">
                System Requirements
              </h3>
              <div className="space-y-3">
                {systemRequirements.map((req) => (
                  <div key={req.label} className="flex items-center justify-between">
                    <span className="text-terminal-text-dim text-sm">{req.label}</span>
                    <span className="text-terminal-text text-sm">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-terminal-text mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <a
                  href="https="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-terminal-text-dim hover="https="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-terminal-text-dim hover="https="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-terminal-text-dim hover="https="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-terminal-text-dim hover);
}

