import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Book, Chapter, BookMetadata, Note, Highlight, ChapterContentSection, ContentPart } from '../types';

interface LibraryProps {
  books: Book[];
  onUpdateMetadata: (bookId: string, metadata: Partial<BookMetadata>) => void;
  onUpdateChapterExtras: (bookId: string, chapterId: string, extras: { is_bookmarked?: boolean, notes?: Note[], highlights?: Highlight[] }) => void;
}

const THEME_EXPLANATIONS: Record<string, string> = {
  "feeling": "The creative engine of manifestation; the secret to impressing the subconscious.",
  "subconscious": "The impersonal, sensitive power that accepts as true what is felt as true.",
  "assumption": "The act of living as though your desire is already a present reality.",
  "imagination": "The divine spark within; the workshop where reality is constructed before it is seen.",
  "faith": "The loyalty to the unseen reality; the persistence in an inner state.",
  "identity": "The root of all experience; the 'I AM' which determines every outer condition.",
  "sleep": "The gateway to the subconscious; the ideal time for impressing new states.",
  "prayer": "A yielding to the feeling of the wish fulfilled; not asking, but receiving internally.",
  "consciousness": "The one and only reality; the cause of all that appears in the world of shadows."
};

const ContentRenderer: React.FC<{ part: ContentPart }> = ({ part }) => {
  switch (part.type) {
    case 'quote':
    case 'highlighted_quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-indigo-200 italic text-slate-600 bg-slate-50/50 py-4 pr-4 rounded-r-2xl">
          <p className="mb-2 leading-relaxed">"{part.content}"</p>
          {part.source && <cite className="text-xs font-bold text-slate-400 block not-italic uppercase tracking-widest">— {part.source}</cite>}
        </blockquote>
      );
    case 'insight':
      return (
        <div className="my-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4 items-start">
          <i className="fa-solid fa-lightbulb text-indigo-400 mt-1"></i>
          <div>
             <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-1">Deep Insight</p>
             <p className="text-indigo-900 font-medium italic">{part.content}</p>
          </div>
        </div>
      );
    case 'highlight':
      return (
        <div className="my-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-900 font-semibold italic text-center text-lg leading-relaxed shadow-sm">
          "{part.content}"
        </div>
      );
    case 'instruction':
      return (
        <div className="my-8 p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
             <i className="fa-solid fa-hand-holding-magic text-4xl"></i>
           </div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Practical Application</p>
           <p className="text-slate-100 italic leading-relaxed">{part.content}</p>
        </div>
      );
    case 'conclusion':
      return (
        <div className="mt-10 p-6 border-t-2 border-dashed border-slate-200 text-center">
          <p className="text-slate-500 italic serif text-lg">"{part.content}"</p>
        </div>
      );
    case 'paragraph':
    default:
      return <p className="mb-6 last:mb-0 leading-[2]">{part.content}</p>;
  }
};

const Library: React.FC<LibraryProps> = ({ books, onUpdateMetadata, onUpdateChapterExtras }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(books[0] || null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<BookMetadata>>({});
  const [newNote, setNewNote] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return books;
    const search = searchTerm.toLowerCase();
    return books.filter(book => 
      book.book_metadata.title.toLowerCase().includes(search) ||
      book.chapters.some(ch => ch.chapter_title.toLowerCase().includes(search) || ch.chapter_summary.short_summary.toLowerCase().includes(search))
    );
  }, [books, searchTerm]);

  const filteredChapters = useMemo(() => {
    if (!selectedBook) return [];
    if (!searchTerm.trim()) return selectedBook.chapters;
    const search = searchTerm.toLowerCase();
    return selectedBook.chapters.filter(ch => 
      ch.chapter_title.toLowerCase().includes(search) || 
      ch.chapter_summary.short_summary.toLowerCase().includes(search) ||
      ch.principles.some(p => p.title.toLowerCase().includes(search))
    );
  }, [selectedBook, searchTerm]);

  const startEditing = () => {
    if (selectedBook) {
      setEditForm({
        title: selectedBook.book_metadata.title,
        author: selectedBook.book_metadata.author,
        year_published: selectedBook.book_metadata.year_published
      });
      setIsEditing(true);
    }
  };

  const saveMetadata = () => {
    if (selectedBook) {
      onUpdateMetadata(selectedBook.book_metadata.book_id, editForm);
      const updatedBook = { ...selectedBook, book_metadata: { ...selectedBook.book_metadata, ...editForm } };
      setSelectedBook(updatedBook);
      setIsEditing(false);
    }
  };

  const toggleBookmark = () => {
    if (selectedBook && selectedChapter) {
      const newBookmarkStatus = !selectedChapter.is_bookmarked;
      onUpdateChapterExtras(selectedBook.book_metadata.book_id, selectedChapter.chapter_id, { is_bookmarked: newBookmarkStatus });
      setSelectedChapter({ ...selectedChapter, is_bookmarked: newBookmarkStatus });
    }
  };

  const handleAddNote = () => {
    if (selectedBook && selectedChapter && newNote.trim()) {
      const note: Note = { id: Date.now().toString(), text: newNote, timestamp: Date.now() };
      const updatedNotes = [...(selectedChapter.notes || []), note];
      onUpdateChapterExtras(selectedBook.book_metadata.book_id, selectedChapter.chapter_id, { notes: updatedNotes });
      setSelectedChapter({ ...selectedChapter, notes: updatedNotes });
      setNewNote('');
    }
  };

  const handleAddHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() && selectedBook && selectedChapter) {
      const highlight: Highlight = { id: Date.now().toString(), text: selection.toString(), color: 'yellow' };
      const updatedHighlights = [...(selectedChapter.highlights || []), highlight];
      onUpdateChapterExtras(selectedBook.book_metadata.book_id, selectedChapter.chapter_id, { highlights: updatedHighlights });
      setSelectedChapter({ ...selectedChapter, highlights: updatedHighlights });
      selection.removeAllRanges();
    }
  };

  const downloadStudySet = () => {
    if (!selectedChapter) return;
    let sourceText = "";
    if (selectedChapter.content) {
       sourceText = selectedChapter.content.map(c => {
         const partsText = c.parts 
           ? c.parts.map(p => `[${p.type.toUpperCase()}] ${p.content}${p.source ? ` — ${p.source}` : ''}`).join('\n')
           : c.text;
         return `--- ${c.section} ---\n${partsText}\nTakeaway: ${c.takeaway || ''}`;
       }).join('\n\n');
    } else {
       sourceText = selectedChapter.full_text;
    }

    const content = `
CHAPTER: ${selectedChapter.chapter_title}
BOOK: ${selectedBook?.book_metadata.title}

SOURCE TEXT:
${sourceText}

--- YOUR HIGHLIGHTS ---
${(selectedChapter.highlights || []).map(h => `- ${h.text}`).join('\n')}

--- YOUR NOTES ---
${(selectedChapter.notes || []).map(n => `[${new Date(n.timestamp).toLocaleDateString()}] ${n.text}`).join('\n')}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedChapter.chapter_title.replace(/\s+/g, '_')}_Study_Set.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectChapter = (ch: Chapter) => {
    setSelectedChapter(ch);
    setCurrentPageIndex(0);
    setShowPrompt(false);
  };

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = 0;
    }
  }, [currentPageIndex]);

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Study Library</h2>
          <p className="text-slate-500">Structured source materials for your reflections.</p>
        </div>
        {!selectedChapter && (
          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search library..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {!selectedChapter && (
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Available Works</h3>
            {filteredBooks.map(book => (
              <button
                key={book.book_metadata.book_id}
                onClick={() => { setSelectedBook(book); setSelectedChapter(null); setIsEditing(false); }}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  selectedBook?.book_metadata.book_id === book.book_metadata.book_id
                    ? 'bg-white border-indigo-200 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-slate-200'
                }`}
              >
                <p className="text-xs text-slate-400 font-bold mb-1">{book.book_metadata.year_published}</p>
                <h4 className="font-bold text-slate-900 leading-tight">{book.book_metadata.title}</h4>
                <p className="text-xs text-slate-500 mt-2">{book.chapters.length} Chapters</p>
              </button>
            ))}
          </div>
        )}

        <div className={selectedChapter ? "lg:col-span-4" : "lg:col-span-3"}>
          {selectedBook && !selectedChapter && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between mb-8 border-b border-slate-50 pb-8">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                        <input 
                          type="text" 
                          value={editForm.title} 
                          onChange={e => setEditForm({...editForm, title: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Author</label>
                          <input 
                            type="text" 
                            value={editForm.author} 
                            onChange={e => setEditForm({...editForm, author: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                          />
                        </div>
                        <div className="w-32">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Year</label>
                          <input 
                            type="number" 
                            value={editForm.year_published} 
                            onChange={e => setEditForm({...editForm, year_published: parseInt(e.target.value)})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveMetadata} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 group">
                        <h3 className="text-4xl font-bold text-slate-900 mb-2">{selectedBook.book_metadata.title}</h3>
                        <button 
                          onClick={startEditing}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-300 hover:text-indigo-600"
                          title="Edit Metadata"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </div>
                      <p className="text-slate-500 italic">By {selectedBook.book_metadata.author} • {selectedBook.book_metadata.year_published}</p>
                    </>
                  )}
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 h-fit">
                  {selectedBook.study_metadata.difficulty_level}
                </div>
              </div>

              <div className="mb-10 p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                <h4 className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-widest text-indigo-600">Central Thesis</h4>
                <p className="text-slate-800 leading-relaxed italic serif">"{selectedBook.book_summary.central_thesis}"</p>
              </div>

              <div className="mb-10">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Core Themes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBook.core_themes.map(theme => (
                    <div key={theme} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                         <i className={`fa-solid ${theme === 'feeling' ? 'fa-heart' : theme === 'subconscious' ? 'fa-brain' : theme === 'imagination' ? 'fa-wand-magic-sparkles' : theme === 'sleep' ? 'fa-moon' : 'fa-gem'}`}></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-tight mb-1">{theme}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {THEME_EXPLANATIONS[theme.toLowerCase()] || "A central pillar of the creative law and the transformation of the inner man."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 px-2">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest text-slate-400">Chapters</h4>
                {searchTerm && <p className="text-xs text-slate-400">Found {filteredChapters.length} matches</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredChapters.map(ch => (
                  <button
                    key={ch.chapter_id}
                    onClick={() => handleSelectChapter(ch)}
                    className="p-6 rounded-2xl bg-white border border-slate-100 text-left hover:border-indigo-300 transition-all group shadow-sm flex items-start justify-between"
                  >
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Chapter {ch.chapter_number}</p>
                      <h5 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{ch.chapter_title}</h5>
                      <p className="text-sm text-slate-500 line-clamp-2">{ch.chapter_summary.short_summary}</p>
                    </div>
                    {ch.is_bookmarked && <i className="fa-solid fa-bookmark text-indigo-500 text-xs"></i>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedChapter && (
            <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh]">
              <div className="flex-1 bg-white rounded-[40px] p-10 md:p-16 border border-slate-100 shadow-sm relative group flex flex-col">
                <nav className="flex items-center justify-between mb-12">
                  <button 
                    onClick={() => setSelectedChapter(null)}
                    className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                  >
                    <i className="fa-solid fa-arrow-left"></i> Library
                  </button>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleAddHighlight}
                      className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-yellow-100 hover:text-yellow-700 transition-all shadow-sm"
                      title="Highlight Selected Text"
                    >
                      <i className="fa-solid fa-highlighter"></i>
                    </button>
                    <button 
                      onClick={toggleBookmark}
                      className={`p-3 rounded-xl transition-all shadow-sm ${selectedChapter.is_bookmarked ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
                    >
                      <i className="fa-solid fa-bookmark"></i>
                    </button>
                    <button 
                      onClick={downloadStudySet}
                      className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                  </div>
                </nav>

                <div className="max-w-3xl mx-auto flex-1 flex flex-col w-full">
                  <header className="mb-12 text-center">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em] mb-4">Chapter {selectedChapter.chapter_number}</p>
                    <h3 className="text-5xl font-bold text-slate-900 mb-4 italic serif">{selectedChapter.chapter_title}</h3>
                    {selectedChapter.content && (
                      <h4 className="text-2xl font-bold text-indigo-600 mb-6">{selectedChapter.content[currentPageIndex].section}</h4>
                    )}
                    <div className="w-16 h-1 bg-indigo-100 mx-auto rounded-full"></div>
                  </header>

                  <div 
                    ref={textContainerRef}
                    className="prose prose-slate prose-xl max-w-none text-slate-800 serif leading-[2] selection:bg-indigo-100 flex-1 overflow-y-auto custom-scrollbar"
                  >
                    {selectedChapter.content && selectedChapter.content[currentPageIndex].parts ? (
                       selectedChapter.content[currentPageIndex].parts.map((part, idx) => (
                         <ContentRenderer key={idx} part={part} />
                       ))
                    ) : (
                       <p className="whitespace-pre-wrap">
                         {selectedChapter.content ? selectedChapter.content[currentPageIndex].text : selectedChapter.full_text}
                       </p>
                    )}
                    
                    {selectedChapter.content && selectedChapter.content[currentPageIndex].takeaway && (
                      <div className="mt-12 p-8 bg-indigo-50/50 rounded-3xl border-l-4 border-indigo-400 shadow-sm">
                        <p className="text-xs font-bold text-indigo-700 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                          <i className="fa-solid fa-star-of-life animate-spin-slow"></i>
                          Key Takeaway
                        </p>
                        <p className="text-slate-800 italic leading-relaxed font-medium text-lg">
                          {selectedChapter.content[currentPageIndex].takeaway}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedChapter.content && selectedChapter.content.length > 1 && (
                    <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                      <button 
                        disabled={currentPageIndex === 0}
                        onClick={() => setCurrentPageIndex(prev => prev - 1)}
                        className="px-8 py-3 bg-slate-50 text-slate-600 font-bold rounded-2xl text-xs disabled:opacity-30 hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
                      >
                        <i className="fa-solid fa-chevron-left"></i> Previous
                      </button>
                      <div className="flex gap-2">
                        {selectedChapter.content.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPageIndex === idx ? 'bg-indigo-600 scale-125' : 'bg-slate-200 hover:bg-slate-300'}`}
                          />
                        ))}
                      </div>
                      <button 
                        disabled={currentPageIndex === selectedChapter.content.length - 1}
                        onClick={() => setCurrentPageIndex(prev => prev + 1)}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs disabled:opacity-30 hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                      >
                        Next <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  )}

                  <div className="mt-16 pt-10 border-t border-slate-100 text-center">
                    {!showPrompt ? (
                      <button 
                        onClick={() => setShowPrompt(true)}
                        className="px-8 py-4 bg-white text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100 shadow-sm hover:shadow-md hover:bg-indigo-50 transition-all"
                      >
                        Deepen Your Reflection?
                      </button>
                    ) : (
                      <div className="bg-indigo-50 p-10 rounded-[40px] border border-indigo-100 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <i className="fa-solid fa-quote-left text-3xl text-indigo-200 mb-4 block"></i>
                        <h4 className="font-bold text-indigo-900 mb-4 uppercase text-xs tracking-[0.3em]">Reflection Guidance</h4>
                        <p className="text-indigo-800 text-2xl serif italic leading-relaxed">"{selectedChapter.reflection_prompts[0]?.question || "How does your current mood reflect your deep assumptions?"}"</p>
                        <button 
                          onClick={() => setShowPrompt(false)}
                          className="mt-8 text-indigo-400 font-bold text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors"
                        >
                          I have absorbed this
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-80 space-y-6">
                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                    Insights Found
                    <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-600 font-bold">{(selectedChapter.highlights || []).length}</span>
                  </h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {(selectedChapter.highlights || []).map(h => (
                      <div key={h.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-xs italic text-amber-900 leading-relaxed relative group shadow-sm">
                        "{h.text}"
                        <button 
                          onClick={() => {
                            const updated = (selectedChapter.highlights || []).filter(item => item.id !== h.id);
                            onUpdateChapterExtras(selectedBook.book_metadata.book_id, selectedChapter.chapter_id, { highlights: updated });
                            setSelectedChapter({...selectedChapter, highlights: updated});
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-amber-200 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))}
                    {(selectedChapter.highlights || []).length === 0 && (
                      <div className="p-8 text-center text-slate-300">
                         <i className="fa-solid fa-feather-pointed text-2xl mb-2 opacity-20"></i>
                         <p className="text-[10px] italic">Select text to capture key principles.</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Study Notes</h4>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 mb-6">
                    {(selectedChapter.notes || []).map(n => (
                      <div key={n.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group relative shadow-sm">
                        <p className="text-xs text-slate-700 leading-relaxed mb-3">{n.text}</p>
                        <p className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1">
                          <i className="fa-regular fa-calendar text-[8px]"></i>
                          {new Date(n.timestamp).toLocaleDateString()}
                        </p>
                        <button 
                          onClick={() => {
                            const updated = (selectedChapter.notes || []).filter(item => item.id !== n.id);
                            onUpdateChapterExtras(selectedBook.book_metadata.book_id, selectedChapter.chapter_id, { notes: updated });
                            setSelectedChapter({...selectedChapter, notes: updated});
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-slate-400 hover:text-red-500"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <textarea 
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      placeholder="What does this reveal to you?"
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-32 mb-3 shadow-inner"
                    />
                    <button 
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
                    >
                      Save Discovery
                    </button>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;