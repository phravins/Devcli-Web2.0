import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const bootSequence = [
  { text: 'Starting DevCLI Boot Sequence...', delay: 100 },
  { text: 'Loading kernel modules...', delay: 400 },
  { text: '[OK] Kernel initialized.', delay: 200 },
  { text: 'Mounting virtual file system...', delay: 300 },
  { text: '[OK] VFS mounted at /', delay: 100 },
  { text: 'Starting network subsystems...', delay: 500 },
  { text: '[OK] Network ready.', delay: 100 },
  { text: 'Initializing AI core...', delay: 600 },
  { text: '[OK] AI core online.', delay: 100 },
  { text: 'Loading terminal UI components...', delay: 400 },
  { text: 'Checking for updates...', delay: 300 },
  { text: '[OK] System up to date.', delay: 200 },
  { text: '', delay: 100 },
  { text: '╔══════════════════════════════════════════╗', delay: 50 },
  { text: '║           DevCLI v2.4.1 (Stable)         ║', delay: 50 },
  { text: '╚══════════════════════════════════════════╝', delay: 50 },
  { text: '', delay: 100 },
  { text: 'Login successful: developer', delay: 200 },
  { text: 'Initializing interactive shell...', delay: 300 },
];

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }

    const { text, delay } = bootSequence[currentLine];

    const timer = setTimeout(() => {
      setLines(prev => [...prev, text]);
      setCurrentLine(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-terminal-bg z-[200] flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="flex gap-2">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <span className="ml-4 text-terminal-text-dim text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              System Boot
            </span>
          </div>

          <div className="terminal-body font-mono text-sm min-h-[400px]">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${line.startsWith('[OK]') ? 'text-terminal-green' :
                    line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚') ? 'text-terminal-green-bright' :
                      line.includes('DevCLI') && line.includes('v2') ? 'text-terminal-yellow' :
                        'text-terminal-text'
                  }`}
              >
                {line}
              </div>
            ))}

            {/* Progress Bar */}
            {currentLine > 0 && currentLine < bootSequence.length && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-terminal-text-dim text-xs mb-1">
                  <span>Loading...</span>
                  <span>{Math.round((currentLine / bootSequence.length) * 100)}%</span>
                </div>
                <div className="w-full bg-terminal-bg-light h-1.5 rounded-full overflow-hidden border border-terminal-border">
                  <div
                    className="bg-terminal-green h-full transition-all duration-300 shadow-[0_0_10px_rgba(63,185,80,0.5)]"
                    style={{ width: `${(currentLine / bootSequence.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cursor */}
            {showCursor && currentLine < bootSequence.length && (
              <span className="text-terminal-green">█</span>
            )}
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={onComplete}
          className="mt-4 mx-auto block text-terminal-text-dim hover:text-terminal-text text-sm transition-colors"
        >
          Press ESC or click to skip boot sequence
        </button>
      </div>
    </div>
  );
}
