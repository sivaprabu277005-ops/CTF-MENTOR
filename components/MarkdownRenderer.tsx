import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Terminal, Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="prose prose-invert prose-sm max-w-none break-words">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, '');
            const isMultiLine = !inline && match;
            
            // Random index for copy button tracking (simple heuristic)
            const index = Math.random(); 

            if (isMultiLine) {
              return (
                <div className="relative group my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                    <span className="text-xs text-green-400 font-mono uppercase">
                      {match ? match[1] : 'code'}
                    </span>
                    <button
                      onClick={() => handleCopy(codeContent, index)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <code className="font-mono text-sm text-slate-200 block" {...props}>
                      {children}
                    </code>
                  </div>
                </div>
              );
            }
            
            return (
              <code className="bg-slate-800 text-green-300 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700" {...props}>
                {children}
              </code>
            );
          },
          h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4 mt-2 border-b border-slate-700 pb-2">{children}</h1>,
          h2: ({children}) => <h2 className="text-xl font-bold text-green-400 mb-3 mt-4">{children}</h2>,
          h3: ({children}) => <h3 className="text-lg font-bold text-green-300 mb-2 mt-3">{children}</h3>,
          p: ({children}) => <p className="mb-4 leading-relaxed text-slate-300">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1 text-slate-300">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 text-slate-300">{children}</ol>,
          li: ({children}) => <li className="pl-1">{children}</li>,
          a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-300 break-all">{children}</a>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 pl-4 py-1 my-4 bg-slate-800/30 text-slate-400 italic rounded-r">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;