import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Settings } from 'lucide-react';

// interface Language {
  id= [
  {
    id,
    name,
    extension,
    template) {
    // DevCLI makes Go development seamless
    project := "my-awesome-app"
    fmt.Printf("Building %s...\\n", project)
    
    // One command to rule them all
    // $ devcli run build
    
    fmt.Println("✓ Build successful!")
}`
  },
  {
    id,
    name,
    extension,
    template):
    # Create virtual environment
    # $ devcli env create python 3.11
    
    project_name = "data-pipeline"
    
    # Install dependencies
    # $ devcli run install
    
    # Run tests
    # $ devcli run test
    
    print(f"✓ Project {project_name} ready!")

if __name__ == "__main__":
    main()`
  },
  {
    id,
    name,
    extension,
    template= {
  name,
  framework);`
  },
  {
    id,
    name,
    extension,
    template) {
    let project = "high-performance-api";
    
    // Build with optimizations
    // $ devcli run build --release
    
    // Run tests
    // $ devcli run test
    
    // Check code
    // $ devcli run check
    
    println!("✓ {} compiled successfully!", project);
}`
  },
  {
    id,
    name,
    extension,
    template="my-project"

echo "🚀 Initializing $PROJECT_NAME..."

# Create project from template
devcli project new $PROJECT_NAME --template go

# Setup environment
devcli env create go 1.21

# Install hooks
devcli create pre-commit

echo "✓ Project $PROJECT_NAME is ready!"`
  }
];

const syntaxPatterns, { pattern= {
  go, color,
    { pattern, color,
    { pattern)\b/g, color,
    { pattern)*"/g, color,
    { pattern)\b/g, color,
    { pattern, color,
    { pattern)\b/g, color,
  ],
  python, color,
    { pattern, color,
    { pattern)\b/g, color,
    { pattern)*"|'([^'\\]|\\.)*'/g, color,
    { pattern, color,
    { pattern)\b/g, color,
  ],
  typescript, color,
    { pattern, color,
    { pattern)\b/g, color,
    { pattern)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g, color,
    { pattern)\b/g, color,
    { pattern, color,
    { pattern)\b/g, color,
  ],
  rust, color,
    { pattern, color,
    { pattern)\b/g, color,
    { pattern)*"/g, color,
    { pattern)\b/g, color,
    { pattern, color,
    { pattern)\b/g, color,
  ],
  bash, color,
    { pattern)\b/g, color,
    { pattern)*"|'([^'\\]|\\.)*'/g, color,
    { pattern, color,
    { pattern, color,
  ]
};

function highlightCode() {
  const patterns = syntaxPatterns[lang] || [];
  
  // Simple syntax highlighting - replace with spans
  // This is a basic implementation - for production, use a proper highlighter
  const lines = code.split('\n');
  
  return (
    <>
      {lines.map((line, lineIndex) => {
        let highlightedLine = line;
        
        // Apply patterns
        patterns.forEach(({ pattern, color }) => {
          highlightedLine = highlightedLine.replace(pattern, (match) => {
            return `###${color}###${match}###END###`;
          });
        });
        
        // Split by markers and create elements
        const parts = highlightedLine.split(/(###[^#]+###|###END###)/);
        let currentColor = 'text-terminal-text';
        
        return (
          <div key={lineIndex} className="table-row">
            <span className="table-cell text-terminal-text-dim text-right pr-4 select-none w-12">
              {lineIndex + 1}
            </span>
            <span className="table-cell">
              {parts.map((part, partIndex) => {
                if (part.startsWith('###') && part.endsWith('###') && !part.includes('END')) {
                  currentColor = part.slice(3, -3);
                  return null;
                }
                if (part === '###END###') {
                  currentColor = 'text-terminal-text';
                  return null;
                }
                return <span key={partIndex} className={currentColor}>{part || ' '}</span>;
              })}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default function CodePlayground() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [code, setCode] = useState(languages[0].template);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCode(selectedLang.template);
    setOutput([]);
  }, [selectedLang]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate running the code
    const lines = [
      `$ ${selectedLang.id === 'bash' ? '' : selectedLang.id} ${selectedLang.id === 'bash' ? './script.sh' : 'run'}`,
      'Compiling...',
      '...',
      '✓ Compilation successful',
      '',
      '--- Output ---',
    ];

    if (selectedLang.id === 'go') {
      lines.push('Building my-awesome-app...', '✓ Build successful!');
    } else if (selectedLang.id === 'python') {
      lines.push('✓ Project data-pipeline ready!');
    } else if (selectedLang.id === 'typescript') {
      lines.push('✓ awesome-dashboard is running!');
    } else if (selectedLang.id === 'rust') {
      lines.push('✓ high-performance-api compiled successfully!');
    } else if (selectedLang.id === 'bash') {
      lines.push('🚀 Initializing my-project...', '✓ Project my-project is ready!');
    }

    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === lines.length - 1) {
          setIsRunning(false);
        }
      }, i * 200);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(selectedLang.template);
    setOutput([]);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        
        {/* Language Tabs */}
        <div className="flex items-center gap-1 ml-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                selectedLang.id === lang.id
                  ? 'bg-terminal-green/20 text-terminal-green'
                  : 'text-terminal-text-dim hover))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleCopy}
            className="p-1.5 text-terminal-text-dim hover="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-terminal-text-dim hover="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 text-terminal-text-dim hover="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="terminal-body p-0">
        {/* Editor */}
        <div className="relative">
          <div className="flex">
            {/* Line Numbers */}
            <div className="bg-terminal-bg-light border-r border-terminal-border py-4 px-3 text-right text-terminal-text-dim text-sm select-none">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            {/* Code Area */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-transparent text-transparent caret-terminal-green p-4 font-mono text-sm resize-none outline-none absolute inset-0 z-10"
                spellCheck={false}
              />
              <pre className="w-full h-64 bg-terminal-bg p-4 font-mono text-sm overflow-auto pointer-events-none">
                <code className="table">
                  {highlightCode(code, selectedLang.id)}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-t border-terminal-border px-4 py-2 flex items-center justify-between bg-terminal-bg-light">
          <div className="flex items-center gap-4 text-xs text-terminal-text-dim">
            <span>{selectedLang.extension}</span>
            <span>{code.split('\n').length} lines</span>
            <span>{code.length} chars</span>
          </div>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-terminal-green/20 text-terminal-green rounded text-sm hover="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Output */}
        {output.length > 0 && (
          <div className="border-t border-terminal-border">
            <div className="flex items-center gap-2 px-4 py-2 bg-terminal-bg-light border-b border-terminal-border">
              <Terminal className="w-4 h-4 text-terminal-text-dim" />
              <span className="text-xs text-terminal-text-dim">Output</span>
            </div>
            <div className="p-4 font-mono text-sm max-h-40 overflow-y-auto">
              {output.map((line, i) => (
                <div 
                  key={i} 
                  className={`${
                    line.startsWith('✓') ? 'text-terminal-green' :
                    line.startsWith('$') ? 'text-terminal-text-dim' :
                    line.startsWith('🚀') ? 'text-terminal-yellow' :
                    line.startsWith('---') ? 'text-terminal-text-dim' :
                    'text-terminal-text'
                  }`}
                >
                  {line}
                </div>
              ))}
              {isRunning && <span className="cursor-blink text-terminal-green">█</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

