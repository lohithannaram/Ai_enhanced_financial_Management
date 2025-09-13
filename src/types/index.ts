export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  aiConfidence: number;
  isRecurring: boolean;
  subcategory?: string;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  estimatedCompletion: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  category: 'spending' | 'saving' | 'goal' | 'streak';
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  category: string;
  timestamp: string;
  read: boolean;
}

export interface PredictionData {
  month: string;
  predicted: number;
  actual: number;
  confidence: number;
}

export interface SpendingTrend {
  category: string;
  thisMonth: number;
  lastMonth: number;
  prediction: number;
  trend: number;
}