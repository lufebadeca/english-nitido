import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import PhoneticsLesson from './pages/PhoneticsLesson';
import VocabularyLessonPage from './pages/VocabularyLessonPage';
import PracticePage from './pages/PracticePage';
import AssessmentPage from './pages/AssessmentPage';
import MnemonicsPage from './pages/MnemonicsPage';
import AdminDashboard from './pages/AdminDashboard';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  if (!user) return <Navigate to="/auth" replace />;
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Auth wrapper component
const AuthWrapper: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  if (user) return <Navigate to="/" replace />;

  return (
    <AuthForm 
      mode={authMode} 
      onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')} 
    />
  );
};

// Main App component
const AppContent: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/auth" element={<AuthWrapper />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="lesson/phonetics" element={<PhoneticsLesson />} />
            <Route path="lesson/:lessonId" element={<VocabularyLessonPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="assessment" element={<AssessmentPage />} />
            <Route path="mnemonics" element={<MnemonicsPage />} />
            <Route path="achievements" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-600">Logros - Próximamente</h2></div>} />
            <Route path="profile" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-600">Perfil - Próximamente</h2></div>} />
            
            {/* Admin Routes */}
            <Route path="admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;