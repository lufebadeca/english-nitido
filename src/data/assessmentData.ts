import { AssessmentQuestion } from '../types';

export const placementTestQuestions: AssessmentQuestion[] = [
  // Vocabulary Questions (20)
  {
    id: 'vocab-1',
    type: 'vocabulary',
    question: 'What does "beautiful" mean?',
    options: ['feo', 'hermoso', 'grande', 'pequeño'],
    correctAnswer: 'hermoso',
    difficulty: 1
  },
  {
    id: 'vocab-2',
    type: 'vocabulary',
    question: 'Choose the correct translation for "casa":',
    options: ['car', 'house', 'horse', 'heart'],
    correctAnswer: 'house',
    difficulty: 1
  },
  {
    id: 'vocab-3',
    type: 'vocabulary',
    question: 'What is the English word for "agua"?',
    options: ['water', 'fire', 'earth', 'air'],
    correctAnswer: 'water',
    difficulty: 1
  },
  {
    id: 'vocab-4',
    type: 'vocabulary',
    question: '"Happy" means:',
    options: ['triste', 'enojado', 'feliz', 'cansado'],
    correctAnswer: 'feliz',
    difficulty: 1
  },
  {
    id: 'vocab-5',
    type: 'vocabulary',
    question: 'The opposite of "big" is:',
    options: ['large', 'huge', 'small', 'tall'],
    correctAnswer: 'small',
    difficulty: 2
  },
  {
    id: 'vocab-6',
    type: 'vocabulary',
    question: 'Choose the correct word for "trabajar":',
    options: ['walk', 'work', 'watch', 'wait'],
    correctAnswer: 'work',
    difficulty: 1
  },
  {
    id: 'vocab-7',
    type: 'vocabulary',
    question: '"Expensive" means:',
    options: ['barato', 'caro', 'gratis', 'roto'],
    correctAnswer: 'caro',
    difficulty: 2
  },
  {
    id: 'vocab-8',
    type: 'vocabulary',
    question: 'What does "quickly" mean?',
    options: ['lentamente', 'rápidamente', 'cuidadosamente', 'silenciosamente'],
    correctAnswer: 'rápidamente',
    difficulty: 2
  },
  {
    id: 'vocab-9',
    type: 'vocabulary',
    question: 'The English word for "cocina" is:',
    options: ['kitchen', 'bedroom', 'bathroom', 'living room'],
    correctAnswer: 'kitchen',
    difficulty: 1
  },
  {
    id: 'vocab-10',
    type: 'vocabulary',
    question: '"Dangerous" means:',
    options: ['seguro', 'peligroso', 'divertido', 'aburrido'],
    correctAnswer: 'peligroso',
    difficulty: 2
  },
  {
    id: 'vocab-11',
    type: 'vocabulary',
    question: 'Choose the correct translation for "estudiar":',
    options: ['study', 'student', 'school', 'teacher'],
    correctAnswer: 'study',
    difficulty: 1
  },
  {
    id: 'vocab-12',
    type: 'vocabulary',
    question: 'What does "comfortable" mean?',
    options: ['incómodo', 'cómodo', 'duro', 'blando'],
    correctAnswer: 'cómodo',
    difficulty: 2
  },
  {
    id: 'vocab-13',
    type: 'vocabulary',
    question: 'The opposite of "easy" is:',
    options: ['simple', 'difficult', 'possible', 'clear'],
    correctAnswer: 'difficult',
    difficulty: 2
  },
  {
    id: 'vocab-14',
    type: 'vocabulary',
    question: '"Healthy" means:',
    options: ['enfermo', 'saludable', 'débil', 'fuerte'],
    correctAnswer: 'saludable',
    difficulty: 2
  },
  {
    id: 'vocab-15',
    type: 'vocabulary',
    question: 'What is "biblioteca" in English?',
    options: ['library', 'bookstore', 'school', 'museum'],
    correctAnswer: 'library',
    difficulty: 2
  },
  {
    id: 'vocab-16',
    type: 'vocabulary',
    question: '"Ancient" means:',
    options: ['nuevo', 'moderno', 'antiguo', 'futuro'],
    correctAnswer: 'antiguo',
    difficulty: 3
  },
  {
    id: 'vocab-17',
    type: 'vocabulary',
    question: 'Choose the correct word for "exitoso":',
    options: ['successful', 'failure', 'trying', 'working'],
    correctAnswer: 'successful',
    difficulty: 3
  },
  {
    id: 'vocab-18',
    type: 'vocabulary',
    question: 'What does "knowledge" mean?',
    options: ['ignorancia', 'conocimiento', 'experiencia', 'sabiduría'],
    correctAnswer: 'conocimiento',
    difficulty: 3
  },
  {
    id: 'vocab-19',
    type: 'vocabulary',
    question: '"Approximately" means:',
    options: ['exactamente', 'aproximadamente', 'nunca', 'siempre'],
    correctAnswer: 'aproximadamente',
    difficulty: 3
  },
  {
    id: 'vocab-20',
    type: 'vocabulary',
    question: 'The English word for "desarrollar" is:',
    options: ['destroy', 'develop', 'decide', 'discover'],
    correctAnswer: 'develop',
    difficulty: 3
  },

  // Grammar Questions (10)
  {
    id: 'grammar-1',
    type: 'grammar',
    question: 'Choose the correct sentence:',
    options: ['I am student', 'I am a student', 'I am the student', 'I student'],
    correctAnswer: 'I am a student',
    difficulty: 1
  },
  {
    id: 'grammar-2',
    type: 'grammar',
    question: 'Complete: She _____ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    difficulty: 1
  },
  {
    id: 'grammar-3',
    type: 'grammar',
    question: 'Which is correct?',
    options: ['I don\'t like coffee', 'I no like coffee', 'I not like coffee', 'I doesn\'t like coffee'],
    correctAnswer: 'I don\'t like coffee',
    difficulty: 2
  },
  {
    id: 'grammar-4',
    type: 'grammar',
    question: 'Choose the correct article: I need _____ umbrella.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'an',
    difficulty: 2
  },
  {
    id: 'grammar-5',
    type: 'grammar',
    question: 'Complete: They _____ watching TV now.',
    options: ['is', 'are', 'am', 'be'],
    correctAnswer: 'are',
    difficulty: 2
  },
  {
    id: 'grammar-6',
    type: 'grammar',
    question: 'Which sentence is in past tense?',
    options: ['I eat breakfast', 'I am eating breakfast', 'I ate breakfast', 'I will eat breakfast'],
    correctAnswer: 'I ate breakfast',
    difficulty: 2
  },
  {
    id: 'grammar-7',
    type: 'grammar',
    question: 'Choose the correct form: If I _____ rich, I would travel.',
    options: ['am', 'was', 'were', 'be'],
    correctAnswer: 'were',
    difficulty: 3
  },
  {
    id: 'grammar-8',
    type: 'grammar',
    question: 'Complete: The book _____ by Shakespeare is famous.',
    options: ['write', 'wrote', 'written', 'writing'],
    correctAnswer: 'written',
    difficulty: 3
  },
  {
    id: 'grammar-9',
    type: 'grammar',
    question: 'Which is the correct passive form?',
    options: ['The house built last year', 'The house was built last year', 'The house is build last year', 'The house building last year'],
    correctAnswer: 'The house was built last year',
    difficulty: 3
  },
  {
    id: 'grammar-10',
    type: 'grammar',
    question: 'Choose the correct conditional: I _____ help you if I had time.',
    options: ['will', 'would', 'can', 'could'],
    correctAnswer: 'would',
    difficulty: 3
  },
  /*{
    id: 'listening-1',
    type: 'audio-multiple-choice',
    question: 'Listen to the word and choose the correct transtation:',
    options: ['tough', 'thought', 'though', 'through'],
    correctAnswer: 'thought',
    audioUrl: 'thought',
    difficulty: 3
  },
  {
    id: 'listening-2',
    type: 'audio-multiple-choice',
    question: 'Listen to the word and choose the correct transtation:',
    options: ['desert', 'dessert', 'deserve', 'deserted'],
    correctAnswer: 'desert',
    audioUrl: 'desert',
    difficulty: 3
  },
  {
    id: 'sl-1',
    type: 'audio-type',
    question: 'Escucha la palabra y escríbela:',
    correctAnswer: 'comfortable',
    audioUrl: 'comfortable',
    difficulty: 3
  },
  {
    id: 'sl-1',
    type: 'audio-type',
    question: 'Escucha la palabra y escríbela:',
    correctAnswer: 'dangerous',
    audioUrl: 'dangerous',
    difficulty: 3
  },
  {
    id: 'sl-1',
    type: 'audio-type',
    question: 'Escucha la palabra y escríbela:',
    correctAnswer: 'identical',
    audioUrl: 'identical',
    difficulty: 3
  }
    */
];