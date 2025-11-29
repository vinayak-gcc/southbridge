import { useState, useCallback, useRef } from 'react';
import { ChatMessage, SIMULATED_RESPONSE } from '@/lib/mock-data';

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const simulateStream = useCallback(async () => {
    if (isStreaming) return;
    
    setIsStreaming(true);
    const newMsgId = crypto.randomUUID();
    
    // Add initial empty message
    setMessages(prev => [...prev, {
      id: newMsgId,
      role: 'assistant',
      content: '',
      reasoning: '',
      isStreaming: true
    }]);

    abortControllerRef.current = new AbortController();

    // Stream reasoning first
    const reasoningTokens = SIMULATED_RESPONSE.reasoning.split(' ');
    for (let i = 0; i < reasoningTokens.length; i++) {
      if (abortControllerRef.current?.signal.aborted) break;
      
      await new Promise(r => setTimeout(r, 60)); // Slower reasoning
      
      setMessages(prev => prev.map(msg => {
        if (msg.id === newMsgId) {
          return {
            ...msg,
            reasoning: (msg.reasoning ? msg.reasoning + ' ' : '') + reasoningTokens[i]
          };
        }
        return msg;
      }));
    }

    // Stream content
    // Split by spaces but preserve newlines and other whitespace
    const contentTokens = SIMULATED_RESPONSE.content.split(/(\s+)/);
    
    for (let i = 0; i < contentTokens.length; i++) {
      if (abortControllerRef.current?.signal.aborted) break;

      const token = contentTokens[i];
      if (!token) continue;

      await new Promise(r => setTimeout(r, 15)); // Faster streaming for smoother feel
      
      setMessages(prev => prev.map(msg => {
        if (msg.id === newMsgId) {
          return {
            ...msg,
            content: (msg.content || '') + token
          };
        }
        return msg;
      }));
    }

    setMessages(prev => prev.map(msg => {
      if (msg.id === newMsgId) {
        return { ...msg, isStreaming: false };
      }
      return msg;
    }));
    
    setIsStreaming(false);
    abortControllerRef.current = null;
  }, [isStreaming]);

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  return {
    messages,
    isStreaming,
    simulateStream,
    addMessage
  };
}
