'use client';

import Editor from '@monaco-editor/react';
import { FileNode } from '@/lib/mock-data';
import { CodeViewerHeader } from './CodeViewerHeader';
import { CodeViewerFooter } from './CodeViewerFooter';
import { FileCode } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeViewerProps {
    file?: FileNode;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    onToggleMobileExplorer?: () => void;
    onToggleDesktopExplorer?: () => void;
}

export function CodeViewer({ file, theme, setTheme, onToggleMobileExplorer, onToggleDesktopExplorer }: CodeViewerProps) {
    return (
        <div className={clsx("h-full flex flex-col min-h-0 relative", theme === 'light' ? "bg-white" : "bg-zinc-950")}>
          
            <CodeViewerHeader
                file={file}
                theme={theme}
                setTheme={setTheme}
                onToggleMobileExplorer={onToggleMobileExplorer}
                onToggleDesktopExplorer={onToggleDesktopExplorer}
            />

            <div className="flex-1 relative group pb-6">
                {file ? (
                    <Editor
                        height="100%"
                        path={file.name}
                        defaultLanguage={file.language || 'typescript'}
                        language={file.language || 'typescript'}
                        value={file.content}
                        theme={theme === 'light' ? 'light-custom' : 'vs-dark'}
                        options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            fontSize: 13,
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            lineHeight: 22,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            smoothScrolling: true,
                            cursorBlinking: 'smooth',
                            cursorSmoothCaretAnimation: 'on',
                            renderLineHighlight: 'all',
                            bracketPairColorization: { enabled: true },
                            guides: { indentation: true },
                        }}
                        beforeMount={(monaco) => {
                            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                                jsx: monaco.languages.typescript.JsxEmit.React,
                                jsxFactory: 'React.createElement',
                                reactNamespace: 'React',
                                allowNonTsExtensions: true,
                                allowJs: true,
                                target: monaco.languages.typescript.ScriptTarget.Latest,
                            });

                            monaco.editor.defineTheme('vs-dark', {
                                base: 'vs-dark',
                                inherit: true,
                                rules: [],
                                colors: {
                                    'editor.background': '#09090b', // zinc-950
                                    'editor.lineHighlightBackground': '#18181b', // zinc-900
                                    'editor.foreground': '#e4e4e7', // zinc-200
                                }
                            });
                            monaco.editor.defineTheme('light-custom', {
                                base: 'vs',
                                inherit: true,
                                rules: [],
                                colors: {
                                    'editor.background': '#ffffff',
                                    'editor.lineHighlightBackground': '#f4f4f5', // zinc-100
                                    'editor.foreground': '#09090b', // zinc-950
                                }
                            });
                        }}
                    />
                ) : (
                    <div className={clsx(
                        "h-full flex flex-col items-center justify-center",
                        theme === 'light' ? "bg-zinc-50 text-zinc-400" : "bg-zinc-950/50 text-zinc-500"
                    )}>
                        <div className={clsx(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border shadow-inner",
                            theme === 'light' ? "bg-white border-zinc-200" : "bg-zinc-900/50 border-zinc-800/50"
                        )}>
                            <FileCode size={32} className="opacity-20" />
                        </div>
                        <p className="text-sm font-medium opacity-80">Select a file to view its content</p>
                        <p className="text-xs opacity-60 mt-2">Use the explorer on the left to navigate</p>
                    </div>
                )}
            </div>

            <CodeViewerFooter file={file} theme={theme} />
            
        </div >
    );
}
