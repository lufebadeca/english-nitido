import { GrammarRule, QuizQuestion, Lesson } from '../types';

export const basicGrammarRules: GrammarRule[] = [
  {
    id: 'present-simple',
    title: 'Presente Simple',
    explanation: 'El presente simple se usa para expresar acciones habituales, hechos generales y estados permanentes.',
    examples: [
      {
        correct: 'I work every day',
        translation: 'Trabajo todos los días',
        explanation: 'Acción habitual - uso "work" sin "s"'
      },
      {
        correct: 'She works at a hospital',
        translation: 'Ella trabaja en un hospital',
        explanation: 'Tercera persona singular - añado "s" al verbo'
      },
      {
        correct: 'We don\'t like coffee',
        incorrect: 'We don\'t likes coffee',
        translation: 'No nos gusta el café',
        explanation: 'En negativo, el verbo principal no lleva "s"'
      }
    ],
    commonMistakes: [
      'Olvidar la "s" en tercera persona singular',
      'Usar "don\'t" con "he/she/it" (debe ser "doesn\'t")',
      'Confundir con el presente continuo'
    ]
  },
  {
    id: 'articles',
    title: 'Artículos (A, An, The)',
    explanation: 'Los artículos determinan si hablamos de algo específico (the) o general (a/an).',
    examples: [
      {
        correct: 'I need a pen',
        translation: 'Necesito un bolígrafo (cualquiera)',
        explanation: 'Uso "a" porque "pen" empieza con consonante'
      },
      {
        correct: 'I need an apple',
        translation: 'Necesito una manzana (cualquiera)',
        explanation: 'Uso "an" porque "apple" empieza con vocal'
      },
      {
        correct: 'The pen on the table is mine',
        translation: 'El bolígrafo de la mesa es mío',
        explanation: 'Uso "the" porque hablo de un bolígrafo específico'
      }
    ],
    commonMistakes: [
      'Usar "a" antes de vocal (debe ser "an")',
      'Omitir artículos cuando son necesarios',
      'Usar "the" cuando no es específico'
    ]
  },
  {
    id: 'word-order',
    title: 'Orden de Palabras',
    explanation: 'El inglés sigue un orden estricto: Sujeto + Verbo + Objeto + Complementos.',
    examples: [
      {
        correct: 'I bought a book yesterday',
        incorrect: 'I yesterday bought a book',
        translation: 'Compré un libro ayer',
        explanation: 'El tiempo va al final, no entre sujeto y verbo'
      },
      {
        correct: 'She speaks English very well',
        incorrect: 'She very well speaks English',
        translation: 'Ella habla inglés muy bien',
        explanation: 'El adverbio de modo va después del objeto'
      }
    ],
    commonMistakes: [
      'Poner el tiempo entre sujeto y verbo',
      'Separar verbo y objeto con adverbios',
      'Usar el orden del español'
    ]
  }
];

export const grammarQuizQuestions: QuizQuestion[] = [
  {
    id: 'grammar-1',
    type: 'multiple-choice',
    question: 'Choose the correct sentence:',
    options: [
      'She work at a hospital',
      'She works at a hospital',
      'She working at a hospital',
      'She is work at a hospital'
    ],
    correctAnswer: 'She works at a hospital',
    explanation: 'Present simple with third person singular requires "s" at the end of the verb',
    points: 10
  },
  {
    id: 'grammar-2',
    type: 'fill-blank',
    question: 'I need _____ apple for my lunch.',
    correctAnswer: 'an',
    sentence: 'I need an apple for my lunch.',
    hint: 'Apple starts with a vowel sound',
    explanation: 'Use "an" before words that start with vowel sounds',
    points: 10
  },
  {
    id: 'grammar-3',
    type: 'sentence-order',
    question: 'Arrange these words in the correct order:',
    words: ['yesterday', 'I', 'bought', 'a', 'book'],
    correctAnswer: 'I bought a book yesterday',
    explanation: 'English word order: Subject + Verb + Object + Time',
    points: 15
  },
  {
    id: 'grammar-4',
    type: 'multiple-choice',
    question: 'Which sentence is correct?',
    options: [
      'I don\'t likes coffee',
      'I doesn\'t like coffee',
      'I don\'t like coffee',
      'I not like coffee'
    ],
    correctAnswer: 'I don\'t like coffee',
    explanation: 'Use "don\'t" with I/you/we/they and the base form of the verb',
    points: 10
  },
  {
    id: 'grammar-5',
    type: 'fill-blank',
    question: '_____ book on the table is very interesting.',
    correctAnswer: 'The',
    sentence: 'The book on the table is very interesting.',
    hint: 'We\'re talking about a specific book',
    explanation: 'Use "the" when referring to something specific',
    points: 10
  }
];

export const grammarLesson: Lesson = {
  id: 'basic-grammar',
  title: 'Gramática Básica del Inglés',
  description: 'Aprende las reglas fundamentales de la gramática inglesa',
  category: 'grammar',
  difficulty: 2,
  estimatedTime: 40,
  prerequisites: ['phonetics-lesson-1'],
  vocabulary: [],
  grammarRules: basicGrammarRules,
  informativeContent: [
    {
      id: 'grammar-intro',
      title: 'Fundamentos de la Gramática Inglesa',
      content: 'La gramática inglesa tiene reglas específicas que difieren del español. Dominar estas bases te ayudará a construir oraciones correctas y naturales.',
      tips: [
        'El orden de palabras es más rígido que en español',
        'Los artículos son obligatorios en muchos casos',
        'Los verbos cambian según la persona en presente simple'
      ],
      examples: [
        'I am a student (Soy estudiante) - necesita artículo "a"',
        'She speaks English (Ella habla inglés) - verbo con "s"',
        'The book is red (El libro es rojo) - orden fijo'
      ]
    }
  ],
  quiz: grammarQuizQuestions,
  achievements: ['grammar-guru']
};