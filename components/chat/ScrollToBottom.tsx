import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToBottomProps {
    show: boolean;
    onClick: () => void;
}

export function ScrollToBottom({ show, onClick }: ScrollToBottomProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={onClick}
                    className="absolute cursor-pointer bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 p-2 rounded-full shadow-lg border border-zinc-700 z-10"
                >
                    <ArrowDown size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
