import { useState } from 'react';
import { Search, ChevronRight, Terminal, Copy, Check } from 'lucide-react';

const commands = [
  {
    name: 'project',
    description: 'Track recent projects with metadata, templates, and history tracking',
    usage: 'devcli project [command] [flags]',
    examples: [
      { cmd: 'devcli project list', desc: 'List all tracked projects' },
      { cmd: 'devcli project add .', desc: 'Add current directory to projects' },
      { cmd: 'devcli project open my-app', desc: 'Open a project in your editor' },
    ],
    flags: [
      { flag: '-l, --list', desc: 'Show project list' },
      { flag: '-t, --template', desc: 'Specify template for new projects' },
      { flag: '-p, --path', desc: 'Set custom project path' },
    ],
    category: 'Project',
  },
  {
    name: 'run',
    description: 'Run build, test, and lint commands with auto-detection',
    usage: 'devcli run [task] [flags]',
    examples: [
      { cmd: 'devcli run build', desc: 'Build the project' },
      { cmd: 'devcli run test', desc: 'Run test suite' },
      { cmd: 'devcli run dev', desc: 'Start development server' },
    ],
    flags: [
      { flag: '-w, --watch', desc: 'Watch for file changes' },
      { flag: '--parallel', desc: 'Run multiple tasks in parallel' },
      { flag: '--env', desc: 'Set environment (dev/prod)' },
    ],
    category: 'Workflow',
  },
  {
    name: 'env',
    description: 'Manage development environments (Docker, Node.js, and more)',
    usage: 'devcli env [tool] [command]',
    examples: [
      { cmd: 'devcli env status', desc: 'Check environment health' },
      { cmd: 'devcli env install node@20', desc: 'Install specific node version' },
      { cmd: 'devcli env up', desc: 'Start project containers' },
    ],
    flags: [
      { flag: '-n, --name', desc: 'Specify container name' },
      { flag: '-v, --version', desc: 'Set tool version' },
      { flag: '--force', desc: 'Force environment reset' },
    ],
    category: 'Environment',
  },
  {
    name: 'dev',
    description: 'Start development server with live reload',
    usage: 'devcli dev [flags]',
    examples: [
      { cmd: 'devcli dev', desc: 'Start default dev server' },
      { cmd: 'devcli dev --port 4000', desc: 'Start on custom port' },
      { cmd: 'devcli dev --https', desc: 'Enable HTTPS support' },
    ],
    flags: [
      { flag: '-p, --port', desc: 'Set server port' },
      { flag: '-h, --host', desc: 'Set server host' },
      { flag: '--open', desc: 'Open browser automatically' },
      { flag: '--cors', desc: 'Enable CORS' },
    ],
    category: 'Workflow',
  },
  {
    name: 'init',
    description: 'Initialize project configs (.env, CI/CD, configs)',
    usage: 'devcli init [flags]',
    examples: [
      { cmd: 'devcli init', desc: 'Start interactive setup' },
      { cmd: 'devcli init --ci github', desc: 'Initialize GitHub Actions' },
      { cmd: 'devcli init --docker', desc: 'Generate Dockerfile' },
    ],
    flags: [
      { flag: '-l, --lang', desc: 'Specify project language' },
      { flag: '--ci', desc: 'Specify CI/CD provider (github/gitlab/etc.)' },
      { flag: '-o, --overwrite', desc: 'Overwrite existing files' },
    ],
    category: 'Setup',
  },
  {
    name: 'api',
    description: 'Generate API endpoints, models, and migrations',
    usage: 'devcli api [type] [name]',
    examples: [
      { cmd: 'devcli api endpoint user', desc: 'Create user endpoint' },
      { cmd: 'devcli api model product', desc: 'Create product model' },
      { cmd: 'devcli api migrate init', desc: 'Initialize migrations' },
    ],
    flags: [
      { flag: '-r, --route', desc: 'Specify custom route path' },
      { flag: '--db', desc: 'Database type (postgres/mysql/etc.)' },
      { flag: '-f, --format', desc: 'Output format (json/xml)' },
      { flag: '--dry-run', desc: 'Show changes without writing' },
    ],
    category: 'Generator',
  },
  {
    name: 'snippet',
    description: 'Save and search through your code snippets',
    usage: 'devcli snippet [command]',
    examples: [
      { cmd: 'devcli snippet list', desc: 'Show all snippets' },
      { cmd: 'devcli snippet save main.go', desc: 'Save a file as snippet' },
      { cmd: 'devcli snippet search "auth"', desc: 'Search snippets' },
    ],
    flags: [
      { flag: '-n, --name', desc: 'Custom name for snippet' },
      { flag: '-l, --lang', desc: 'Set snippet language' },
      { flag: '-t, --tag', desc: 'Add tags to snippet' },
    ],
    category: 'Tools',
  },
  {
    name: 'ai',
    description: 'AI-assisted debugging and code explanation',
    usage: 'devcli ai [message]',
    examples: [
      { cmd: 'devcli ai debug "ReferenceError"', desc: 'Debug an error' },
      { cmd: 'devcli ai explain ./utils.go', desc: 'Explain file logic' },
      { cmd: 'devcli ai doc ./lib', desc: 'Generate documentation' },
    ],
    flags: [
      { flag: '-f, --file', desc: 'Provide context file' },
      { flag: '-c, --context', desc: 'Specify context depth' },
      { flag: '-m, --model', desc: 'Select AI model' },
    ],
    category: 'Tools',
  },
  {
    name: 'file',
    description: 'Power-user file operations and fuzzy search',
    usage: 'devcli file [command] [query]',
    examples: [
      { cmd: 'devcli file find "config"', desc: 'Search for file name' },
      { cmd: 'devcli file read ./env', desc: 'Preview file content' },
      { cmd: 'devcli file count', desc: 'Show project stats' },
    ],
    flags: [
      { flag: '-p, --path', desc: 'Set search path' },
      { flag: '-s, --size', desc: 'Filter by file size' },
      { flag: '-a, --all', desc: 'Include hidden files' },
    ],
    category: 'Tools',
  },
  {
    name: 'update',
    description: 'One-command updates for all your dev tools',
    usage: 'devcli update [command]',
    examples: [
      { cmd: 'devcli update check', desc: 'Check for updates' },
      { cmd: 'devcli update all', desc: 'Update all tools' },
      { cmd: 'devcli update self', desc: 'Update devcli itself' },
    ],
    flags: [
      { flag: '-f, --force', desc: 'Force updates' },
      { flag: '--no-restart', desc: 'Don\'t restart services' },
      { flag: '--verbose', desc: 'Show update details' },
    ],
    category: 'System',
  },
];

const categories = ['All', ...Array.from(new Set(commands.map(c => c.category)))];

export default function Commands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCommand, setSelectedCommand] = useState(commands[0]);
  const [copied, setCopied] = useState(null);

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyCommand = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div id="commands" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal-text mb-4">
            Command Reference
          </h2>
          <p className="text-terminal-text-dim max-w-2xl mx-auto">
            Comprehensive guide to all devcli commands and options.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-text-dim" />
              <input
                type="text"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-terminal-bg-light border border-terminal-border rounded-lg pl-10 pr-4 py-2 text-terminal-text focus:outline-none focus:border-terminal-green transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${selectedCategory === cat
                      ? 'bg-terminal-green/20 border-terminal-green text-terminal-green'
                      : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover:text-terminal-text hover:border-terminal-text'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Command List */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => setSelectedCommand(cmd)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${selectedCommand.name === cmd.name
                      ? 'bg-terminal-green/10 border-terminal-green'
                      : 'bg-terminal-bg border-terminal-border hover:border-terminal-blue'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-medium ${selectedCommand.name === cmd.name ? 'text-terminal-green' : 'text-terminal-text'
                      }`}>
                      {cmd.name}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${selectedCommand.name === cmd.name ? 'text-terminal-green' : 'text-terminal-text-dim'
                      }`} />
                  </div>
                  <p className="text-xs text-terminal-text-dim mt-1 truncate">
                    {cmd.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Command Details */}
          <div className="lg:col-span-8">
            <div className="terminal-window h-full">
              {/* Terminal Header */}
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-terminal-text-dim text-sm font-mono">
                  man devcli {selectedCommand.name}
                </span>
              </div>

              {/* Terminal Body */}
              <div className="terminal-body space-y-6">
                {/* Command Header */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-terminal-green" />
                    <h3 className="text-xl font-bold text-terminal-text font-mono">
                      {selectedCommand.name}
                    </h3>
                    <span className="text-xs bg-terminal-blue/20 text-terminal-blue px-2 py-1 rounded">
                      {selectedCommand.category}
                    </span>
                  </div>
                  <p className="text-terminal-text-dim">
                    {selectedCommand.description}
                  </p>
                </div>

                {/* Usage */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-2 font-mono"># Usage</p>
                  <div className="bg-terminal-bg-light rounded-lg p-3 border border-terminal-border">
                    <code className="text-terminal-green font-mono text-sm">
                      {selectedCommand.usage}
                    </code>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-3 font-mono"># Examples</p>
                  <div className="space-y-2">
                    {selectedCommand.examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-terminal-bg-light rounded-lg p-3 border border-terminal-border group hover:border-terminal-green transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <code className="text-terminal-text font-mono text-sm">
                            {example.cmd}
                          </code>
                          <button
                            onClick={() => copyCommand(example.cmd, `example-${index}`)}
                            className="text-terminal-text-dim hover:text-terminal-green transition-colors"
                          >
                            {copied === `example-${index}` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-terminal-text-dim text-xs mt-2 font-mono">
                          // {example.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                {selectedCommand.flags && (
                  <div>
                    <p className="text-terminal-text-dim text-sm mb-3 font-mono"># Flags</p>
                    <div className="space-y-2">
                      {selectedCommand.flags.map((flag, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 py-2 border-b border-terminal-border last:border-0"
                        >
                          <code className="text-terminal-blue font-mono text-sm whitespace-nowrap">
                            {flag.flag}
                          </code>
                          <p className="text-terminal-text text-sm">
                            {flag.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* See Also */}
                <div className="pt-4 border-t border-terminal-border">
                  <p className="text-terminal-text-dim text-sm mb-2 font-mono"># See also</p>
                  <div className="flex flex-wrap gap-2">
                    {commands
                      .filter(c => c.category === selectedCommand.category && c.name !== selectedCommand.name)
                      .slice(0, 3)
                      .map(cmd => (
                        <button
                          key={cmd.name}
                          onClick={() => setSelectedCommand(cmd)}
                          className="text-terminal-blue hover:underline text-sm font-mono"
                        >
                          {cmd.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
