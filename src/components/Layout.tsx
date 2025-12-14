import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { ProgressManager } from '../utils/progressUtils';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const progress = ProgressManager.getProgress();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      <div className="hidden md:block md:w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Neat English</h1>
          <p className="text-sm text-gray-600 mt-1">Tu camino al inglés</p>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {progress.level}
            </div>
            <div>
              <p className="font-semibold text-gray-800">Nivel {progress.level}</p>
              <p className="text-sm text-gray-600">{progress.totalPoints} puntos</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Racha</span>
              <span>{progress.streakDays} días</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress.streakDays * 10, 100)}%` }}
              />
            </div>
          </div>

          {user && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">Conectado como:</p>
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Administrador
                </span>
              )}
            </div>
          )}
        </div>
        
        <Navigation />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>
        
        <div className="md:hidden">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;