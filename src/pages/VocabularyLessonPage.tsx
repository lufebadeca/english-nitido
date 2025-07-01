import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vocabLessonsData } from '../data/vocabularyData';
import { grammarLessonsData } from '../data/grammarData';
import { grammar2LessonsData } from '../data/grammarData2';
import LessonLayout from '../components/LessonLayout';

const VocabularyLessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const allLessons = [...vocabLessonsData, grammarLessonsData, grammar2LessonsData];
  const lesson = allLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Lección no encontrada</h2>
        <button
          onClick={() => navigate('/lessons')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Volver a Lecciones
        </button>
      </div>
    );
  }

  const handleComplete = () => {
    navigate('/lessons');
  };

  return (
    <LessonLayout 
      lesson={lesson} 
      onComplete={handleComplete}
    />
  );
};

export default VocabularyLessonPage;