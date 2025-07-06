import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Volume2,
  RotateCcw,
  ArrowRight,
  Clock,
} from "lucide-react";
import { QuizQuestion, QuizAnswer } from "../types";
import { audioManager } from "../utils/audioUtils";
import { useVoice } from "../contexts/VoiceContext";

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, answers: QuizAnswer[], timeSpent: number) => void;
  title?: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  title = "Quiz",
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [draggedWords, setDraggedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const { currentEngVoice } = useVoice();

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setCurrentAnswer("");
    setShowFeedback(false);
    setIsPlayingAudio(false);

    // Initialize sentence ordering
    if (currentQuestion.type === "sentence-order" && currentQuestion.words) {
      setAvailableWords(
        [...currentQuestion.words].sort(() => Math.random() - 0.5)
      );
      setDraggedWords([]);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const playAudio = async () => {
    if (currentQuestion.audioUrl || currentQuestion.correctAnswer) {
      setIsPlayingAudio(true);
      try {
        await audioManager.speakWord(
          currentQuestion.audioUrl || currentQuestion.correctAnswer,
          {
            lang: currentEngVoice?.lang,
            name: currentEngVoice?.name,
          }
        );
      } catch (error) {
        console.error("Error playing audio:", error);
      } finally {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleAnswerSubmit = () => {
    const timeSpent = Date.now() - questionStartTime;
    let finalAnswer = currentAnswer;

    if (currentQuestion.type === "sentence-order") {
      finalAnswer = draggedWords.join(" ");
    }

    const correct =
      finalAnswer.toLowerCase().trim() ===
      currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: finalAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: correct,
      timeSpent,
    };

    setUserAnswers([...userAnswers, answer]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const totalScore = userAnswers.reduce(
        (sum, answer, index) =>
          sum + (answer.isCorrect ? questions[index].points : 0),
        0
      );
      const totalTime = Date.now() - startTime;
      onComplete(totalScore, userAnswers, totalTime);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleWordDrag = (word: string, fromAvailable: boolean) => {
    if (fromAvailable) {
      setAvailableWords(availableWords.filter((w) => w !== word));
      setDraggedWords([...draggedWords, word]);
    } else {
      setDraggedWords(draggedWords.filter((w) => w !== word));
      setAvailableWords([...availableWords, word]);
    }
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case "fill-blank":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800">{currentQuestion.question}</p>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Escribe tu respuesta..."
              disabled={showFeedback}
            />
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800 mb-4">
              {currentQuestion.question}
            </p>
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "type-word":
        return (
          <div className="space-y-4">
            {currentQuestion.imageUrl && (
              <div className="flex justify-center">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  className="max-w-xs rounded-lg shadow-md"
                />
              </div>
            )}
            <p className="text-lg text-gray-800">{currentQuestion.question}</p>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Escribe la palabra en inglés..."
              disabled={showFeedback}
            />
          </div>
        );

      case "audio-type":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800 mb-4">
              {currentQuestion.question}
            </p>
            <div className="flex justify-center">
              <button
                onClick={playAudio}
                disabled={isPlayingAudio}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
              >
                {isPlayingAudio ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <Volume2 size={20} />
                )}
                <span>Reproducir Audio</span>
              </button>
            </div>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Escribe lo que escuchaste..."
              disabled={showFeedback}
            />
          </div>
        );

      case "audio-multiple-choice":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800 mb-4">
              {currentQuestion.question}
            </p>
            <div className="flex justify-center mb-4">
              <button
                onClick={playAudio}
                disabled={isPlayingAudio}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
              >
                {isPlayingAudio ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <Volume2 size={20} />
                )}
                <span>Reproducir Audio</span>
              </button>
            </div>
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "sentence-order":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800 mb-4">
              {currentQuestion.question}
            </p>

            {/* Dragged words area */}
            <div className="min-h-16 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                Arrastra las palabras aquí:
              </p>
              <div className="flex flex-wrap gap-2">
                {draggedWords.map((word, index) => (
                  <motion.button
                    key={`dragged-${index}`}
                    onClick={() => handleWordDrag(word, false)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Available words */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Palabras disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <motion.button
                    key={`available-${index}`}
                    onClick={() => handleWordDrag(word, true)}
                    className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canSubmit = () => {
    if (currentQuestion.type === "sentence-order") {
      return draggedWords.length > 0;
    }
    return currentAnswer.trim() !== "";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={16} />
            <span className="text-sm">
              {Math.floor((Date.now() - startTime) / 1000)}s
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {renderQuestionContent()}

          {/* Hint */}
          {currentQuestion.hint && !showFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Pista:</strong> {currentQuestion.hint}
              </p>
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <span
                    className={`font-semibold ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {isCorrect ? "¡Correcto!" : "Incorrecto"}
                  </span>
                </div>

                {!isCorrect && (
                  <p className="text-red-700 mb-2">
                    <strong>Respuesta correcta:</strong>{" "}
                    {currentQuestion.correctAnswer}
                  </p>
                )}

                {currentQuestion.explanation && (
                  <p
                    className={`text-sm ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {currentQuestion.explanation}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            {!showFeedback ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={!canSubmit()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span>Enviar Respuesta</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <span>{isLastQuestion ? "Finalizar Quiz" : "Siguiente"}</span>
                <ArrowRight size={16} />
              </button>
            )}

            <div className="text-sm text-gray-600">
              <strong>Puntos:</strong> {currentQuestion.points}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;
