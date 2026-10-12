import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LanguageSelector from "./LanguageSelector";
import FarmerProfileSidebar from "./FarmerProfileSidebar";
import { streamChatMessage, getSessionProfile } from "../services/chatApi";
import { AlertCircle, Bot, RotateCcw } from "lucide-react";

export default function ChatAssistant() {
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("en"); // en | ta
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  const messagesContainerRef = useRef(null);

  // Initialize session ID from sessionStorage or create new
  useEffect(() => {
    const existingSession = sessionStorage.getItem("chatSessionId");
    if (existingSession) {
      setSessionId(existingSession);
      // Fetch existing profile if available
      getSessionProfile(existingSession)
        .then(res => { if (res) setProfile(res); })
        .catch(err => console.debug("No existing profile found."));
    } else {
      const newSession = crypto.randomUUID();
      sessionStorage.setItem("chatSessionId", newSession);
      setSessionId(newSession);
    }

    // Add a welcome message if none exist
    setMessages([{ 
      id: "welcome", 
      role: "ASSISTANT", 
      content: "Hello! I am Kisan Setu AI. I can help you find agricultural schemes. Please tell me about your farm, location, and what you grow.",
      recommendations: [] 
    }]);
  }, []);

  // Set Tamil welcome message if language changed and no user interaction yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === "welcome") {
      setMessages([{
        id: "welcome",
        role: "ASSISTANT",
        content: language === "ta" 
          ? "வணக்கம்! நான் கிசான் சேது AI. தங்களுக்கு ஏற்ற விவசாய திட்டங்களை கண்டறிய நான் உதவ முடியும். உங்கள் விவசாய நிலம், இடம், மற்றும் பயிர்களை பற்றி கூறவும்." 
          : "Hello! I am Kisan Setu AI. I can help you find agricultural schemes. Please tell me about your farm, location, and what you grow."
      }]);
    }
  }, [language]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, streamingText]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || isStreaming) return;
    setError(null);

    // Add user message to UI
    const tempUserMsg = { id: Date.now().toString(), role: "USER", content: text };
    setMessages(prev => [...prev, tempUserMsg]);
    setIsStreaming(true);
    setStreamingText("");

    let currentResponseRef = { recommendations: [], text: "" };

    const onChunk = (chunkStr) => {
      currentResponseRef.text += chunkStr;
      setStreamingText(currentResponseRef.text);
    };

    onChunk.onProfile = (payload) => {
      if (payload.farmerProfile) setProfile(payload.farmerProfile);
      if (payload.recommendations) currentResponseRef.recommendations = payload.recommendations;
    };

    const onDone = () => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now()+1).toString(), 
          role: "ASSISTANT", 
          content: currentResponseRef.text,
          recommendations: currentResponseRef.recommendations
        }
      ]);
      setStreamingText("");
      setIsStreaming(false);
    };

    const onError = (err) => {
      setError(language === "ta" ? "மன்னிக்கவும், பிழை ஏற்பட்டுள்ளது." : "Sorry, an error occurred communicating with the AI.");
      setIsStreaming(false);
      setStreamingText("");
    };

    await streamChatMessage(sessionId, text, language, onChunk, onDone, onError);
  };

  const handleReset = () => {
    if (window.confirm(language === "ta" ? "புதிய உரையாடலை தொடங்க வேண்டுமா?" : "Start a new conversation?")) {
      const newSession = crypto.randomUUID();
      sessionStorage.setItem("chatSessionId", newSession);
      setSessionId(newSession);
      setProfile({});
      setMessages([{ 
        id: "welcome", 
        role: "ASSISTANT", 
        content: language === "ta" 
          ? "வணக்கம்! நான் கிசான் சேது AI..." 
          : "Hello! I am Kisan Setu AI. I can help you find agricultural schemes. Please tell me about your farm, location, and what you grow."
      }]);
      setError(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 p-2 sm:gap-6 sm:p-4 xl:flex-row xl:p-5">
      
      {/* Sidebar - farmer profile */}
      <div className="hidden h-[min(760px,calc(100dvh-140px))] w-80 shrink-0 xl:block">
        <FarmerProfileSidebar profile={profile} language={language} />
      </div>

      {/* Main chat area */}
      <div className="flex h-[min(760px,calc(100dvh-120px))] min-h-[560px] flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_24px_70px_rgba(20,83,45,0.10)] ring-1 ring-green-900/[0.04]">
        
        {/* Header */}
        <div className="flex min-h-[76px] shrink-0 items-center justify-between gap-3 border-b border-green-100/80 bg-gradient-to-r from-white via-green-50/50 to-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md shadow-green-900/15">
              <Bot size={23} />
            </div>
            <div>
              <h2 className="font-extrabold tracking-tight text-gray-950">Kisan Setu Assistant</h2>
              <p className="mt-0.5 text-xs font-medium text-green-700">AI · Farmer support</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <button onClick={handleReset} aria-label="Reset Chat" className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600" title="Reset Chat">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_90%_0%,rgba(187,247,208,0.22),transparent_40%),#f7faf8] p-4 sm:p-7">
          
          {error && (
            <div className="mx-auto mb-6 flex max-w-md items-center gap-3 rounded-2xl border border-red-100 bg-white p-4 text-red-600 shadow-sm">
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={msg.id || i} message={msg} isStreaming={false} />
          ))}

          {isStreaming && streamingText && (
            <ChatMessage 
              message={{ role: "ASSISTANT", content: streamingText }} 
              isStreaming={true} 
            />
          )}
          
          <div className="h-4" />
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-gray-100 bg-white/95 p-4 sm:px-6 sm:pb-6">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isStreaming} 
            language={language}
          />
        </div>

      </div>

    </div>
  );
}
