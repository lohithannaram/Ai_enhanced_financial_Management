import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Alert } from '../types';

interface BudgetAlertsProps {
  alerts: Alert[];
}

const BudgetAlerts: React.FC<BudgetAlertsProps> = ({ alerts }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
    }
  };

  const getAlertColors = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getIconColors = (type: Alert['type']) => {
    switch (type) {
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Smart Alerts</h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {alerts.slice(0, 5).map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getAlertColors(alert.type)} relative`}
          >
            {!alert.read && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={getIconColors(alert.type)}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{alert.title}</h4>
                <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-75">{alert.category}</span>
                  <span className="opacity-75">{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-medium text-gray-900 mb-2">All caught up!</h3>
          <p className="text-sm text-gray-500">No alerts at the moment. Keep up the good work!</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View all alerts
        </button>
      </div>
    </div>
  );
};

export default BudgetAlerts;