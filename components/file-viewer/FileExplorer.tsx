import { FileNode, MOCK_FILE_SYSTEM } from '@/lib/mock-data';
import { FileTreeItem } from './FileTreeItem';

import { clsx } from 'clsx';

interface FileExplorerProps {
    onSelectFile: (file: FileNode) => void;
    selectedFileId?: string;
    theme: 'light' | 'dark';
}

export function FileExplorer({ onSelectFile, selectedFileId, theme }: FileExplorerProps) {
    return (
        <div className={clsx(
            "h-full flex flex-col border-r",
            theme === 'light' ? "bg-zinc-50 border-zinc-200" : "bg-zinc-950 border-zinc-800"
        )}>
            <div className={clsx(
                "h-10 flex items-center px-4 border-b",
                theme === 'light' ? "border-zinc-200" : "border-zinc-800"
            )}>
                <span className={clsx(
                    "text-xs font-semibold uppercase tracking-wider",
                    theme === 'light' ? "text-zinc-500" : "text-zinc-400"
                )}>Explorer</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                {MOCK_FILE_SYSTEM.map(node => (
                    <FileTreeItem
                        key={node.id}
                        node={node}
                        level={0}
                        onSelect={onSelectFile}
                        selectedId={selectedFileId}
                        theme={theme}
                    />
                ))}
            </div>
        </div>
    );
}
