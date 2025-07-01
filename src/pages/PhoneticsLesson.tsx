import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, BookOpen } from 'lucide-react';
import { vowelPhonemes, consonantSounds } from '../data/phoneticsData';
import PhoneticSymbol from '../components/PhoneticSymbol';
import { ProgressManager } from '../utils/progressUtils';
import { useNavigate } from 'react-router-dom';

const PhoneticsLesson: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<'vowels' | 'consonants'>('vowels');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  const currentData = currentSection === 'vowels' ? vowelPhonemes : consonantSounds;
  const currentPhoneme = currentData[currentIndex];

  const nextPhoneme = () => {
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentSection === 'vowels') {
      setCurrentSection('consonants');
      setCurrentIndex(0);
    }
  };

  const prevPhoneme = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentSection === 'consonants') {
      setCurrentSection('vowels');
      setCurrentIndex(vowelPhonemes.length - 1);
    }
  };

  const handleComplete = () => {
    ProgressManager.updateLessonProgress('phonetics-lesson-1', 100);
    navigate('/lessons');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <BookOpen className="text-blue-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Lección 1: Fonética Inglesa
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Domina los sonidos fundamentales del inglés
        </p>
      </motion.div>

      {/* Section Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6"
      >
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-6">
          <button
            onClick={() => {
              setCurrentSection('vowels');
              setCurrentIndex(0);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentSection === 'vowels'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {`Vocales (${vowelPhonemes.length})`}
          </button>
          <button
            onClick={() => {
              setCurrentSection('consonants');
              setCurrentIndex(0);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentSection === 'consonants'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {`Consonantes (${consonantSounds.length})`}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {currentSection === 'vowels' ? 'Vocales' : 'Consonantes'}: 
              {currentIndex + 1} de {currentData.length}
            </span>
            <span>{Math.round(((currentIndex + 1) / currentData.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentIndex + 1) / currentData.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevPhoneme}
            disabled={currentSection === 'vowels' && currentIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft size={20} />
            <span className="hidden md:block text-sm">Anterior</span>
          </button>

          <div className="flex items-center space-x-2">
            <Volume2 className="text-blue-500" size={20} />
            <span className="text-xs md:text-sm text-gray-600">
              Haz clic en las palabras para escuchar
            </span>
          </div>

          <button
            onClick={nextPhoneme}
            disabled={currentSection === 'consonants' && currentIndex === currentData.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span className="hidden md:block text-sm">Siguiente</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Phoneme Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PhoneticSymbol 
              phoneme={currentPhoneme} 
              showDetails={showDetails}
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            {showDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
          </button>

          {currentSection === 'consonants' && currentIndex === currentData.length - 1 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleComplete}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              ¡Completar Lección!
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Learning Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 rounded-xl border border-blue-200 p-6"
      >
        <h3 className="text-lg font-bold text-blue-800 mb-3">💡 Consejos de Aprendizaje</h3>
        <ul className="space-y-2 text-blue-700">
          <li>• Practica cada sonido varias veces antes de continuar</li>
          <li>• Presta atención a la posición de tu lengua y labios</li>
          <li>• Compara con sonidos similares en español para entender las diferencias</li>
          <li>• No te preocupes si no suena perfecto al principio, ¡la práctica hace al maestro!</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PhoneticsLesson;