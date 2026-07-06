import React from 'react';
import { ShieldCheck, Eye, Sparkles, Volume2, HelpCircle } from 'lucide-react';

interface HeaderProps {
  accessibleMode: boolean;
  setAccessibleMode: (val: boolean) => void;
  lowLiteracyMode: boolean;
  setLowLiteracyMode: (val: boolean) => void;
  audioSpeechEnabled: boolean;
  setAudioSpeechEnabled: (val: boolean) => void;
}

export default function Header({
  accessibleMode,
  setAccessibleMode,
  lowLiteracyMode,
  setLowLiteracyMode,
  audioSpeechEnabled,
  setAudioSpeechEnabled,
}: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-xl" id="idbi_header_el">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand logo & tagline */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <span className="font-display font-bold text-lg text-slate-900">IDBI</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-bold text-xl tracking-wide text-white">SmartLead AI</h1>
              <span className="bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Innovate 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">AI-Powered Behavioral Lending &amp; Financial Inclusion Platform</p>
          </div>
        </div>

        {/* Action Controls & Accessibility Hub */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Sound Notification Aloud Reader */}
          <button
            onClick={() => {
              setAudioSpeechEnabled(!audioSpeechEnabled);
              if (!audioSpeechEnabled && window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance("Voice guidance enabled. High‑contrast audio responses will assist you.");
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
              }
            }}
            className={`p-2 rounded-lg border transition-all flex items-center space-x-1 sm:space-x-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              audioSpeechEnabled
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                : 'bg-slate-800 text-slate-400 border-transparent hover:bg-slate-700 hover:text-white'
            }`}
            title="Read results aloud (Text-to-Speech Accessibility)"
            aria-label="Read results aloud. Text-to-speech accessibility."
            aria-pressed={audioSpeechEnabled}
            id="accessibility_audio_btn"
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden md:inline font-sans">Voice Guidance</span>
          </button>

          {/* Color-Blind Friendly / Custom High Contrast Switch */}
          <button
            onClick={() => {
              setAccessibleMode(!accessibleMode);
              if (audioSpeechEnabled) {
                const text = accessibleMode ? "Standard theme applied." : "Color-blind friendly contrast theme activated. Red-Green indicators replaced with high-contrast blue, yellow, and secure labels.";
                const u = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(u);
              }
            }}
            className={`p-2 rounded-lg border transition-all flex items-center space-x-1 sm:space-x-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              accessibleMode
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                : 'bg-slate-800 text-slate-400 border-transparent hover:bg-slate-700 hover:text-white'
            }`}
            title="Color-blind safe indicators (Avoids Red-vs-Green conflicts)"
            aria-label="Toggle color-blind friendly mode. Replaces red and green indicators."
            aria-pressed={accessibleMode}
            id="accessibility_contrast_btn"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden md:inline font-sans">Color-Blind Mode</span>
          </button>

          {/* Low Literacy Mode Toggle */}
          <button
            onClick={() => {
              setLowLiteracyMode(!lowLiteracyMode);
              if (audioSpeechEnabled) {
                const text = lowLiteracyMode ? "Standard financial views applied." : "Simplified financial explanation mode activated. Complex metrics like debt‑to‑income are rephrased into human terms.";
                const u = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(u);
              }
            }}
            className={`p-2 rounded-lg border transition-all flex items-center space-x-1 sm:space-x-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              lowLiteracyMode
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border-transparent hover:bg-slate-700 hover:text-white'
            }`}
            title="Simplified terminology & descriptive tooltips for general accessibility"
            aria-label="Toggle simplified mode. Rephrases complex financial terminology."
            aria-pressed={lowLiteracyMode}
            id="accessibility_literacy_btn"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline font-sans">Simplified Mode</span>
          </button>

          {/* Core System Status */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg text-xs" id="sandbox_status_wrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400 font-mono">Sandbox API: IN-MUM2</span>
          </div>

        </div>
      </div>
    </header>
  );
}
