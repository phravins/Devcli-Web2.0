import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowDown, Copy, Check, Terminal, Cpu, Zap, Sparkles } from 'lucide-react';

const asciiLogo = `
██████╗ ███████╗██╗   ██╗ ██████╗██╗     ██╗
██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██║
██║  ██║█████╗  ██║   ██║██║     ██║     ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝██║     ██║     ██║
██████╔╝███████╗ ╚████╔╝ ╚██████╗███████╗██║
╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝╚══════╝╚═╝
`;

const taglines = [
  'The terminal-based development workspace',
  'All your dev tools in one unified interface',
  'Built with Go + Bubble Tea framework',
  'Cross-platform. Fast. Keyboard-driven.',
  'AI-powered assistance at your fingertips',
];

const stats = [
  { label, value, icon,
  { label, value, icon,
  { label, value, icon,
  { label, value, icon,
];

export default function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);

  // Typing effect for taglines
  useEffect(() => {
    const tagline = taglines[currentTagline];
    const typeSpeed = isDeleting ? 25 : 50;

    if (!isDeleting && displayText === tagline) {
      setTimeout(() => setIsDeleting(true), 2500);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }
        return tagline.slice(0, prev.length + 1);
      });
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline]);

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const copyInstallCommand = useCallback(() => {
    navigator.clipboard.writeText('curl -fsSL https);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const scrollToFeatures = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm) 0%, transparent 70%)',
          left,
          top,
        }}
      />

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-terminal-text-dim/10 text-xs font-mono animate-pulse"
            style={{
              left) * 80}%`,
              top) * 80}%`,
              animationDelay,
              animationDuration) * 2}s`,
            }}
          >
            {['> devcli init', '> devcli run', '> devcli env', '> devcli ai'][i % 4]}
          </div>
        ))}
      </div>

      {/* Main Terminal Window */}
      <div 
        ref={terminalRef}
        className="w-full max-w-4xl terminal-window terminal-glow animate-fade-in relative z-10"
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
          </div>
          <span className="ml-4 text-terminal-text-dim text-sm">devcli — bash — 80×24</span>
          
          {/* Window Controls */}
          <div className="ml-auto flex items-center gap-2 text-xs text-terminal-text-dim">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              2.4%
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              45MB
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body space-y-4">
          {/* Welcome Message */}
          <div className="text-terminal-text-dim flex items-center gap-2">
            <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
            <p>Last login).toLocaleString()} from 192.168.1.42</p>
          </div>

          {/* ASCII Logo */}
          <pre className="ascii-art text-terminal-green animate-fade-in select-none">
            {asciiLogo}
          </pre>

          {/* Version Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-terminal-text-dim">version="text-terminal-green font-mono">v2.4.1</span>
            <span className="text-terminal-text-dim">|</span>
            <span className="text-terminal-blue">stable</span>
            <span className="text-terminal-text-dim">|</span>
            <span className="text-terminal-cyan font-mono">go1.21.5</span>
            <span className="text-terminal-text-dim">|</span>
            <span className="flex items-center gap-1 text-terminal-purple">
              <Sparkles className="w-3 h-3" />
              AI Ready
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-terminal-border my-4" />

          {/* Description with typing effect */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="prompt">
                <span className="prompt-user">user</span>
                <span className="prompt-symbol">@</span>
                <span className="prompt-path">devcli</span>
                <span className="text-terminal-text">:~$</span>
              </span>
              <span className="text-terminal-text typing-cursor">{displayText}</span>
            </div>
          </div>

          {/* Quick Install Command */}
          <div className="mt-8 space-y-2">
            <p className="text-terminal-text-dim text-sm flex items-center gap-2">
              <span className="text-terminal-green">#</span>
              Quick install — one command to get started
            </p>
            <div 
              className="flex items-center gap-2 bg-terminal-bg-light rounded-lg p-3 border border-terminal-border group hover={copyInstallCommand}
            >
              <span className="text-terminal-green">$</span>
              <code className="text-terminal-text flex-1 text-sm font-mono">
                curl -fsSL https="p-2 text-terminal-text-dim hover="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-terminal-green text-xs animate-fade-in">
                ✓ Copied to clipboard!
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={scrollToFeatures}
              className="terminal-btn flex items-center gap-2 group"
            >
              <span>./explore.sh</span>
              <ArrowDown className="w-4 h-4 group-hover="https="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-terminal-border text-terminal-text hover="text-terminal-text-dim group-hover="mt-6 pt-6 border-t border-terminal-border">
            <div className="grid grid-cols-2 sm) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center sm);
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-terminal-text-dim text-xs">Scroll to explore</span>
        <ArrowDown className="w-5 h-5 text-terminal-text-dim" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-8 text-terminal-green/20 text-xs font-mono hidden lg="absolute top-20 right-8 text-terminal-blue/20 text-xs font-mono hidden lg);
}

