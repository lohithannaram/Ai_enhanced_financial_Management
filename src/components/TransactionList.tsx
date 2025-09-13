import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload, Edit3, Brain, Check, X } from 'lucide-react';
import { Transaction } from '../types';
import { improveCategorization } from '../utils/aiCategorizer';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');

  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryCorrection = (transaction: Transaction, category: string) => {
    improveCategorization(transaction, category);
    setEditingTransaction(null);
    // In a real app, update the transaction in the database
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Scan Receipt</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-200">
        {filteredTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                  {transaction.isRecurring && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Recurring
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-2">
                    {editingTransaction === transaction.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">Select category...</option>
                          {categories.filter(c => c !== 'all').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleCategoryCorrection(transaction, newCategory)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingTransaction(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium">{transaction.category}</span>
                        <button
                          onClick={() => {
                            setEditingTransaction(transaction.id);
                            setNewCategory(transaction.category);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(transaction.aiConfidence)}`}>
                      {Math.round(transaction.aiConfidence * 100)}% confident
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">
                  -₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-gray-400 mb-3">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Load More */}
      {filteredTransactions.length > 0 && (
        <div className="p-6 border-t border-gray-200 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Load more transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;