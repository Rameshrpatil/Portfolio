import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { api } from "../lib/api";

type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: "model", parts: [{ text: "Hi there! I'm Ramesh's AI assistant. Ask me anything about his experience, skills, or projects!" }] }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", parts: [{ text: input.trim() }] };
    setHistory(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Send the *previous* history along with the new message
      // Wait, the API expects the message separately, or we can just send the history.
      // Let's look at our backend: it takes `message: str, history: list`.
      // We will send the history without the *current* user message because it gets passed as `message`.
      const res = await api.askAssistant(userMsg.parts[0].text, history);
      
      setHistory(prev => [...prev, { role: "model", parts: [{ text: res.response }] }]);
    } catch (err) {
      setHistory(prev => [...prev, { role: "model", parts: [{ text: "Oops, I'm having trouble connecting to my backend right now. Please try again later!" }] }]);
    }
    setLoading(false);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 2000);
    // Hide tooltip after 8 seconds (visible for 6 seconds)
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute right-14 mr-2 px-4 py-2 bg-secondary/90 backdrop-blur text-foreground text-sm font-semibold rounded-full shadow-xl whitespace-nowrap pointer-events-none border border-border/50"
                >
                  Ask me anything! 👋
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Assistant"
              className="relative w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-background"
            >
              <MessageSquare size={24} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-background border border-border/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-secondary/50 p-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                className="p-2 hover:bg-background rounded-full transition-colors text-muted-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-background">
              {history.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-secondary/50 text-foreground border border-border/50 rounded-tl-sm"
                  }`}>
                    {typeof msg.parts[0].text === 'string' ? msg.parts[0].text : JSON.stringify(msg.parts[0].text)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-secondary text-foreground">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50 rounded-tl-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-background border-t border-border/50">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about Ramesh..."
                  className="w-full bg-secondary/30 border border-border/50 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  disabled={loading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={14} className="-ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
