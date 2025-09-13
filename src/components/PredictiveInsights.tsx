import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, AlertTriangle, Target, Brain } from 'lucide-react';
import { mockPredictionData, mockSpendingTrends } from '../utils/mockData';

const PredictiveInsights: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} style={{ color: item.color }}>
              {item.dataKey === 'predicted' ? 'Predicted' : 'Actual'}: ₹{item.value.toLocaleString('en-IN')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Insights & Predictions</h2>
          <p className="text-gray-600">Powered by machine learning algorithms</p>
        </div>
      </div>

      {/* Spending Prediction Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Spending Forecast</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-gray-600">Predicted</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPredictionData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="actual"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="2"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <Brain className="w-4 h-4 inline mr-1" />
            AI Insight: Your spending pattern suggests you'll save $150 more than usual next month due to reduced entertainment expenses.
          </p>
        </div>
      </div>

      {/* Category Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Spending Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockSpendingTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} className="text-xs" />
              <YAxis className="text-sm" />
              <Tooltip />
              <Bar dataKey="thisMonth" fill="#3B82F6" name="This Month" />
              <Bar dataKey="prediction" fill="#8B5CF6" name="Predicted" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smart Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Savings Opportunity</h4>
              <p className="text-sm text-gray-600 mb-3">
                Switch to cooking at home 2 more times per week to save ₹2,400/month.
              </p>
              <button className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Budget Risk Alert</h4>
              <p className="text-sm text-gray-600 mb-3">
                You're on track to exceed your entertainment budget by 25% this month.
              </p>
              <button className="text-sm bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-100 transition-colors">
                Adjust Budget
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Goal Acceleration</h4>
              <p className="text-sm text-gray-600 mb-3">
                Increase your Emergency Fund contribution by ₹1,000 to reach your goal 1 month earlier.
              </p>
              <button className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                Automate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personalized Recommendations</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
            <p className="text-sm text-gray-700">
              <strong>Optimize Food Spending:</strong> Your food expenses peak on weekends. Meal prep on Sundays to save ₹800/month.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
            <p className="text-sm text-gray-700">
              <strong>Transportation Savings:</strong> Use campus shuttle more often. Your Uber usage could be reduced by 60%.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
            <p className="text-sm text-gray-700">
              <strong>Subscription Audit:</strong> You have 3 overlapping streaming services. Cancel one to save ₹240/month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;