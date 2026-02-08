import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Terminal } from 'lucide-react';

const demoCommands = [
  {
    command: 'devcli --version',
    output: [
      'devcli version 2.4.1 (linux/amd64)',
      'Built with Go 1.21.5 + Bubble Tea',
      '',
    ],
    delay: 1000,
  },
  {
    command: 'devcli project list',
    output: [
      'Listing all tracked projects...',
      '',
      '  📁 api-gateway      go         ~/work/api      (2 days ago)',
      '  📁 dashboard        react-ts   ~/work/dash     (3 days ago)',
      '  📁 ml-pipeline      python     ~/work/ml       (1 week ago)',
      '  📁 cli-tool         rust       ~/work/cli      (2 weeks ago)',
      '',
      'Use "devcli project switch <name>" to open a project',
      '',
    ],
    delay: 2000,
  },
  {
    command: 'devcli run build',
    output: [
      'Building current project in ~/work/dash...',
      '',
      '  ❯ build    - Build the project',
      '    test     - Run test suite',
      '    lint     - Run linter',
      '    dev      - Start development server',
      '',
      'Running build workflow...',
      '✓ Cleaning previous build...',
      '✓ Compiling TypeScript...',
      '✓ Bundling with Vite...',
      '✓ Build complete in 3.2s',
      '',
      '  dist/                     4.2 MB',
      '  ├── assets/               3.8 MB',
      '  ├── index.html            2.1 KB',
      '  └── manifest.json         456 B',
      '',
    ],
    delay: 3000,
  },
  {
    command: 'devcli env status',
    output: [
      'Checking development environment status...',
      '',
      '  🐍 Python    3.11.4    ✓ active    (myproject)',
      '  ⬢ Node.js   20.5.0    ✓ active    (via nvm)',
      '  🐹 Go        1.21.5    ✓ system',
      '  🦀 Rust      1.74.0    ✓ system',
      '',
      'All environments are properly configured.',
      '',
    ],
    delay: 2000,
  },
  {
    command: 'devcli ai debug "Module not found: @/lib/utils"',
    output: [
      'Analyzing error: "Module not found: @/lib/utils"...',
      '',
      '🤖 AI Assistant: I\'ll help you understand and fix this error.',
      '',
      'Root Cause: This is a path alias resolution issue.',
      '',
      'Suggested Fixes:',
      '1. Check tsconfig.json paths configuration:',
      '   "paths": { "@/*": ["./src/*"] }',
      '2. Ensure your bundler is configured to resolve the alias.',
      '3. Restart your development server.',
      '',
    ],
    delay: 3500,
  },
];

export default function Demo() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const terminalRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentOutput, typedCommand]);

  // Demo playback loop
  useEffect(() => {
    if (!isPlaying) return;

    let isMounted = true;
    const currentCmd = demoCommands[currentCommandIndex];

    const runSequence = async () => {
      // Small pause before typing
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;

      // Typing phase
      setIsTyping(true);
      for (let i = 0; i <= currentCmd.command.length; i++) {
        if (!isMounted) return;
        setTypedCommand(currentCmd.command.slice(0, i));
        await new Promise(r => setTimeout(r, 60));
      }
      setIsTyping(false);

      // Delay before showing output
      await new Promise(r => setTimeout(r, 300));
      if (!isMounted) return;

      // Show output
      setCurrentOutput(prev => [
        ...prev,
        `$ ${currentCmd.command}`,
        ...currentCmd.output,
      ]);
      setTypedCommand('');

      // Wait after command completes
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;

      // Reset if at end, or move to next
      if (currentCommandIndex === demoCommands.length - 1) {
        await new Promise(r => setTimeout(r, 2000));
        if (isMounted) {
          setCurrentOutput([]);
          setCurrentCommandIndex(0);
        }
      } else {
        setCurrentCommandIndex(prev => prev + 1);
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [currentCommandIndex, isPlaying]);

  const handleReset = () => {
    setCurrentCommandIndex(0);
    setCurrentOutput([]);
    setTypedCommand('');
    setIsPlaying(true);
  };

  return (
    <div id="demo" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-text mb-4">See it in Action</h2>
          <p className="text-terminal-text-dim">Watch how DevCLI streamlines common developer workflows.</p>
        </div>

        <div className="terminal-window shadow-2xl terminal-glow-blue">
          {/* Header */}
          <div className="terminal-header flex justify-between items-center">
            <div className="flex gap-2">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-terminal-text-dim text-xs font-mono">demo_session.ts</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-terminal-text-dim hover:text-terminal-text transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleReset}
                  className="text-terminal-text-dim hover:text-terminal-text transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div
            ref={terminalRef}
            className="terminal-body h-[500px] overflow-y-auto font-mono text-sm space-y-2 p-6"
          >
            {currentOutput.map((line, index) => (
              <div
                key={index}
                className={`${line.startsWith('$') ? 'text-terminal-green font-bold mt-4 first:mt-0' :
                    line.startsWith('✓') ? 'text-terminal-green-bright' :
                      line.startsWith('🤖') ? 'text-terminal-purple font-bold' :
                        line.startsWith('  📁') ? 'text-terminal-blue' :
                          line.startsWith('  🐍') || line.startsWith('  ⬢') ? 'text-terminal-cyan' :
                            'text-terminal-text'
                  } whitespace-pre-wrap`}
              >
                {line}
              </div>
            ))}

            {/* Currently Typing */}
            {(isTyping || typedCommand) && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-terminal-green font-bold">$</span>
                <span className="text-terminal-text">{typedCommand}</span>
                {isTyping && <span className="animate-pulse text-terminal-green">█</span>}
              </div>
            )}

            {/* Waiting prompt */}
            {!isTyping && !typedCommand && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-terminal-green font-bold">$</span>
                <span className="animate-pulse text-terminal-green">█</span>
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="bg-terminal-bg-light border-t border-terminal-border p-2 px-6">
            <div className="flex items-center justify-between text-[10px] text-terminal-text-dim uppercase tracking-widest mb-1.5">
              <span>Playback Progress</span>
              <span>Command {currentCommandIndex + 1} of {demoCommands.length}</span>
            </div>
            <div className="w-full bg-terminal-bg h-1 rounded-full overflow-hidden">
              <div
                className="bg-terminal-blue h-full transition-all duration-500"
                style={{ width: `${((currentCommandIndex + 1) / demoCommands.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Callouts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-4">
            <Terminal className="w-8 h-8 text-terminal-green mx-auto mb-3" />
            <h4 className="text-terminal-text font-bold mb-2">Built-in Tools</h4>
            <p className="text-terminal-text-dim text-sm">Over 50+ CLI tools integrated into a single interface.</p>
          </div>
          <div className="text-center p-4">
            <Play className="w-8 h-8 text-terminal-blue mx-auto mb-3" />
            <h4 className="text-terminal-text font-bold mb-2">Fast Execution</h4>
            <p className="text-terminal-text-dim text-sm">Optimized Go binaries for maximum performance.</p>
          </div>
          <div className="text-center p-4">
            <RotateCcw className="w-8 h-8 text-terminal-purple mx-auto mb-3" />
            <h4 className="text-terminal-text font-bold mb-2">Native Terminal</h4>
            <p className="text-terminal-text-dim text-sm">Not an emulator—full access to your underlying system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
