import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  Target, 
  Bell, 
  Award,
  DollarSign,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import SpendingOverview from './SpendingOverview';
import CategoryBreakdown from './CategoryBreakdown';
import GoalProgress from './GoalProgress';
import PredictiveInsights from './PredictiveInsights';
import BudgetAlerts from './BudgetAlerts';
import TransactionList from './TransactionList';
import Achievements from './Achievements';
import { mockBudgets, mockGoals, mockAlerts, generateMockTransactions } from '../utils/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions] = useLocalStorage('transactions', generateMockTransactions());
  const [unreadAlerts] = useLocalStorage('unreadAlerts', mockAlerts.filter(a => !a.read).length);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalBudget = mockBudgets.reduce((sum, budget) => sum + budget.allocated, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BudgetAI</h1>
                <p className="text-sm text-gray-500">Smart Student Finance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700">Alex</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget used
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Left</p>
                <p className="text-2xl font-bold text-green-600">₹{(totalBudget - totalSpent).toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {Math.ceil((new Date().getDate() / 30) * (totalBudget - totalSpent))} days remaining
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-blue-600">{mockGoals.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {mockGoals.filter(g => g.progress > 50).length} on track
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{unreadAlerts}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                {mockAlerts.filter(a => a.type === 'warning').length} need attention
              </span>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <SpendingOverview budgets={mockBudgets} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CategoryBreakdown budgets={mockBudgets} />
                <BudgetAlerts alerts={mockAlerts} />
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <TransactionList transactions={transactions} />
          )}

          {activeTab === 'goals' && (
            <GoalProgress goals={mockGoals} />
          )}

          {activeTab === 'insights' && (
            <PredictiveInsights />
          )}

          {activeTab === 'achievements' && (
            <Achievements />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;