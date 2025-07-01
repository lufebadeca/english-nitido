import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Volume2, Brain, Star, TrendingUp } from 'lucide-react';
import { ProgressManager } from '../utils/progressUtils';
import ProgressBar from '../components/ProgressBar';

const HomePage: React.FC = () => {
  const progress = ProgressManager.getProgress();
  const currentLevel = ProgressManager.calculateLevel(progress.totalPoints);

  const quickActions = [
    {
      title: 'Continuar Lección',
      description: 'Sigue donde lo dejaste',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/lessons'
    },
    {
      title: 'Práctica Rápida',
      description: '5 minutos de pronunciación',
      icon: Volume2,
      color: 'bg-green-500',
      link: '/practice'
    },
    {
      title: 'Desafío Diario',
      description: 'Mantén tu racha activa',
      icon: Brain,
      color: 'bg-purple-500',
      link: '/challenge'
    }
  ];

  const stats = [
    { label: 'Lecciones Completadas', value: progress.completedLessons.length, icon: BookOpen },
    { label: 'Días de Racha', value: progress.streakDays, icon: TrendingUp },
    { label: 'Puntos Totales', value: progress.totalPoints, icon: Star }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          ¡Bienvenido a tu aventura en inglés!
        </h1>
        <p className="text-xl text-gray-600">
          Aprende inglés de forma interactiva, diseñado especialmente para hispanohablantes
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tu Progreso</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProgressBar
              progress={progress.totalPoints}
              total={1500}
              label={`Nivel ${currentLevel} → Nivel ${currentLevel + 1}`}
              color="blue"
            />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Lecciones completadas:</span>
              <span className="font-semibold text-gray-800">{progress.completedLessons.length}/48</span>
            </div>
          </div>

          <div className="space-y-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <stat.icon className="text-blue-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="font-bold text-gray-800">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Acciones Rápidas</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={action.link}
                className="block bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl group"
              >
                <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Getting Started */}
      {progress.completedLessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <Trophy size={48} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-4">¡Comienza tu aventura!</h2>
          <p className="text-blue-100 mb-6">
            Realiza nuestra evaluación inicial para personalizar tu experiencia de aprendizaje
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Iniciar Evaluación
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;