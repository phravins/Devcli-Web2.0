import PageLayout from '../components/PageLayout';
import { Terminal, Book, Code, Play, Settings, Zap } from 'lucide-react';

const sections = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: Play,
        content: [
            {
                subtitle: 'Installation',
                text: 'Install DevCLI globally using npm or download the binary directly:',
                code: `# Using npm (recommended)
npm install -g devcli

# Using curl (Unix/Linux/macOS)
curl -fsSL https://devcli.sh/install.sh | bash

# Using PowerShell (Windows)
iwr -useb https://devcli.sh/install.ps1 | iex`,
            },
            {
                subtitle: 'Quick Start',
                text: 'Initialize your first DevCLI project:',
                code: `# Create a new project
devcli init my-project

# Navigate to project
cd my-project

# Start the dev environment
devcli dev`,
            },
        ],
    },
    {
        id: 'core-commands',
        title: 'Core Commands',
        icon: Terminal,
        content: [
            {
                subtitle: 'Project Management',
                commands: [
                    { cmd: 'devcli project list', desc: 'List all tracked projects' },
                    { cmd: 'devcli project add', desc: 'Add current directory as project' },
                    { cmd: 'devcli project open [name]', desc: 'Open a project' },
                    { cmd: 'devcli project remove [name]', desc: 'Remove a project' },
                ],
            },
            {
                subtitle: 'Git Integration',
                commands: [
                    { cmd: 'devcli git status', desc: 'Enhanced git status with AI insights' },
                    { cmd: 'devcli git commit', desc: 'Interactive commit with AI-generated messages' },
                    { cmd: 'devcli git history', desc: 'Visual git history' },
                    { cmd: 'devcli git sync', desc: 'Smart pull/push with conflict detection' },
                ],
            },
            {
                subtitle: 'Development Tools',
                commands: [
                    { cmd: 'devcli dev', desc: 'Start development environment' },
                    { cmd: 'devcli test', desc: 'Run tests with coverage' },
                    { cmd: 'devcli build', desc: 'Build for production' },
                    { cmd: 'devcli deploy', desc: 'Deploy to configured environment' },
                ],
            },
        ],
    },
    {
        id: 'configuration',
        title: 'Configuration',
        icon: Settings,
        content: [
            {
                subtitle: 'Config File',
                text: 'DevCLI uses a .devclirc.json file in your home directory:',
                code: `{
  "theme": "cyberpunk",
  "editor": "vscode",
  "ai": {
    "provider": "openai",
    "model": "gpt-4"
  },
  "git": {
    "autoCommitMessages": true,
    "defaultBranch": "main"
  }
}`,
            },
            {
                subtitle: 'Environment Variables',
                commands: [
                    { cmd: 'DEVCLI_THEME', desc: 'Set terminal theme' },
                    { cmd: 'DEVCLI_EDITOR', desc: 'Default code editor' },
                    { cmd: 'DEVCLI_AI_KEY', desc: 'AI API key' },
                ],
            },
        ],
    },
    {
        id: 'advanced',
        title: 'Advanced Usage',
        icon: Zap,
        content: [
            {
                subtitle: 'Aliases & Shortcuts',
                text: 'Create custom aliases for frequently used commands:',
                code: `# Edit aliases
devcli alias add gs "git status"
devcli alias add gc "git commit"
devcli alias add deploy "build && push production"

# List all aliases
devcli alias list`,
            },
            {
                subtitle: 'Plugins',
                text: 'Extend DevCLI with community plugins:',
                code: `# Install a plugin
devcli plugin install docker-manager

# List installed plugins
devcli plugin list

# Update plugins
devcli plugin update`,
            },
        ],
    },
];

export default function Documentation() {
    return (
        <PageLayout
            title="Documentation"
            subtitle="Complete guide to using DevCLI - from installation to advanced features"
        >
            <div className="space-y-16">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <div key={section.id} id={section.id} className="scroll-mt-20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-terminal-green/10 rounded-lg">
                                    <Icon className="w-6 h-6 text-terminal-green" />
                                </div>
                                <h2 className="text-3xl font-bold text-terminal-text font-mono">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="space-y-8">
                                {section.content.map((item, idx) => (
                                    <div key={idx} className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-terminal-green mb-4">
                                            {item.subtitle}
                                        </h3>
                                        {item.text && (
                                            <p className="text-terminal-text-dim mb-4 leading-relaxed">
                                                {item.text}
                                            </p>
                                        )}
                                        {item.code && (
                                            <pre className="bg-terminal-bg border border-terminal-border rounded-lg p-4 overflow-x-auto">
                                                <code className="text-terminal-text font-mono text-sm">
                                                    {item.code}
                                                </code>
                                            </pre>
                                        )}
                                        {item.commands && (
                                            <div className="space-y-3">
                                                {item.commands.map((cmd, i) => (
                                                    <div key={i} className="flex items-start gap-4 p-3 bg-terminal-bg rounded border border-terminal-border/50">
                                                        <code className="text-terminal-green font-mono text-sm flex-shrink-0">
                                                            {cmd.cmd}
                                                        </code>
                                                        <span className="text-terminal-text-dim text-sm">
                                                            {cmd.desc}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Quick Navigation */}
                <div className="bg-terminal-purple/5 border border-terminal-purple/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-terminal-purple mb-4">
                        Need More Help?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <a href="https://github.com/phravins/devcli" className="text-terminal-text-dim hover:text-terminal-blue transition-colors">
                            → GitHub Repository
                        </a>
                        <a href="https://discord.gg/devcli" className="text-terminal-text-dim hover:text-terminal-purple transition-colors">
                            → Join Discord Community
                        </a>
                        <a href="/api" className="text-terminal-text-dim hover:text-terminal-green transition-colors">
                            → API Reference
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
