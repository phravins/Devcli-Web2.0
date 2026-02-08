import { Github, Twitter, MessageCircle, Mail, Heart, Terminal, ExternalLink } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Installation', href: '#install' },
    { label: 'Commands', href: '#commands' },
  ],
  resources: [
    { label: 'Documentation', href: 'https://docs.devcli.sh', external: true },
    { label: 'API Reference', href: 'https://api.devcli.sh', external: true },
    { label: 'Examples', href: 'https://github.com/phravins/devcli-examples', external: true },
    { label: 'Blog', href: 'https://devcli.sh/blog', external: true },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/phravins', external: true },
    { label: 'Discord', href: 'https://discord.gg/devcli', external: true },
    { label: 'Twitter', href: 'https://twitter.com/devcli', external: true },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/phravins', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/devcli', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://discord.gg/devcli', label: 'Discord' },
  { icon: Mail, href: 'mailto:hello@devcli.sh', label: 'Email' },
];

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-terminal-bg border-t border-terminal-border pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Terminal className="w-8 h-8 text-terminal-green group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-terminal-text tracking-tighter">DEVCLI</span>
            </div>
            <p className="text-terminal-text-dim text-sm max-w-xs leading-relaxed">
              The ultimate terminal-based development workspace. Build faster, stay focused, and own your environment.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text-dim hover:text-terminal-text transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-terminal-text font-bold text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-terminal-text-dim hover:text-terminal-green text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-terminal-text font-bold text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-terminal-text-dim hover:text-terminal-blue text-sm transition-colors flex items-center gap-1"
                  >
                    {link.label} <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-terminal-text font-bold text-sm uppercase tracking-widest">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-terminal-text-dim hover:text-terminal-purple text-sm transition-colors flex items-center gap-1"
                  >
                    {link.label} <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-terminal-text font-bold text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-terminal-text-dim hover:text-terminal-text text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Credits Bar */}
      <div className="border-t border-terminal-border bg-terminal-bg-light/50 py-8 text-center text-sm text-terminal-text-dim">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DevCLI Tools Inc.</span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-terminal-red fill-current" /> by developers
            </span>
          </div>
          <div className="font-mono text-[10px] opacity-50 mt-2">
            DEVCLI_STATUS: STABLE // RELEASE_CHANNEL: MAIN // VERSION: 2.4.1
          </div>
        </div>
      </div>

      {/* Terminal Footer Strip */}
      <div className="bg-terminal-bg border-t border-terminal-border py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-mono text-xs">
          <span className="text-terminal-green">developer@devcli</span>
          <span className="text-terminal-text">:~$</span>
          <span className="text-terminal-text-dim"># Thanks for watching. Happy coding!</span>
          <span className="w-2 h-4 bg-terminal-green animate-pulse ml-1" />
        </div>
      </div>
    </footer>
  );
}
