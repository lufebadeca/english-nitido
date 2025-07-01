import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, BookOpen, Trophy, Settings, Volume2 } from "lucide-react";
import { ProgressManager } from '../utils/progressUtils';

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

const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    //{ path: '/assessment', icon: CheckCircle, label: 'Evaluación' },
    { path: '/lessons', icon: BookOpen, label: 'Lecciones' },
    { path: '/achievements', icon: Trophy, label: 'Logros' },
  ];

  const Profile: React.FC = () => {
    const progress = ProgressManager.getProgress();
  
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Estadísticas del usuario */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-sm text-gray-500">Nivel</p>
            <p className="text-2xl font-bold text-blue-600">🎯 {progress.level || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-sm text-gray-500">Puntos</p>
            <p className="text-2xl font-bold text-green-600">⭐ {progress.totalPoints || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-sm text-gray-500">Racha</p>
            <p className="text-2xl font-bold text-orange-500">🔥 {progress.streakDays || 0}</p>
          </div>
        </div>
  
        {/* Card de Evaluación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl shadow-lg p-8 text-white text-center ${
            progress.assessmentScore === 0
              ? 'bg-gradient-to-r from-blue-500 to-purple-600'
              : 'bg-gradient-to-r from-green-400 to-emerald-500'
          }`}
        >
          <Trophy size={48} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-4">
            {progress.assessmentScore === 0
              ? "¡Comienza tu aventura!"
              : "Evaluación completada"}
          </h2>
          <p className="text-blue-100 mb-6">
            {progress.assessmentScore === 0
              ? "Realiza nuestra evaluación inicial para personalizar tu experiencia de aprendizaje"
              : `Tu puntaje de evaluación inicial fue de ${progress.assessmentScore}%. ¡Buen trabajo!`}
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            {progress.assessmentScore === 0 ? "Iniciar Evaluación" : "Repetir Evaluación"}
          </Link>
        </motion.div>
      </div>
    );
  };
  
  export default Profile;
  