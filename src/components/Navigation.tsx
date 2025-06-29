import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Trophy, Settings, Volume2, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/assessment', icon: BookOpen, label: 'Evaluación' },
    { path: '/lessons', icon: BookOpen, label: 'Lecciones' },
    { path: '/practice', icon: Volume2, label: 'Práctica' },
    { path: '/achievements', icon: Trophy, label: 'Logros' },
    { path: '/profile', icon: Settings, label: 'Perfil' }
  ];

  // Add admin link if user is admin
  if (user?.role === 'admin') {
    navItems.splice(-1, 0, { path: '/admin', icon: Shield, label: 'Admin' });
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:shadow-none md:border-none md:bg-transparent">
      <div className="flex justify-around items-center py-2 md:flex-col md:space-y-2 md:py-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors duration-200 md:flex-row md:w-full md:justify-start md:px-4 md:py-3 md:text-sm md:rounded-lg"
            >
              <motion.div
                className={`flex flex-col items-center md:flex-row md:space-x-3 ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} className="md:size-5" />
                <span className="mt-1 md:mt-0">{label}</span>
              </motion.div>
              
              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-1 h-1 bg-blue-600 rounded-full md:top-1/2 md:left-0 md:w-1 md:h-6 md:-translate-y-1/2"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Sign Out Button - Desktop Only */}
        <div className="hidden md:block md:mt-4 md:pt-4 md:border-t md:border-gray-200 md:w-full">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors duration-200 rounded-lg"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;