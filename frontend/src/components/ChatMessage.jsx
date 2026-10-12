import { User, Bot } from "lucide-react";
import ChatSchemeCard from "./ChatSchemeCard";

export default function ChatMessage({ message, isStreaming }) {
  const isUser = message.role === "USER";

  return (
    <div className={`mb-6 flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[92%] gap-3 sm:max-w-[80%] sm:gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
          isUser 
            ? "border-green-200 bg-gradient-to-br from-green-100 to-lime-50 text-green-700"
            : "border-green-100 bg-white text-green-700"
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 min-w-0">
            <div className={`rounded-2xl px-4 py-3.5 text-[15px] leading-relaxed shadow-sm sm:px-5 ${
            isUser 
                ? "rounded-tr-sm bg-gradient-to-br from-green-700 to-green-600 text-white shadow-green-900/10"
                : "rounded-tl-sm border border-green-100/80 bg-white text-gray-800 shadow-[0_6px_20px_rgba(20,83,45,0.045)]"
          }`}>
            <span className="whitespace-pre-wrap break-words">{message.content}</span>
            {isStreaming && (
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-green-600 align-middle"></span>
            )}
          </div>

          {/* Scheme Cards (only for ASSISTANT) */}
          {!isUser && message.recommendations && message.recommendations.length > 0 && (
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {message.recommendations.map((scheme, idx) => (
                <ChatSchemeCard key={`${scheme.schemeId}-${idx}`} scheme={scheme} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
