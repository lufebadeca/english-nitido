import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { placementTestQuestions } from '../data/assessmentData';
import { ProgressManager } from '../utils/progressUtils';
import { useNavigate } from 'react-router-dom';

const AssessmentPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const currentQuestion = placementTestQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === placementTestQuestions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate score
      const correctAnswers = newAnswers.filter((answer, index) => 
        answer === placementTestQuestions[index].correctAnswer
      ).length;
      
      const finalScore = Math.round((correctAnswers / placementTestQuestions.length) * 100);
      setScore(finalScore);
      setIsComplete(true);
      
      // Save assessment score
      const progress = ProgressManager.getProgress();
      progress.assessmentScore = finalScore;
      ProgressManager.saveProgress(progress);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) return {
      level: 'Intermedio-Avanzado',
      description: 'Tienes una base sólida en inglés. Puedes comenzar con lecciones más avanzadas.',
      color: 'green'
    };
    if (score >= 60) return {
      level: 'Intermedio',
      description: 'Tienes conocimientos básicos buenos. Te recomendamos empezar con lecciones intermedias.',
      color: 'blue'
    };
    if (score >= 40) return {
      level: 'Básico-Intermedio',
      description: 'Tienes algunos conocimientos básicos. Comenzaremos con lecciones fundamentales.',
      color: 'yellow'
    };
    return {
      level: 'Principiante',
      description: 'Perfecto para comenzar desde cero. Empezaremos con los fundamentos.',
      color: 'orange'
    };
  };

  if (isComplete) {
    const recommendation = getRecommendation(score);
    
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className={`p-8 rounded-xl bg-${recommendation.color}-50 border-2 border-${recommendation.color}-200`}>
            <CheckCircle size={64} className={`mx-auto mb-4 text-${recommendation.color}-500`} />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Evaluación Completada!
            </h1>
            <div className="space-y-4">
              <div className="text-6xl font-bold text-gray-800">{score}%</div>
              <div className={`inline-block px-4 py-2 rounded-full bg-${recommendation.color}-100 text-${recommendation.color}-800 font-semibold`}>
                Nivel: {recommendation.level}
              </div>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                {recommendation.description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados Detallados</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {answers.filter((answer, index) => 
                    answer === placementTestQuestions[index].correctAnswer
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Respuestas Correctas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {answers.filter((answer, index) => 
                    answer !== placementTestQuestions[index].correctAnswer
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Respuestas Incorrectas</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/lessons')}
            className="flex items-center space-x-2 px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mx-auto"
          >
            <span>Comenzar mi Plan de Estudios</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <Brain className="text-purple-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Evaluación Inicial</h1>
        </div>
        <p className="text-lg text-gray-600">
          Responde estas preguntas para personalizar tu experiencia de aprendizaje
        </p>
      </motion.div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Pregunta {currentQuestionIndex + 1} de {placementTestQuestions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / placementTestQuestions.length) * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentQuestionIndex + 1) / placementTestQuestions.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6"
      >
        <div className="space-y-4">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            currentQuestion.type === 'vocabulary' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {currentQuestion.type === 'vocabulary' ? 'Vocabulario' : 'Gramática'}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === option
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === option
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span>{isLastQuestion ? 'Finalizar' : 'Siguiente'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentPage;