import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Award, ArrowRight, ArrowLeft, Eye, EyeOff, Volume2, X } from 'lucide-react';
import { Lesson, QuizAnswer } from '../types';
import VocabularyCard from './VocabularyCard';
import QuizComponent from './QuizComponent';
import { ProgressManager } from '../utils/progressUtils';
import { audioManager } from '../utils/audioUtils';

interface LessonLayoutProps {
  lesson: Lesson;
  onComplete: () => void;
}

interface ExampleCardProps {
  example: {
    correct: string;
    translation: string;
    explanation: string;
    incorrect?: string;
  };
}

const ExampleCard: React.FC<ExampleCardProps> = ({example}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);

  const playExample = async (example: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await audioManager.speakSentence(example);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <li className="text-blue-700 flex items-center mr-2 space-x-2">
        <span className="flex items-center space-x-2">
          <Volume2 size={16} className="text-blue-500 mr-2 cursor-pointer" onClick={() => playExample(example.correct)}/> {example.correct}
        </span>
        {isTranslationVisible && <EyeOff size={16} onClick={() => setIsTranslationVisible(!isTranslationVisible)} className="text-green-500 ml-2 cursor-pointer"></EyeOff>}
        {!isTranslationVisible && <Eye size={16} onClick={() => setIsTranslationVisible(!isTranslationVisible)} className="text-green-500 ml-2 cursor-pointer"></Eye>}
      </li>
      {isTranslationVisible && (
        <>
        <li className="text-green-500 my-2">{example.translation} </li>
        <li className="text-blue-600 text-xs my-2">💡 {example.explanation} </li>
        </>
      )}
      {(example.incorrect && !isTranslationVisible) &&
        <li className="text-red-400 text-sm my-2 flex items-center gap-2">Incorrect: <span className="line-through">{example.incorrect}</span> </li>}
    </div>
  );
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ lesson, onComplete }) => {
  //estado de navegacion interna de la leccion
  const [currentStage, setCurrentStage] = useState<'info' | 'rules' | 'vocab' | 'quiz'>('info');
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [showTranslations, setShowTranslations] = useState(true);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleQuizComplete = (score: number, answers: QuizAnswer[], timeSpent: number) => {
    setQuizScore(score);
    const maxScore = lesson.quiz.reduce((sum, q) => sum + q.points, 0);
    const percentage = (score / maxScore) * 100;
    
    // Save progress
    ProgressManager.updateLessonProgress(lesson.id, Math.round(percentage));
    
    // Complete lesson if score is good enough
    if (percentage >= 70) {
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  const renderInformativeStage = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <BookOpen className="text-blue-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
        </div>
        <p className="text-lg text-gray-600">{lesson.description}</p>
      </motion.div>

      {lesson.informativeContent.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
          
          {section.examples && section.examples.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">Ejemplos:</h3>
              <ul className="space-y-1">
                {section.examples.map((example, idx) => (
                  <li key={idx} className="text-blue-700">• {example}</li>
                ))}
              </ul>
            </div>
          )}

          {section.tips && section.tips.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">💡 Consejos:</h3>
              <ul className="space-y-1">
                {section.tips.map((tip, idx) => (
                  <li key={idx} className="text-yellow-700">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCurrentStage('rules')}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <span>Ver las reglas</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderGrammarRulesStage = () => {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <BookOpen className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Reglas</h1>
          </div>
          <p className="text-lg text-gray-600">Aprende las reglas de la lección</p>
        </motion.div>

        {lesson.grammarRules?.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">{rule.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{rule.explanation[0]}</p>
            {rule.explanation.length > 1 && (
              <ul className="space-y-1 bg-yellow-50 rounded-lg p-4">
                {rule.explanation.map((explanationRow, idxpz) => {
                  if (idxpz !== 0) {
                    return (
                      <li key={idxpz} className="text-gray-700">• {explanationRow}</li>
                    );
                  }
                  return null;
                })}
              </ul>
            )}

            {rule.examples && rule.examples.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-blue-800 mb-2">Ejemplos:</h3>
                <ul className="space-y-1">
                  {rule.examples.map((example, idx) => (
                    <ExampleCard example={example} key={idx}/>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCurrentStage('info')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            <span>Volver</span>
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentStage('vocab')}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <span>Continuar al Vocabulario</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderVocabularyStage = () => {
    if (lesson.vocabulary.length === 0) {
      return (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Esta lección no incluye vocabulario específico.</p>
          <button
            onClick={() => setCurrentStage('quiz')}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <span>Ir al Quiz</span>
            <ArrowRight size={16} />
          </button>
        </div>
      );
    }

    const currentWord = lesson.vocabulary[currentVocabIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Vocabulario</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              {showTranslations ? 'Ocultar traducciones' : 'Mostrar traducciones'}
            </button>
            <span className="text-sm text-gray-600">
              {currentVocabIndex + 1} de {lesson.vocabulary.length}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentVocabIndex + 1) / lesson.vocabulary.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
            {/* Vocabulary Card: mapeamos tarjeta de palabras */}
        <VocabularyCard 
          word={currentWord}
          showTranslation={showTranslations}
          onToggleTranslation={() => setShowTranslations(!showTranslations)}
        />

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentVocabIndex(Math.max(0, currentVocabIndex - 1))}
            disabled={currentVocabIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Anterior</span>
          </button>

          {currentVocabIndex === lesson.vocabulary.length - 1 ? (
            <button
              onClick={() => setCurrentStage('quiz')}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <span>Ir al Quiz</span>
              <Play size={16} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentVocabIndex(currentVocabIndex + 1)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <span>Siguiente</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderQuizStage = () => {
    if (quizScore !== null) {
      const maxScore = lesson.quiz.reduce((sum, q) => sum + q.points, 0);
      const percentage = (quizScore / maxScore) * 100;
      
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className={`p-8 rounded-xl ${
            percentage >= 70 ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'
          }`}>
            <Award size={64} className={`mx-auto mb-4 ${
              percentage >= 70 ? 'text-green-500' : 'text-yellow-500'
            }`} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {percentage >= 70 ? '¡Felicitaciones!' : '¡Buen intento!'}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Obtuviste {quizScore} de {maxScore} puntos ({Math.round(percentage)}%)
            </p>
            
            {percentage >= 70 ? (
              <p className="text-green-700">
                ¡Has completado la lección exitosamente! Continúa con la siguiente lección.
              </p>
            ) : (
              <p className="text-yellow-700">
                Necesitas al menos 70% para completar la lección. ¡Inténtalo de nuevo!
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            {percentage < 70 && (
              <button
                onClick={() => {
                  setQuizScore(null);
                  setCurrentStage('vocab');
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Repasar Vocabulario
              </button>
            )}
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {percentage >= 70 ? 'Continuar' : 'Volver a Lecciones'}
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz de Evaluación</h2>
          <p className="text-gray-600">Demuestra lo que has aprendido</p>
        </div>
        
        <QuizComponent
          questions={lesson.quiz}
          onComplete={handleQuizComplete}
          title={`Quiz: ${lesson.title}`}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Stage Navigation */}
      <div className="flex items-center justify-center space-x-4">
        {['info', 'vocab', 'quiz'].map((stage, index) => (
          <div key={stage} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${currentStage === stage 
                ? 'bg-blue-500 text-white' 
                : index < ['info', 'vocab', 'quiz'].indexOf(currentStage)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }
            `}>
              {index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStage === stage ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {stage === 'info' ? 'Información' : stage === 'vocab' ? 'Vocabulario' : 'Quiz'}
            </span>
            {index < 2 && (
              <div className={`w-8 h-0.5 mx-4 ${
                index < ['info', 'vocab', 'quiz'].indexOf(currentStage)
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Stage Content */}
      {currentStage === 'info' && renderInformativeStage()}
      {currentStage === 'rules' && renderGrammarRulesStage()}
      {currentStage === 'vocab' && renderVocabularyStage()}
      {currentStage === 'quiz' && renderQuizStage()}
    </div>
  );
};

export default LessonLayout;