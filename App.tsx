
import React, { useState, useEffect } from 'react';
import { AppState, StudyMode, ChatMessage, JournalEntry, BookMetadata, Note, Highlight } from './types';
import { INITIAL_STATE } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Library from './components/Library';
import Reflections from './components/Reflections';
import Analytics from './components/Analytics';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('reflect_state_v3');
    const parsed = saved ? JSON.parse(saved) : INITIAL_STATE;
    // Ensure activeChapterId exists for legacy migrations
    if (!parsed.activeChapterId) {
      parsed.activeChapterId = parsed.books[0]?.chapters[0]?.chapter_id || INITIAL_STATE.activeChapterId;
    }
    return parsed;
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'library' | 'reflections' | 'analytics'>('dashboard');

  useEffect(() => {
    localStorage.setItem('reflect_state_v3', JSON.stringify(state));
  }, [state]);

  const addMessage = (msg: ChatMessage) => {
    setState(prev => ({
      ...prev,
      activeChat: [...prev.activeChat, msg]
    }));
  };

  const updateMode = (mode: StudyMode) => {
    setState(prev => ({ ...prev, currentMode: mode }));
  };

  const updateActiveChapter = (chapterId: string) => {
    setState(prev => ({ ...prev, activeChapterId: chapterId }));
  };

  const updateBookMetadata = (bookId: string, metadata: Partial<BookMetadata>) => {
    setState(prev => ({
      ...prev,
      books: prev.books.map(book => 
        book.book_metadata.book_id === bookId 
          ? { ...book, book_metadata: { ...book.book_metadata, ...metadata } } 
          : book
      )
    }));
  };

  const updateChapterExtras = (bookId: string, chapterId: string, extras: { is_bookmarked?: boolean, notes?: Note[], highlights?: Highlight[] }) => {
    setState(prev => ({
      ...prev,
      books: prev.books.map(book => 
        book.book_metadata.book_id === bookId 
          ? {
              ...book,
              chapters: book.chapters.map(ch => 
                ch.chapter_id === chapterId ? { ...ch, ...extras } : ch
              )
            }
          : book
      )
    }));
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setState(prev => {
      const newThemesEngaged = { ...prev.stats.themesEngaged };
      entry.detected_themes.forEach(theme => {
        newThemesEngaged[theme] = (newThemesEngaged[theme] || 0) + 1;
      });

      const allEntries = [entry, ...prev.journalEntries];
      const uniqueChapters = new Set(allEntries.map(e => e.linked_chapter));
      
      return {
        ...prev,
        journalEntries: allEntries,
        stats: {
          ...prev.stats,
          themesEngaged: newThemesEngaged,
          chaptersExplored: Math.max(1, uniqueChapters.size)
        }
      };
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} onStartChat={() => setActiveTab('chat')} />;
      case 'chat':
        return (
          <Chat 
            state={state} 
            onAddMessage={addMessage} 
            onUpdateMode={updateMode} 
            onAddJournalEntry={addJournalEntry}
            onUpdateActiveChapter={updateActiveChapter}
          />
        );
      case 'library':
        return (
          <Library 
            books={state.books} 
            onUpdateMetadata={updateBookMetadata}
            onUpdateChapterExtras={updateChapterExtras}
          />
        );
      case 'reflections':
        return <Reflections state={state} />;
      case 'analytics':
        return <Analytics state={state} />;
      default:
        return <Dashboard state={state} onStartChat={() => setActiveTab('chat')} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
