import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play } from 'lucide-react';
import { Phoneme } from '../types';
import { audioManager } from '../utils/audioUtils';

interface PhoneticSymbolProps {
  phoneme: Phoneme;
  showDetails?: boolean;
}

const PhoneticSymbol: React.FC<PhoneticSymbolProps> = ({ 
  phoneme, 
  showDetails = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const playExample = async (word: string) => {
    setIsPlaying(true);
    setSelectedExample(word);
    
    try {
      await audioManager.speakWord(word);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
      setSelectedExample(null);
    }
  };

  const difficultyColor = {
    1: 'bg-green-100 text-green-800 border-green-300',
    2: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    3: 'bg-red-100 text-red-800 border-red-300'
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{phoneme.ipa}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColor[phoneme.difficulty]}`}>
          Nivel {phoneme.difficulty}
        </span>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{phoneme.description}</p>

      {showDetails && (phoneme.mouthPosition || phoneme.tonguePosition) && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-800 mb-2">Posición articulatoria:</h4>
          {phoneme.mouthPosition && (
            <p className="text-sm text-blue-700 mb-1">
              <strong>Boca:</strong> {phoneme.mouthPosition}
            </p>
          )}
          {phoneme.tonguePosition && (
            <p className="text-sm text-blue-700">
              <strong>Lengua:</strong> {phoneme.tonguePosition}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <Volume2 size={18} />
          Ejemplos:
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          {phoneme.examples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => playExample(example)}
              disabled={isPlaying}
              className={`
                flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200
                ${selectedExample === example 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }
                ${isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
              whileHover={!isPlaying ? { scale: 1.02 } : {}}
              whileTap={!isPlaying ? { scale: 0.98 } : {}}
            >
              <span className="font-medium text-gray-800">{example}</span>
              <div className="flex items-center space-x-1">
                {selectedExample === example && isPlaying ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Play size={16} className="text-blue-500" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneticSymbol;