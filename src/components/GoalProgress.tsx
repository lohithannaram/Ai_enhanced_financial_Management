import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp, Plus, Edit3, Trash2 } from 'lucide-react';
import { Goal } from '../types';

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const [showNewGoal, setShowNewGoal] = useState(false);

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
        <button
          onClick={() => setShowNewGoal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{goal.category}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>₹{goal.current.toLocaleString('en-IN')} saved</span>
                <span>Target: ₹{goal.target.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${getProgressColor(goal.progress)}`}
                  style={{ width: `${goal.progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{goal.progress}% complete</span>
                <span>₹{(goal.target - goal.current).toLocaleString('en-IN')} remaining</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>Est: {goal.estimatedCompletion}</span>
              </div>
            </div>

            {goal.progress >= 75 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-sm text-green-700 font-medium">🎉 You're almost there! Keep it up!</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievement celebration for completed goals */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl p-6 text-center hidden"
      >
        <div className="text-4xl mb-2">🏆</div>
        <h3 className="text-xl font-bold mb-2">Goal Achieved!</h3>
        <p>Congratulations on reaching your Emergency Fund goal!</p>
      </motion.div>
    </div>
  );
};

export default GoalProgress;