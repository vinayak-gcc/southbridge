'use client';

import { useRef, useEffect, useState } from 'react';
import { useChatStream } from './useChatStream';
import { ChatMessage } from './ChatMessage';
import { ScrollToBottom } from './ScrollToBottom';
import { INITIAL_CHAT_STATE } from '@/lib/mock-data';
import { clsx } from 'clsx';

interface ChatWindowProps {
    theme: 'light' | 'dark';
}

export function ChatWindow({ theme }: ChatWindowProps) {
    const { messages, isStreaming, simulateStream, addMessage } = useChatStream();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (messages.length === 0) {
            INITIAL_CHAT_STATE.forEach(msg => addMessage(msg));
        }
    }, []);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

        setShowScrollButton(!isAtBottom);
        setAutoScroll(isAtBottom);
    };

    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, autoScroll]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
            setAutoScroll(true);
        }
    };

    return (
        <div className={clsx(
            "relative h-full flex flex-col",
            theme === 'light' ? "bg-white" : "bg-zinc-950/30"
        )}>
            <div className={clsx(
                "h-14 border-b flex items-center justify-between px-3 backdrop-blur-md z-10 sticky top-0",
                theme === 'light' ? "bg-white/80 border-zinc-200" : "bg-zinc-950/80 border-zinc-800/50"
            )}>
                <div className="flex items-center gap-1.5">
                    <div className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                    <span className={clsx(
                        "text-sm font-medium tracking-tight",
                        theme === 'light' ? "text-zinc-800" : "text-zinc-200"
                    )}>Southbridge Agent</span>
                </div>
                <button
                    onClick={simulateStream}
                    disabled={isStreaming}
                    className={clsx(
                        "group flex items-center gap-2 cursor-pointer px-4 sm:px-4 py-1.5 border text-xs font-medium rounded-lg transition-all shadow-sm whitespace-nowrap",
                        theme === 'light'
                            ? "bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-600"
                            : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                >
                    {isStreaming ? 'Sending...' : 'Send'}
                </button>
            </div>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar"
            >
                <div className="py-2">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} theme={theme} />
                    ))}
                </div>
            </div>

            <ScrollToBottom show={showScrollButton} onClick={scrollToBottom} />

            <div className={clsx(
                "p-4 border-t",
                theme === 'light' ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-950"
            )}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        disabled
                        className={clsx(
                            "w-full rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed border",
                            theme === 'light'
                                ? "bg-zinc-50 border-zinc-200 text-zinc-500 placeholder:text-zinc-400"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400"
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
