import { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', shortcut: '1' },
  { id: 'features', label: 'Features', shortcut: '2' },
  { id: 'demo', label: 'Demo', shortcut: '3' },
  { id: 'install', label: 'Install', shortcut: '4' },
  { id: 'commands', label: 'Commands', shortcut: '5' },
];

export default function Navigation({ currentSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="bg-terminal-bg/80 backdrop-blur-md border-b border-terminal-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => scrollToSection('home')}
              >
                <Terminal className="w-6 h-6 text-terminal-green group-hover:scale-110 transition-transform" />
                <span className="text-terminal-text font-bold tracking-tight">DEVCLI</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 text-sm font-mono rounded transition-all duration-200 ${currentSection === item.id
                        ? 'text-terminal-green bg-terminal-green/10'
                        : 'text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-border/30'
                      }`}
                  >
                    <span className="text-terminal-text-dim mr-1">[{item.shortcut}]</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 text-terminal-text-dim hover:text-terminal-text"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-terminal-bg border-b border-terminal-border transition-all duration-300 overflow-hidden ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-mono rounded ${currentSection === item.id
                    ? 'text-terminal-green bg-terminal-green/10'
                    : 'text-terminal-text-dim hover:bg-terminal-border/20'
                  }`}
              >
                <span className="text-terminal-text-dim mr-2">[{item.shortcut}]</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll to Top FAB (when nav is invisible) */}
      {!isVisible && false && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-6 right-6 z-40 p-3 bg-terminal-bg border border-terminal-border rounded-lg shadow-terminal hover:border-terminal-green transition-all"
        >
          <X className="w-5 h-5 text-terminal-green rotate-45" />
        </button>
      )}
    </>
  );
}
