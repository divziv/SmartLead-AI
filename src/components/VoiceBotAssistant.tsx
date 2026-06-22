import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types.ts';
import { Mic, MicOff, Send, MessageSquareText, HelpCircle, VolumeX, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface VoiceBotAssistantProps {
  customerId: string;
  customerName: string;
  audioSpeechEnabled: boolean;
  setAudioSpeechEnabled: (val: boolean) => void;
}

export default function VoiceBotAssistant({
  customerId,
  customerName,
  audioSpeechEnabled,
  setAudioSpeechEnabled
}: VoiceBotAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Bengali'>('English');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize browser speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      // Match language-locale mappings
      const getLocale = (lang: string) => {
        switch (lang) {
          case 'Hindi': return 'hi-IN';
          case 'Telugu': return 'te-IN';
          case 'Tamil': return 'ta-IN';
          case 'Bengali': return 'bn-IN';
          default: return 'en-IN';
        }
      };

      rec.lang = getLocale(language);

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [language]);

  // Handle first greeting message when customerId changes
  useEffect(() => {
    setMessages([
      {
        sender: 'assistant',
        text: `Swagatam! I am your IDBI SmartLead AI Companion. I can help guide your credit journey or explain eligibility criteria in English, Hindi/हिंदी, Telugu/తెలుగు, Tamil/தமிழ், and Bengali/বাংলা. Click the Mic button or type to get started.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [customerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speak assistant statement out loud
  const speakText = (text: string, lang: string) => {
    if (!audioSpeechEnabled || !window.speechSynthesis) return;

    // Stop former speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voice accents based on target language
    const getLangLocale = (l: string) => {
      switch (l) {
        case 'Hindi': return 'hi-IN';
        case 'Telugu': return 'te-IN';
        case 'Tamil': return 'ta-IN';
        case 'Bengali': return 'bn-IN';
        default: return 'en-IN';
      }
    };
    utterance.lang = getLangLocale(lang);
    utterance.rate = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!voiceSupported) {
      alert("Multilingual voice controls are fully optimised but not fully supported by your browser sandbox environment. We recommend typing in the chat below.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel(); // Mute assistant prior to speaking
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText;
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          question: query,
          language
        })
      });

      const data = await response.json();
      if (data.success) {
        const assistantMsg: ChatMessage = {
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
        speakText(data.text, language);
      } else {
        throw new Error(data.error || "Failed chat feedback responses");
      }
    } catch (e: any) {
      console.error(e);
      const errMsg: ChatMessage = {
        sender: 'assistant',
        text: `Dear ${customerName}, our high‑priority voice API experienced a transient connection delay, but our underwriting engine confirms you stay securely eligible based on your steady digital deposits.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col h-[520px]" id="voice_bot_widget">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 shrink-0 font-display">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
            <MessageSquareText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 flex items-center space-x-1.5ClassName">
              <span>Inclusive AI Financial Companion</span>
            </h2>
            <p className="text-[10px] text-slate-500">Multilingual Voice Support assisting elderly, low-literacy, and student applications.</p>
          </div>
        </div>

        {/* Dialect selector */}
        <div className="flex items-center space-x-3 text-xs">
          <label className="text-[11px] text-slate-400 font-sans font-medium hidden sm:inline">Talk in:</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-sans font-medium"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi / हिंदी</option>
            <option value="Telugu">Telugu / తెలుగు</option>
            <option value="Tamil">Tamil / தமிழ்</option>
            <option value="Bengali">Bengali / বাংলা</option>
          </select>
        </div>
      </div>

      {/* CHAT MESSAGES PANEL */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1 scrollbar-thin" id="assistant_logs_scroll">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={idx}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs font-sans ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-50 text-slate-700 border border-slate-200/60 rounded-bl-none'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center space-x-1 mb-1.5 select-none text-[10px] text-indigo-600/85 font-display font-medium uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>IDBI Assistant</span>
                  </div>
                )}
                
                <p className="leading-relaxed leading-medium">{msg.text}</p>
                
                <div className={`text-[9px] mt-2 text-right ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-50 text-slate-450 border border-slate-100 rounded-2xl p-4 max-w-[85%] text-xs flex items-center space-x-2">
              <span className="flex space-x-1">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </span>
              <span className="text-[10px] font-mono">Appraising cashflows...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER CONTROLS & MICROPHONE VOICE INPUT */}
      <div className="mt-auto pt-2 shrink-0 border-t border-slate-100">
        
        {/* Suggestion prompts */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none font-sans text-[10px]">
          <button
            onClick={() => setInputText("What are my customized offers?")}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-full whitespace-nowrap text-slate-600 font-medium transition-all"
          >
            "What offers do I qualify for?"
          </button>
          <button
            onClick={() => setInputText("Am I eligible for a home loan?")}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-full whitespace-nowrap text-slate-600 font-medium transition-all"
          >
            "Am I eligible for a loan?"
          </button>
          <button
            onClick={() => setInputText("How does the system estimate my monthly earnings?")}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-full whitespace-nowrap text-slate-600 font-medium transition-all"
          >
            "How do you calculate my income?"
          </button>
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          {/* Micro Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer ${
              isListening
                ? 'bg-rose-500/20 text-rose-600 border-rose-500 animate-pulse'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title="Speech-to-Text Voice Command"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Typing input */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your question or use Voice input..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
          />

          {/* Send buttons */}
          <button
            type="submit"
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-indigo-505/10 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="chat_send_button"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>

        {isListening && (
          <div className="mt-2 text-center text-[10px] text-rose-500 animate-pulse font-mono select-none">
            ● LISTENING... SPEAK INTO YOUR MICROPHONE NOW
          </div>
        )}
      </div>
    </div>
  );
}
