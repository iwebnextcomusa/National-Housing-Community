import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Phone, Mail, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! Welcome to National Housing Community. 🏡 I am your virtual assistance advocate. I can match you to affordable housing directories, guide you on Section 8 voucher eligibility, explain donation impacts, or register you as a volunteer! How can I assist you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setApiError(null);

    // Queue user message immediately in state
    const updatedMessages = [...messages, { role: 'user', content: userMessage } as ChatMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Execute post fetch to our secure backend API proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          // Exclude first welcome message since model doesn't need to process its system prompt wrapper
          history: updatedMessages.slice(1, -1) 
        })
      });

      if (!response.ok) {
        throw new Error('Connection with assistance network stalled.');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.text || 'Apologies, I did not receive detailed advice. Please try again.' }
      ]);
    } catch (err: any) {
      console.error(err);
      setApiError('The support channel is temporarily overloaded. Please call (323) 396-1569 directly!');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ I am having trouble connecting to my central knowledge library. For immediate support, please contact ronebiz@gmail.com or call our hotline at (323) 396-1569!'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button with standard circular indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-tr from-emerald-500 to-blue-600 outline-none focus:ring-4 focus:ring-emerald-500/30 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
          aria-label="Toggle live companion assistant"
          id="chatbot-trigger-btn"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          
          {/* Subtle notification glowing rings wrapper */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[460px] max-h-[calc(100vh-200px)] bg-slate-900/95 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col backdrop-blur-xl"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/30 text-emerald-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Housing Advocate AI</span>
                    <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Online & Verified</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
                aria-label="Dismiss chat box"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-slate-950/60 py-1.5 px-4 text-[10px] text-slate-400 border-b border-slate-950 flex justify-between items-center font-mono">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-emerald-400" /> (323) 396-1569
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-blue-400" /> ronebiz@gmail.com
              </span>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-900/40">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 self-end shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-tr from-emerald-500/90 to-blue-600/90 text-white rounded-br-none shadow-md shadow-emerald-500/5'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/30 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 self-end shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 self-end shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700/30 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {apiError && (
                <div className="bg-rose-950/40 border border-rose-900/30 text-rose-300 rounded-xl p-2.5 text-[11px] flex gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{apiError}</span>
                </div>
              )}

              <div ref={listEndRef} />
            </div>

            {/* Input Footer Form */}
            <form onSubmit={handleSend} className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about housing vouchers or rent support..."
                className="flex-1 bg-slate-900 text-white rounded-xl px-3.5 py-2.5 text-xs placeholder-slate-500 border border-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={isTyping}
                maxLength={400}
                aria-label="Chat input field"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 p-2.5 rounded-xl transition flex items-center justify-center shrink-0 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send query"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
