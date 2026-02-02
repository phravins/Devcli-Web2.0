import { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

// interface NavigationProps {
  currentSection= [
  { id, label, shortcut,
  { id, label, shortcut,
  { id, label, shortcut,
  { id, label, shortcut,
  { id, label, shortcut,
];

export default function Navigation({ currentSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav after scrolling past hero
      if (currentScrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            ) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 text-sm rounded transition-all duration-200 ${
                      currentSection === item.id
                        ? 'text-terminal-green bg-terminal-green/10'
                        : 'text-terminal-text-dim hover="text-terminal-text-dim mr-1">[{item.shortcut}]</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm rounded transition-all duration-200 ${
                    currentSection === item.id
                      ? 'text-terminal-green bg-terminal-green/10'
                      : 'text-terminal-text-dim hover="text-terminal-text-dim mr-2">[{item.shortcut}]</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Floating Action Button (visible when nav is hidden) */}
      <button
        onClick={() => scrollToSection('home')}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-terminal-bg border border-terminal-border rounded-lg shadow-terminal transition-all duration-300 hover="w-5 h-5 text-terminal-green" />
      </button>
    </>
  );
}

