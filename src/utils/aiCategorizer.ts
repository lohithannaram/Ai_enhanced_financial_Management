import { Transaction } from '../types';

const categoryKeywords = {
  'Food & Dining': ['restaurant', 'cafe', 'pizza', 'burger', 'coffee', 'lunch', 'dinner', 'breakfast', 'food', 'meal', 'snack', 'groceries', 'supermarket'],
  'Transportation': ['uber', 'lyft', 'bus', 'metro', 'taxi', 'gas', 'fuel', 'parking', 'train', 'flight', 'airline'],
  'Education': ['tuition', 'books', 'textbook', 'course', 'lab', 'library', 'school', 'university', 'college', 'supplies', 'notebook'],
  'Entertainment': ['movie', 'cinema', 'concert', 'game', 'spotify', 'netflix', 'music', 'theater', 'party', 'club', 'bar'],
  'Shopping': ['amazon', 'target', 'walmart', 'clothing', 'shoes', 'electronics', 'phone', 'laptop', 'shopping'],
  'Health & Fitness': ['gym', 'pharmacy', 'doctor', 'medical', 'hospital', 'medicine', 'fitness', 'wellness'],
  'Utilities': ['electricity', 'water', 'internet', 'phone bill', 'rent', 'utilities', 'wifi'],
  'Personal Care': ['haircut', 'salon', 'beauty', 'cosmetics', 'personal', 'hygiene'],
};

export function categorizeTransaction(description: string, amount: number): { category: string; confidence: number } {
  const lowerDesc = description.toLowerCase();
  let bestMatch = { category: 'Other', confidence: 0.3 };

  // Check each category for keyword matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const matchCount = keywords.filter(keyword => lowerDesc.includes(keyword)).length;
    if (matchCount > 0) {
      const confidence = Math.min(0.95, 0.6 + (matchCount * 0.15));
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence };
      }
    }
  }

  // Amount-based heuristics
  if (amount > 1000 && lowerDesc.includes('rent')) {
    return { category: 'Utilities', confidence: 0.9 };
  }
  
  if (amount < 15 && (lowerDesc.includes('coffee') || lowerDesc.includes('snack'))) {
    return { category: 'Food & Dining', confidence: 0.85 };
  }

  return bestMatch;
}

export function improveCategorization(transaction: Transaction, userCorrection: string): void {
  // In a real app, this would send feedback to the ML model
  console.log(`Learning: "${transaction.description}" should be categorized as "${userCorrection}" instead of "${transaction.category}"`);
}