import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Budget } from '../types';

interface SpendingOverviewProps {
  budgets: Budget[];
}

const SpendingOverview: React.FC<SpendingOverviewProps> = ({ budgets }) => {
  const getTrendIcon = (trend: Budget['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: Budget['trend']) => {
    switch (trend) {
      case 'up': return 'text-red-600 bg-red-50';
      case 'down': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Budget Overview</h2>
        <span className="text-sm text-gray-500">This Month</span>
      </div>

      <div className="space-y-4">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900">{budget.category}</span>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getTrendColor(budget.trend)}`}>
                  {getTrendIcon(budget.trend)}
                  <span>{budget.trend}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">₹{budget.spent.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-500"> / ₹{budget.allocated.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  budget.percentage > 90 ? 'bg-red-500' :
                  budget.percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budget.percentage, 100)}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
              />
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{budget.percentage}% used</span>
              <span>₹{budget.remaining.toLocaleString('en-IN')} left</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-700">Total Budget Usage</span>
          <span className="font-semibold text-blue-600">
            {((budgets.reduce((sum, b) => sum + b.spent, 0) / budgets.reduce((sum, b) => sum + b.allocated, 0)) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;