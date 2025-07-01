import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Volume2, Globe, Brain, Star, Lock, Code, Zap, MessageCircle, User, Link as LinkIcon } from 'lucide-react';
import { ProgressManager } from '../utils/progressUtils';

const LessonsPage: React.FC = () => {
  const progress = ProgressManager.getProgress();

  const lessons = [
    {
      id: 'phonetics-lesson-1',
      title: 'Fonética Inglesa Básica',
      description: 'Aprende los 16 sonidos vocálicos y consonantes esenciales',
      icon: Volume2,
      difficulty: 1,
      duration: '20 min',
      points: 100,
      isUnlocked: true,
      path: '/lesson/phonetics'
    },
    {
      id: 'basic-grammar',
      title: 'Gramática Básica del Inglés',
      description: 'Domina las reglas fundamentales: artículos, presente simple y orden de palabras',
      icon: BookOpen,
      difficulty: 1,
      duration: '10 min',
      points: 120,
      isUnlocked: progress.completedLessons.includes('phonetics-lesson-1'),
      path: '/lesson/basic-grammar'
    },
    {
      id: 'spanish-like-words',
      title: 'Palabras Similares al Español',
      description: 'Palabras "amigas" que te ayudarán a construir vocabulario rápidamente',
      icon: Globe,
      difficulty: 1,
      duration: '25 min',
      points: 80,
      isUnlocked: progress.completedLessons.includes('phonetics-lesson-1'),
      path: '/lesson/spanish-like-words'
    },
    {
      id: 'basic-grammar-2',
      title: 'Gramática Básica del Inglés nivel 2',
      description: 'Introducción a las reglas fundamentales: verbo To Be, adjetivos y adverbios',
      icon: BookOpen,
      difficulty: 2,
      duration: '15 min',
      points: 120,
      isUnlocked: progress.completedLessons.includes('basic-grammar'),
      path: '/lesson/basic-grammar-2'
    },
    {
      id: 'tech-vocabulary',
      title: 'Vocabulario Tecnológico',
      description: 'Términos de tecnología y redes sociales para el mundo digital',
      icon: Code,
      difficulty: 2,
      duration: '20 min',
      points: 150,
      isUnlocked: progress.completedLessons.includes('spanish-like-words'),
      path: '/lesson/tech-vocabulary'
    },
    {
      id: 'to-be-verb',
      title: 'El Verbo To Be',
      description: 'Domina el uso del verbo to be en inglés, el cual es un verbo irregular.',
      icon: User,
      difficulty: 2,
      duration: '25 min',
      points: 200,
      isUnlocked: progress.completedLessons.includes('basic-grammar'),
      path: '/lesson/to-be-verb'
    },
    {
      id: 'common-verbs',
      title: 'Los 150 Verbos Más Comunes',
      description: 'Domina los verbos más utilizados en el inglés cotidiano',
      icon: Zap,
      difficulty: 2,
      duration: '35 min',
      points: 200,
      isUnlocked: progress.completedLessons.includes('basic-grammar'),
      path: '/lesson/common-verbs'
    },
    {
      id: 'adjectives-vocabulary',
      title: 'Adjetivos Esenciales',
      description: 'Aprende los adjetivos más importantes para describir personas, lugares y cosas',
      icon: Star,
      difficulty: 2,
      duration: '25 min',
      points: 180,
      isUnlocked: progress.completedLessons.includes('common-verbs'),
      path: '/lesson/adjectives-vocabulary'
    },
    {
      id: 'connectors-vocabulary',
      title: 'Conectores y Palabras de Transición',
      description: 'Aprende a conectar ideas y crear textos más fluidos y coherentes',
      icon: LinkIcon,
      difficulty: 3,
      duration: '25 min',
      points: 220,
      isUnlocked: progress.completedLessons.includes('adjectives-vocabulary'),
      path: '/lesson/connectors-vocabulary'
    },
    {
      id: 'mnemonics-lesson',
      title: 'Aprender con Mnemotécnias',
      description: 'Técnicas de memoria para recordar vocabulario difícil',
      icon: Brain,
      difficulty: 3,
      duration: '25 min',
      points: 180,
      isUnlocked: progress.completedLessons.includes('tech-vocabulary'),
      path: '/mnemonics'
    }
  ];

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800 border-green-300';
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 3: return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Lecciones Interactivas
        </h1>
        <p className="text-lg text-gray-600">
          Progresa paso a paso con nuestro plan de estudios estructurado
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tu Progreso</h2>
          <span className="text-sm text-gray-600">
            {progress.completedLessons.length} de {lessons.length} completadas
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(progress.completedLessons.length / lessons.length) * 100}%` 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid gap-6">
        {lessons.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const lessonScore = ProgressManager.getLessonScore(lesson.id);
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`
                relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300
                ${lesson.isUnlocked 
                  ? 'border-gray-200 hover:border-blue-300 hover:shadow-xl' 
                  : 'border-gray-200 opacity-60'
                }
                ${isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''}
              `}
            >
              {lesson.isUnlocked ? (
                <Link to={lesson.path} className="block p-6">
                  <LessonContent 
                    lesson={lesson} 
                    isCompleted={isCompleted}
                    lessonScore={lessonScore}
                    getDifficultyColor={getDifficultyColor}
                  />
                </Link>
              ) : (
                <div className="p-6">
                  <LessonContent 
                    lesson={lesson} 
                    isCompleted={isCompleted}
                    lessonScore={lessonScore}
                    getDifficultyColor={getDifficultyColor}
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-gray-600 font-medium">Completa la lección anterior</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

interface LessonContentProps {
  lesson: any;
  isCompleted: boolean;
  lessonScore: any;
  getDifficultyColor: (difficulty: number) => string;
}

const LessonContent: React.FC<LessonContentProps> = ({ 
  lesson, 
  isCompleted, 
  lessonScore,
  getDifficultyColor 
}) => (
  <div className="flex items-start space-x-4">
    <div className={`
      flex-shrink-0 p-3 rounded-lg
      ${isCompleted 
        ? 'bg-green-500 text-white' 
        : 'bg-blue-500 text-white'
      }
    `}>
      <lesson.icon size={24} />
    </div>
    
    <div className="flex-1 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            {lesson.title}
            {isCompleted && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ">
                ✓ <span className="collapse">Completada</span>
              </span>
            )}
          </h3>
          <p className="text-gray-600 mt-1">{lesson.description}</p>
          
          {lessonScore && (
            <div className="mt-2 text-sm">
              <span className="text-gray-600">Mejor puntuación: </span>
              <span className={`font-semibold ${
                lessonScore.score >= 90 ? 'text-green-600' :
                lessonScore.score >= 70 ? 'text-blue-600' : 'text-yellow-600'
              }`}>
                {lessonScore.score}%
              </span>
              <span className="text-gray-500 ml-2">
                ({lessonScore.attempts} intento{lessonScore.attempts !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
            Nivel {lesson.difficulty}
          </span>
          <span>⏱️ {lesson.duration}</span>
          <span>⭐ {lesson.points} puntos</span>
        </div>
      </div>
    </div>
  </div>
);

export default LessonsPage;