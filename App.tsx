import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Sparkles, Trash2, StopCircle } from 'lucide-react';
import { ChatState, Message, Role, CtfCategory } from './types';
import { sendMessageStream, createChatSession } from './services/geminiService';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedCategory: CtfCategory.GENERAL,
  });
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [streamingText, setStreamingText] = useState('');

  // Initialize chat session on mount
  useEffect(() => {
    try {
      createChatSession();
      // Add initial greeting
      const initialGreeting: Message = {
        id: 'init-1',
        role: Role.MODEL,
        content: `**System Online.** \n\nI am your CTF Mentor. I can help you with Cryptography, Web Security, Forensics, Reverse Engineering, and more.\n\nSelect a category from the sidebar or just describe your challenge below. Remember: I provide guidance and progressive hints, not direct flags.`,
        timestamp: Date.now()
      };
      setChatState(prev => ({ ...prev, messages: [initialGreeting] }));
    } catch (e) {
      console.error("Failed to init chat", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, streamingText]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || chatState.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: inputText,
      timestamp: Date.now(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    setInputText('');
    setStreamingText('');

    try {
      // Prepend context if changing categories significantly, but usually the system prompt handles it.
      // We can inject the current category context if needed, but the model is smart enough.
      // Let's just send the user message.
      
      const stream = sendMessageStream(inputText);
      let fullResponse = '';

      for await (const chunk of stream) {
        if (chunk) {
          fullResponse += chunk;
          setStreamingText(prev => prev + chunk);
        }
      }

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        content: fullResponse,
        timestamp: Date.now(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, modelMessage],
        isLoading: false,
      }));
      setStreamingText('');

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        content: "I encountered an error processing your request. Please check your connection or API key.",
        timestamp: Date.now(),
        isError: true
      };
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
      setStreamingText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the current session history?")) {
      createChatSession(); // Reset Gemini session context
      setChatState(prev => ({
        ...prev,
        messages: [{
            id: Date.now().toString(),
            role: Role.MODEL,
            content: `**Session Reset.** \n\nReady for the next challenge. What are we working on?`,
            timestamp: Date.now()
        }]
      }));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200 font-sans selection:bg-green-500/30 selection:text-green-200">
      
      <Sidebar 
        selectedCategory={chatState.selectedCategory}
        onSelectCategory={(cat) => setChatState(prev => ({ ...prev, selectedCategory: cat }))}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-800 md:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 flex items-center gap-2">
                {chatState.selectedCategory}
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block">
                Secure Channel Established
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleClearChat}
              className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="Clear History"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-2">
            {chatState.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {/* Streaming Message Bubble */}
            {streamingText && (
               <ChatMessage 
                 message={{
                   id: 'streaming',
                   role: Role.MODEL,
                   content: streamingText,
                   timestamp: Date.now()
                 }} 
               />
            )}

            {/* Loading Indicator (only if not streaming yet and loading) */}
            {chatState.isLoading && !streamingText && (
              <div className="flex justify-start w-full mb-6">
                 <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-green-500/50 flex items-center justify-center text-green-500">
                      <Sparkles size={16} />
                    </div>
                    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                      <div className="typing-indicator flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </div>
                    </div>
                 </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex items-end gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700 focus-within:border-green-500/50 focus-within:ring-1 focus-within:ring-green-500/20 transition-all shadow-lg">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${chatState.selectedCategory.toLowerCase()} challenges...`}
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm p-3 max-h-32 min-h-[44px] resize-none focus:outline-none font-mono"
                rows={1}
                style={{ height: 'auto', minHeight: '44px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || chatState.isLoading}
                className="p-3 bg-green-600 hover:bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                {chatState.isLoading ? <StopCircle size={18} className="animate-pulse" /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-2">
              AI can make mistakes. Do not use for illegal activities. Educational use only.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;