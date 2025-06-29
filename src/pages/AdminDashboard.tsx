import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, TrendingUp, Calendar, Award } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { User } from '../types';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        progress: user.progress || {
          level: 0,
          completedLessons: [],
          streakDays: 0,
          totalPoints: 0,
          achievements: [],
          assessmentScore: 0,
          lastActiveDate: '',
          lessonScores: {},
          quizAttempts: {}
        }
      })));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => {
      const lastLogin = new Date(user.lastLogin);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastLogin > weekAgo;
    }).length;

    const totalLessonsCompleted = users.reduce((sum, user) => 
      sum + (user.progress?.completedLessons?.length || 0), 0
    );

    const averageProgress = users.length > 0 
      ? Math.round(totalLessonsCompleted / users.length)
      : 0;

    return { totalUsers, activeUsers, totalLessonsCompleted, averageProgress };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Panel de Administración
        </h1>
        <p className="text-lg text-gray-600">
          Supervisa el progreso de todos los estudiantes
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-500" size={32} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Estudiantes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-green-500" size={32} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.activeUsers}</p>
              <p className="text-sm text-gray-600">Activos (7 días)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-purple-500" size={32} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalLessonsCompleted}</p>
              <p className="text-sm text-gray-600">Lecciones Completadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-500" size={32} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.averageProgress}</p>
              <p className="text-sm text-gray-600">Promedio Lecciones</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Estudiantes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lecciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Racha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Nivel {user.progress?.level || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.progress?.completedLessons?.length || 0}/48
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.progress?.totalPoints || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{user.progress?.streakDays || 0}</span>
                      <span className="ml-1 text-orange-500">🔥</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Progreso de {selectedUser.name}
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="text-blue-500" size={20} />
                    <span className="font-semibold text-blue-800">Nivel {selectedUser.progress?.level || 0}</span>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">{selectedUser.progress?.totalPoints || 0} puntos</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="text-green-500" size={20} />
                    <span className="font-semibold text-green-800">
                      {selectedUser.progress?.completedLessons?.length || 0} Lecciones
                    </span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Completadas</p>
                </div>
              </div>

              {/* Achievements */}
              {selectedUser.progress?.achievements && selectedUser.progress.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Award size={20} />
                    Logros Obtenidos
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedUser.progress.achievements.map((achievement, index) => (
                      <div key={index} className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{achievement.icon}</span>
                          <div>
                            <p className="font-medium text-yellow-800 text-sm">{achievement.title}</p>
                            <p className="text-yellow-600 text-xs">{achievement.points} puntos</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar size={20} />
                  Información de Cuenta
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Registrado:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  <p><strong>Último acceso:</strong> {new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                  <p><strong>Racha actual:</strong> {selectedUser.progress?.streakDays || 0} días</p>
                  {selectedUser.progress?.assessmentScore && (
                    <p><strong>Evaluación inicial:</strong> {selectedUser.progress.assessmentScore}%</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;