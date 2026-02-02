import { Github, Twitter, MessageCircle, Mail, Heart, Terminal, ExternalLink } from 'lucide-react';

const footerLinks = {
  product, href,
    { label, href,
    { label, href,
    { label, href,
  ],
  resources, href, external,
    { label, href, external,
    { label, href, external,
    { label, href, external,
  ],
  community, href, external,
    { label, href, external,
    { label, href, external,
    { label, href, external,
  ],
  legal, href, external,
    { label, href, external,
    { label, href, external,
    { label, href, external,
  ],
};

const socialLinks = [
  { icon, href, label,
  { icon, href, label,
  { icon, href, label,
  { icon, href, label,
];

export default function Footer() {
  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior);
      }
    }
  };

  return (
    <footer className="border-t border-terminal-border bg-terminal-bg">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-terminal-text-dim hover);
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-terminal-text font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-terminal-text-dim hover))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-terminal-text font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text-dim hover))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-terminal-text font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text-dim hover))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-terminal-text font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text-dim hover))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-terminal-border">
        <div className="max-w-7xl mx-auto px-4 sm="flex flex-col sm="flex items-center gap-2 text-sm text-terminal-text-dim">
              <span>© {new Date().getFullYear()} DevCLI.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-terminal-red inline" />
              <span>by developers, for developers.</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-terminal-text-dim">Latest="text-terminal-green">v2.4.1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terminal-text-dim">License="https="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-yellow hover="border-t border-terminal-border bg-terminal-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm="flex items-center gap-3 text-sm">
            <span className="text-terminal-green">visitor@devcli.sh</span>
            <span className="text-terminal-text">:~$</span>
            <span className="text-terminal-text-dim"># Thanks for visiting! Star us on GitHub ⭐</span>
            <span className="cursor-blink text-terminal-green">█</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

