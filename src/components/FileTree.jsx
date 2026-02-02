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
  File
} from 'lucide-react';

// interface FileNode {
  name= [
  {
    name,
    type,
    isOpen,
    children,
        type,
        isOpen,
        children, type, language,
          { name, type, children, type, language,
            { name, type, language,
          ]},
          { name, type, children, type, language,
            { name, type, language,
          ]},
        ]
      },
      {
        name,
        type,
        children, type, language,
        ]
      },
      {
        name,
        type,
        children, type, language,
          { name, type, language,
        ]
      },
      {
        name,
        type,
        children, type, language,
          { name, type, language,
        ]
      },
      { name, type, language,
      { name, type, language,
      { name, type, language,
      { name, type, language,
      { name, type, language,
      { name, type, language,
    ]
  }
];

const getFileIcon = (node) => {
  if (node.type === 'folder') {
    return node.isOpen ? FolderOpen= node.name.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'go':
    case 'js':
    case 'ts':
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
    default= (node) => {
  if (node.type === 'folder') {
    return node.isOpen ? 'text-terminal-blue' : 'text-terminal-yellow';
  }
  
  const ext = node.name.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'go':
      return 'text-terminal-cyan';
    case 'js':
    case 'ts':
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
    default) => void;
  path, depth, onToggle, path }) {
  const Icon = getFileIcon(node);
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
        className={`flex items-center gap-2 w-full py-1 px-2 hover)}
        {node.type === 'file' && <span className="w-4" />}
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <span className={`text-sm ${node.type === 'folder' ? 'font-medium' : ''} text-terminal-text`}>
          {node.name}
        </span>
      </button>
      
      {node.type === 'folder' && node.isOpen && node.children && (
        <div>
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

// interface FileTreeProps {
  onFileSelect?: (file) => void;
}

export default function FileTree(_props) {
  const [tree, setTree] = useState(fileTreeData);

  const toggleFolder = (targetPath) => {
    const newTree = [...tree];
    
    const toggleNode = (nodes) => {
      for (const node of nodes) {
        if (node.name === path[depth]) {
          if (depth === path.length - 1) {
            node.isOpen = !node.isOpen;
            return true;
          }
          if (node.children) {
            return toggleNode(node.children, path, depth + 1);
          }
        }
      }
      return false;
    };
    
    toggleNode(newTree, targetPath, 0);
    setTree(newTree);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-4 text-terminal-text-dim text-sm flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Project Explorer
        </span>
      </div>

      <div className="terminal-body p-0">
        {/* Breadcrumb */}
        <div className="px-4 py-2 border-b border-terminal-border bg-terminal-bg-light flex items-center gap-2 text-sm">
          <span className="text-terminal-text-dim">~/projects</span>
          <span className="text-terminal-text-dim">/</span>
          <span className="text-terminal-green">my-project</span>
        </div>

        {/* File Tree */}
        <div className="p-2 max-h-[400px] overflow-y-auto">
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
        <div className="px-4 py-2 border-t border-terminal-border bg-terminal-bg-light text-xs text-terminal-text-dim flex items-center justify-between">
          <span>14 files, 5 folders</span>
          <span>Go Module</span>
        </div>
      </div>
    </div>
  );
}

