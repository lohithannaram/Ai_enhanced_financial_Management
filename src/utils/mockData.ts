import { Transaction, Budget, Goal, Achievement, Alert, PredictionData, SpendingTrend } from '../types';
import { categorizeTransaction } from './aiCategorizer';

// Generate realistic transaction data
const transactionDescriptions = [
  'Starbucks Coffee', 'Uber ride to campus', 'Amazon textbooks', 'McDonald\'s lunch',
  'Netflix subscription', 'Rent payment', 'Grocery shopping', 'Movie theater',
  'Gas station', 'Campus bookstore', 'Pizza delivery', 'Gym membership',
  'Target shopping', 'Coffee shop', 'Bus fare', 'Pharmacy',
  'Hair salon', 'Restaurant dinner', 'Steam game purchase', 'Lab supplies',
  'Spotify premium', 'Laundromat', 'Phone bill', 'Study group snacks',
  'Concert tickets', 'Textbook rental', 'Food truck', 'Library fines',
  'Online course', 'Uber Eats delivery', 'Campus parking', 'Notebook supplies'
];

export function generateMockTransactions(count: number = 50): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
    const description = transactionDescriptions[Math.floor(Math.random() * transactionDescriptions.length)];
    const amount = Math.round((Math.random() * 4000 + 100) * 100) / 100;
    const { category, confidence } = categorizeTransaction(description, amount);
    
    transactions.push({
      id: `tx_${i + 1}`,
      amount,
      description,
      category,
      date: date.toISOString(),
      aiConfidence: confidence,
      isRecurring: Math.random() > 0.8,
      subcategory: Math.random() > 0.7 ? 'Eating Out' : undefined
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const mockBudgets: Budget[] = [
  { category: 'Food & Dining', allocated: 8000, spent: 6400, remaining: 1600, percentage: 80, trend: 'up' },
  { category: 'Transportation', allocated: 3000, spent: 1900, remaining: 1100, percentage: 63, trend: 'stable' },
  { category: 'Education', allocated: 6000, spent: 3600, remaining: 2400, percentage: 60, trend: 'down' },
  { category: 'Entertainment', allocated: 4000, spent: 2900, remaining: 1100, percentage: 73, trend: 'up' },
  { category: 'Shopping', allocated: 5000, spent: 3800, remaining: 1200, percentage: 76, trend: 'up' },
  { category: 'Health & Fitness', allocated: 2000, spent: 1300, remaining: 700, percentage: 65, trend: 'stable' },
];

export const mockGoals: Goal[] = [
  {
    id: 'goal_1',
    title: 'Emergency Fund',
    target: 50000,
    current: 32500,
    deadline: '2024-12-31',
    category: 'Savings',
    priority: 'high',
    progress: 65,
    estimatedCompletion: 'November 2024'
  },
  {
    id: 'goal_2',
    title: 'Spring Break Trip',
    target: 40000,
    current: 16000,
    deadline: '2024-03-15',
    category: 'Travel',
    priority: 'medium',
    progress: 40,
    estimatedCompletion: 'January 2024'
  },
  {
    id: 'goal_3',
    title: 'New Laptop',
    target: 60000,
    current: 22500,
    deadline: '2024-06-01',
    category: 'Technology',
    priority: 'medium',
    progress: 38,
    estimatedCompletion: 'April 2024'
  },
  {
    id: 'goal_4',
    title: 'Textbooks Next Semester',
    target: 10000,
    current: 2500,
    deadline: '2024-01-15',
    category: 'Education',
    priority: 'high',
    progress: 25,
    estimatedCompletion: 'December 2023'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'Budget Master',
    description: 'Stayed under budget for 3 consecutive months',
    icon: '🎯',
    earned: true,
    earnedDate: '2024-01-15',
    category: 'spending'
  },
  {
    id: 'ach_2',
    title: 'Savings Streak',
    description: 'Saved money for 7 days straight',
    icon: '💰',
    earned: true,
    earnedDate: '2024-01-20',
    category: 'saving'
  },
  {
    id: 'ach_3',
    title: 'Goal Crusher',
    description: 'Completed your first financial goal',
    icon: '🏆',
    earned: false,
    category: 'goal'
  },
  {
    id: 'ach_4',
    title: 'Category Expert',
    description: 'Correctly categorized 50 transactions',
    icon: '🧠',
    earned: true,
    earnedDate: '2024-01-22',
    category: 'spending'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert_1',
    type: 'warning',
    title: 'Budget Alert',
    message: 'You\'ve spent ₹6,400 (80%) of your Food & Dining budget this month.',
    category: 'Food & Dining',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 'alert_2',
    type: 'info',
    title: 'Spending Pattern',
    message: 'Your entertainment spending is 15% higher than last month.',
    category: 'Entertainment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'alert_3',
    type: 'success',
    title: 'Goal Progress',
    message: 'Great job! You\'re ahead of schedule on your Emergency Fund goal.',
    category: 'Savings',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];

export const mockPredictionData: PredictionData[] = [
  { month: 'Oct', predicted: 24000, actual: 23000, confidence: 0.85 },
  { month: 'Nov', predicted: 26000, actual: 25600, confidence: 0.88 },
  { month: 'Dec', predicted: 28000, actual: 0, confidence: 0.82 },
  { month: 'Jan', predicted: 22000, actual: 0, confidence: 0.79 },
  { month: 'Feb', predicted: 25000, actual: 0, confidence: 0.76 }
];

export const mockSpendingTrends: SpendingTrend[] = [
  { category: 'Food & Dining', thisMonth: 6400, lastMonth: 5600, prediction: 6800, trend: 14.3 },
  { category: 'Transportation', thisMonth: 1900, lastMonth: 2200, prediction: 1800, trend: -13.6 },
  { category: 'Entertainment', thisMonth: 2900, lastMonth: 2400, prediction: 3200, trend: 20.8 },
  { category: 'Education', thisMonth: 3600, lastMonth: 4000, prediction: 3400, trend: -10.0 },
  { category: 'Shopping', thisMonth: 3800, lastMonth: 3000, prediction: 4400, trend: 26.7 }
];