import { useState } from 'react';
import { FileNode } from '@/lib/mock-data';
import { ChevronRight, Folder, FileCode, FileJson, FileText, FolderOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface FileTreeItemProps {
    node: FileNode;
    level: number;
    onSelect: (node: FileNode) => void;
    selectedId?: string;
    theme: 'light' | 'dark';
}

const getFileIcon = (name: string) => {
    if (name.endsWith('.ts') || name.endsWith('.tsx')) return <FileCode size={15} className="text-blue-400" />;
    if (name.endsWith('.json')) return <FileJson size={15} className="text-yellow-400" />;
    if (name.endsWith('.md')) return <FileText size={15} className="text-purple-400" />;
    return <FileText size={15} className="text-zinc-400" />;
};

export function FileTreeItem({ node, level, onSelect, selectedId, theme }: FileTreeItemProps) {
    const [isOpen, setIsOpen] = useState(true);
    const isFolder = node.type === 'folder';
    const isSelected = node.id === selectedId;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFolder) {
            setIsOpen(!isOpen);
        } else {
            onSelect(node);
        }
    };

    return (
        <div>
            <motion.div
                onClick={handleClick}
                className={clsx(
                    "group flex items-center gap-2 py-1.5 px-3 cursor-pointer select-none duration-200 text-sm rounded-r-lg mr-2",
                    isSelected
                        ? (theme === 'light' ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500" : "bg-blue-500/10 text-blue-300 border-l-2 border-blue-500")
                        : (theme === 'light' ? "border-l-2 border-transparent hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900" : "border-l-2 border-transparent hover:bg-zinc-800/30 text-zinc-400 hover:text-zinc-200")
                )}
                style={{ paddingLeft: `${level * 16 + 12}px` }}
            >
                <span className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    {isFolder ? (
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight size={14} />
                        </motion.div>
                    ) : (
                        <span className="w-3.5" />
                    )}
                </span>

                <span className="shrink-0 transition-transform group-hover:scale-110">
                    {isFolder ? (
                        isOpen ?
                            <FolderOpen size={16} className={theme === 'light' ? "text-blue-400 fill-blue-100" : "text-blue-300/80 fill-blue-300/20"} /> :
                            <Folder size={16} className={theme === 'light' ? "text-zinc-400 fill-zinc-100" : "text-zinc-500 fill-zinc-500/20"} />
                    ) : (
                        getFileIcon(node.name)
                    )}
                </span>

                <span className={clsx(
                    "truncate font-medium tracking-tight",
                    isSelected ? (theme === 'light' ? "text-blue-700" : "text-blue-100") : (theme === 'light' ? "text-zinc-600 group-hover:text-zinc-900" : "text-zinc-400 group-hover:text-zinc-200")
                )}>
                    {node.name}
                </span>
            </motion.div>

            <AnimatePresence>
                {isFolder && isOpen && node.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {node.children.map(child => (
                            <FileTreeItem
                                key={child.id}
                                node={child}
                                level={level + 1}
                                onSelect={onSelect}
                                selectedId={selectedId}
                                theme={theme}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
