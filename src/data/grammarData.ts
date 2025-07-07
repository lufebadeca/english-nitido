import { GrammarRule, QuizQuestion, Lesson } from "../types";

export const basicGrammarRules: GrammarRule[] = [
  {
    id: "present-simple",
    title: "Presente Simple",
    explanation: [
      "El presente simple se usa para expresar acciones habituales, hechos generales y estados permanentes.",
      "Para la primera persona singular (I), usa el verbo en su forma base: (work, like, do).",
      "Para la tercera persona singular (he, she, it) agrega la terminación -s o -es: (works, likes, does).",
      "Para la segunda persona singular (you) y la tercera persona plural (you, we, they) usa el verbo en su forma base: (work, like, do).",
      "En negativo, el verbo principal ya no lleva \"s\", por ejemplo: (he doesn't work, she doesn't like it, it doesn't hurt).",
    ],
    examples: [
      {
        correct: "I study every day",
        translation: "Estudio todos los días",
        explanation: 'Acción habitual - uso "study" sin "s"',
      },
      {
        correct: "She works at a hospital",
        translation: "Ella trabaja en un hospital",
        explanation: 'Tercera persona singular - añado "s" al verbo',
      },
      {
        correct: "We don't like coffee",
        incorrect: "We don't likes coffee",
        translation: "No nos gusta el café",
        explanation: 'En negativo, el verbo principal no lleva "s"',
      },
      {
        correct: "She does not have a car",
        incorrect: "She do not have a car",
        translation: "Ella no tiene un coche",
        explanation: 'Tercera persona, negativo - añado "not" al verbo',
      },
    ],
    commonMistakes: [
      'Olvidar la "s" en tercera persona singular',
      'Usar "don\'t" con "he/she/it" (debe ser "doesn\'t")',
      "Confundir con el presente continuo",
    ],
  },
  {
    id: "articles",
    title: "Artículos (A, An, The)",
    explanation: [
      "Los artículos determinan si hablamos de algo específico (the) o general (a/an).",
      "El artículo 'the' se usa para referirse a algo específico o conocido previamente.",
      "El artículo 'a' se usa para referirse a algo general o no específico.",
      "El artículo 'an' se usa para referirse a algo que comienza con una vocal.",
    ],
    examples: [
      {
        correct: "I need a pen",
        translation: "Necesito un bolígrafo (cualquiera)",
        explanation: 'Uso "a" porque "pen" empieza con consonante',
      },
      {
        correct: "I need an apple",
        translation: "Necesito una manzana (cualquiera)",
        explanation: 'Uso "an" porque "apple" empieza con vocal',
      },
      {
        correct: "The pen on the table is mine",
        translation: "El bolígrafo de la mesa es mío",
        explanation: 'Uso "the" porque hablo de un bolígrafo específico',
      },
    ],
    commonMistakes: [
      'Usar "a" antes de vocal (debe ser "an")',
      "Omitir artículos cuando son necesarios",
      'Usar "the" cuando no es específico',
    ],
  },
  {
    id: "word-order",
    title: "Orden de Palabras",
    explanation: [
      "El inglés sigue un orden estricto: Sujeto + Verbo + Objeto + Complementos.",
      "El sujeto va al inicio de la oración.",
      "El verbo va después del sujeto.",
      "El objeto va después del verbo.",
      "Los complementos vienen al final de la oración.",
    ],
    examples: [
      {
        correct: "I bought a book yesterday",
        incorrect: "I yesterday bought a book",
        translation: "Compré un libro ayer",
        explanation: "El tiempo va al final, no entre sujeto y verbo",
      },
      {
        correct: "She speaks English very well",
        incorrect: "She very well speaks English",
        translation: "Ella habla inglés muy bien",
        explanation: "El adverbio de modo va después del objeto",
      },
    ],
    commonMistakes: [
      "Poner el tiempo entre sujeto y verbo",
      "Separar verbo y objeto con adverbios",
      "Usar el orden del español",
    ],
  },
];

export const grammarQuizQuestions: QuizQuestion[] = [
  {
    id: "grammar-1",
    type: "multiple-choice",
    question: "Choose the correct sentence:",
    options: [
      "She work at a hospital",
      "She works at a hospital",
      "She working at a hospital",
      "She is work at a hospital",
    ],
    correctAnswer: "She works at a hospital",
    explanation:
      'El presente simple con tercera persona singular requiere "s" al final del verbo',
    points: 10,
  },
  {
    id: "grammar-2",
    type: "fill-blank",
    question: "I need _____ apple for my lunch.",
    correctAnswer: "an",
    sentence: "I need an apple for my lunch.",
    hint: "Apple starts with a vowel sound",
    explanation: 'Use "an" before words that start with vowel sounds',
    points: 10,
  },
  {
    id: "grammar-3",
    type: "sentence-order",
    question: "Arrange these words in the correct order:",
    words: ["yesterday", "I", "bought", "a", "book"],
    correctAnswer: "I bought a book yesterday",
    explanation: "English word order: Subject + Verb + Object + Time",
    points: 15,
  },
  {
    id: "grammar-4",
    type: "multiple-choice",
    question: "Which sentence is correct?",
    options: [
      "I don't likes coffee",
      "I doesn't like coffee",
      "I don't like coffee",
      "I not like coffee",
    ],
    correctAnswer: "I don't like coffee",
    explanation: 'Se usa "don\'t" con I/you/we/they y la forma base del verbo',
    points: 10,
  },
  {
    id: "grammar-5",
    type: "fill-blank",
    question: "_____ book on the table is very interesting.",
    correctAnswer: "The",
    sentence: "The book on the table is very interesting.",
    hint: "We're talking about a specific book",
    explanation: 'Se usa "the" cuando se refiere a algo específico',
    points: 10,
  },
];

export const grammarLessonsData: Lesson = {
  id: "basic-grammar",
  title: "Gramática Básica del Inglés",
  description: "Aprende las reglas fundamentales de la gramática inglesa",
  category: "grammar",
  difficulty: 2,
  estimatedTime: 40,
  prerequisites: ["phonetics-lesson-1"],
  vocabulary: [],
  grammarRules: basicGrammarRules,
  informativeContent: [
    {
      id: "grammar-intro",
      title: "Fundamentos de la Gramática Inglesa nivel 1",
      content:
        "Aprende los patrones mas repetitivos de la gramática es crucial para poder comunicarte en el idioma. El verbo to be es el verbo más importante del inglés. Aprende ademas a usar los adjetivos y adverbios.",
      tips: [
        'En ingles no existen palabras separadas para "ser" y "estar": ambas son traducidas con el verbo "to be"',
        "Los adjetivos en ingles van antes del sustantivo, cuidado con el orden.",
        "Los adjetivos y adverbios en ingles no van en plural, a diferencia del español.",
      ],
      examples: [
        "She is a business woman - ella es una mujer de negocios",
        "The black cat - el gato negro, pero black va antes de cat",
        "The fans are very loud",
        "My English is pretty bad - tanto pretty como bad son adverbios que describen como es la situacion",
      ],
    },
  ],
  quiz: grammarQuizQuestions,
  achievements: ["grammar-enthusiast"],
};

// To Be Verb
