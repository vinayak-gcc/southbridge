import { FileNode } from '@/lib/mock-data';
import { clsx } from 'clsx';

interface CodeViewerFooterProps {
    file?: FileNode;
    theme: 'light' | 'dark';
}

export function CodeViewerFooter({ file, theme }: CodeViewerFooterProps) {
    if (!file) return null;

    return (
        <div className={clsx(
            "absolute bottom-0 left-0 right-0 h-6 border-t flex items-center justify-between px-3 text-[10px] select-none overflow-hidden z-10",
            theme === 'light' ? "bg-zinc-50 border-zinc-200 text-zinc-500" : "bg-[#0c1524] border-[#1e293b] text-slate-400"
        )}>
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                <div className="flex items-center gap-1.5 hover:opacity-80 cursor-pointer shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    <span>master*</span>
                </div>
                <div className="hover:opacity-80 cursor-pointer shrink-0">
                    0 errors, 0 warnings
                </div>
                <div className="hover:opacity-80 cursor-pointer hidden sm:block truncate min-w-0">
                    src/components/{file.name}
                </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <span className="hover:opacity-80 cursor-pointer transition-colors">Ln 1, Col 1</span>
                <span className="hover:opacity-80 cursor-pointer transition-colors hidden sm:inline">UTF-8</span>
                <span className="hover:opacity-80 cursor-pointer transition-colors hidden sm:inline">TypeScript React</span>
                <div className="flex items-center gap-1 hover:opacity-80 cursor-pointer transition-colors hidden sm:flex">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                    <span>Prettier</span>
                </div>
            </div>
        </div>
    );
}
