import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Code, Lock, Send, Check } from 'lucide-react';

const endpoints = [
    {
        category: 'Projects',
        endpoints: [
            {
                method: 'GET',
                path: '/api/v1/projects',
                description: 'List all projects for the authenticated user',
                auth: true,
                request: null,
                response: {
                    projects: [
                        { id: 'proj_123', name: 'my-app', path: '/Users/dev/my-app', lastAccessed: '2026-02-11T10:30:00Z' },
                    ],
                },
            },
            {
                method: 'POST',
                path: '/api/v1/projects',
                description: 'Create or add a new project',
                auth: true,
                request: {
                    name: 'new-project',
                    path: '/Users/dev/new-project',
                    tags: ['web', 'typescript'],
                },
                response: {
                    id: 'proj_456',
                    name: 'new-project',
                    created: true,
                },
            },
        ],
    },
    {
        category: 'Git',
        endpoints: [
            {
                method: 'GET',
                path: '/api/v1/git/{project_id}/status',
                description: 'Get git status for a project',
                auth: true,
                request: null,
                response: {
                    branch: 'main',
                    modified: ['src/app.js', 'package.json'],
                    staged: [],
                    commits_ahead: 2,
                },
            },
            {
                method: 'POST',
                path: '/api/v1/git/{project_id}/commit',
                description: 'Generate AI commit message and create commit',
                auth: true,
                request: {
                    files: ['src/app.js'],
                    ai_generate: true,
                },
                response: {
                    message: 'feat: add user authentication module',
                    commit_hash: 'a1b2c3d',
                },
            },
        ],
    },
    {
        category: 'AI',
        endpoints: [
            {
                method: 'POST',
                path: '/api/v1/ai/complete',
                description: 'Get AI code completion or generation',
                auth: true,
                request: {
                    prompt: 'Create a React component for a todo list',
                    context: {
                        language: 'typescript',
                        framework: 'react',
                    },
                },
                response: {
                    completion: 'export const TodoList = () => { ... }',
                    tokens_used: 256,
                },
            },
        ],
    },
];

const authExample = `# Obtain API key from dashboard
curl -X POST https://api.devcli.sh/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "your_password"}'

# Response
{
  "token": "dvcli_1a2b3c4d5e6f...",
  "expires_at": "2026-02-18T10:00:00Z"
}

# Use token in subsequent requests
curl -X GET https://api.devcli.sh/v1/projects \\
  -H "Authorization: Bearer dvcli_1a2b3c4d5e6f..."`;

export default function APIReference() {
    const [selectedEndpoint, setSelectedEndpoint] = useState(null);

    return (
        <PageLayout
            title="API Reference"
            subtitle="Complete REST API documentation for DevCLI integrations"
        >
            <div className="space-y-12">
                {/* Authentication */}
                <div className="bg-terminal-purple/5 border border-terminal-purple/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-6 h-6 text-terminal-purple" />
                        <h2 className="text-2xl font-bold text-terminal-purple font-mono">
                            Authentication
                        </h2>
                    </div>
                    <p className="text-terminal-text-dim mb-4">
                        DevCLI API uses Bearer token authentication. Include your API token in the Authorization header for all requests.
                    </p>
                    <pre className="bg-terminal-bg border border-terminal-border rounded p-4 overflow-x-auto">
                        <code className="text-terminal-green font-mono text-sm">
                            {authExample}
                        </code>
                    </pre>
                </div>

                {/* Base URL */}
                <div className="bg-terminal-blue/5 border border-terminal-blue/20 rounded-lg p-4">
                    <p className="text-terminal-text-dim">
                        <strong className="text-terminal-blue">Base URL:</strong>{' '}
                        <code className="text-terminal-green font-mono">https://api.devcli.sh</code>
                    </p>
                    <p className="text-terminal-text-dim mt-2">
                        <strong className="text-terminal-blue">API Version:</strong> v1
                    </p>
                </div>

                {/* Endpoints */}
                {endpoints.map((category) => (
                    <div key={category.category} className="space-y-6">
                        <h2 className="text-2xl font-bold text-terminal-green font-mono flex items-center gap-2">
                            <Code className="w-6 h-6" />
                            {category.category} API
                        </h2>

                        <div className="space-y-4">
                            {category.endpoints.map((endpoint, idx) => {
                                const isSelected = selectedEndpoint === `${category.category}-${idx}`;
                                const methodColors = {
                                    GET: 'bg-terminal-blue/20 text-terminal-blue',
                                    POST: 'bg-terminal-green/20 text-terminal-green',
                                    PUT: 'bg-terminal-yellow/20 text-terminal-yellow',
                                    DELETE: 'bg-terminal-red/20 text-terminal-red',
                                };

                                return (
                                    <div
                                        key={idx}
                                        className="bg-terminal-bg-light border border-terminal-border rounded-lg overflow-hidden"
                                    >
                                        {/* Endpoint Header */}
                                        <button
                                            onClick={() => setSelectedEndpoint(isSelected ? null : `${category.category}-${idx}`)}
                                            className="w-full p-4 flex items-center justify-between hover:bg-terminal-bg transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded font-mono text-sm font-bold ${methodColors[endpoint.method]}`}>
                                                    {endpoint.method}
                                                </span>
                                                <code className="text-terminal-text font-mono">
                                                    {endpoint.path}
                                                </code>
                                                {endpoint.auth && (
                                                    <span className="px-2 py-1 bg-terminal-purple/20 text-terminal-purple text-xs rounded">
                                                        AUTH
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-terminal-text-dim">
                                                {isSelected ? '▲' : '▼'}
                                            </span>
                                        </button>

                                        {/* Endpoint Details */}
                                        {isSelected && (
                                            <div className="px-4 pb-4 space-y-4 border-t border-terminal-border pt-4">
                                                <p className="text-terminal-text-dim">{endpoint.description}</p>

                                                {endpoint.request && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-terminal-green mb-2">
                                                            Request Body:
                                                        </h4>
                                                        <pre className="bg-terminal-bg border border-terminal-border rounded p-3 overflow-x-auto">
                                                            <code className="text-terminal-text font-mono text-sm">
                                                                {JSON.stringify(endpoint.request, null, 2)}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                )}

                                                {endpoint.response && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-terminal-blue mb-2">
                                                            Response:
                                                        </h4>
                                                        <pre className="bg-terminal-bg border border-terminal-border rounded p-3 overflow-x-auto">
                                                            <code className="text-terminal-text font-mono text-sm">
                                                                {JSON.stringify(endpoint.response, null, 2)}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Rate Limits */}
                <div className="bg-terminal-yellow/5 border border-terminal-yellow/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-terminal-yellow mb-3">
                        Rate Limits
                    </h3>
                    <div className="space-y-2 text-terminal-text-dim">
                        <p>• <strong>Free tier:</strong> 1,000 requests/hour</p>
                        <p>• <strong>Pro tier:</strong> 10,000 requests/hour</p>
                        <p>• <strong>Enterprise:</strong> Custom limits</p>
                    </div>
                    <p className="text-terminal-text-dim text-sm mt-4">
                        Rate limit headers: <code className="text-terminal-green">X-RateLimit-Limit</code>,{' '}
                        <code className="text-terminal-green">X-RateLimit-Remaining</code>
                    </p>
                </div>

                {/* SDKs */}
                <div className="bg-terminal-green/5 border border-terminal-green/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-terminal-green mb-3">
                        Official SDKs
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {['JavaScript/TypeScript', 'Python', 'Go'].map((lang) => (
                            <div key={lang} className="bg-terminal-bg border border-terminal-border rounded p-4">
                                <p className="text-terminal-text font-mono mb-2">{lang}</p>
                                <code className="text-terminal-green text-sm">npm install @devcli/sdk</code>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
