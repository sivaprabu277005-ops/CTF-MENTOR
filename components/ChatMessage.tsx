import React from 'react';
import { Message, Role } from '../types';
import { Bot, User, AlertTriangle } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === Role.MODEL;

  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
          isModel 
            ? 'bg-slate-900 border-green-500/50 text-green-500' 
            : 'bg-slate-800 border-slate-600 text-slate-300'
        }`}>
          {isModel ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col min-w-0 rounded-2xl p-4 shadow-sm border ${
          isModel 
            ? 'bg-slate-900/80 border-slate-700/50 rounded-tl-none' 
            : 'bg-green-900/20 border-green-800/50 text-slate-100 rounded-tr-none'
        }`}>
          {message.isError ? (
            <div className="flex items-center text-red-400 gap-2">
              <AlertTriangle size={18} />
              <span>Error generating response. Please try again.</span>
            </div>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
          
          <span className="text-[10px] text-slate-500 mt-2 self-end font-mono">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;