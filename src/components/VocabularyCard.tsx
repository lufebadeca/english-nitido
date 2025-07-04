import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Play,
  Eye,
  EyeOff,
  BookOpen,
  Users,
  Image,
  XSquare,
  XOctagon,
  XCircle,
  XCircleIcon,
} from "lucide-react";
import { WordEntry } from "../types";
import { audioManager } from "../utils/audioUtils";

interface VocabularyCardProps {
  word: WordEntry;
  showTranslation?: boolean;
  onToggleTranslation?: () => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  showTranslation = true,
  onToggleTranslation,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredFamilyWord, setHoveredFamilyWord] = useState<{
    en: string;
    es: string;
  } | null>(null);
  const [hoveredAlert, setHoveredAlert] = useState<{
    en: string;
    es: string;
  } | null>(null);

  const playFakeWord = async () => {
    console.log(word.wrong);
    setIsPlaying(true);
    console.log("voiceIndex", voiceIndex);
    console.log("fake voice", voices[voiceIndex]);
    console.log("fake lang", voices[voiceIndex].lang);
    console.log("fake name", voices[voiceIndex].name);
    try {
      await audioManager.speakWord(word.wrong, {
        lang: voices[voiceIndex].lang,
        name: voices[voiceIndex].name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const playWord = async () => {
    setIsPlaying(true);
    try {
      await audioManager.speakWord(word.en, {
        lang: voices[voiceIndex].lang,
        name: voices[voiceIndex].name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const playExample = async (example: string) => {
    setSelectedExample(example);
    setIsPlaying(true);
    try {
      await audioManager.speakSentence(example);
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsPlaying(false);
      setSelectedExample(null);
    }
  };

  const playFamilyWord = async (familyWord: string) => {
    try {
      await audioManager.speakWord(familyWord, {
        lang: voices[voiceIndex].lang,
        name: voices[voiceIndex].name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
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

  // Get word image from Pexels (placeholder URLs)
  const getWordImage = (word: string) => {
    const imageMap: { [key: string]: string } = {
      hospital:
        "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300",
      animal:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300",
      natural:
        "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=300",
      family:
        "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300",
      download:
        "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300",
      streaming:
        "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=300",
      upload:
        "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=300",
      hashtag:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300",
      think:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      understand:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
      believe:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300",
      remember:
        "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=300",
    };

    return (
      imageMap[word.toLowerCase()] ||
      `https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=300`
    );
  };

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) {
        setVoices(allVoices);
      } else {
        // Esperar un poco si aún no están cargadas
        setTimeout(loadVoices, 300);
      }
    };

    loadVoices();
  }, []);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <select
        className="p-2 border block border-gray-200 rounded"
        onChange={(e) => setVoiceIndex(Number(e.target.value))}
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {`${voice.name} (${voice.lang})`}
          </option>
        ))}
      </select>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={playWord}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
          >
            {isPlaying ? (
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <Volume2 size={16} />
            )}
            <span className="font-semibold">{word.en}</span>
          </button>

          {onToggleTranslation && (
            <button
              onClick={onToggleTranslation}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showTranslation ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          <button
            onClick={playFakeWord}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors duration-200"
            onMouseEnter={() => setHoveredAlert(word)}
            onMouseLeave={() => setHoveredAlert(null)}
          >
            {isPlaying ? (
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <Volume2 size={16} />
            )}
            <span className="font-semibold h-6 flex items-center">
              <XCircleIcon size={16} />
            </span>
            {hoveredAlert && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-1/4 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10"
              >
                Nota la diferencia y trata de no pronunciar así
                <div className="absolute top-full left-1/4 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </motion.div>
            )}
          </button>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs md:text-sm text-center font-medium border ${getDifficultyColor(
            word.difficulty
          )}`}
        >
          Nivel {word.difficulty}
        </span>
      </div>

      {/* Word Image */}
      <div className="mb-4 flex justify-center">
        <div className="relative group">
          <img
            src={getWordImage(word.en)}
            alt={word.en}
            className="w-48 h-32 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
            <Image
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              size={24}
            />
          </div>
        </div>
      </div>

      {/* Phonetic and Translation */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-mono text-lg">{word.ipa}</span>
          <div className="flex space-x-1">
            {word.syllables.map((syllable, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm ${
                  index === word.stress
                    ? "bg-orange-100 text-orange-800 font-bold"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {syllable}
              </span>
            ))}
          </div>
        </div>

        {showTranslation && (
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-blue-800 font-semibold">{word.es}</p>
            {word.regionalVariants && (
              <div className="mt-2 text-sm text-blue-600">
                <span className="font-medium">Variantes: </span>
                {Object.entries(word.regionalVariants).map(
                  ([region, variant], index) => (
                    <span key={region}>
                      {region}: {variant}
                      {index <
                        Object.entries(word.regionalVariants!).length - 1 &&
                        ", "}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mnemonic */}
      {word.mnemonic && (
        <div className="bg-purple-50 rounded-lg p-3 mb-4">
          <h4 className="font-semibold text-purple-800 mb-1">
            💡 Truco de memoria:
          </h4>
          <p className="text-purple-700 text-sm">{word.mnemonic}</p>
        </div>
      )}

      {/* Examples */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen size={18} />
          Ejemplos:
        </h4>

        <div className="space-y-2">
          {word.examples
            .slice(0, showDetails ? word.examples.length : 2)
            .map((example, index) => (
              <motion.button
                key={index}
                onClick={() => playExample(example)}
                disabled={isPlaying}
                className={`
                w-full text-left p-3 rounded-lg border-2 transition-all duration-200
                ${
                  selectedExample === example
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }
                ${
                  isPlaying ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }
              `}
                whileHover={!isPlaying ? { scale: 1.01 } : {}}
                whileTap={!isPlaying ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{example}</span>
                  <div className="flex items-center space-x-1">
                    {selectedExample === example && isPlaying ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <Play size={16} className="text-blue-500" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
        </div>

        {word.examples.length > 2 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            {showDetails
              ? "Ver menos ejemplos"
              : `Ver ${word.examples.length - 2} ejemplos más`}
          </button>
        )}
      </div>

      {/* Word Family */}
      {word.wordFamily.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <Users size={18} />
            Familia de palabras:
          </h4>
          <div className="flex flex-wrap gap-2">
            {word.wordFamily.map((relatedWord, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredFamilyWord(relatedWord)}
                onMouseLeave={() => setHoveredFamilyWord(null)}
              >
                <button
                  onClick={() => playFamilyWord(relatedWord.en)}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  {relatedWord.en}
                </button>

                {hoveredFamilyWord === relatedWord && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10"
                  >
                    {relatedWord.es}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VocabularyCard;
