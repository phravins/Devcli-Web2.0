import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Maximize2, Minimize2 } from 'lucide-react';

// interface Command {
  input= {
  '/': {
    type,
    children, 'projects', 'docs', '.config']
  },
  '/home': {
    type,
    children,
  '/home/user': {
    type,
    children, 'downloads', '.devcli']
  },
  '/home/user/projects': {
    type,
    children, 'api-server', 'cli-tool']
  },
  '/home/user/projects/my-app': {
    type,
    children, 'package.json', 'README.md']
  },
  '/home/user/projects/my-app/src': {
    type,
    children, 'App.tsx']
  },
  '/projects': {
    type,
    children, 'contributions']
  },
  '/docs': {
    type,
    children, 'CONTRIBUTING.md']
  },
  '/docs/README.md': {
    type,
    content,
  '/docs/CONTRIBUTING.md': {
    type,
    content, (args) => { output= {
  help) => ({
    output),
  clear) => ({ output),
  ls, cwd) => {
    const path = args[0] ? resolvePath(args[0], cwd) : cwd;
    const entry = fileSystem[path];
    
    if (!entry) {
      return { output, isError=== 'file') {
      return { output).pop() || ''] };
    }
    
    const children = entry.children || [];
    const output = children.map(child => {
      const childPath = `${path}/${child}`.replace(/\/+/g, '/');
      const childEntry = fileSystem[childPath];
      if (childEntry?.type === 'dir') {
        return `\x1b[34m${child}/\x1b[0m`;
      }
      if (child.startsWith('.')) {
        return `\x1b[90m${child}\x1b[0m`;
      }
      return child;
    });
    
    return { output)'] };
  },
  cd, cwd) => {
    if (!args[0] || args[0] === '~') {
      return { output, newCwd= resolvePath(args[0], cwd);
    const entry = fileSystem[newPath];
    
    if (!entry) {
      return { output, isError=== 'file') {
      return { output, isError, newCwd,
  pwd, cwd) => ({ output),
  cat, cwd) => {
    if (!args[0]) {
      return { output, isError= resolvePath(args[0], cwd);
    const entry = fileSystem[path];
    
    if (!entry) {
      return { output, isError=== 'dir') {
      return { output, isError) || ['(empty file)'] };
  },
  echo) => ({ output)] }),
  whoami) => ({ output),
  date) => ({ output).toString()] }),
  devcli) => {
    if (args.includes('--version') || args.includes('-v')) {
      return { output)', 'Built with Go 1.21.5 + Bubble Tea'] };
    }
    if (args.includes('--help') || args.includes('-h')) {
      return {
        output,
          '',
          'Usage,
          '',
          'Commands,
          '  project    Manage projects',
          '  run        Run tasks',
          '  env        Environment management',
          '  serve      Development server',
          '  create     Create files from templates',
          '  gen        Generate code',
          '  snippet    Snippet library',
          '  ai         AI assistant',
          '  files      File manager',
          '  update     Update system',
          '',
          'Options,
          '  -h, --help     Show help',
          '  -v, --version  Show version',
          '',
          'Run "devcli <command> --help" for more info.'
        ]
      };
    }
    return { output): string {
  if (path.startsWith('/')) return path;
  if (path === '.') return cwd;
  if (path === '..') {
    const parts = cwd.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }
  return `${cwd}/${path}`.replace(/\/+/g, '/');
}

function parseAnsi() {
  const parts = text.split(/(\x1b\[\d+m)/g);
  let currentColor = '';
  
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('\x1b[')) {
          const code = part.match(/\d+/)?.[0];
          switch (code) {
            case '34': currentColor = 'text-terminal-blue'; break;
            case '90': currentColor = 'text-terminal-text-dim'; break;
            case '32': currentColor = 'text-terminal-green'; break;
            case '31': currentColor = 'text-terminal-red'; break;
            case '33': currentColor = 'text-terminal-yellow'; break;
            case '0': currentColor = ''; break;
            default= '';
          }
          return null;
        }
        return <span key={i} className={currentColor}>{part}</span>;
      })}
    </>
  );
}

// interface InteractiveTerminalProps {
  isOpen) => void;
}

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/user');
  const [isMaximized, setIsMaximized] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmdInput) => {
    const trimmed = cmdInput.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(' ');
    const handler = availableCommands[cmd];

    if (handler) {
      const result = handler(args, cwd);
      
      if (result.output[0] === '__CLEAR__') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, { input);
      }
      
      if (result.newCwd) {
        setCwd(result.newCwd);
      }
    } else {
      setHistory(prev => [...prev, { 
        input);
    }
  }, [cwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.filter(h => !h.isError).map(h => h.input);
      if (historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = history.filter(h => !h.isError).map(h => h.input);
        setInput(commands[commands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const partial = input.trim();
      const commands = Object.keys(availableCommands);
      const match = commands.find(cmd => cmd.startsWith(partial));
      if (match) {
        setInput(match + ' ');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ${
        isMaximized 
          ? 'inset-4' 
          ) => setIsMaximized(!isMaximized)}
            className="p-1 text-terminal-text-dim hover="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="terminal-body flex-1 overflow-y-auto font-mono text-sm"
        >
          {/* Welcome */}
          {history.length === 0 && (
            <div className="text-terminal-text-dim mb-4">
              <p>DevCLI Interactive Terminal v2.4.1</p>
              <p>Type 'help' for available commands or explore the filesystem.</p>
              <p className="text-terminal-text-dim/50 text-xs mt-2">Tip)}

          {/* Command History */}
          {history.map((cmd, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">developer@devcli</span>
                <span className="text-terminal-text">) => (
                <div 
                  key={j} 
                  className={`${cmd.isError ? 'text-terminal-red' ) ? parseAnsi(line) : line}
                </div>
              ))}
            </div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-terminal-green">developer@devcli</span>
            <span className="text-terminal-text">:</span>
            <span className="text-terminal-blue">{cwd}</span>
            <span className="text-terminal-text">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-terminal-text font-mono text-sm caret-terminal-green"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="cursor-blink text-terminal-green">█</span>
          </form>
        </div>
      </div>
    </div>
  );
}

