import { GrammarRule, QuizQuestion, Lesson } from "../types";

export const basicGrammar2Rules: GrammarRule[] = [
  {
    id: "to-be-verb",
    title: "Verbo To Be",
    explanation: [
      "El verbo to be se usa para expresar acciones habituales, hechos generales y estados, por lo que es ampliamente usado. Es un verbo irregular que no sigue las mismas reglas que otros verbos y su conjugación varía dependiendo del pronombre.",
      "Para Yo (I), usa 'am'",
      "Para él/ella/eso (he, she, it) se conjuga 'is'",
      "Para nosotros/nosotras (we) y para ellos/ellas (you, they) se conjuga 'are'",
      "En negativo, se agrega not despues del verbo conjugado, por ejemplo: (I am not, she is not, they are not).",
    ],
    examples: [
      {
        en: "I am a student",
        es: "Soy estudiante",
        explanation: "Acción habitual: to be ➡️ am",
      },
      {
        en: "She is a teacher",
        es: "Ella es maestra",
        explanation: "Tercera persona singular: to be ➡️ is",
      },
      {
        en: "We are students",
        es: "Somos estudiantes",
        explanation: "Tercera persona plural: to be ➡️ are",
      },
      {
        en: "She is not a doctor",
        incorrect: "She not is a doctor",
        es: "Ella no es doctora",
        explanation:
          'Tercera persona singular negativo - añado "not" tras el verbo',
      },
    ],
    commonMistakes: [
      'Olvidar la "s" en tercera persona singular',
      'Usar "don\'t" con "he/she/it" (debe ser "doesn\'t")',
      "Confundir con el presente continuo",
    ],
  },
  {
    id: "adjectives-1",
    title: "Adjetivos",
    explanation: [
      "Los adjetivos son palabras que describen o dan más información sobre un sustantivo.",
      "Mientras el sustantivo es el nombre de la cosa, el adjetivo describe la cualidad de la cosa, como color, tamaño, forma, etc.",
      "A diferencia del español, en inglés, los adjetivos van antes del sustantivo, por ejemplo: red pencil.",
      "En inglés, los adjetivos no van en plural, por ejemplo: the 4 red pencils (los 4 bolígrafos rojos).",
      "A veces los adjetivos pueden ir en el complemento de la oracion sin acompañar a un sustantivo, por ejemplo: She is beautiful.",
    ],
    examples: [
      {
        en: "I have a green car",
        incorrect: "I have a car green",
        es: "Tengo un carro verde",
        explanation:
          "Green (verde) es un adjetivo porque describe la cualidad (color) del carro",
      },
      {
        en: "My little sister plays with toys",
        es: "Mi hermana pequeña juega con juguetes",
        explanation:
          "Little (pequeña) es un adjetivo porque describe la cualidad (tamaño/edad) de la hermana",
      },
      {
        en: "The children like white shirts",
        incorrect: "The children like whites shirts",
        es: "A los niños les gustan las camisetas blancas",
        explanation:
          "White (blanco) es un adjetivo porque describe la cualidad (color) de las camisetas",
      },
      {
        en: "They have really fast bikes",
        es: "Tienen bicicletas muy rápidas",
        explanation:
          "Fast (rápido) es un adjetivo porque describe la cualidad (velocidad) de las bicicletas",
      },
      {
        en: "We are good swimmers",
        es: "Somos buenos nadadores",
        explanation:
          "Good (bueno) es un adjetivo porque describe la cualidad (habilidad) de los nadadores",
      },
    ],
    commonMistakes: [
      "Poner el adjetivo después del sustantivo (debe ir antes)",
      "Usar el adjetivo en plural (debe ir siempre en singular)",
      "Confundir adjetivos con adverbios (aunque en español se usan de manera similar, en inglés no)",
    ],
  },
  {
    id: "adverbs-1",
    title: "Adverbios verbales",
    explanation: [
      "Los adverbios son palabras que describen o dan más información sobre un verbo (aunque a veces también sobre un adjetivo u otro adverbio).",
      "Mientras el verbo es la acción, el adverbio describe la forma, el lugar, el tiempo, el motivo, etc.",
      "En inglés, los adverbios van después del verbo, por ejemplo: I live alone.",
      "En inglés, los adverbios no van en plural, por ejemplo: I speak English very well.",
    ],
    examples: [
      {
        en: "My grandmother walks very slowly",
        incorrect: "My grandmother walks very slow",
        es: "Mi abuela camina muy lentamente",
        explanation:
          "Slowly (lentamente) es un adverbio porque describe la forma (velocidad) de caminar",
      },
      {
        en: "Native speakers talk very well",
        incorrect: "Native speakers talk very good",
        es: "Los hablantes nativos hablan muy bien",
        explanation:
          "Well (bien) es un adverbio que describe la forma (velocidad) de hablar.",
      },
    ],
    commonMistakes: [
      "Confundir adverbios con adjetivos (aunque en español se usan de manera similar, en inglés no)",
      '"Slow" es un adjetivo que traduce "lento", mientras que "slowly" es un adverbio que traduce "lentamente"',
    ],
  },
];

export const grammar2QuizQuestions: QuizQuestion[] = [
  {
    id: "grammar-1",
    type: "multiple-choice",
    question: "Choose the correct sentence:",
    options: [
      "She is a teacher",
      "She are a teacher",
      "She be a teacher",
      "She am a teacher",
    ],
    correctAnswer: "She is a teacher",
    explanation:
      'El verbo to be en presente simple en tercera persona se conjuga "is"',
    points: 10,
  },
  {
    id: "grammar-2",
    type: "fill-blank",
    question: "I _____ a police officer.",
    correctAnswer: "am",
    sentence: "I am a police officer.",
    hint: "La primera persona usa una conjugación única para el verbo to be",
    explanation: 'La primera persona (yo) usa "am" para el verbo to be',
    points: 10,
  },
  {
    id: "grammar-3",
    type: "fill-blank",
    question: "They _____ professional swimmers.",
    correctAnswer: "are",
    sentence: "They are professional swimmers.",
    hint: "Los pronombres plurales (you, we, they) usan una conjugación única para el verbo to be",
    explanation:
      'Los pronombres plurales (you, we, they) usan "are" para el verbo to be',
    points: 10,
  },
  {
    id: "grammar-4",
    type: "sentence-order",
    question: "Arrange these words in the correct order:",
    words: ["old", "I", "have", "book", "an"],
    correctAnswer: "I have an old book",
    explanation:
      "Orden de palabras en inglés: Subject + Verb + Adjective + Object",
    points: 10,
  },
  {
    id: "grammar-5",
    type: "multiple-choice",
    question: "Which sentence is correct?",
    options: [
      "The children like whites shirts",
      "The children like white shirts",
      "The children likes white shirts",
      "The childrens likes white shirts",
    ],
    correctAnswer: "The children like white shirts",
    explanation:
      'White es un adjetivo que traduce "blanco", pero en inglés no se usa en plural.',
    points: 15,
  },
  {
    id: "grammar-6",
    type: "multiple-choice",
    question: "Which sentence is correct?",
    options: [
      "I don't run very fast",
      "I don't run very speed",
      "I don't run very speedly",
      "I don't run very falstly",
    ],
    correctAnswer: "I don't run very fast",
    explanation:
      'Fast es un adjetivo que traduce "rápido", pero tambien es un adverbio que traduce "rápidamente".',
    points: 15,
  },
  {
    id: "grammar-7",
    type: "sentence-order",
    question: "Arrange these words in the correct order:",
    words: ["very", "Native", "clearly", "speakers", "talk"],
    correctAnswer: "Native speakers talk very clearly",
    explanation:
      'Clearly es un adverbio que traduce "claramente", y por supuesto, va después del verbo.',
    points: 15,
  },
];

export const grammar2LessonsData: Lesson = {
  id: "basic-grammar-2",
  title: "Gramática Básica del Inglés nivel 2",
  description:
    "Aprende las reglas fundamentales de la gramática inglesa nivel 2",
  category: "grammar",
  difficulty: 2,
  estimatedTime: 40,
  prerequisites: ["phonetics-lesson-1"],
  vocabulary: [],
  grammarRules: basicGrammar2Rules,
  informativeContent: [
    {
      id: "grammar-intro",
      title: "Fundamentos de la Gramática Inglesa nivel 2",
      content:
        "Aprende los patrones mas repetitivos de la gramática es crucial para poder comunicarte en el idioma. El verbo to be es el verbo más importante del inglés, y los adjetivos y adverbios son parte crucial en la mayoria de oraciones.",
      tips: [
        'En ingles no existen palabras separadas para "ser" y "estar": ambas son traducidas con el verbo "to be"',
        "Los adjetivos en ingles van antes del sustantivo, ¡Cuidado con el orden!",
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
  quiz: grammar2QuizQuestions,
  achievements: ["grammar-enthusiast"],
};

//Rendered in GrammarVocabLessonPage
