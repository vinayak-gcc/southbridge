import { FileNode } from '@/lib/mock-data';
import { Sun, Moon, Settings, MoreHorizontal, LayoutTemplate } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeViewerHeaderProps {
    file?: FileNode;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    onToggleMobileExplorer?: () => void;
    onToggleDesktopExplorer?: () => void;
}

export function CodeViewerHeader({ file, theme, setTheme, onToggleMobileExplorer, onToggleDesktopExplorer }: CodeViewerHeaderProps) {
    const getFileBadge = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'ts':
                return { label: 'TS', color: 'bg-blue-500/10 text-blue-400' };
            case 'tsx':
                return { label: 'TSX', color: 'bg-blue-500/10 text-blue-400' };
            case 'js':
                return { label: 'JS', color: 'bg-yellow-500/10 text-yellow-400' };
            case 'jsx':
                return { label: 'JSX', color: 'bg-yellow-500/10 text-yellow-400' };
            case 'json':
                return { label: '{}', color: 'bg-yellow-500/10 text-yellow-400' };
            case 'css':
                return { label: '#', color: 'bg-blue-400/10 text-blue-300' };
            case 'md':
                return { label: 'MD', color: 'bg-zinc-500/10 text-zinc-400' };
            default:
                return { label: ext?.toUpperCase() || 'FILE', color: 'bg-zinc-500/10 text-zinc-400' };
        }
    };

    const badge = file ? getFileBadge(file.name) : { label: '', color: '' };

    return (
        <div className={clsx(
            "h-12 flex items-center justify-between p-4 border-b",
            theme === 'light' ? "bg-white border-zinc-200" : "bg-zinc-950 border-zinc-800/50"
        )}>
            <div className="flex items-center gap-4 min-w-0 flex-1 mr-2">
                <button
                    onClick={onToggleMobileExplorer}
                    className={clsx(
                        "xl:hidden p-1.5 -ml-2 rounded-lg transition-colors",
                        theme === 'light' ? "text-zinc-500 hover:bg-zinc-100" : "text-zinc-400 hover:bg-zinc-900"
                    )}
                >
                    <LayoutTemplate size={18} />
                </button>
                {file && (
                    <div className={clsx(
                        "flex items-center gap-2 px-1 py-1.5 rounded-lg border text-xs shadow-sm cursor-default min-w-0 transition-colors",
                        theme === 'light'
                            ? "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300"
                            : "bg-zinc-900/50 border-zinc-800/50 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700/50"
                    )}>
                        <span className={clsx(
                            "font-mono text-[10px] px-1 py-0.5 rounded shrink-0",
                            badge.color
                        )}>
                            {badge.label}
                        </span>
                        <span className="font-medium tracking-tight truncate">{file.name}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
                <div className={clsx(
                    "flex items-center p-0.5 rounded-lg border mr-2",
                    theme === 'light' ? "bg-zinc-100 border-zinc-200" : "bg-zinc-900 border-zinc-800/50"
                )}>
                    <button
                        onClick={() => setTheme('light')}
                        className={clsx("p-1.5 cursor-pointer rounded-md transition-all", theme === 'light' ? "bg-white text-zinc-800 shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
                        title="Light Mode"
                    >
                        <Sun size={14} />
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={clsx("p-1.5 cursor-pointer rounded-md transition-all", theme === 'dark' ? "bg-zinc-800 text-zinc-200 shadow-sm" : "text-zinc-400 hover:text-zinc-600")}
                        title="Dark Mode"
                    >
                        <Moon size={14} />
                    </button>
                </div>

                <button
                    onClick={onToggleDesktopExplorer}
                    className={clsx(
                        "hidden xl:block p-2 cursor-pointer rounded-lg transition-colors",
                        theme === 'light' ? "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                    )}
                    title="Toggle File Explorer"
                >
                    <LayoutTemplate size={16} />
                </button>
                <button className={clsx(
                    "p-2 cursor-pointer rounded-lg transition-colors",
                    theme === 'light' ? "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                )}>
                    <Settings size={16} />
                </button>
                <button className={clsx(
                    "p-2 cursor-pointer rounded-lg transition-colors",
                    theme === 'light' ? "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                )}>
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    );
}
