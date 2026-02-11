import PageLayout from '../components/PageLayout';
import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react';

const sections = [
    {
        icon: Eye,
        title: 'Information We Collect',
        content: [
            {
                subtitle: 'Usage Data',
                text: 'We collect anonymous usage statistics to improve DevCLI, including command frequency, error rates, and performance metrics. This data is anonymized and cannot be traced back to individual users.',
            },
            {
                subtitle: 'Account Information',
                text: 'If you create an account, we collect your email address, username, and password (encrypted). We never store passwords in plain text.',
            },
            {
                subtitle: 'Project Metadata',
                text: 'DevCLI stores project paths and metadata locally on your machine. This data is never transmitted to our servers unless you explicitly enable cloud sync.',
            },
        ],
    },
    {
        icon: Database,
        title: 'How We Use Your Data',
        content: [
            {
                subtitle: 'Service Improvement',
                text: 'Anonymous usage data helps us identify bugs, optimize performance, and prioritize new features.',
            },
            {
                subtitle: 'Communication',
                text: 'We may use your email to send important updates, security alerts, and newsletters (which you can opt out of at any time).',
            },
            {
                subtitle: 'AI Features',
                text: 'When using AI-powered features, your code context may be sent to our AI provider (OpenAI, Anthropic, etc.). We do not store this data permanently.',
            },
        ],
    },
    {
        icon: Lock,
        title: 'Data Security',
        content: [
            {
                subtitle: 'Encryption',
                text: 'All data transmitted between DevCLI and our servers uses TLS 1.3 encryption. Stored passwords are hashed using bcrypt with a cost factor of 12.',
            },
            {
                subtitle: 'Access Control',
                text: 'Access to user data is strictly limited to authorized personnel who require it for operational purposes. All access is logged and audited.',
            },
            {
                subtitle: 'Data Retention',
                text: 'We retain account data for as long as your account is active. Anonymous usage data is aggregated and kept for up to 2 years for analytical purposes.',
            },
        ],
    },
    {
        icon: Users,
        title: 'Your Rights',
        content: [
            {
                subtitle: 'Access & Export',
                text: 'You can request a copy of all data we have about you at any time by emailing privacy@devcli.sh.',
            },
            {
                subtitle: 'Deletion',
                text: 'You can delete your account and all associated data through the dashboard or by contacting us. Deletion is permanent and irreversible.',
            },
            {
                subtitle: 'Opt-Out',
                text: 'You can disable anonymous usage tracking with the command: devcli config set analytics.enabled false',
            },
        ],
    },
    {
        icon: Globe,
        title: 'Third-Party Services',
        content: [
            {
                subtitle: 'AI Providers',
                text: 'DevCLI integrates with AI providers like OpenAI and Anthropic. When you use AI features, your prompts are subject to their respective privacy policies.',
            },
            {
                subtitle: 'Analytics',
                text: 'We use privacy-focused analytics (PostHog) to understand how DevCLI is used. IP addresses are anonymized, and tracking is fully transparent.',
            },
            {
                subtitle: 'No Data Selling',
                text: 'We never sell, rent, or share your personal data with third parties for marketing purposes.',
            },
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <PageLayout
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your data"
        >
            <div className="space-y-12">
                {/* Last Updated Notice */}
                <div className="bg-terminal-blue/5 border border-terminal-blue/20 rounded-lg p-6">
                    <p className="text-terminal-text-dim">
                        <strong className="text-terminal-blue">Last Updated:</strong> February 11, 2026
                    </p>
                    <p className="text-terminal-text-dim mt-2">
                        This privacy policy describes how DevCLI ("we", "us", or "our") collects, uses, and protects your information.
                    </p>
                </div>

                {/* Sections */}
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <div key={section.title} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-terminal-green/10 rounded-lg">
                                    <Icon className="w-6 h-6 text-terminal-green" />
                                </div>
                                <h2 className="text-2xl font-bold text-terminal-text font-mono">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {section.content.map((item, idx) => (
                                    <div key={idx} className="bg-terminal-bg-light border border-terminal-border rounded-lg p-5">
                                        <h3 className="text-lg font-semibold text-terminal-green mb-2">
                                            {item.subtitle}
                                        </h3>
                                        <p className="text-terminal-text-dim leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Contact Section */}
                <div className="bg-terminal-purple/5 border border-terminal-purple/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-terminal-purple mb-3">
                        Questions or Concerns?
                    </h3>
                    <p className="text-terminal-text-dim mb-4">
                        If you have any questions about this privacy policy or how we handle your data, please contact us:
                    </p>
                    <div className="space-y-2 text-terminal-text-dim">
                        <p>Email: <a href="mailto:privacy@devcli.sh" className="text-terminal-green hover:underline">privacy@devcli.sh</a></p>
                        <p>Address: DevCLI Tools Inc., 123 Developer Street, San Francisco, CA 94103</p>
                    </div>
                </div>

                {/* GDPR/CCPA Notice */}
                <div className="border-t border-terminal-border pt-8">
                    <p className="text-sm text-terminal-text-dim">
                        DevCLI is committed to GDPR (EU) and CCPA (California) compliance. Users in these jurisdictions have additional rights as outlined by these regulations.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
