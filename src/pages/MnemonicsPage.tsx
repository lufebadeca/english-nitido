import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Eye, Volume2, ArrowRight } from "lucide-react";
import { mnemonicTechniques } from "../data/vocabularyData";
import { audioManager } from "../utils/audioUtils";
import { useVoice } from "../contexts/VoiceContext";

const MnemonicsPage: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(
    mnemonicTechniques[0]
  );
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showVisualization, setShowVisualization] = useState(false);

  const currentExample = selectedTechnique.examples[currentExampleIndex];
  const { currentEngVoice } = useVoice();

  const playWord = async (word: string) => {
    try {
      await audioManager.speakWord(word, {
        lang: currentEngVoice?.lang,
        name: currentEngVoice?.name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const nextExample = () => {
    setCurrentExampleIndex(
      (prev) => (prev + 1) % selectedTechnique.examples.length
    );
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "bg-green-100 text-green-800 border-green-300";
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 3:
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
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
        <div className="flex items-center justify-center space-x-3">
          <Brain className="text-purple-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Aprende con Mnemotécnias
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Técnicas de memoria para recordar vocabulario difícil de forma
          permanente
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6"
      >
        <h2 className="text-xl font-bold text-purple-800 mb-3">
          ¿Qué son las Mnemotécnias?
        </h2>
        <p className="text-purple-700 leading-relaxed">
          Las mnemotécnias son técnicas que ayudan a tu cerebro a recordar
          información de manera más efectiva. Utilizan asociaciones, imágenes
          mentales y conexiones lógicas para hacer que las palabras en inglés
          sean más fáciles de recordar para hispanohablantes.
        </p>
      </motion.div>

      {/* Technique Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Técnicas Disponibles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mnemonicTechniques.map((technique) => (
            <button
              key={technique.id}
              onClick={() => {
                setSelectedTechnique(technique);
                setCurrentExampleIndex(0);
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedTechnique.id === technique.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-800">{technique.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    technique.difficulty
                  )}`}
                >
                  Nivel {technique.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{technique.description}</p>
              <div className="mt-2 text-xs text-gray-500">
                {technique.examples.length} ejemplos disponibles
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Current Technique Display */}
      <motion.div
        key={selectedTechnique.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
      >
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-800">
              {selectedTechnique.name}
            </h2>
            <p className="text-gray-600">{selectedTechnique.description}</p>
            <div className="text-sm text-gray-500">
              Ejemplo {currentExampleIndex + 1} de{" "}
              {selectedTechnique.examples.length}
            </div>
          </div>

          {/* Word Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => playWord(currentExample.word)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Volume2 size={16} />
                <span className="text-2xl font-bold">
                  {currentExample.word}
                </span>
              </button>
            </div>

            <div className="text-lg text-gray-700">
              <strong>Traducción:</strong> {currentExample.translation}
            </div>
          </div>

          {/* Memory Technique */}
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Lightbulb className="text-yellow-600" size={24} />
              <h3 className="text-lg font-bold text-yellow-800">
                Técnica de Memoria
              </h3>
            </div>

            <div className="text-left space-y-3">
              <div>
                <strong className="text-yellow-800">Método:</strong>
                <p className="text-yellow-700 mt-1">
                  {currentExample.technique}
                </p>
              </div>

              <div>
                <strong className="text-yellow-800">Truco de memoria:</strong>
                <p className="text-yellow-700 mt-1 text-lg italic">
                  "{currentExample.memory_aid}"
                </p>
              </div>
            </div>
          </div>

          {/* Visualization */}
          {currentExample.visualization && (
            <div className="space-y-3">
              <button
                onClick={() => setShowVisualization(!showVisualization)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 mx-auto"
              >
                <Eye size={16} />
                <span>
                  {showVisualization ? "Ocultar" : "Ver"} Visualización
                </span>
              </button>

              {showVisualization && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-50 rounded-xl border border-green-200 p-4"
                >
                  <h4 className="font-bold text-green-800 mb-2">
                    🎨 Imagen Mental:
                  </h4>
                  <p className="text-green-700">
                    {currentExample.visualization}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={nextExample}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              <span>Siguiente Ejemplo</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Practice Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 rounded-xl border border-blue-200 p-6"
      >
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          🎯 Cómo Usar las Mnemotécnias Efectivamente
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Pasos para Recordar:
            </h4>
            <ol className="space-y-1 text-blue-700 text-sm">
              <li>1. Lee la palabra en inglés y su traducción</li>
              <li>2. Estudia el truco de memoria</li>
              <li>3. Visualiza la imagen mental sugerida</li>
              <li>4. Repite la asociación varias veces</li>
              <li>5. Practica recordar sin mirar</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Consejos Importantes:
            </h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Haz las imágenes mentales lo más vívidas posible</li>
              <li>• Usa emociones para fortalecer la memoria</li>
              <li>• Practica regularmente para mantener las asociaciones</li>
              <li>• Crea tus propias mnemotécnias personalizadas</li>
              <li>• Combina con otros métodos de estudio</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Create Your Own */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 p-6"
      >
        <h3 className="text-lg font-bold text-green-800 mb-3">
          ✨ Crea Tus Propias Mnemotécnias
        </h3>
        <p className="text-green-700 mb-4">
          Las mnemotécnias más efectivas son las que tú mismo creas. Piensa en
          palabras en español que suenen similar, situaciones graciosas, o
          imágenes que te resulten memorables.
        </p>
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">
            Ejemplo de creación propia:
          </h4>
          <p className="text-green-700 text-sm">
            <strong>Palabra:</strong> "Embarrassed" (avergonzado)
            <br />
            <strong>Tu asociación:</strong> "Suena como 'embarazada' - me da
            vergüenza estar embarazada"
            <br />
            <strong>Imagen mental:</strong> Una persona sonrojada y avergonzada
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MnemonicsPage;
