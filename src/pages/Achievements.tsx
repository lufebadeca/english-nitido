import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, BookOpen, Trophy, Settings, Volume2 } from "lucide-react";
import { ProgressManager } from "../utils/progressUtils";
import BroserLanguages from "../components/BrowserLanguages";

/* 
📦 Ejemplo de estructura de progreso guardado en localStorage:
{
  level: 2,
  totalPoints: 578,
  streakDays: 2,
  lastActiveDate: "2025-07-01",
  assessmentScore: 100,
  completedLessons: [
    "phonetics-lesson-1",
    "basic-grammar",
    "spanish-like-words",
    "basic-grammar-2",
    "tech-vocabulary"
  ],
  achievements: [
    { id: "first-lesson", title: "Primer Paso", icon: "🎯" },
    { id: "points-500", title: "Medio Millar", icon: "⭐" }
  ],
  lessonScores: { ... },
  quizAttempts: { ... }
}
*/

const Achievements: React.FC = () => {
  const progress = ProgressManager.getProgress();
  const achievements = progress.achievements;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Logros</h1>
        <p className="text-lg text-gray-600">
          Descubre tus logros y avances en el aprendizaje del inglés
        </p>
      </motion.div>

      {/* Logros del usuario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-4 text-center"
          >
            <p className="text-sm text-gray-500">{achievement.title}</p>
            <p className="text-2xl font-bold text-blue-600">
              {achievement.icon}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
