import React, { useState } from "react";
import { useVoice } from "../contexts/VoiceContext";
import { motion } from "framer-motion";
import { Play, Eye, EyeOff } from "lucide-react";
import { audioManager } from "../utils/audioUtils";

interface ExampleCardProps {
  example: {
    en: string;
    es: string;
    explanation?: string;
    incorrect?: string;
  };
}

const ExampleCard: React.FC<ExampleCardProps> = ({ example }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const { currentEngVoice } = useVoice();

  const playExample = async (word: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await audioManager.speakSentence(word, {
        lang: currentEngVoice?.lang,
        name: currentEngVoice?.name,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <motion.button 
    onClick={() => playExample(example.en)}
    className={`
      w-full text-left p-3 rounded-lg border-2 transition-all duration-200 flex justify-between
      ${
        isPlaying
          ? "border-blue-500 bg-blue-50 cursor-not-allowed opacity-50"
          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
      }
    `}
      whileHover={!isPlaying ? { scale: 1.02 } : {}}
      whileTap={!isPlaying ? { scale: 0.98 } : {}}
    >
      <div className="flex flex-col items-start space-y-2">
        <li className="text-black flex items-center mr-2 space-x-2">
          <span className="flex items-center space-x-2">
            {example.en}
          </span>
          {isTranslationVisible && (
            <EyeOff
              size={16}
              onClick={(e) => {e.stopPropagation(); setIsTranslationVisible(!isTranslationVisible) }}
              className="text-blue-500 ml-2 cursor-pointer"
            ></EyeOff>
          )}
          {!isTranslationVisible && (
            <Eye
              size={16}
              onClick={(e) => {e.stopPropagation(); setIsTranslationVisible(!isTranslationVisible)}}
              className="text-blue-500 ml-2 cursor-pointer"
            ></Eye>
          )}
        </li>
        {isTranslationVisible && (
          <>
            {example.es && (
              <li className="text-green-500 my-2">{example.es} </li>
            )}
            {example.explanation && <li className="text-blue-600 text-xs my-2">
            💡 {example.explanation}
            </li>}
          </>
        )}
        {example.incorrect && !isTranslationVisible && (
          <li className="text-red-400 text-sm my-2 flex items-center gap-2">
            Incorrect: <span className="line-through">{example.incorrect}</span>{" "}
          </li>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        {isPlaying ? (
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
    </motion.button>
  );
};

export default ExampleCard;
