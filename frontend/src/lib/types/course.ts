export interface Course {
  id: string | null;
  lmsId: string | null;
  lmsProvider: string;
  name: string;
  code: string;
  instructor: string | null;
  description: string | null;
  semester: string | null;
  year: string | null;
}

export interface Module {
  id: string | null;
  lmsId: string | null;
  courseId: string;
  name: string;
  description: string | null;
  itemsCount: number;
  moduleItems: ModuleItem[];
  prerequisites: string[] | null;
}

export interface ModuleItem {
  id: string | null;
  lmsId: string | null;
  lmsContentId: string | null;
  name: string;
  moduleId: string;
  courseId: string;
  type: string;
  url: string | null;
  position: number | null;
}

export interface FlashcardDeck {
  id: string | null;
  courseId: string;
  moduleIds: string[];
  name: string;
  description: string | null;
  itemsCount: number;
  flashcardItems: FlashcardItem[];
}

export interface FlashcardItem {
  id: string | null;
  question: string;
  answer: string;
}

export interface Quiz {
  id: string | null;
  courseId: string;
  moduleIds: string[];
  name: string;
  description: string | null;
  itemsCount: number;
  previousAttempts: number;
  previousScore: number;
  quizItems: Question[];
}

export interface Question {
  id: string | null;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string | null;
}

export interface FileDetails {
  id: string | null;
  canvasId: string | null;
  name: string;
  size: number;
  type: string;
  url: string;
}
