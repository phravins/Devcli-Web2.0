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

// interface Feature {
  id= [
  {
    id,
    icon,
    name,
    command,
    description, templates, and history tracking',
    details,
      'Track recent projects with metadata',
      'One-command project switching',
      'Custom template repository support',
    ],
    example) - 2 days ago
  2. api-server (go) - 1 week ago
  3. ml-pipeline (python) - 2 weeks ago`,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description, test, and lint commands',
    details,
      'Supports Go, Python, Node, Rust, C++',
      'Parallel task execution',
      'Custom task definitions in devcli.yaml',
    ],
    example)
❯ build    - Build the project
  test     - Run test suite
  lint     - Run linter
  dev      - Start development server

$ devcli run build
✓ Building... (3.2s)
✓ Build complete,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'Node.js version management with nvm',
      'Docker container orchestration',
      'Environment variable management',
    ],
    example,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'Live reload on file changes',
      'HTTPS support with local certs',
      'Proxy configuration for APIs',
    ],
    example,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description, .env, Makefiles, and CI/CD configs',
    details,
      'Context-aware generation',
      'Interactive configuration wizard',
      'Custom template support',
    ],
    example)
✓ Size optimized,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'API endpoint scaffolding',
      'Database models and migrations',
      'Test file generation',
    ],
    example, price, stock,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'Full-text search across snippets',
      'Syntax highlighting for 50+ languages',
      'Sync across devices',
    ],
    example, middleware, jwt
✓ Snippet saved

$ devcli snippet search "jwt"
  1. JWT Auth Middleware (go)
  2. JWT Refresh Token (typescript)
  3. JWT Claims Parser (python)`,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description, debugging, and explanations',
    details,
      'Debug error messages',
      'Explain complex code',
      'Generate documentation',
    ],
    example) Database"

The issue is that your function expects an interface type 
'Database', but you're passing a concrete type '*sql.DB'.

Fix= (*sql.DB)(nil) // compile-time check`,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'Fuzzy file finder',
      'Inline file preview',
      'Batch operations support',
    ],
    example,
    color,
  },
  {
    id,
    icon,
    name,
    command,
    description,
    details,
      'One-command updates',
      'Rollback to previous versions',
      'Update notifications',
    ],
    example)
⚠ go)

$ devcli update all
✓ Updated go to v1.21.5
✓ Updated node to v20.5.0
✓ All tools are up to date`,
    color,
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
    <div className="min-h-screen py-20 px-4 sm) => {
              const Icon = feature.icon;
              const isActive = feature.id === activeFeature.id;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                    isActive
                      ? 'bg-terminal-bg-light border-terminal-green shadow-terminal'
                      : 'bg-terminal-bg border-terminal-border hover="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${feature.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isActive ? 'text-terminal-text' : 'text-terminal-text-dim group-hover="w-4 h-4 text-terminal-green" />
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
          <div className="lg="terminal-window h-full terminal-glow-blue">
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
                  <span className="text-terminal-text-dim text-sm">Try it="bg-terminal-bg-light px-3 py-1.5 rounded text-terminal-green text-sm">
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

