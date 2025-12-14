import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Mic, Target, Clock, Trophy } from "lucide-react";
import {
  spanishLikeWords,
  techWords,
  commonVerbs,
} from "../data/vocabularyData";
import { audioManager } from "../utils/audioUtils";
import { useVoice } from "../contexts/VoiceContext";

const PracticePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "spanish-like" | "tech" | "verbs"
  >("all");
  const [practiceMode, setPracticeMode] = useState<
    "listen" | "speak" | "quick"
  >("listen");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const allWords = [...spanishLikeWords, ...techWords, ...commonVerbs];

  const getWordsForCategory = () => {
    switch (selectedCategory) {
      case "spanish-like":
        return spanishLikeWords;
      case "tech":
        return techWords;
      case "verbs":
        return commonVerbs;
      default:
        return allWords;
    }
  };

  const currentWords = getWordsForCategory();
  const currentWord = currentWords[currentWordIndex];
  const { currentEngVoice } = useVoice();

  const playWord = async () => {
    setIsPlaying(true);
    try {
      await audioManager.speakWord(currentWord.en, {
        lang: currentEngVoice?.lang,
        name: currentEngVoice?.name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % currentWords.length);
  };

  const practiceTypes = [
    {
      id: "listen",
      name: "Escucha y Repite",
      description: "Escucha palabras y practica la pronunciación",
      icon: Volume2,
      color: "blue",
    },
    {
      id: "speak",
      name: "Pronunciación",
      description: "Practica hablando con reconocimiento de voz",
      icon: Mic,
      color: "green",
    },
    {
      id: "quick",
      name: "Práctica Rápida",
      description: "Sesión de 5 minutos de vocabulario",
      icon: Target,
      color: "purple",
    },
  ];

  const categories = [
    { id: "all", name: "Todas las Palabras", count: allWords.length },
    {
      id: "spanish-like",
      name: "Palabras Similares",
      count: spanishLikeWords.length,
    },
    { id: "tech", name: "Tecnología", count: techWords.length },
    { id: "verbs", name: "Verbos Comunes", count: commonVerbs.length },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Práctica de Pronunciación
        </h1>
        <p className="text-lg text-gray-600">
          Mejora tu pronunciación con ejercicios interactivos
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
          <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
          <div className="text-2xl font-bold text-gray-800">{score}</div>
          <div className="text-sm text-gray-600">Puntos</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
          <Target className="mx-auto mb-2 text-green-500" size={24} />
          <div className="text-2xl font-bold text-gray-800">{streak}</div>
          <div className="text-sm text-gray-600">Racha</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
          <Clock className="mx-auto mb-2 text-blue-500" size={24} />
          <div className="text-2xl font-bold text-gray-800">5:30</div>
          <div className="text-sm text-gray-600">Tiempo</div>
        </div>
      </motion.div>

      {/* Practice Mode Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Tipo de Práctica</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {practiceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setPracticeMode(type.id as any)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                practiceMode === type.id
                  ? `border-${type.color}-500 bg-${type.color}-50`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <type.icon
                size={32}
                className={`mx-auto mb-2 ${
                  practiceMode === type.id
                    ? `text-${type.color}-500`
                    : "text-gray-400"
                }`}
              />
              <h3 className="font-semibold text-gray-800 mb-1">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="font-semibold text-gray-800">{category.name}</div>
              <div className="text-sm text-gray-600">
                {category.count} palabras
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Practice Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
      >
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">
              Palabra {currentWordIndex + 1} de {currentWords.length}
            </div>
            <h3 className="text-4xl font-bold text-gray-800">
              {currentWord.en}
            </h3>
            <div className="text-blue-600 font-mono text-xl">
              {currentWord.ipa}
            </div>
            <div className="text-lg text-gray-600">{currentWord.es}</div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={playWord}
              disabled={isPlaying}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
            >
              {isPlaying ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Volume2 size={20} />
              )}
              <span>Escuchar</span>
            </button>

            <button
              onClick={nextWord}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Siguiente
            </button>
          </div>

          {/* Secondary Action for Speech Practice */}
          {practiceMode === "speak" && (
            <div className="flex justify-center">
              <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                <Mic size={20} />
                <span>Grabar mi Pronunciación</span>
              </button>
            </div>
          )}

          {/* Example Sentence */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 italic">"{currentWord.examples[0].en}"</p>
            <button
              onClick={() =>
                audioManager.speakSentence(currentWord.examples[0].en, {
                  lang: currentEngVoice?.lang,
                  name: currentEngVoice?.name,
                })
              }
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
              🔊 Escuchar ejemplo
            </button>
          </div>

          {/* Mnemonic */}
          {currentWord.mnemonic && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">
                💡 Truco de memoria:
              </h4>
              <p className="text-purple-700">{currentWord.mnemonic}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 rounded-xl border border-blue-200 p-6"
      >
        <h3 className="text-lg font-bold text-blue-800 mb-3">
          💡 Consejos para la Práctica
        </h3>
        <ul className="space-y-2 text-blue-700">
          <li>
            • Escucha cada palabra varias veces antes de intentar pronunciarla
          </li>
          <li>• Presta atención a la posición del acento tónico</li>
          <li>• Practica en voz alta, no solo mentalmente</li>
          <li>• Usa los trucos de memoria para recordar mejor</li>
          <li>• Practica un poco cada día para mejores resultados</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PracticePage;
