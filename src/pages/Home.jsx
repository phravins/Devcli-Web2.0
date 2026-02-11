import { useEffect, useState, useRef, useCallback } from 'react';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Demo from '../sections/Demo';
import Installation from '../sections/Installation';
import Commands from '../sections/Commands';
import AdvancedFeatures from '../sections/AdvancedFeatures';
import ThreeDShowcase from '../sections/ThreeDShowcase';
import Footer from '../sections/Footer';
import Navigation from '../sections/Navigation';
import MatrixRain from '../components/MatrixRain';
import ParticleField from '../components/ParticleField';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ToastContainer, { useToast } from '../components/Toast';
import LoadingScreen from '../components/LoadingScreen';
import { Terminal, Command, Cpu, Zap } from 'lucide-react';

// Keyboard shortcuts
const shortcuts = [
    { key: 't', action: 'Toggle Terminal', description: 'Open interactive terminal' },
    { key: 'm', action: 'Toggle Matrix', description: 'Toggle matrix rain effect' },
    { key: 'p', action: 'Toggle Particles', description: 'Toggle particle field' },
    { key: '1-5', action: 'Navigate', description: 'Jump to sections 1-5' },
    { key: '?', action: 'Help', description: 'Show keyboard shortcuts' },
];

export default function Home() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [showMatrix, setShowMatrix] = useState(false);
    const [showParticles, setShowParticles] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const { addToast } = useToast();

    // Loading screen
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 't':
                    setIsTerminalOpen(prev => !prev);
                    addToast(isTerminalOpen ? 'Terminal closed' : 'Terminal opened', 'info');
                    break;
                case 'm':
                    setShowMatrix(prev => !prev);
                    addToast(showMatrix ? 'Matrix disabled' : 'Matrix enabled', 'success');
                    break;
                case 'p':
                    setShowParticles(prev => !prev);
                    addToast(showParticles ? 'Particles disabled' : 'Particles enabled', 'success');
                    break;
                case '?':
                    setShowShortcuts(prev => !prev);
                    break;
                case '1':
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    document.getElementById('commands')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isTerminalOpen, showMatrix, showParticles, addToast]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-terminal-bg relative">
            {/* Background Effects */}
            {showMatrix && <MatrixRain />}
            {showParticles && <ParticleField />}

            {/* Navigation */}
            <Navigation currentSection={currentSection} />

            {/* Main Content */}
            <main className="relative z-10">
                <Hero />
                <Features />
                <Demo />
                <ThreeDShowcase />
                <Installation />
                <Commands />
                <AdvancedFeatures />
            </main>

            {/* Footer */}
            <Footer />

            {/* Interactive Terminal */}
            <InteractiveTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            {/* Toast Container */}
            <ToastContainer />

            {/* Keyboard Shortcuts Modal */}
            {showShortcuts && (
                <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4" onClick={() => setShowShortcuts(false)}>
                    <div className="bg-terminal-bg border-2 border-terminal-green rounded-lg p-8 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-terminal-green mb-6 flex items-center gap-2">
                            <Command className="w-6 h-6" />
                            Keyboard Shortcuts
                        </h2>
                        <div className="space-y-3">
                            {shortcuts.map((shortcut) => (
                                <div key={shortcut.key} className="flex items-center justify-between p-3 bg-terminal-bg-light border border-terminal-border rounded">
                                    <div>
                                        <span className="text-terminal-text font-mono font-bold">{shortcut.action}</span>
                                        <p className="text-terminal-text-dim text-sm">{shortcut.description}</p>
                                    </div>
                                    <kbd className="px-3 py-1 bg-terminal-bg border border-terminal-green text-terminal-green rounded font-mono text-sm">
                                        {shortcut.key}
                                    </kbd>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowShortcuts(false)}
                            className="mt-6 w-full px-4 py-2 bg-terminal-green text-terminal-bg font-mono font-bold rounded hover:bg-terminal-green/90 transition-colors"
                        >
                            Close [ESC]
                        </button>
                    </div>
                </div>
            )}

            {/* Status Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-terminal-bg/95 backdrop-blur-sm border-t border-terminal-border py-2 px-4 z-50 hidden lg:flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4">
                    <span className="text-terminal-green flex items-center gap-1">
                        <Terminal className="w-3 h-3" /> DevCLI 2.4.1
                    </span>
                    <span className="text-terminal-text-dim">Section: {currentSection}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`flex items-center gap-1 ${showMatrix ? 'text-terminal-green' : 'text-terminal-text-dim'}`}>
                        <Cpu className="w-3 h-3" /> Matrix: {showMatrix ? 'ON' : 'OFF'}
                    </span>
                    <span className={`flex items-center gap-1 ${showParticles ? 'text-terminal-green' : 'text-terminal-text-dim'}`}>
                        <Zap className="w-3 h-3" /> Particles: {showParticles ? 'ON' : 'OFF'}
                    </span>
                    <button onClick={() => setShowShortcuts(true)} className="text-terminal-blue hover:text-terminal-green transition-colors">
                        Press ? for shortcuts
                    </button>
                </div>
            </div>
        </div>
    );
}
