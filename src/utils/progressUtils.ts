import { UserProgress, LessonScore, QuizAttempt } from '../types';

const STORAGE_KEY = 'englishbridge_progress';

export class ProgressManager {
  static getProgress(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      // Ensure all properties exist with proper defaults
      return {
        level: parsedData.level || 0,
        completedLessons: parsedData.completedLessons || [],
        streakDays: parsedData.streakDays || 0,
        totalPoints: parsedData.totalPoints || 0,
        achievements: parsedData.achievements || [],
        assessmentScore: parsedData.assessmentScore || 0,
        lastActiveDate: parsedData.lastActiveDate || new Date().toISOString().split('T')[0],
        lessonScores: parsedData.lessonScores || {},
        quizAttempts: parsedData.quizAttempts || {}
      };
    }
    
    return {
      level: 0,
      completedLessons: [],
      streakDays: 0,
      totalPoints: 0,
      achievements: [],
      assessmentScore: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      lessonScores: {},
      quizAttempts: {}
    };
  }

  static saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  static updateLessonProgress(lessonId: string, score: number): void {
    const progress = this.getProgress();
    
    // Update lesson score
    const lessonScore: LessonScore = {
      lessonId,
      completed: score >= 70,
      score,
      maxScore: 100,
      attempts: (progress.lessonScores[lessonId]?.attempts || 0) + 1,
      lastAttempt: new Date().toISOString(),
      timeSpent: 0 // This would be calculated in a real implementation
    };
    
    progress.lessonScores[lessonId] = lessonScore;
    
    // Add to completed lessons if not already there and score is good enough
    if (score >= 70 && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.totalPoints += score;
    }
    
    // Update level based on total points
    progress.level = this.calculateLevel(progress.totalPoints);
    
    this.updateStreak(progress);
    this.checkAchievements(progress);
    this.saveProgress(progress);
  }

  static addQuizAttempt(quizId: string, attempt: QuizAttempt): void {
    const progress = this.getProgress();
    
    if (!progress.quizAttempts[quizId]) {
      progress.quizAttempts[quizId] = [];
    }
    
    progress.quizAttempts[quizId].push(attempt);
    this.saveProgress(progress);
  }

  private static updateStreak(progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;
    
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActive === yesterdayStr) {
        progress.streakDays += 1;
      } else if (lastActive !== today) {
        progress.streakDays = 1;
      }
      
      progress.lastActiveDate = today;
    }
  }

  private static checkAchievements(progress: UserProgress): void {
    const achievements = [];
    
    // First lesson completed
    if (progress.completedLessons.length === 1 && !progress.achievements.find(a => a.id === 'first-lesson')) {
      achievements.push({
        id: 'first-lesson',
        title: 'Primer Paso',
        description: 'Completaste tu primera lección',
        icon: '🎯',
        unlockedAt: new Date().toISOString(),
        points: 50
      });
    }
    
    // Streak achievements
    if (progress.streakDays === 7 && !progress.achievements.find(a => a.id === 'week-streak')) {
      achievements.push({
        id: 'week-streak',
        title: 'Semana Completa',
        description: 'Mantuviste una racha de 7 días',
        icon: '🔥',
        unlockedAt: new Date().toISOString(),
        points: 100
      });
    }
    
    // Points milestones
    if (progress.totalPoints >= 500 && !progress.achievements.find(a => a.id === 'points-500')) {
      achievements.push({
        id: 'points-500',
        title: 'Medio Millar',
        description: 'Alcanzaste 500 puntos',
        icon: '⭐',
        unlockedAt: new Date().toISOString(),
        points: 75
      });
    }
    
    // Add new achievements to progress
    progress.achievements.push(...achievements);
    progress.totalPoints += achievements.reduce((sum, a) => sum + a.points, 0);
  }

  static calculateLevel(points: number): number {
    if (points < 100) return 0;
    if (points < 300) return 1;
    if (points < 600) return 2;
    if (points < 1000) return 3;
    if (points < 1500) return 4;
    if (points < 2500) return 5;
    return Math.floor(points / 500) + 1;
  }

  static getLessonScore(lessonId: string): LessonScore | null {
    const progress = this.getProgress();
    return progress.lessonScores[lessonId] || null;
  }

  static getQuizAttempts(quizId: string): QuizAttempt[] {
    const progress = this.getProgress();
    return progress.quizAttempts[quizId] || [];
  }
}