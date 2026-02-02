import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

// interface LoadingScreenProps {
  onComplete) => void;
}

const bootSequence = [
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
  { text, delay,
];

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      setTimeout(onComplete, 500);
      return;
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
        {/* Terminal Window */}
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
                className={`${
                  line.startsWith('[OK]') ? 'text-terminal-green' :
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
                <div className="terminal-progress">
                  <div 
                    className="terminal-progress-bar transition-all duration-300"
                    style={{ width) * 100}%` }}
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
          className="mt-4 mx-auto block text-terminal-text-dim hover);
}

