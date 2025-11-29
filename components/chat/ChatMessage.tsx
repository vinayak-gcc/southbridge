import { memo } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/mock-data';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
    message: ChatMessageType;
    theme: 'light' | 'dark';
}

const ChatMessage = memo(function ChatMessage({ message, theme }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "group flex flex-col gap-1 py-1.5 px-3 w-full duration-300 rounded-xl"
            )}
        >
            <div className="flex items-center gap-1.5">
                <div className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform overflow-hidden",
                    isUser
                        ? (theme === 'light' ? "bg-white border border-zinc-500 shadow-sm" : "bg-zinc-800 border border-zinc-700/50")
                        : "bg-zinc-900 border border-zinc-500"
                )}>
                    {isUser ? (
                        <img src="/Me.webp" alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <img src="/southbridge.jpeg" alt="Southbridge" className="w-full h-full object-cover" />
                    )}
                </div>
                <span className={clsx(
                    "text-xs font-medium uppercase tracking-wider",
                    theme === 'light' ? "text-black" : "text-zinc-400"
                )}>
                    {isUser ? 'You' : 'Southbridge Agent'}
                </span>
            </div>

            <div className="space-y-4 min-w-0">
                {message.reasoning && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={clsx(
                            "rounded-xl px-4 py-3 my-2.5 border text-sm backdrop-blur-sm",
                            theme === 'light'
                                ? "bg-zinc-50 border-zinc-200"
                                : "bg-zinc-900/50 border-zinc-800/50"
                        )}
                    >
                        <div className="flex items-center gap-2 text-emerald-500 text-xs uppercase tracking-wider font-semibold mb-2">
                            <span>Reasoning Process</span>
                        </div>
                        <div className={clsx(
                            "leading-relaxed font-mono text-xs",
                            theme === 'light' ? "text-blue-600/90" : "text-blue-300/90"
                        )}>
                            {message.reasoning}
                            {message.isStreaming && !message.content && (
                                <span className="inline-block w-1.5 h-3 ml-1 bg-emerald-400/50 animate-pulse" />
                            )}
                        </div>
                    </motion.div>
                )}

                {message.content && (
                    <div className={clsx(
                        "prose max-w-none prose-p:leading-8 prose-p:my-4 prose-headings:my-6 prose-ul:my-4 prose-li:my-2 prose-pre:my-6 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none",
                        theme === 'light' ? "prose-zinc text-black prose-p:text-black prose-headings:text-black prose-li:text-black prose-strong:text-black" : "prose-invert prose-zinc"
                    )}>
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <div className={clsx(
                                            "rounded-lg overflow-hidden border my-4",
                                            theme === 'light' ? "border-zinc-200" : "border-zinc-800/50"
                                        )}>
                                            <div className={clsx(
                                                "flex items-center justify-between px-3 py-1.5 border-b",
                                                theme === 'light' ? "bg-zinc-50 border-zinc-200" : "bg-zinc-900/80 border-zinc-800/50"
                                            )}>
                                                <span className={clsx(
                                                    "text-xs font-medium",
                                                    theme === 'light' ? "text-black" : "text-zinc-400"
                                                )}>{match[1]}</span>
                                            </div>
                                            <SyntaxHighlighter
                                                {...props}
                                                style={theme === 'light' ? vs : vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1rem',
                                                    background: theme === 'light' ? '#ffffff' : '#09090b',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code {...props} className={clsx(
                                            "px-1.5 py-0.5 rounded text-sm font-mono",
                                            theme === 'light' ? "bg-zinc-100 text-black" : "bg-zinc-800/50 text-zinc-200"
                                        )}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {message.content + (message.isStreaming && message.content ? ' ▍' : '')}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
});

export { ChatMessage };
