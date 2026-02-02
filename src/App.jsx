import { useEffect, useState, useRef, useCallback } from 'react';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Demo from './sections/Demo';
import Installation from './sections/Installation';
import Commands from './sections/Commands';
import AdvancedFeatures from './sections/AdvancedFeatures';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';
import MatrixRain from './components/MatrixRain';
import ParticleField from './components/ParticleField';
import InteractiveTerminal from './components/InteractiveTerminal';
import ToastContainer, { useToast } from './components/Toast';
import LoadingScreen from './components/LoadingScreen';
import { Terminal, Command, Cpu, Zap } from 'lucide-react';
import './App.css';

// Keyboard shortcuts
const shortcuts = [
  { key: 't', action: 'Toggle Terminal', description: 'Open interactive terminal' },
  { key: 'm', action: 'Toggle Matrix', description: 'Toggle matrix rain effect' },
  { key: 'p', action: 'Toggle Particles', description: 'Toggle particle field' },
  { key: '1-5', action: 'Navigate', description: 'Jump to sections 1-5' },
  { key: '?', action: 'Help', description: 'Show keyboard shortcuts' },
];

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const mainRef = useRef(null);
  const { toasts, success, info, removeToast } = useToast();

  // Track current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'demo', 'install', 'commands'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 't':
          setIsTerminalOpen(prev => !prev);
          info(isTerminalOpen ? 'Terminal closed' : 'Terminal opened - Type "help" for commands');
          break;
        case 'm':
          setShowMatrix(prev => !prev);
          info(showMatrix ? 'Matrix effect disabled' : 'Matrix effect enabled');
          break;
        case 'p':
          setShowParticles(prev => !prev);
          info(showParticles ? 'Particle field disabled' : 'Particle field enabled');
          break;
        case '?':
        case 'h':
          setShowShortcuts(prev => !prev);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          const sectionIndex = parseInt(e.key) - 1;
          const sections = ['home', 'features', 'demo', 'install', 'commands'];
          const section = sections[sectionIndex];
          if (section) {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 'escape':
          setIsTerminalOpen(false);
          setShowShortcuts(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, showMatrix, showParticles, info]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    success('Welcome to DevCLI! Press "?" for keyboard shortcuts');
  }, [success]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-terminal-bg font-mono noise-bg">
      {/* Background Effects */}
      {showMatrix && <MatrixRain opacity={0.08} speed={0.8} />}
      {showParticles && <ParticleField particleCount={50} connectionDistance={100} />}

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Scanlines Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-20" />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Interactive Terminal */}
      <InteractiveTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-terminal-bg/80 backdrop-blur-sm"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="terminal-window max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-terminal-text-dim text-sm">Keyboard Shortcuts</span>
            </div>
            <div className="terminal-body">
              <div className="space-y-3">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between">
                    <div>
                      <span className="text-terminal-text font-medium">{shortcut.action}</span>
                      <p className="text-terminal-text-dim text-sm">{shortcut.description}</p>
                    </div>
                    <kbd className="px-2 py-1 bg-terminal-border rounded text-terminal-green font-mono text-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
              <p className="text-terminal-text-dim text-xs mt-6 text-center">
                Press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="p-3 bg-terminal-bg border border-terminal-border rounded-lg shadow-terminal hover:border-terminal-green hover:shadow-terminal transition-all group"
          title="Open Terminal (T)"
        >
          <Terminal className="w-5 h-5 text-terminal-green group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className={`p-3 bg-terminal-bg border rounded-lg shadow-terminal transition-all group ${showMatrix ? 'border-terminal-green' : 'border-terminal-border hover:border-terminal-green'
            }`}
          title="Toggle Matrix (M)"
        >
          <Command className={`w-5 h-5 transition-all ${showMatrix ? 'text-terminal-green' : 'text-terminal-text-dim group-hover:text-terminal-green'}`} />
        </button>
        <button
          onClick={() => setShowParticles(!showParticles)}
          className={`p-3 bg-terminal-bg border rounded-lg shadow-terminal transition-all group ${showParticles ? 'border-terminal-blue' : 'border-terminal-border hover:border-terminal-blue'
            }`}
          title="Toggle Particles (P)"
        >
          <Cpu className={`w-5 h-5 transition-all ${showParticles ? 'text-terminal-blue' : 'text-terminal-text-dim group-hover:text-terminal-blue'}`} />
        </button>
        <button
          onClick={() => setShowShortcuts(true)}
          className="p-3 bg-terminal-bg border border-terminal-border rounded-lg shadow-terminal hover:border-terminal-yellow hover:shadow-terminal transition-all group"
          title="Keyboard Shortcuts (?)"
        >
          <Zap className="w-5 h-5 text-terminal-yellow group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Main Content */}
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="demo">
          <Demo />
        </section>
        <section id="install">
          <Installation />
        </section>
        <section id="commands">
          <Commands />
        </section>
        <AdvancedFeatures />
        <Footer />
      </main>
    </div>
  );
}

export default App;
