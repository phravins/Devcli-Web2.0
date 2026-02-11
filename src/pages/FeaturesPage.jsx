import PageLayout from '../components/PageLayout';
import { FolderGit2, Code2, GitBranch, Zap, Brain, Shield, Box, Terminal as TermIcon } from 'lucide-react';

const featureCategories = [
    {
        title: 'Project Management',
        icon: FolderGit2,
        color: 'text-terminal-green',
        bgColor: 'bg-terminal-green/10',
        features: [
            {
                name: 'Smart Project Tracking',
                description: 'Automatically discover and track all your development projects with metadata, tags, and recent activity.',
                benefits: ['Quick project switching', 'Auto-discovery of git repos', 'Custom metadata and tagging'],
                code: 'devcli project add ~/my-project --tags "web,react"',
            },
            {
                name: 'Project Templates',
                description: 'Bootstrap new projects instantly with pre-configured templates for popular frameworks.',
                benefits: ['50+ built-in templates', 'Custom template creation', 'Team template sharing'],
                code: 'devcli init --template react-typescript',
            },
        ],
    },
    {
        title: 'Git Integration',
        icon: GitBranch,
        color: 'text-terminal-purple',
        bgColor: 'bg-terminal-purple/10',
        features: [
            {
                name: 'AI-Powered Commits',
                description: 'Generate meaningful commit messages automatically using AI analysis of your changes.',
                benefits: ['Consistent commit style', 'Automatic conventional commits', 'Multi-language support'],
                code: 'devcli git commit --ai',
            },
            {
                name: 'Visual Git History',
                description: 'Interactive timeline view of your repository history with branch visualization.',
                benefits: ['Beautiful ASCII graphs', 'Filter by author/date', 'Search commit messages'],
                code: 'devcli git history --graph',
            },
        ],
    },
    {
        title: 'Development Workflow',
        icon: Code2,
        color: 'text-terminal-blue',
        bgColor: 'bg-terminal-blue/10',
        features: [
            {
                name: 'Integrated Dev Environment',
                description: 'Unified development workspace with file editing, terminal, and debugging in one place.',
                benefits: ['Split-pane terminal UI', 'Code syntax highlighting', 'Built-in debugger'],
                code: 'devcli dev --edit src/app.js',
            },
            {
                name: 'Task Automation',
                description: 'Define and run complex build, test, and deployment pipelines from simple config files.',
                benefits: ['YAML/JSON configuration', 'Parallel task execution', 'Conditional workflows'],
                code: 'devcli run build:prod',
            },
        ],
    },
    {
        title: 'AI Assistant',
        icon: Brain,
        color: 'text-terminal-cyan',
        bgColor: 'bg-terminal-cyan/10',
        features: [
            {
                name: 'Code Generation',
                description: 'Generate boilerplate code, tests, and documentation using AI.',
                benefits: ['Context-aware suggestions', 'Multiple AI providers', 'Custom prompts'],
                code: 'devcli ai generate --type "API endpoint for users"',
            },
            {
                name: 'Error Explanation',
                description: 'Get AI-powered explanations and fixes for errors and stack traces.',
                benefits: ['Natural language explanations', 'Suggested fixes', 'Related documentation'],
                code: 'devcli ai explain $(last error)',
            },
        ],
    },
    {
        title: 'Performance',
        icon: Zap,
        color: 'text-terminal-yellow',
        bgColor: 'bg-terminal-yellow/10',
        features: [
            {
                name: 'Lightning Fast',
                description: 'Built in Go for maximum performance - commands execute in milliseconds.',
                benefits: ['< 1ms average latency', 'Minimal resource usage', 'Instant startup'],
                code: 'time devcli --version  # ~ 0.8ms',
            },
            {
                name: 'Smart Caching',
                description: 'Intelligent caching of git data, file listings, and AI responses for instant access.',
                benefits: ['LRU cache strategy', 'Configurable cache size', 'Auto-invalidation'],
                code: 'devcli cache clear --type git',
            },
        ],
    },
    {
        title: 'Security',
        icon: Shield,
        color: 'text-terminal-red',
        bgColor: 'bg-terminal-red/10',
        features: [
            {
                name: 'Secret Detection',
                description: 'Automatically detect and prevent committing sensitive data like API keys.',
                benefits: ['Pattern-based detection', 'Custom secret rules', 'Pre-commit hooks'],
                code: 'devcli security scan --fix',
            },
            {
                name: 'Dependency Auditing',
                description: 'Scan dependencies for known vulnerabilities and get automated fix suggestions.',
                benefits: ['CVE database integration', 'Auto-update safe versions', 'Custom policies'],
                code: 'devcli security audit --auto-fix',
            },
        ],
    },
];

export default function FeaturesPage() {
    return (
        <PageLayout
            title="Features"
            subtitle="Explore the full power of DevCLI's development workspace"
        >
            <div className="space-y-16">
                {featureCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div key={category.title} className="space-y-6">
                            {/* Category Header */}
                            <div className="flex items-center gap-3">
                                <div className={`p-2 ${category.bgColor} rounded-lg`}>
                                    <Icon className={`w-6 h-6 ${category.color}`} />
                                </div>
                                <h2 className={`text-3xl font-bold ${category.color} font-mono`}>
                                    {category.title}
                                </h2>
                            </div>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {category.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6 hover:border-terminal-green/50 transition-all"
                                    >
                                        <h3 className="text-xl font-bold text-terminal-text mb-3">
                                            {feature.name}
                                        </h3>
                                        <p className="text-terminal-text-dim mb-4 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Benefits */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-terminal-green mb-2">
                                                Key Benefits:
                                            </h4>
                                            <ul className="space-y-1">
                                                {feature.benefits.map((benefit, i) => (
                                                    <li key={i} className="text-terminal-text-dim text-sm flex items-start gap-2">
                                                        <span className="text-terminal-green">→</span>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Code Example */}
                                        {feature.code && (
                                            <pre className="bg-terminal-bg border border-terminal-border/50 rounded p-3 overflow-x-auto">
                                                <code className="text-terminal-green font-mono text-sm">
                                                    {feature.code}
                                                </code>
                                            </pre>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-terminal-green/10 to-terminal-purple/10 border border-terminal-green/20 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-terminal-text mb-3">
                        Ready to Transform Your Workflow?
                    </h3>
                    <p className="text-terminal-text-dim mb-6 max-w-2xl mx-auto">
                        Install DevCLI now and experience the future of terminal-based development.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="/#install"
                            className="px-6 py-3 bg-terminal-green text-terminal-bg font-mono font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
                        >
                            Get Started
                        </a>
                        <a
                            href="/docs"
                            className="px-6 py-3 bg-terminal-bg-light border border-terminal-border text-terminal-text font-mono rounded-lg hover:border-terminal-green transition-colors"
                        >
                            Read Docs
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
