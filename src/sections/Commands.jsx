import { useState } from 'react';
import { Search, ChevronRight, Terminal, Copy, Check } from 'lucide-react';

// interface Command {
  name= [
  // Project Commands
  {
    name,
    description, templates, and history tracking',
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -t', desc,
      { flag, -p', desc,
      { flag, desc,
    ],
    category,
  },
  {
    name,
    description, test, and lint commands with auto-detection',
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -w', desc,
      { flag, desc,
      { flag, desc,
    ],
    category,
  },
  {
    name,
    description, Node.js, and more',
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -n', desc,
      { flag, -v', desc,
      { flag, desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -p', desc)' },
      { flag, -h', desc)' },
      { flag, desc,
      { flag, desc,
    ],
    category,
  },
  {
    name,
    description, CI/CD, configs)',
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -l', desc,
      { flag, desc, gitlab, etc.)' },
      { flag, -o', desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd,age, desc,
      { cmd, desc,
    ],
    flags, -r', desc,
      { flag, desc,
      { flag, -f', desc,
      { flag, desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -n', desc,
      { flag, -l', desc,
      { flag, -t', desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -f', desc,
      { flag, -c', desc,
      { flag, -m', desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -p', desc,
      { flag, -s', desc,
      { flag, -a', desc,
    ],
    category,
  },
  {
    name,
    description,
    usage,
    examples, desc,
      { cmd, desc,
      { cmd, desc,
      { cmd, desc,
    ],
    flags, -f', desc,
      { flag, desc,
      { flag, desc,
    ],
    category,
  },
];

const categories = ['All', ...Array.from(new Set(commands.map(c => c.category)))];

export default function Commands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCommand, setSelectedCommand] = useState(commands[0]);
  const [copied, setCopied] = useState(null);

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm) => setSearchQuery(e.target.value)}
                className="w-full bg-terminal-bg-light border border-terminal-border rounded-lg pl-10 pr-4 py-2 text-terminal-text placeholder="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-terminal-green/20 border-terminal-green text-terminal-green'
                      : 'bg-terminal-bg border-terminal-border text-terminal-text-dim hover))}
            </div>

            {/* Command List */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => setSelectedCommand(cmd)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedCommand.name === cmd.name
                      ? 'bg-terminal-green/10 border-terminal-green'
                      : 'bg-terminal-bg border-terminal-border hover="flex items-center justify-between">
                    <span className={`font-mono font-medium ${
                      selectedCommand.name === cmd.name ? 'text-terminal-green' : 'text-terminal-text'
                    }`}>
                      {cmd.name}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${
                      selectedCommand.name === cmd.name ? 'text-terminal-green' : 'text-terminal-text-dim'
                    }`} />
                  </div>
                  <p className="text-xs text-terminal-text-dim mt-1 truncate">
                    {cmd.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Command Details */}
          <div className="lg="terminal-window h-full">
              {/* Terminal Header */}
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-terminal-text-dim text-sm">
                  man {selectedCommand.name}
                </span>
              </div>

              {/* Terminal Body */}
              <div className="terminal-body space-y-6">
                {/* Command Header */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-terminal-green" />
                    <h3 className="text-xl font-bold text-terminal-text font-mono">
                      {selectedCommand.name}
                    </h3>
                    <span className="text-xs bg-terminal-blue/20 text-terminal-blue px-2 py-1 rounded">
                      {selectedCommand.category}
                    </span>
                  </div>
                  <p className="text-terminal-text-dim">
                    {selectedCommand.description}
                  </p>
                </div>

                {/* Usage */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-2"># Usage</p>
                  <div className="bg-terminal-bg-light rounded-lg p-3 border border-terminal-border">
                    <code className="text-terminal-green font-mono text-sm">
                      {selectedCommand.usage}
                    </code>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-3"># Examples</p>
                  <div className="space-y-2">
                    {selectedCommand.examples.map((example, index) => (
                      <div 
                        key={index}
                        className="bg-terminal-bg-light rounded-lg p-3 border border-terminal-border group hover) => copyCommand(example.cmd, `example-${index}`)}
                            className="opacity-0 group-hover=== `example-${index}` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-terminal-text-dim text-xs mt-2">
                          {example.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div>
                  <p className="text-terminal-text-dim text-sm mb-3"># Flags</p>
                  <div className="space-y-2">
                    {selectedCommand.flags.map((flag, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 py-2 border-b border-terminal-border last))}
                  </div>
                </div>

                {/* See Also */}
                <div className="pt-4 border-t border-terminal-border">
                  <p className="text-terminal-text-dim text-sm mb-2"># See also</p>
                  <div className="flex flex-wrap gap-2">
                    {commands
                      .filter(c => c.category === selectedCommand.category && c.name !== selectedCommand.name)
                      .slice(0, 3)
                      .map(cmd => (
                        <button
                          key={cmd.name}
                          onClick={() => setSelectedCommand(cmd)}
                          className="text-terminal-blue hover)
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

