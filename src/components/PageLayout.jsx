import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import Footer from '../sections/Footer';

export default function PageLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-terminal-bg text-terminal-text">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 text-terminal-text hover:text-terminal-green transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-mono text-sm">Back to Home</span>
                        </Link>
                        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
                            <Terminal className="w-6 h-6 text-terminal-green" />
                            <span className="text-xl font-bold tracking-tighter">DEVCLI</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Page Header */}
            {title && (
                <div className="border-b border-terminal-border bg-terminal-bg-light/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-terminal-text mb-3 font-mono">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-terminal-text-dim text-lg max-w-3xl">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Page Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
