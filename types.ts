export enum StudyMode {
  FREE = 'free',
  STUDY = 'study',
  APPLICATION = 'application',
  REFLECTION = 'reflection'
}

export interface BookMetadata {
  book_id: string;
  title: string;
  author: string;
  year_published: number;
  type: string;
  source: string;
  language: string;
}

export interface BookSummary {
  short_summary: string;
  long_summary: string;
  central_thesis: string;
}

export interface StudyMetadata {
  difficulty_level: 'foundational' | 'intermediate' | 'advanced';
  recommended_order: number;
}

export interface Principle {
  principle_id: string;
  title: string;
  statement: string;
  explanation: string;
  why_it_matters: string;
  related_themes: string[];
  related_books?: string[];
}

export interface Passage {
  passage_id: string;
  text: string;
  source_page?: string;
  themes: string[];
  linked_principles: string[];
  tone: 'instructional' | 'reflective' | 'philosophical' | 'explanatory' | 'clarifying';
}

export interface Application {
  application_id: string;
  context: string;
  guidance: string;
  focus_shift: string;
  linked_principles: string[];
}

export interface ReflectionPrompt {
  prompt_id: string;
  question: string;
  intent: string;
  linked_themes: string[];
}

export interface Note {
  id: string;
  text: string;
  timestamp: number;
}

export interface Highlight {
  id: string;
  text: string;
  color: string;
}

export interface ContentPart {
  type: 'paragraph' | 'quote' | 'insight' | 'highlight' | 'instruction' | 'conclusion' | 'highlighted_quote';
  content: string;
  source?: string;
}

export interface ChapterContentSection {
  section: string;
  text?: string;
  parts?: ContentPart[];
  takeaway?: string;
}

export interface Chapter {
  chapter_id: string;
  chapter_number: number;
  chapter_title: string;
  chapter_summary: {
    short_summary: string;
    key_message: string;
  };
  full_text: string;
  content?: ChapterContentSection[];
  themes: string[];
  principles: Principle[];
  passages: Passage[];
  applications: Application[];
  reflection_prompts: ReflectionPrompt[];
  is_bookmarked?: boolean;
  notes?: Note[];
  highlights?: Highlight[];
}

export interface CrossBookLink {
  concept: string;
  description: string;
  related_books: string[];
}

export interface Book {
  book_metadata: BookMetadata;
  core_themes: string[];
  book_summary: BookSummary;
  chapters: Chapter[];
  cross_book_links: CrossBookLink[];
  study_metadata: StudyMetadata;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  mode: StudyMode;
}

export interface JournalEntry {
  entry_id: string;
  timestamp: string;
  mode: StudyMode;
  user_input: string;
  system_response: string;
  detected_feelings: string[];
  detected_themes: string[];
  linked_book: string;
  linked_chapter: string;
  linked_principles: string[];
}

export interface AppState {
  books: Book[];
  activeChat: ChatMessage[];
  journalEntries: JournalEntry[];
  currentMode: StudyMode;
  activeChapterId: string;
  stats: {
    booksLoaded: number;
    chaptersExplored: number;
    themesEngaged: Record<string, number>;
  };
}