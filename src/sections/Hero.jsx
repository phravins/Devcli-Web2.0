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
  { label: 'GitHub Stars', value: '2.4k+', icon: Zap },
  { label: 'Downloads', value: '150k+', icon: Cpu },
  { label: 'Languages', value: '12+', icon: Terminal },
  { label: 'Core Team', value: '8+', icon: Sparkles },
];

export default function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const copyInstallCommand = useCallback(() => {
    navigator.clipboard.writeText('curl -fsSL https://devcli.sh/install.sh | sh');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const scrollToFeatures = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden bg-terminal-bg"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(63, 185, 80, 0.05) 0%, transparent 70%)`
        }}
      />

      {/* Main Content Container */}
      <div className="w-full max-w-4xl relative z-10">
        <div className="terminal-window terminal-glow animate-fade-in">
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="flex gap-2">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <span className="ml-4 text-terminal-text-dim text-sm font-mono truncate">devcli — bash — 80×24</span>
            <div className="ml-auto hidden sm:flex items-center gap-4 text-xs text-terminal-text-dim font-mono">
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> 2.4%</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 45MB</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body space-y-4 min-h-[500px] flex flex-col">
            <div className="text-terminal-text-dim flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
              <p>Session started: {new Date().toLocaleDateString()} via ssh from terminal.dev</p>
            </div>

            <pre className="ascii-art text-terminal-green leading-tight overflow-x-auto py-4">
              {asciiLogo}
            </pre>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-mono">
              <span className="text-terminal-text-dim">release: <span className="text-terminal-green">v2.4.1</span></span>
              <span className="text-terminal-text-dim">|</span>
              <span className="text-terminal-blue">stable-branch</span>
              <span className="text-terminal-text-dim">|</span>
              <span className="text-terminal-cyan">go1.21.5</span>
              <span className="flex items-center gap-1 text-terminal-purple">
                <Sparkles className="w-3 h-3" />
                AI Enhanced
              </span>
            </div>

            <div className="border-t border-terminal-border my-4" />

            {/* Prompt and Typing Effect */}
            <div className="flex-1">
              <div className="flex items-start gap-2 font-mono">
                <span className="flex whitespace-nowrap">
                  <span className="text-terminal-green">user</span>
                  <span className="text-terminal-text">@</span>
                  <span className="text-terminal-blue">devcli-web</span>
                  <span className="text-terminal-text">:~$</span>
                </span>
                <span className="text-terminal-text">{displayText}<span className="animate-pulse">█</span></span>
              </div>
            </div>

            {/* Install Box */}
            <div className="mt-auto pt-8">
              <p className="text-terminal-text-dim text-xs mb-2 font-mono flex items-center gap-2">
                <span className="text-terminal-green">#</span> Quick install via shell script
              </p>
              <div
                className="flex items-center gap-3 bg-terminal-bg-light border border-terminal-border rounded-lg p-3 group hover:border-terminal-green/50 transition-colors cursor-pointer"
                onClick={copyInstallCommand}
              >
                <span className="text-terminal-green font-mono">$</span>
                <code className="text-terminal-text flex-1 text-sm font-mono truncate">
                  curl -fsSL https://devcli.sh/install.sh | sh
                </code>
                <button className="p-1.5 text-terminal-text-dim hover:text-terminal-green transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && <p className="text-terminal-green text-xs mt-2 animate-fade-in font-mono">✓ Command copied to clipboard</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={scrollToFeatures}
                className="px-6 py-2 bg-terminal-green text-terminal-bg font-bold rounded hover:bg-terminal-green-bright transition-all flex items-center gap-2"
              >
                ./explore.sh <ArrowDown className="w-4 h-4" />
              </button>
              <a
                href="https://github.com/phravins"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-terminal-border text-terminal-text hover:bg-terminal-border/20 transition-all font-mono"
              >
                view-source
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-terminal-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left space-y-1">
                  <div className="text-terminal-text-dim text-[10px] uppercase font-mono">{stat.label}</div>
                  <div className="text-terminal-text font-bold text-lg">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 animate-bounce opacity-50 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-terminal-text-dim mb-2">Scroll</span>
        <ArrowDown className="w-4 h-4 text-terminal-text-dim" />
      </div>
    </div>
  );
}
