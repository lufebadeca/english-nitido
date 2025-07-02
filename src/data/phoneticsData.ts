import { Phoneme } from '../types';

export const vowelPhonemes: Phoneme[] = [
  {
    symbol: 'i:',
    ipa: '/i:/',
    description: 'Vocal larga similar a "í" en español pero más tensa',
    examples: ['see', 'tree', 'eat', 'beach'],
    position: 'vowel',
    difficulty: 1,
    mouthPosition: 'Boca casi cerrada, labios estirados',
    tonguePosition: 'Lengua alta y adelante'
  },
  {
    symbol: 'ɪ',
    ipa: '/ɪ/',
    description: 'Vocal corta entre "i" e "e", relajada',
    examples: ['sit', 'big', 'fish', 'this'],
    position: 'vowel',
    difficulty: 2,
    mouthPosition: 'Boca semi-cerrada',
    tonguePosition: 'Lengua alta pero más relajada que /i:/'
  },
  {
    symbol: 'e',
    ipa: '/e/',
    description: 'Similar a "e" en español pero más abierta',
    examples: ['bed', 'red', 'head', 'said'],
    position: 'vowel',
    difficulty: 1,
    mouthPosition: 'Boca semi-abierta',
    tonguePosition: 'Lengua en posición media'
  },
  {
    symbol: 'æ',
    ipa: '/æ/',
    description: 'Vocal entre "a" y "e", muy característica del inglés',
    examples: ['cat', 'bat', 'hand', 'apple'],
    position: 'vowel',
    difficulty: 3,
    mouthPosition: 'Boca bien abierta',
    tonguePosition: 'Lengua baja y adelante'
  },
  {
    symbol: 'ɑ:',
    ipa: '/ɑ:/',
    description: 'Vocal larga similar a "a" española pero más posterior',
    examples: ['car', 'far', 'heart', 'park'],
    position: 'vowel',
    difficulty: 2,
    mouthPosition: 'Boca muy abierta',
    tonguePosition: 'Lengua baja y atrás'
  },
  {
    symbol: 'ɒ',
    ipa: '/ɒ/',
    description: 'Vocal corta redondeada, como "o" pero más abierta',
    examples: ['hot', 'dog', 'box', 'stop'],
    position: 'vowel',
    difficulty: 2,
    mouthPosition: 'Boca abierta y redondeada',
    tonguePosition: 'Lengua baja y atrás'
  },
  {
    symbol: 'ɔ:',
    ipa: '/ɔ:/',
    description: 'Vocal larga redondeada, más cerrada que /ɒ/',
    examples: ['saw', 'talk', 'door', 'born'],
    position: 'vowel',
    difficulty: 2,
    mouthPosition: 'Boca semi-abierta y redondeada',
    tonguePosition: 'Lengua en posición media-baja'
  },
  {
    symbol: 'ʊ',
    ipa: '/ʊ/',
    description: 'Vocal corta similar a "u" española pero más relajada',
    examples: ['book', 'good', 'look', 'push'],
    position: 'vowel',
    difficulty: 2,
    mouthPosition: 'Boca semi-cerrada y redondeada',
    tonguePosition: 'Lengua alta y atrás, relajada'
  },
  {
    symbol: 'u:',
    ipa: '/u:/',
    description: 'Vocal larga similar a "u" española pero más tensa',
    examples: ['food', 'blue', 'true', 'school'],
    position: 'vowel',
    difficulty: 1,
    mouthPosition: 'Boca cerrada y muy redondeada',
    tonguePosition: 'Lengua alta y atrás'
  },
  {
    symbol: 'ʌ',
    ipa: '/ʌ/',
    description: 'Vocal central relajada, sonido muy común en inglés',
    examples: ['but', 'cup', 'love', 'mother'],
    position: 'vowel',
    difficulty: 3,
    mouthPosition: 'Boca semi-abierta, neutral',
    tonguePosition: 'Lengua en posición central'
  },
  {
    symbol: 'ə',
    ipa: '/ə/',
    description: 'Schwa - vocal neutra, la más común en inglés',
    examples: ['about', 'teacher', 'dollar', 'China'],
    position: 'vowel',
    difficulty: 3,
    mouthPosition: 'Boca relajada, posición neutra',
    tonguePosition: 'Lengua completamente relajada'
  },
  {
    symbol: 'ɜ:',
    ipa: '/ɜ:/',
    description: 'Vocal larga central, sin redondear',
    examples: ['bird', 'work', 'first', 'learn'],
    position: 'vowel',
    difficulty: 3,
    mouthPosition: 'Boca semi-abierta',
    tonguePosition: 'Lengua en posición central, tensa'
  }
];

export const consonantSounds = [
  {
    symbol: 'θ',
    ipa: '/θ/',
    description: 'Sonido "th" sordo - lengua entre los dientes',
    examples: ['think', 'three', 'month', 'math'],
    position: 'consonant',
    difficulty: 3,
    mouthPosition: 'Boca semi-cerrada',
    tonguePosition: 'Lengua tocando los dientes de arriba'
  },
  {
    symbol: 'ð',
    ipa: '/ð/',
    description: 'Sonido "th" sonoro - lengua entre los dientes',
    examples: ['this', 'that', 'weather', 'brother'],
    difficulty: 3,
    position: 'consonant',
    mouthPosition: 'Boca semi-cerrada',
    tonguePosition: 'Lengua tocando los dientes de arriba'
  },
  {
    symbol: 'ʃ',
    ipa: '/ʃ/',
    description: 'Sonido "sh" - similar a "ch" suave en español',
    examples: ['ship', 'shoe', 'fish', 'wash'],
    difficulty: 2,
    position: 'consonant',
    mouthPosition: 'dientes cerrados, labios abiertos',
    tonguePosition: 'Lengua tocando el paladar'
  },
  {
    symbol: 'ʒ',
    ipa: '/ʒ/',
    description: 'Sonido "zh" - versión sonora de /ʃ/ (con vibración)',
    examples: ['pleasure', 'measure', 'vision', 'garage'],
    difficulty: 3,
    position: 'consonant',
    mouthPosition: 'dientes cerrados, labios abiertos',
    tonguePosition: 'Lengua tocando el paladar'
  },
  {
    symbol: 'tʃ',
    ipa: '/tʃ/',
    description: 'Sonido "ch" - similar al español pero más aspirado',
    examples: ['chair', 'teach', 'watch', 'chicken'],
    difficulty: 1,
    position: 'consonant',
    mouthPosition: 'dientes cerrados, labios abiertos',
    tonguePosition: 'Lengua tocando el paladar'
  },
  {
    symbol: 'dʒ',
    ipa: '/dʒ/',
    description: 'Sonido "j" - como "y" argentina en "yo"',
    examples: ['jump', 'bridge', 'age', 'judge'],
    difficulty: 2,
    position: 'consonant',
    mouthPosition: 'dientes cerrados, labios abiertos',
    tonguePosition: 'Lengua tocando el paladar'
  }
];