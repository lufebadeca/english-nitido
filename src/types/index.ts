export interface WordEntry {
  en: string;
  es: string;
  ipa: string;
  syllables: string[];
  stress: number;
  audioUrls: {
    word: string;
    sentence: string;
  };
  wrong: string;
  examples: string[];
  wordFamily: {en: string, es: string}[];
  difficulty: number;
  category?: string;
  visualAid?: string;
  regionalVariants?: { [region: string]: string };
  mnemonic?: string;
}

export interface UserProgress {
  level: number;
  completedLessons: string[];
  streakDays: number;
  totalPoints: number;
  achievements: Achievement[];
  assessmentScore: number;
  lastActiveDate: string;
  lessonScores: { [lessonId: string]: LessonScore };
  quizAttempts: { [quizId: string]: QuizAttempt[] };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

export interface Phoneme {
  symbol: string;
  ipa: string;
  description: string;
  examples: string[];
  position: 'vowel' | 'consonant';
  difficulty: number;
  mouthPosition?: string;
  tonguePosition?: string;
}

export interface LessonScore {
  lessonId: string;
  completed: boolean;
  score: number;
  maxScore: number;
  attempts: number;
  lastAttempt: string;
  timeSpent: number;
}

export interface QuizAttempt {
  score: number;
  maxScore: number;
  timestamp: string;
  timeSpent: number;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizQuestion {
  id: string;
  type: 'fill-blank' | 'multiple-choice' | 'type-word' | 'match-word' | 'audio-type' | 'audio-multiple-choice' | 'sentence-order';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  imageUrl?: string;
  sentence?: string;
  words?: string[];
  hint?: string;
  explanation?: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedTime: number;
  prerequisites: string[];
  vocabulary: WordEntry[];
  grammarRules?: GrammarRule[];
  informativeContent: InformativeSection[];
  quiz: QuizQuestion[];
  achievements: string[];
}

export interface InformativeSection {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  tips?: string[];
  visualAids?: string[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string[];
  examples: GrammarExample[];
  commonMistakes: string[];
}

export interface GrammarExample {
  correct: string;
  incorrect?: string;
  translation: string;
  explanation: string;
}

export interface AssessmentQuestion {
  id: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'reading';
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
  audioUrl?: string;
  imageUrl?: string;
}

export interface MnemonicTechnique {
  id: string;
  name: string;
  description: string;
  examples: MnemonicExample[];
  difficulty: number;
}

export interface MnemonicExample {
  word: string;
  translation: string;
  technique: string;
  memory_aid: string;
  visualization?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
  lastLogin: string;
  progress: UserProgress;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}