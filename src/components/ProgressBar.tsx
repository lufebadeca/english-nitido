import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  label,
  showPercentage = true,
  color = 'blue'
}) => {
  const percentage = Math.min((progress / total) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{progress}</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default ProgressBar;