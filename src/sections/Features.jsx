import { useState } from 'react';
import {
  FolderGit2,
  Play,
  Container,
  Server,
  FileCode,
  Layers,
  Library,
  Bot,
  FolderOpen,
  RefreshCw,
  ChevronRight,
  Check
} from 'lucide-react';

const features = [
  {
    id: 'projects',
    icon: FolderGit2,
    name: 'Project Manager',
    command: 'devcli project',
    description: 'Track recent projects with metadata, templates, and history tracking',
    details: [
      'Track recent projects with metadata',
      'One-command project switching',
      'Custom template repository support',
    ],
    example: `$ devcli project list
1. devcli-web (react) - 2 days ago
2. api-server (go) - 1 week ago
3. ml-pipeline (python) - 2 weeks ago`,
    color: 'text-blue-500',
  },
  {
    id: 'runner',
    icon: Play,
    name: 'Task Runner',
    command: 'devcli run',
    description: 'Run build, test, and lint commands',
    details: [
      'Supports Go, Python, Node, Rust, C++',
      'Parallel task execution',
      'Custom task definitions in devcli.yaml',
    ],
    example: `$ devcli run --help
❯ build    - Build the project
  test     - Run test suite
  lint     - Run linter
  dev      - Start development server

$ devcli run build
✓ Building... (3.2s)
✓ Build complete`,
    color: 'text-green-500',
  },
  {
    id: 'env',
    icon: Container,
    name: 'Environment',
    command: 'devcli env',
    description: 'Manage Docker and Node.js environments',
    details: [
      'Node.js version management with nvm',
      'Docker container orchestration',
      'Environment variable management',
    ],
    example: `$ devcli env status
Node: v20.11.0 (LTS)
Docker: Running (3 containers)
System: Healthy`,
    color: 'text-cyan-500',
  },
  {
    id: 'server',
    icon: Server,
    name: 'Dev Server',
    command: 'devcli dev',
    description: 'Live reload on file changes',
    details: [
      'Live reload on file changes',
      'HTTPS support with local certs',
      'Proxy configuration for APIs',
    ],
    example: `$ devcli dev
Scanning for entry points...
🚀 Dev server running at http://localhost:3000
Watching for changes...`,
    color: 'text-orange-500',
  },
  {
    id: 'scaffold',
    icon: FileCode,
    name: 'Scaffolding',
    command: 'devcli init',
    description: 'Initialize .env, Makefiles, and CI/CD configs',
    details: [
      'Context-aware generation',
      'Interactive configuration wizard',
      'Custom template support',
    ],
    example: `$ devcli init
? Project name: my-app
? Select template: React + Tailwind
? Enable CI/CD: Yes (GitHub Actions)

✓ Created .env
✓ Created Makefile
✓ Created .github/workflows`,
    color: 'text-purple-500',
  },
  {
    id: 'api',
    icon: Layers,
    name: 'API Generator',
    command: 'devcli api',
    description: 'Generate API endpoints and models',
    details: [
      'API endpoint scaffolding',
      'Database models and migrations',
      'Test file generation',
    ],
    example: `$ devcli api model User id:int name:string
✓ Created internal/models/user.go
✓ Created internal/db/migrations/001_create_users.sql`,
    color: 'text-yellow-500',
  },
  {
    id: 'snippet',
    icon: Library,
    name: 'Snippet Manager',
    command: 'devcli snippet',
    description: 'Full-text search across snippets',
    details: [
      'Full-text search across snippets',
      'Syntax highlighting for 50+ languages',
      'Sync across devices',
    ],
    example: `$ devcli snippet save auth.go --name "JWT Middleware"
✓ Snippet saved

$ devcli snippet search "jwt"
1. JWT Auth Middleware (go)
2. JWT Refresh Token (typescript)
3. JWT Claims Parser (python)`,
    color: 'text-pink-500',
  },
  {
    id: 'ai',
    icon: Bot,
    name: 'AI Assistant',
    command: 'devcli ai',
    description: 'AI-powered debugging and explanations',
    details: [
      'Debug error messages',
      'Explain complex code',
      'Generate documentation',
    ],
    example: `$ devcli ai explain "func(db *sql.DB) Database"

The issue is that your function expects an interface type 
'Database', but you're passing a concrete type '*sql.DB'.

Fix: var _ Database = (*sql.DB)(nil) // compile-time check`,
    color: 'text-indigo-500',
  },
  {
    id: 'files',
    icon: FolderOpen,
    name: 'File Explorer',
    command: 'devcli file',
    description: 'Browse and preview files',
    details: [
      'Fuzzy file finder',
      'Inline file preview',
      'Batch operations support',
    ],
    example: `$ devcli file find "user_controller"
1. app/controllers/user_controller.rb
2. app/controllers/api/v1/user_controller.rb`,
    color: 'text-amber-500',
  },
  {
    id: 'update',
    icon: RefreshCw,
    name: 'Updater',
    command: 'devcli update',
    description: 'Keep your tools up to date',
    details: [
      'One-command updates',
      'Rollback to previous versions',
      'Update notifications',
    ],
    example: `$ devcli update status
⚠ 3 tools have newer versions available

$ devcli update all
✓ Updated go to v1.21.5
✓ Updated node to v20.5.0
✓ All tools are up to date`,
    color: 'text-emerald-500',
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFeatureClick = (feature) => {
    if (feature.id === activeFeature.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFeature(feature);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div id="features" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-terminal-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal-text mb-4">
            Powerful Features for Modern Devs
          </h2>
          <p className="text-terminal-text-dim max-w-2xl mx-auto">
            Everything you need to build, manage, and scale your applications from the terminal.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Feature List */}
          <div className="lg:col-span-4 space-y-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = feature.id === activeFeature.id;

              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${isActive
                      ? 'bg-terminal-bg-light border-terminal-green shadow-terminal'
                      : 'bg-terminal-bg border-terminal-border hover:border-terminal-blue'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${feature.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isActive ? 'text-terminal-text' : 'text-terminal-text-dim group-hover:text-terminal-text'}`}>
                          {feature.name}
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-terminal-green" />
                        )}
                      </div>
                      <p className="text-xs text-terminal-text-dim mt-1 truncate">
                        {feature.command}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Detail Terminal */}
          <div className="lg:col-span-8">
            <div className="terminal-window h-full terminal-glow-blue">
              {/* Terminal Header */}
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-terminal-text-dim text-sm">
                  {activeFeature.command} --help
                </span>
              </div>

              {/* Terminal Body */}
              <div className={`terminal-body space-y-6 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {/* Feature Header */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <activeFeature.icon className={`w-6 h-6 ${activeFeature.color}`} />
                    <h3 className="text-xl font-bold text-terminal-text">
                      {activeFeature.name}
                    </h3>
                  </div>
                  <p className="text-terminal-text-dim">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Features List */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-3"># Key capabilities</p>
                  <ul className="space-y-2">
                    {activeFeature.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
                        <span className="text-terminal-text">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Usage */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-3"># Example usage</p>
                  <pre className="bg-terminal-bg-light rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="text-terminal-text whitespace-pre">
                      {activeFeature.example}
                    </code>
                  </pre>
                </div>

                {/* Quick Action */}
                <div className="flex items-center gap-4 pt-4 border-t border-terminal-border">
                  <span className="text-terminal-text-dim text-sm">Try it now:</span>
                  <code className="bg-terminal-bg-light px-3 py-1.5 rounded text-terminal-green text-sm">
                    {activeFeature.command} --help
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
