import PageLayout from '../components/PageLayout';
import { Cookie, Settings, Shield, X } from 'lucide-react';

const cookieTypes = [
    {
        name: 'Essential Cookies',
        icon: Shield,
        required: true,
        description: 'These cookies are necessary for the website to function and cannot be disabled.',
        examples: [
            { name: 'session_id', purpose: 'Maintains your login session', duration: '30 days' },
            { name: 'csrf_token', purpose: 'Security protection against cross-site request forgery', duration: 'Session' },
        ],
    },
    {
        name: 'Analytics Cookies',
        icon: Settings,
        required: false,
        description: 'Help us understand how visitors interact with DevCLI to improve the user experience.',
        examples: [
            { name: '_ga', purpose: 'Google Analytics - tracks user behavior', duration: '2 years' },
            { name: 'ph_*', purpose: 'PostHog - privacy-focused analytics', duration: '1 year' },
        ],
    },
    {
        name: 'Preference Cookies',
        icon: Cookie,
        required: false,
        description: 'Remember your settings and preferences for a personalized experience.',
        examples: [
            { name: 'theme', purpose: 'Remembers your selected theme (dark/light)', duration: '1 year' },
            { name: 'lang', purpose: 'Stores your language preference', duration: '1 year' },
        ],
    },
];

export default function CookiesPolicy() {
    return (
        <PageLayout
            title="Cookies Policy"
            subtitle="Understanding how DevCLI uses cookies and similar technologies"
        >
            <div className="space-y-12">
                {/* Introduction */}
                <div className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-terminal-green mb-3">
                        What Are Cookies?
                    </h3>
                    <p className="text-terminal-text-dim leading-relaxed mb-4">
                        Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, analyze traffic, and provide essential functionality.
                    </p>
                    <p className="text-terminal-text-dim leading-relaxed">
                        DevCLI uses cookies to enhance your experience, provide security, and improve our services. You have full control over which cookies you allow.
                    </p>
                </div>

                {/* Cookie Types */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-terminal-text font-mono">
                        Types of Cookies We Use
                    </h2>

                    {cookieTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <div key={type.name} className="bg-terminal-bg-light border border-terminal-border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-terminal-green/10 rounded-lg">
                                            <Icon className="w-5 h-5 text-terminal-green" />
                                        </div>
                                        <h3 className="text-xl font-bold text-terminal-text">
                                            {type.name}
                                        </h3>
                                    </div>
                                    {type.required ? (
                                        <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green text-xs font-mono rounded-full">
                                            REQUIRED
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-terminal-blue/20 text-terminal-blue text-xs font-mono rounded-full">
                                            OPTIONAL
                                        </span>
                                    )}
                                </div>

                                <p className="text-terminal-text-dim mb-4">
                                    {type.description}
                                </p>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-terminal-green mb-2">Examples:</h4>
                                    {type.examples.map((cookie, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-terminal-bg rounded border border-terminal-border/50">
                                            <code className="text-terminal-green font-mono text-sm flex-shrink-0">
                                                {cookie.name}
                                            </code>
                                            <div className="flex-1">
                                                <p className="text-terminal-text text-sm">{cookie.purpose}</p>
                                                <p className="text-terminal-text-dim text-xs mt-1">Duration: {cookie.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Managing Cookies */}
                <div className="bg-terminal-purple/5 border border-terminal-purple/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-6 h-6 text-terminal-purple" />
                        <h3 className="text-xl font-bold text-terminal-purple">
                            Managing Your Cookie Preferences
                        </h3>
                    </div>

                    <div className="space-y-4 text-terminal-text-dim">
                        <div>
                            <h4 className="text-terminal-text font-semibold mb-2">Browser Settings</h4>
                            <p className="mb-2">You can control cookies through your browser settings:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Block all cookies (may affect functionality)</li>
                                <li>Delete existing cookies</li>
                                <li>Allow cookies only from specific sites</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-terminal-text font-semibold mb-2">DevCLI Settings</h4>
                            <p>Manage your preferences directly from the terminal:</p>
                            <pre className="bg-terminal-bg border border-terminal-border rounded p-3 mt-2 overflow-x-auto">
                                <code className="text-terminal-green font-mono text-sm">
                                    devcli config set cookies.analytics false{'\n'}
                                    devcli config set cookies.preferences true
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Third-Party Cookies */}
                <div className="border-t border-terminal-border pt-8">
                    <h3 className="text-lg font-bold text-terminal-text mb-3">
                        Third-Party Cookies
                    </h3>
                    <p className="text-terminal-text-dim mb-4">
                        DevCLI may use third-party services that set their own cookies:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-terminal-text-dim">
                            <span className="text-terminal-green">→</span>
                            <span><strong>Google Analytics:</strong> For usage analytics (can be disabled)</span>
                        </div>
                        <div className="flex items-start gap-2 text-terminal-text-dim">
                            <span className="text-terminal-green">→</span>
                            <span><strong>PostHog:</strong> Privacy-focused product analytics</span>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-terminal-blue/5 border border-terminal-blue/20 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-terminal-blue mb-2">
                        Questions About Cookies?
                    </h3>
                    <p className="text-terminal-text-dim">
                        Contact us at <a href="mailto:privacy@devcli.sh" className="text-terminal-green hover:underline">privacy@devcli.sh</a> if you have any questions about our use of cookies.
                    </p>
                    <p className="text-terminal-text-dim text-sm mt-3">
                        Last updated: February 11, 2026
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
