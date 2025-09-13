import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Target, TrendingUp, Calendar, Trophy, Gift } from 'lucide-react';
import { mockAchievements } from '../utils/mockData';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const earnedAchievements = mockAchievements.filter(a => a.earned);
  const unlockedAchievements = mockAchievements.filter(a => !a.earned);

  const filteredAchievements = filter === 'all' 
    ? mockAchievements 
    : mockAchievements.filter(a => a.category === filter);

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'spending': return <TrendingUp className="w-5 h-5" />;
      case 'saving': return <Target className="w-5 h-5" />;
      case 'goal': return <Trophy className="w-5 h-5" />;
      case 'streak': return <Calendar className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'spending': return 'bg-blue-100 text-blue-600';
      case 'saving': return 'bg-green-100 text-green-600';
      case 'goal': return 'bg-purple-100 text-purple-600';
      case 'streak': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Achievements</h1>
            </div>
            <p className="text-purple-100 mb-6">Track your financial milestones and celebrate your progress!</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{earnedAchievements.length}</div>
                <div className="text-sm text-purple-200">Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
                <div className="text-sm text-purple-200">To Unlock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((earnedAchievements.length / mockAchievements.length) * 100)}%</div>
                <div className="text-sm text-purple-200">Complete</div>
              </div>
            </div>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'spending', 'saving', 'goal', 'streak'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Recent Achievement Celebration */}
        {earnedAchievements.length > 0 && filter === 'all' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6 mb-6"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎉</div>
              <div>
                <h3 className="text-lg font-bold">Latest Achievement!</h3>
                <p className="text-yellow-100">
                  You earned "{earnedAchievements[earnedAchievements.length - 1]?.title}" on{' '}
                  {new Date(earnedAchievements[earnedAchievements.length - 1]?.earnedDate || '').toLocaleDateString()}
                </p>
              </div>
              <Gift className="w-8 h-8 text-yellow-200" />
            </div>
          </motion.div>
        )}

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                achievement.earned
                  ? 'bg-white border-green-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              {achievement.earned && (
                <div className="absolute top-3 right-3">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className={`p-2 rounded-full ${getCategoryColor(achievement.category)}`}>
                    {getCategoryIcon(achievement.category)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {achievement.category}
                  </span>
                </div>

                {achievement.earned ? (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Earned on {new Date(achievement.earnedDate || '').toLocaleDateString()}
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    Not yet earned
                  </div>
                )}
              </div>

              {achievement.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-2 left-2 text-yellow-400">
                    <Star className="w-6 h-6 fill-current animate-pulse" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Progress Towards Next Achievement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Up Next</h3>
        <div className="space-y-4">
          {unlockedAchievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                In Progress
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;