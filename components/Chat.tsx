
import React, { useState, useRef, useEffect } from 'react';
import { AppState, ChatMessage, StudyMode, JournalEntry, Chapter } from '../types';
import { generateResponse } from '../services/geminiService';

interface ChatProps {
  state: AppState;
  onAddMessage: (msg: ChatMessage) => void;
  onUpdateMode: (mode: StudyMode) => void;
  onAddJournalEntry: (entry: JournalEntry) => void;
  onUpdateActiveChapter: (chapterId: string) => void;
}

const Chat: React.FC<ChatProps> = ({ state, onAddMessage, onUpdateMode, onAddJournalEntry, onUpdateActiveChapter }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeBook = state.books[0];
  const activeChapter = activeBook?.chapters.find(ch => ch.chapter_id === state.activeChapterId) || activeBook?.chapters[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.activeChat, isTyping]);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      mode: state.currentMode
    };

    onAddMessage(userMsg);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(input, state.activeChat, state.books, state.currentMode);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        mode: state.currentMode
      };
      
      onAddMessage(assistantMsg);

      if (response.metadata.should_log) {
        const journalEntry: JournalEntry = {
          entry_id: `JE-${Date.now()}`,
          timestamp: new Date().toISOString(),
          mode: state.currentMode,
          user_input: input,
          system_response: response.text,
          detected_feelings: response.metadata.detected_feelings,
          detected_themes: response.metadata.detected_themes,
          linked_book: activeBook.book_metadata.book_id,
          linked_chapter: state.activeChapterId,
          linked_principles: response.metadata.linked_principles
        };
        onAddJournalEntry(journalEntry);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const modeColors = {
    [StudyMode.FREE]: 'bg-slate-100 text-slate-600 border-slate-200',
    [StudyMode.STUDY]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [StudyMode.APPLICATION]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [StudyMode.REFLECTION]: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* HEADER */}
      <header className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isSidebarOpen ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600'
            }`}
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
          </button>
          <div>
            <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest opacity-40">Active Chapter</h3>
            <p className="font-bold text-indigo-600 text-sm tracking-tight flex items-center gap-2">
              {activeChapter?.chapter_title}
              <i className="fa-solid fa-sparkles text-[10px] opacity-30"></i>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {Object.values(StudyMode).map((mode) => (
            <button
              key={mode}
              onClick={() => onUpdateMode(mode)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all uppercase tracking-wider ${
                state.currentMode === mode 
                  ? `${modeColors[mode]} shadow-sm scale-105 border-current` 
                  : 'bg-white text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CHAT AREA WITH SIDEBAR OVERLAY */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* CHAPTER SIDEBAR (DRAWER) */}
        <div className={`absolute left-0 top-0 bottom-0 z-20 w-72 bg-slate-50 border-r border-slate-100 transition-transform duration-300 ease-in-out shadow-2xl shadow-slate-200 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-slate-200 bg-white">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Study Guide</p>
            <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{activeBook?.book_metadata.title}</h4>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {activeBook?.chapters.map((ch: Chapter) => (
              <button
                key={ch.chapter_id}
                onClick={() => {
                  onUpdateActiveChapter(ch.chapter_id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all group ${
                  state.activeChapterId === ch.chapter_id
                    ? 'bg-white border-indigo-200 shadow-md border ring-1 ring-indigo-50'
                    : 'bg-transparent hover:bg-white hover:shadow-sm border border-transparent'
                }`}
              >
                <p className={`text-[9px] font-bold uppercase tracking-tighter mb-1 ${
                  state.activeChapterId === ch.chapter_id ? 'text-indigo-400' : 'text-slate-300'
                }`}>
                  Chapter {ch.chapter_number}
                </p>
                <h5 className={`font-bold text-sm leading-tight transition-colors ${
                  state.activeChapterId === ch.chapter_id ? 'text-indigo-700' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {ch.chapter_title}
                </h5>
                <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 opacity-60 font-medium">
                  {ch.chapter_summary.short_summary}
                </p>
              </button>
            ))}
          </div>
          <div className="p-6 border-t border-slate-200 bg-white">
             <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                <i className="fa-solid fa-graduation-cap text-indigo-400 mb-2"></i>
                <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-tight">Structured Study</p>
             </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-50/30"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          {state.activeChat.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-100'
                }`}>
                  <i className={`fa-solid ${msg.role === 'user' ? 'fa-user' : 'fa-brain-circuit'}`}></i>
                </div>
                <div className={`space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-5 rounded-3xl shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    <p className="text-[15px] whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.mode}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type in ${state.currentMode} mode...`}
              className="w-full pl-6 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            />
            <div className="absolute right-3 top-2 flex gap-2">
              <button 
                type="button"
                onClick={startVoiceInput}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isRecording ? 'bg-red-500 text-white animate-pulse shadow-lg' : 'bg-slate-200 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
                title="Voice Input"
              >
                <i className={`fa-solid ${isRecording ? 'fa-microphone-lines' : 'fa-microphone'}`}></i>
              </button>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-100"
              >
                <i className="fa-solid fa-paper-plane-top"></i>
              </button>
            </div>
          </div>
        </form>
        <p className="text-[11px] text-center text-slate-400 mt-4 uppercase tracking-widest font-semibold">
          Exclusively Neville Goddard's Teachings
        </p>
      </footer>
    </div>
  );
};

export default Chat;
