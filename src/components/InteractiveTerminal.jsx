import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Maximize2, Minimize2, X, ChevronRight } from 'lucide-react';

const fileSystem = {
  '/': {
    type: 'dir',
    children: ['home', 'projects', 'docs', '.config']
  },
  '/home': {
    type: 'dir',
    children: ['user']
  },
  '/home/user': {
    type: 'dir',
    children: ['projects', 'downloads', '.devcli']
  },
  '/home/user/projects': {
    type: 'dir',
    children: ['api-server', 'cli-tool', 'my-app']
  },
  '/home/user/projects/my-app': {
    type: 'dir',
    children: ['src', 'package.json', 'README.md']
  },
  '/home/user/projects/my-app/src': {
    type: 'dir',
    children: ['App.jsx', 'index.css']
  },
  '/projects': {
    type: 'dir',
    children: ['contributions']
  },
  '/docs': {
    type: 'dir',
    children: ['README.md', 'CONTRIBUTING.md']
  },
  '/docs/README.md': {
    type: 'file',
    content: ['# DevCLI Documentation', '', 'DevCLI is a next-generation terminal interface for developers.']
  },
  '/docs/CONTRIBUTING.md': {
    type: 'file',
    content: ['# Contributing Guide', '', 'Please read our contributing guidelines before submitting a PR.']
  }
};

const resolvePath = (path, cwd) => {
  if (path.startsWith('/')) return path;
  if (path === '.') return cwd;
  if (path === '..') {
    const parts = cwd.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }
  return `${cwd}/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
};

const availableCommands = {
  help: () => ({
    output: [
      'Available commands:',
      '  help      - Show this help message',
      '  ls [path] - List directory contents',
      '  cd [path] - Change current directory',
      '  pwd       - Show current directory',
      '  cat [file]- Show file content',
      '  clear     - Clear terminal history',
      '  echo [msg]- Echo a message',
      '  whoami    - Show current user',
      '  date      - Show current date',
      '  devcli    - DevCLI system utility',
    ]
  }),
  clear: () => ({ output: ['__CLEAR__'] }),
  ls: (args, cwd) => {
    const path = args[0] ? resolvePath(args[0], cwd) : cwd;
    const entry = fileSystem[path];

    if (!entry) {
      return { output: [`ls: ${args[0]}: No such file or directory`], isError: true };
    }

    if (entry.type === 'file') {
      return { output: [args[0]] };
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

    return { output: [output.join('  ')] };
  },
  cd: (args, cwd) => {
    if (!args[0] || args[0] === '~') {
      return { output: [], newCwd: '/home/user' };
    }
    const newPath = resolvePath(args[0], cwd);
    const entry = fileSystem[newPath];

    if (!entry) {
      return { output: [`cd: ${args[0]}: No such file or directory`], isError: true };
    }
    if (entry.type === 'file') {
      return { output: [`cd: ${args[0]}: Not a directory`], isError: true };
    }
    return { output: [], newCwd: newPath };
  },
  pwd: (args, cwd) => ({ output: [cwd] }),
  cat: (args, cwd) => {
    if (!args[0]) {
      return { output: ['usage: cat [file]'], isError: true };
    }
    const path = resolvePath(args[0], cwd);
    const entry = fileSystem[path];

    if (!entry) {
      return { output: [`cat: ${args[0]}: No such file or directory`], isError: true };
    }
    if (entry.type === 'dir') {
      return { output: [`cat: ${args[0]}: Is a directory`], isError: true };
    }
    return { output: entry.content || ['(empty file)'] };
  },
  echo: (args) => ({ output: [args.join(' ')] }),
  whoami: () => ({ output: ['developer'] }),
  date: () => ({ output: [new Date().toString()] }),
  devcli: (args) => {
    if (args.includes('--version') || args.includes('-v')) {
      return { output: ['devcli version 2.4.1 (linux/amd64)', 'Built with React 19 + Vite'] };
    }
    if (args.includes('--help') || args.includes('-h')) {
      return {
        output: [
          'DevCLI - Modern Developers Utility',
          '',
          'Usage: devcli [command] [options]',
          '',
          'Commands:',
          '  project    Manage projects',
          '  run        Run tasks',
          '  env        Environment management',
          '  serve      Development server',
          '',
          'Options:',
          '  -h, --help     Show help',
          '  -v, --version  Show version'
        ]
      };
    }
    return { output: ['Usage: devcli [command] [options]. See "devcli --help" for info.'] };
  }
};

const parseAnsi = (text) => {
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
            default: currentColor = '';
          }
          return null;
        }
        return <span key={i} className={currentColor}>{part}</span>;
      })}
    </>
  );
};

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
        setHistory(prev => [...prev, {
          input: cmdInput,
          output: result.output,
          isError: result.isError,
          cwd: cwd
        }]);
      }

      if (result.newCwd) {
        setCwd(result.newCwd);
      }
    } else {
      setHistory(prev => [...prev, {
        input: cmdInput,
        output: [`Command not found: ${cmd}. Type 'help' for assistance.`],
        isError: true,
        cwd: cwd
      }]);
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
      const commands = history.map(h => h.input);
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
        const commands = history.map(h => h.input);
        setInput(commands[commands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
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
      className={`fixed z-[100] transition-all duration-300 flex flex-col ${isMaximized
          ? 'inset-4 bg-terminal-bg'
          : 'bottom-20 right-6 w-full max-w-2xl h-[400px] shadow-2xl'
        }`}
    >
      <div className="terminal-window h-full flex flex-col border border-terminal-green/30">
        <div className="terminal-header flex items-center justify-between px-4 py-2 bg-terminal-bg-light border-b border-terminal-border">
          <div className="flex items-center gap-2">
            <div className="terminal-dot terminal-dot-red" onClick={onClose} />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-4 text-terminal-text-dim text-xs font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Interactive Shell
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-terminal-text-dim hover:text-terminal-text"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="p-1 text-terminal-text-dim hover:text-terminal-red">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={terminalRef}
          className="terminal-body flex-1 overflow-y-auto font-mono text-sm p-4 bg-terminal-bg/95 backdrop-blur-md"
          onClick={() => inputRef.current?.focus()}
        >
          {history.length === 0 && (
            <div className="text-terminal-text-dim mb-4 space-y-1">
              <p className="text-terminal-green font-bold">DevCLI v2.4.1 (Stable)</p>
              <p>Type 'help' for available commands.</p>
              <p className="text-xs opacity-50">Press ESC or Close to exit.</p>
            </div>
          )}

          {history.map((cmd, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">developer@devcli</span>
                <span className="text-terminal-text">:</span>
                <span className="text-terminal-blue">{cmd.cwd}</span>
                <span className="text-terminal-text">$</span>
                <span className="text-terminal-text">{cmd.input}</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {cmd.output.map((line, j) => (
                  <div
                    key={j}
                    className={`${cmd.isError ? 'text-terminal-red' : 'text-terminal-text'} whitespace-pre-wrap leading-relaxed`}
                  >
                    {line.includes('\x1b[') ? parseAnsi(line) : line}
                  </div>
                ))}
              </div>
            </div>
          ))}

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
            <span className="animate-pulse text-terminal-green">█</span>
          </form>
        </div>
      </div>
    </div>
  );
}
