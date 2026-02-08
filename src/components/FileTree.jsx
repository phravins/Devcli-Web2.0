import { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  FileText,
  FileType,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const fileTreeData = [
  {
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        name: 'components',
        type: 'folder',
        isOpen: true,
        children: [
          { name: 'App.jsx', type: 'file', language: 'javascript' },
          { name: 'FileTree.jsx', type: 'file', language: 'javascript' },
          { name: 'MatrixRain.jsx', type: 'file', language: 'javascript' },
        ]
      },
      {
        name: 'sections',
        type: 'folder',
        isOpen: false,
        children: [
          { name: 'Hero.jsx', type: 'file', language: 'javascript' },
          { name: 'Features.jsx', type: 'file', language: 'javascript' },
          { name: 'Commands.jsx', type: 'file', language: 'javascript' },
        ]
      },
      {
        name: 'App.css',
        type: 'file',
        language: 'css'
      },
      {
        name: 'index.html',
        type: 'file',
        language: 'html'
      },
      { name: 'package.json', type: 'file', language: 'json' },
      { name: 'vite.config.js', type: 'file', language: 'javascript' },
      { name: 'README.md', type: 'file', language: 'markdown' },
    ]
  }
];

const getFileIcon = (node) => {
  if (node.type === 'folder') {
    return node.isOpen ? FolderOpen : Folder;
  }

  const ext = node.name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'go':
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'py':
    case 'rs':
      return FileCode;
    case 'json':
      return FileJson;
    case 'md':
    case 'txt':
      return FileText;
    case 'yaml':
    case 'yml':
      return FileType;
    default:
      return FileText;
  }
};

const getFileColor = (node) => {
  if (node.type === 'folder') {
    return node.isOpen ? 'text-terminal-blue' : 'text-terminal-yellow';
  }

  const ext = node.name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'go':
      return 'text-terminal-cyan';
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return 'text-terminal-yellow';
    case 'py':
      return 'text-terminal-blue';
    case 'rs':
      return 'text-terminal-orange';
    case 'json':
    case 'yaml':
    case 'yml':
      return 'text-terminal-green';
    case 'md':
      return 'text-terminal-purple';
    case 'dockerfile':
      return 'text-terminal-blue';
    case 'makefile':
      return 'text-terminal-red';
    default:
      return 'text-terminal-text-dim';
  }
};

function FileTreeNode({ node, depth, onToggle, path }) {
  const NodeIcon = getFileIcon(node);
  const colorClass = getFileColor(node);
  const currentPath = [...path, node.name];

  const handleClick = () => {
    if (node.type === 'folder') {
      onToggle(currentPath);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 w-full py-1 px-2 hover:bg-terminal-bg-light rounded transition-colors group text-left"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {node.type === 'folder' && (
            node.isOpen ? <ChevronDown className="w-3 h-3 text-terminal-text-dim" /> : <ChevronRight className="w-3 h-3 text-terminal-text-dim" />
          )}
          {node.type === 'file' && <div className="w-3" />}
          <NodeIcon className={`w-4 h-4 flex-shrink-0 ${colorClass}`} />
          <span className={`text-sm truncate ${node.type === 'folder' ? 'font-medium' : ''} text-terminal-text`}>
            {node.name}
          </span>
        </div>
      </button>

      {node.type === 'folder' && node.isOpen && node.children && (
        <div className="mt-0.5">
          {node.children.map((child, index) => (
            <FileTreeNode
              key={child.name + index}
              node={child}
              depth={depth + 1}
              onToggle={onToggle}
              path={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree() {
  const [tree, setTree] = useState(fileTreeData);

  const toggleFolder = (targetPath) => {
    const newTree = JSON.parse(JSON.stringify(tree));

    const findAndToggle = (nodes, path, depth) => {
      for (const node of nodes) {
        if (node.name === path[depth]) {
          if (depth === path.length - 1) {
            node.isOpen = !node.isOpen;
            return true;
          }
          if (node.children) {
            return findAndToggle(node.children, path, depth + 1);
          }
        }
      }
      return false;
    };

    findAndToggle(newTree, targetPath, 0);
    setTree(newTree);
  };

  return (
    <div className="terminal-window h-full">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-4 text-terminal-text-dim text-sm flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Project Explorer
        </span>
      </div>

      <div className="terminal-body p-0 flex flex-col h-[500px]">
        {/* Breadcrumb */}
        <div className="px-4 py-2 border-b border-terminal-border bg-terminal-bg-light flex items-center gap-2 text-sm flex-shrink-0">
          <span className="text-terminal-text-dim">~/projects</span>
          <span className="text-terminal-text-dim">/</span>
          <span className="text-terminal-green">my-project</span>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {tree.map((node, index) => (
            <FileTreeNode
              key={node.name + index}
              node={node}
              depth={0}
              onToggle={toggleFolder}
              path={[]}
            />
          ))}
        </div>

        {/* File Stats */}
        <div className="px-4 py-2 border-t border-terminal-border bg-terminal-bg-light text-xs text-terminal-text-dim flex items-center justify-between flex-shrink-0">
          <span>14 files, 5 folders</span>
          <span>Go Module</span>
        </div>
      </div>
    </div>
  );
}
