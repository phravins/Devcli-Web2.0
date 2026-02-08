import { useState } from 'react';
import { Code2, Play, Save, ChevronRight, Sparkles } from 'lucide-react';

const demoCode = {
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, DevCLI!")
}`,
  typescript: `interface User {
  id: number;
  name: string;
}

const greet = (user: User) => {
  console.log(\`Hello, \${user.name}!\`);
};`,
  python: `def greet(name):
    print(f"Hello, {name}!")

if __name__ == "__main__":
    greet("DevCLI")`
};

export default function CodePlayground() {
  const [lang, setLang] = useState('go');
  const [code, setCode] = useState(demoCode.go);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(demoCode[newLang]);
    setOutput('');
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('> Compiling...\\n> Running execution environment...\\n');

    setTimeout(() => {
      let result = '';
      if (lang === 'go') result = 'Hello, DevCLI!\\n\\nProgram exited with code 0';
      if (lang === 'typescript') result = 'Hello, Developer!\\n\\nProgram exited with code 0';
      if (lang === 'python') result = 'Hello, DevCLI!\\n\\nProgram exited with code 0';

      setOutput(prev => prev + result);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="terminal-window h-[600px] flex flex-col shadow-glow-blue border-terminal-blue/30">
      <div className="terminal-header flex justify-between">
        <div className="flex gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <div className="flex gap-4">
          {Object.keys(demoCode).map(l => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${lang === l ? 'text-terminal-blue' : 'text-terminal-text-dim hover:text-terminal-text'
                }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
        {/* Editor Area */}
        <div className="border-r border-terminal-border flex flex-col bg-terminal-bg/50">
          <div className="p-2 border-b border-terminal-border flex justify-between items-center bg-terminal-bg">
            <span className="text-[10px] text-terminal-text-dim font-mono flex items-center gap-1">
              <Code2 className="w-3 h-3" /> editor.{lang === 'typescript' ? 'ts' : lang}
            </span>
            <div className="flex gap-2">
              <button className="text-terminal-text-dim hover:text-terminal-text"><Save className="w-3.5 h-3.5" /></button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`flex items-center gap-1 px-3 py-1 rounded bg-terminal-blue/20 text-terminal-blue text-[10px] font-bold hover:bg-terminal-blue transition-all disabled:opacity-50`}
              >
                <Play className="w-3 h-3 fill-current" /> RUN
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-auto text-terminal-text selection:bg-terminal-blue/30 whitespace-pre">
            {code}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Output Area */}
        <div className="flex flex-col bg-terminal-bg">
          <div className="p-2 border-b border-terminal-border bg-terminal-bg">
            <span className="text-[10px] text-terminal-text-dim font-mono">Console Output</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-auto text-terminal-text-dim space-y-2">
            {output.split('\\n').map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-terminal-blue/70' : 'text-terminal-text'}>
                {line}
              </div>
            ))}
            {!output && !isRunning && (
              <div className="text-terminal-text-dim opacity-30 italic">Click "RUN" to execute code...</div>
            )}
            {isRunning && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-terminal-blue rounded-full animate-ping" />
                <span>Executing...</span>
              </div>
            )}
          </div>

          {/* AI Helper Bar */}
          <div className="p-3 border-t border-terminal-border bg-terminal-blue/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terminal-purple" />
              <span className="text-[10px] text-terminal-text-dim">AI: No issues detected in current snippet.</span>
            </div>
            <ChevronRight className="w-4 h-4 text-terminal-text-dim" />
          </div>
        </div>
      </div>
    </div>
  );
}
