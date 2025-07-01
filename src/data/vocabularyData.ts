import { WordEntry, Lesson, QuizQuestion, MnemonicTechnique } from '../types';

export const spanishLikeWords: WordEntry[] = [
  {
    en: 'hospital',
    es: 'hospital',
    ipa: '/ˈhɒspɪtəl/',
    syllables: ['hos', 'pi', 'tal'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'The hospital is very modern',
      'She works at the hospital as a nurse',
      'We visited him at the hospital yesterday'
    ],
    wrong: 'jóspitol',
    wordFamily: [{en:'hospitalize', es:'hospitalizar'}, {en:'hospitality', es:'hospitalidad'}, {en:'hospitable', es:'hospitalario'}, {en:'inhospitable', es:'inhóspito'}, {en:'clinic', es:'clínica'}],
    difficulty: 1,
    category: 'spanish-like',
    regionalVariants: {
      'Mexico': 'hospital',
      'Argentina': 'hospital',
      'Spain': 'hospital'
    },
    mnemonic: 'Misma escritura, diferente pronunciación - acentuación en HOS-pi-tal'
  },
  {
    en: 'animal',
    es: 'animal',
    ipa: '/ˈænɪməl/',
    syllables: ['an', 'i', 'mal'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'The animal is very cute',
      'Wild animals live in the forest',
      'My favorite animal is a dolphin'
    ],
    wrong: 'ánimol',
    wordFamily: [{en:'animals', es:'animales'}, {en:'animate', es:'animar'}, {en:'animation', es:'animación'}, {en:'being', es:'ser'}, {en:'creature', es:'criatura'}, {en:'beast', es:'bestia'}, {en:'pet', es:'mascota'}],
    difficulty: 1,
    category: 'spanish-like',
    mnemonic: 'AN-i-mal (Inglés) vs a-ni-MAL (Español) - acentuación en AN-i-mal'
  },
  {
    en: 'natural',
    es: 'natural',
    ipa: '/ˈnætʃərəl/',
    syllables: ['nat', 'u', 'ral'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Natural food is healthier',
      'She has natural beauty',
      'It\'s natural to feel nervous'
    ],
    wrong: 'natural',
    wordFamily: [{en:'nature', es:'naturaleza'}, {en:'naturally', es:'naturalmente'}, {en:'naturalist', es:'naturalista'}, {en:'unnatural', es:'extraño'}],
    difficulty: 2,
    category: 'spanish-like',
    mnemonic: 'NAT-u-ral (Inglés) vs na-tu-RAL (Español)'
  },
  {
    en: 'family',
    es: 'familia',
    ipa: '/ˈfæməli/',
    syllables: ['fam', 'i', 'ly'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'My family is very important to me',
      'We have a big family dinner every Sunday',
      'Family comes first'
    ],
    wrong: 'fámili',
    wordFamily: [{en:'familiar', es:'familiar'}, {en:'familiarize', es:'familiarizar'}, {en:'relative', es:'pariente'}],
    difficulty: 1,
    category: 'spanish-like',
    mnemonic: 'FAM-i-ly suena como "fam-ilia" pero más corta'
  }
];

export const techWords: WordEntry[] = [
  {
    en: 'download',
    es: 'descargar',
    ipa: '/ˌdaʊnˈloʊd/',
    syllables: ['down', 'load'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Download the app from the store',
      'The download is complete',
      'I need to download this file'
    ],
    wrong: 'dounload',
    wordFamily: [{en:'downloadable', es:'descargable'}, {en:'downloading', es:'descargando'}, {en:'downloader', es:'descargador'}],
    difficulty: 2,
    category: 'tech',
    mnemonic: 'DOWN (abajo) + LOAD (cargar) = download (descargar)'
  },
  {
    en: 'streaming',
    es: 'transmisión en vivo',
    ipa: '/ˈstriːmɪŋ/',
    syllables: ['stream', 'ing'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I love streaming movies on Netflix',
      'Live streaming is very popular',
      'The streaming quality is excellent'
    ],
    wrong: 'estrímin',
    wordFamily: [{en:'stream', es:'transmisión'}, {en:'streamer', es:'streamer'}, {en:'streamline', es:'optimizar'}],
    difficulty: 2,
    category: 'tech',
    mnemonic: 'STREAM (como un río fluyendo) = transmisión en vivo (fluyen datos)'
  },
  {
    en: 'upload',
    es: 'subir/cargar',
    ipa: '/ˌʌpˈloʊd/',
    syllables: ['up', 'load'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Upload your photos to the cloud',
      'The upload failed, try again',
      'Please upload your resume'
    ],
    wrong: 'úp-load',
    wordFamily: [{en:'uploadable', es:'subible'}, {en:'uploading', es:'subiendo'}, {en:'uploader', es:'subidor'}],
    difficulty: 2,
    category: 'tech',
    mnemonic: 'UP (arriba) + LOAD (cargar) = upload (subir/cargar)'
  },
  {
    en: 'hashtag',
    es: 'etiqueta',
    ipa: '/ˈhæʃtæɡ/',
    syllables: ['hash', 'tag'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Use this hashtag in your post',
      'The hashtag went viral',
      'Add relevant hashtags to increase visibility'
    ],
    wrong: 'hashtag',
    wordFamily: [{en:'hash', es:'hash'}, {en:'tag', es:'tag'}, {en:'tagging', es:'tagging'}],
    difficulty: 2,
    category: 'tech',
    mnemonic: 'HASH (#) + TAG (etiqueta) = hashtag (etiqueta con #)'
  }
];

export const commonVerbs: WordEntry[] = [
  {
    en: 'think',
    es: 'pensar',
    ipa: '/θɪŋk/',
    syllables: ['think'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I think about you every day',
      'Think before you speak',
      'What do you think about this idea?'
    ],
    wrong: 'think',
    wordFamily: [{en:'thought', es:'pensamiento'}, {en:'thinking', es:'pensando'}, {en:'thinker', es:'pensador'}, {en:'thoughtful', es:'pensativo, atento'}],
    difficulty: 2,
    category: 'common-verbs',
    mnemonic: 'THINK con sonido TH - lengua entre dientes'
  },
  {
    en: 'understand',
    es: 'entender',
    ipa: '/ˌʌndərˈstænd/',
    syllables: ['un', 'der', 'stand'],
    stress: 2,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Do you understand me?',
      'I understand the problem now',
      'It\'s hard to understand his accent'
    ],
    wrong: 'understand',
    wordFamily: [{en:'understanding', es:'entendimiento'}, {en:'understood', es:'entendido'}, {en:'understandable', es:'entendible'}],
    difficulty: 2,
    category: 'common-verbs',
    mnemonic: 'UNDER + STAND = understand (estar debajo para entender en profundidad algo)'
  },
  {
    en: 'believe',
    es: 'creer',
    ipa: '/bɪˈliːv/',
    syllables: ['be', 'lieve'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I believe in you',
      'Do you believe this story?',
      'She believes in hard work'
    ],
    wrong: 'belíf',
    wordFamily: [{en:'belief', es:'creencia'}, {en:'believer', es:'creyente'}, {en:'believable', es:'creíble'}, {en:'unbelievable', es:'increible'}, {en:'faith', es:'fe'}],
    difficulty: 2,
    category: 'common-verbs',
    mnemonic: 'be-LIEVE - acentuación en segunda sílaba'
  },
  {
    en: 'remember',
    es: 'recordar',
    ipa: '/rɪˈmembər/',
    syllables: ['re', 'mem', 'ber'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I remember our first meeting',
      'Please remember to call me',
      'Do you remember this song?'
    ],
    wrong: 'remember',
    wordFamily: [{en:'memory', es:'memoria'}, {en:'memorable', es:'memorable'}, {en:'remembrance', es:'conmemoración'}],
    difficulty: 2,
    category: 'common-verbs',
    mnemonic: 're-MEM-ber - suena como ri-MEM-br'
  }
];

export const animeMarvelWords: WordEntry[] = [
  {
    en: 'superhero',
    es: 'superhéroe',
    ipa: '/ˈsuːpərˌhɪroʊ/',
    syllables: ['su', 'per', 'he', 'ro'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Spider-Man is my favorite superhero',
      'Every superhero has a weakness',
      'She dreams of being a superhero'
    ],
    wrong: 'superjero',
    wordFamily: [{en:'super', es:'super'}, {en:'hero', es:'heroe'}, {en:'heroic', es:'heroico'}, {en:'heroism', es:'heroísmo'}],
    difficulty: 2,
    category: 'anime-marvel',
    mnemonic: 'SUPER + HERO = superhéroe (como Superman!)'
  },
  {
    en: 'villain',
    es: 'villano',
    ipa: '/ˈvɪlən/',
    syllables: ['vil', 'lain'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'The villain has an evil plan',
      'Every story needs a good villain',
      'Thanos is a powerful villain'
    ],
    wrong: 'villáin',
    wordFamily: [{en:'villainous', es:'villano'}, {en:'villainy', es:'villanía'}, {en:'foe', es:'enemigo'}, {en:'boss', es:'jefe'}],
    difficulty: 2,
    category: 'anime-marvel',
    mnemonic: 'VIL-lain - suena como "vil"'
  },
  {
    en: 'power',
    es: 'poder',
    ipa: '/ˈpaʊər/',
    syllables: ['pow', 'er'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'He has the power of invisibility',
      'With great power comes great responsibility',
      'The power went out during the storm'
    ],
    wrong: 'pówer',
    wordFamily: [{en:'powerful', es:'poderoso'}, {en:'powerless', es:'sin poder'}, {en:'empower', es:'empoderar'}, {en:'fighter', es:'luchador'}, {en:'fight', es:'luchar'}],
    difficulty: 1,
    category: 'anime-marvel',
    mnemonic: 'POW-er - suena como "POW!" (pau) en cómics'
  },
  {
    en: 'transformation',
    es: 'transformación',
    ipa: '/ˌtrænsfərˈmeɪʃən/',
    syllables: ['trans', 'for', 'ma', 'tion'],
    stress: 2,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'The transformation scene was amazing',
      'His transformation into a hero was gradual',
      'The magical transformation surprised everyone'
    ],
    wrong: 'transformeichon',
    wordFamily: [{en:'transform', es:'transformar'}, {en:'transformer', es:'transformador'}, {en:'transformation', es:'transformación'}],
    difficulty: 3,
    category: 'anime-marvel',
    mnemonic: 'trans-for-MA-tion - acentuación en MA (mei)'
  }
];

export const adjectiveWords: WordEntry[] = [
  {
    en: 'beautiful',
    es: 'hermoso/a',
    ipa: '/ˈbjuːtɪfəl/',
    syllables: ['beau', 'ti', 'ful'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'She has beautiful eyes',
      'The sunset is beautiful tonight',
      'What a beautiful song!'
    ],
    wrong: 'beutiful',
    wordFamily: [{en:'beauty', es:'hermosura'}, {en:'beautifully', es:'hermosamente'}, {en:'handsome', es:'guapo'}, {en:'good-looking', es:'bonito'}, {en:'cute', es:'lindo'}],
    difficulty: 2,
    category: 'adjectives',
    mnemonic: 'BEAU-ti-ful - suena como "beauty" pero agregando fəl'
  },
  {
    en: 'intelligent',
    es: 'inteligente',
    ipa: '/ɪnˈtelɪdʒənt/',
    syllables: ['in', 'tel', 'li', 'gent'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'She is very intelligent',
      'That was an intelligent decision',
      'Dolphins are intelligent animals'
    ],
    wrong: 'intéligent',
    wordFamily: [{en:'intelligence', es:'inteligencia (IQ)'}, {en:'smart', es:'inteligente, hábil'}, {en:'clever', es:'listo'}, {en:'wise', es:'sabio'} ],
    difficulty: 2,
    category: 'adjectives',
    mnemonic: 'in-TEL-li-gent - acentuación en TEL'
  },
  {
    en: 'comfortable',
    es: 'cómodo/a',
    ipa: '/ˈkʌmftəbəl/',
    syllables: ['com', 'fort', 'a', 'ble'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'This chair is very comfortable',
      'I feel comfortable here',
      'Wear comfortable shoes for walking'
    ],
    wrong: 'comfortabel',
    wordFamily: [{en:'comfort', es:'comodidad'}, {en:'comfortably', es:'cómodamente'}, {en:'uncomfortable', es:'incómodo/a'}],
    difficulty: 2,
    category: 'adjectives',
    mnemonic: 'COM-fort-able - suena como "comfort"'
  },
  {
    en: 'dangerous',
    es: 'peligroso/a',
    ipa: '/ˈdeɪndʒərəs/',
    syllables: ['dan', 'ger', 'ous'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'That road is dangerous at night',
      'Swimming here is dangerous',
      'He has a dangerous job'
    ],
    wrong: 'dányerous',
    wordFamily: [{en:'danger', es:'peligro'}, {en:'dangerously', es:'peligrosamente'}, {en:'endanger', es:'poner en peligro'}, {en:'risk', es:'riesgo'}, {en:'risky', es:'arriesgado'} ],
    difficulty: 2,
    category: 'adjectives',
    mnemonic: 'DAN-ger-ous - suena como "danger" pero agregando -əs'
  }
];

export const connectorWords: WordEntry[] = [
  {
    en: 'however',
    es: 'sin embargo',
    ipa: '/haʊˈevər/',
    syllables: ['how', 'ev', 'er'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I like coffee. However, I prefer tea',
      'The weather was bad. However, we had fun',
      'It\'s expensive. However, it\'s worth it'
    ],
    wrong: 'jauever',
    wordFamily: [{en:'how', es:'cómo'}, {en:'ever', es:'cualquier'}, {en:'whatever', es:'cualquier cosa'}, {en: 'wherever', es: 'cualquier lugar'}, {en: 'whenever', es: 'cualquier momento'}],
    difficulty: 2,
    category: 'connectors',
    mnemonic: 'how-EV-er - suena como "how" + "ever" = sin embargo'
  },
  {
    en: 'therefore',
    es: 'por lo tanto',
    ipa: '/ˈðerfɔːr/',
    syllables: ['there', 'fore'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'It\'s raining. Therefore, we stay inside',
      'He studied hard. Therefore, he passed',
      'The store is closed. Therefore, we can\'t buy anything'
    ],
    wrong: 'terefore',
    wordFamily: [{en:'there', es:'allá'}, {en:'fore', es:'ante'}, {en:'before', es:'antes'}],
    difficulty: 2,
    category: 'connectors',
    mnemonic: 'THERE-fore - "there" + "fore" = por lo tanto'
  },
  {
    en: 'although',
    es: 'aunque',
    ipa: '/ɔːlˈðoʊ/',
    syllables: ['al', 'though'],
    stress: 1,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'Although it\'s cold, I\'ll go out',
      'She smiled although she was sad',
      'Although he\'s young, he\'s very wise'
    ],
    wrong: 'altoug',
    wordFamily: [{en:'all', es:'todos'}, {en:'though', es:'aunque'}, {en:'through', es:'a través de'}],
    difficulty: 2,
    category: 'connectors',
    mnemonic: 'al-THOUGH - "all" + "though" = aunque'
  },
  {
    en: 'furthermore',
    es: 'además',
    ipa: '/ˈfɜːrðərˌmɔːr/',
    syllables: ['fur', 'ther', 'more'],
    stress: 0,
    audioUrls: { word: '', sentence: '' },
    examples: [
      'I don\'t like it. Furthermore, it\'s expensive',
      'He\'s smart. Furthermore, he\'s hardworking',
      'The food is good. Furthermore, the service is excellent'
    ],
    wrong: 'furthermore',
    wordFamily: [{en:'further', es:'más'}, {en:'more', es:'más'}, {en:'moreover', es:'además'}],
    difficulty: 3,
    category: 'connectors',
    mnemonic: 'FUR-ther-more - "further" + "more" = además'
  }
];

export const mnemonicTechniques: MnemonicTechnique[] = [
  {
    id: 'visual-association',
    name: 'Asociación Visual',
    description: 'Conecta palabras en inglés con imágenes mentales vívidas',
    difficulty: 1,
    examples: [
      {
        word: 'butterfly',
        translation: 'mariposa',
        technique: 'Visualización',
        memory_aid: 'Imagina mantequilla (butter) volando como una mariposa',
        visualization: 'Una mariposa amarilla como la mantequilla'
      },
      {
        word: 'nightmare',
        translation: 'pesadilla',
        technique: 'Asociación directa',
        memory_aid: 'NIGHT (noche) + MARE (yegua) = pesadilla nocturna',
        visualization: 'Un caballo negro corriendo en la noche'
      }
    ]
  },
  {
    id: 'sound-similarity',
    name: 'Similitud Sonora',
    description: 'Usa palabras en español que suenan similar para recordar',
    difficulty: 2,
    examples: [
      {
        word: 'embarrassed',
        translation: 'avergonzado',
        technique: 'Sonido similar',
        memory_aid: 'Suena como "embarazada" - te da vergüenza estar embarazada',
        visualization: 'Una persona sonrojada y avergonzada'
      },
      {
        word: 'kitchen',
        translation: 'cocina',
        technique: 'Rima española',
        memory_aid: 'KITCHEN suena como "quiche" - se hace en la cocina',
        visualization: 'Cocinando un quiche en la cocina'
      }
    ]
  }
];

// Enhanced quiz questions with more audio exercises
export const spanishLikeWordsQuiz: QuizQuestion[] = [
  {
    id: 'sl-1',
    type: 'audio-type',
    question: 'Escucha la palabra y escríbela:',
    correctAnswer: 'hospital',
    audioUrl: 'hospital',
    hint: 'Es la misma palabra en español pero con pronunciación diferente',
    explanation: 'Hospital - stress on HOS-pi-tal in English vs hos-pi-TAL in Spanish',
    points: 15
  },
  {
    id: 'sl-2',
    type: 'audio-multiple-choice',
    question: 'Escucha la palabra y elige la traducción correcta:',
    options: ['animal', 'hospital', 'natural', 'familia'],
    correctAnswer: 'animal',
    audioUrl: 'animal',
    explanation: 'Animal - AN-i-mal (stress on first syllable) vs a-ni-MAL in Spanish',
    points: 10
  },
  {
    id: 'sl-3',
    type: 'fill-blank',
    question: 'The _____ is very modern and has excellent facilities.',
    correctAnswer: 'hospital',
    sentence: 'The hospital is very modern and has excellent facilities.',
    hint: 'It\'s the same word in Spanish but pronounced differently',
    explanation: 'Hospital - stress on HOS-pi-tal in English vs hos-pi-TAL in Spanish',
    points: 10
  }
];

export const techWordsQuiz: QuizQuestion[] = [
  {
    id: 'tech-1',
    type: 'audio-type',
    question: 'Escucha la palabra y escríbela:',
    correctAnswer: 'download',
    audioUrl: 'download',
    hint: 'Es una palabra compuesta relacionada con bajar archivos',
    explanation: 'Download = DOWN (abajo) + LOAD (cargar) = descargar',
    points: 15
  },
  {
    id: 'tech-2',
    type: 'audio-multiple-choice',
    question: 'Escucha la palabra y elige su significado:',
    options: ['descargar', 'subir', 'transmitir', 'etiquetar'],
    correctAnswer: 'transmitir',
    audioUrl: 'streaming',
    explanation: 'Streaming - continuous transmission of data, like a stream of water',
    points: 10
  },
  {
    id: 'tech-3',
    type: 'fill-blank',
    question: 'I love _____ movies on Netflix instead of downloading them.',
    correctAnswer: 'streaming',
    sentence: 'I love streaming movies on Netflix instead of downloading them.',
    hint: 'It\'s like a continuous flow of data',
    explanation: 'Streaming - continuous transmission of data, like a stream of water',
    points: 10
  }
];

export const commonVerbsQuiz: QuizQuestion[] = [
  {
    id: 'verbs-1',
    type: 'audio-type',
    question: 'Escucha el verbo y escríbelo:',
    correctAnswer: 'think',
    audioUrl: 'think',
    hint: 'Tiene el sonido TH al principio',
    explanation: 'Think - with TH sound, tongue between teeth',
    points: 15
  },
  {
    id: 'verbs-2',
    type: 'sentence-order',
    question: 'Ordena las palabras para formar una oración correcta:',
    words: ['I', 'think', 'about', 'you', 'every', 'day'],
    correctAnswer: 'I think about you every day',
    explanation: 'Subject + Verb + Preposition + Object + Time expression',
    points: 15
  },
  {
    id: 'verbs-3',
    type: 'audio-multiple-choice',
    question: 'Escucha el verbo y elige su significado:',
    options: ['pensar', 'entender', 'creer', 'recordar'],
    correctAnswer: 'entender',
    audioUrl: 'understand',
    explanation: 'Understand - un-der-STAND (stress on last syllable)',
    points: 10
  }
];

export const adjectivesQuiz: QuizQuestion[] = [
  {
    id: 'adj-1',
    type: 'audio-type',
    question: 'Escucha el adjetivo y escríbelo:',
    correctAnswer: 'beautiful',
    audioUrl: 'beautiful',
    hint: 'Describe algo hermoso',
    explanation: 'Beautiful - BEAU-ti-ful, stress on first syllable',
    points: 15
  },
  {
    id: 'adj-2',
    type: 'audio-multiple-choice',
    question: 'Escucha el adjetivo y elige su significado:',
    options: ['hermoso', 'inteligente', 'cómodo', 'peligroso'],
    correctAnswer: 'inteligente',
    audioUrl: 'intelligent',
    explanation: 'Intelligent - in-TEL-li-gent, stress on second syllable',
    points: 10
  },
  {
    id: 'adj-3',
    type: 'fill-blank',
    question: 'This chair is very _____. I could sit here all day.',
    correctAnswer: 'comfortable',
    sentence: 'This chair is very comfortable. I could sit here all day.',
    hint: 'Significa cómodo',
    explanation: 'Comfortable - COM-fort-able, gives you comfort',
    points: 10
  }
];

export const connectorsQuiz: QuizQuestion[] = [
  {
    id: 'conn-1',
    type: 'audio-type',
    question: 'Escucha el conector y escríbelo:',
    correctAnswer: 'however',
    audioUrl: 'however',
    hint: 'Significa "sin embargo"',
    explanation: 'However - how-EV-er, used to contrast ideas',
    points: 15
  },
  {
    id: 'conn-2',
    type: 'audio-multiple-choice',
    question: 'Escucha el conector y elige su significado:',
    options: ['sin embargo', 'por lo tanto', 'aunque', 'además'],
    correctAnswer: 'por lo tanto',
    audioUrl: 'therefore',
    explanation: 'Therefore - THERE-fore, shows consequence',
    points: 10
  },
  {
    id: 'conn-3',
    type: 'sentence-order',
    question: 'Ordena las palabras para formar una oración correcta:',
    words: ['Although', 'it\'s', 'cold,', 'I\'ll', 'go', 'out'],
    correctAnswer: 'Although it\'s cold, I\'ll go out',
    explanation: 'Although introduces a contrasting clause',
    points: 15
  }
];

export const vocabLessonsData: Lesson[] = [
  {
    id: 'spanish-like-words',
    title: 'Palabras Similares al Español',
    description: 'Aprende palabras "amigas" que te ayudarán a construir vocabulario rápidamente',
    category: 'vocabulary',
    difficulty: 1,
    estimatedTime: 25,
    prerequisites: ['phonetics-lesson-1'],
    vocabulary: spanishLikeWords,
    informativeContent: [
      {
        id: 'intro',
        title: 'Introducción a las Palabras Amigas',
        content: 'Las palabras "amigas" o cognados son palabras que comparten origen entre el español e inglés. Aunque se escriben igual o similar, su pronunciación puede ser muy diferente.',
        tips: [
          'Presta atención al acento tónico - cambia de posición',
          'La pronunciación de las vocales es diferente',
          'Practica cada palabra varias veces'
        ]
      }
    ],
    quiz: spanishLikeWordsQuiz,
    achievements: ['cognate-master']
  },
  {
    id: 'tech-vocabulary',
    title: 'Vocabulario Tecnológico',
    description: 'Domina los términos tecnológicos más usados en el mundo digital',
    category: 'vocabulary',
    difficulty: 2,
    estimatedTime: 30,
    prerequisites: ['spanish-like-words'],
    vocabulary: techWords,
    informativeContent: [
      {
        id: 'tech-intro',
        title: 'El Inglés en la Era Digital',
        content: 'El mundo tecnológico está dominado por términos en inglés. Aprender este vocabulario te dará ventaja en el mundo digital y profesional.',
        tips: [
          'Muchas palabras tech son compuestas (download = down + load)',
          'Practica con aplicaciones reales',
          'Usa estos términos en tu día a día'
        ]
      }
    ],
    quiz: techWordsQuiz,
    achievements: ['tech-savvy']
  },
  {
    id: 'common-verbs',
    title: 'Los 150 Verbos Más Comunes',
    description: 'Domina los verbos más utilizados en el inglés cotidiano',
    category: 'vocabulary',
    difficulty: 2,
    estimatedTime: 45,
    prerequisites: ['tech-vocabulary'],
    vocabulary: commonVerbs,
    informativeContent: [
      {
        id: 'verbs-intro',
        title: 'La Importancia de los Verbos Comunes',
        content: 'Los verbos son el corazón de cualquier oración. Dominar los 150 verbos más comunes te permitirá expresar la mayoría de ideas básicas en inglés.',
        tips: [
          'Aprende los verbos en contexto, no aislados',
          'Practica las formas irregulares',
          'Usa los verbos en oraciones completas'
        ]
      }
    ],
    quiz: commonVerbsQuiz,
    achievements: ['verb-master']
  },
  {
    id: 'adjectives-vocabulary',
    title: 'Adjetivos Esenciales',
    description: 'Aprende los adjetivos más importantes para describir personas, lugares y cosas',
    category: 'vocabulary',
    difficulty: 2,
    estimatedTime: 35,
    prerequisites: ['common-verbs'],
    vocabulary: adjectiveWords,
    informativeContent: [
      {
        id: 'adj-intro',
        title: 'El Poder de los Adjetivos',
        content: 'Los adjetivos dan vida a tus descripciones. Con estos adjetivos esenciales podrás expresar opiniones, describir características y hacer tu inglés más rico y expresivo.',
        tips: [
          'Los adjetivos van antes del sustantivo en inglés',
          'Muchos adjetivos terminan en -ful, -ous, -able',
          'Practica comparativos y superlativos'
        ]
      }
    ],
    quiz: adjectivesQuiz,
    achievements: ['adjective-master']
  },
  {
    id: 'connectors-vocabulary',
    title: 'Conectores y Palabras de Transición',
    description: 'Aprende a conectar ideas y crear textos más fluidos y coherentes',
    category: 'vocabulary',
    difficulty: 3,
    estimatedTime: 40,
    prerequisites: ['adjectives-vocabulary'],
    vocabulary: connectorWords,
    informativeContent: [
      {
        id: 'conn-intro',
        title: 'Conectando Ideas en Inglés',
        content: 'Los conectores son fundamentales para crear textos coherentes y fluidos. Te permiten expresar relaciones entre ideas como contraste, causa-efecto, adición y más.',
        tips: [
          'Usa conectores para unir oraciones y párrafos',
          'Cada conector tiene una función específica',
          'Practica con textos reales para ver su uso'
        ]
      }
    ],
    quiz: connectorsQuiz,
    achievements: ['connector-master']
  }
];