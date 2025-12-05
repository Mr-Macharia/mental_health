'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';

// Mock data for client's action items
const initialActionItems = [
  { id: 1, text: 'Practice 5-4-3-2-1 grounding technique when feeling overwhelmed.', completed: true },
  { id: 2, text: 'Journal about the specific work trigger discussed.', completed: false },
  { id: 3, text: 'Schedule a 15-minute walk during the lunch break.', completed: false },
];

export default function ClientTasksPage() {
  const [actionItems, setActionItems] = useState(initialActionItems);

  const handleToggleTask = (taskId) => {
    setActionItems(prevItems =>
      prevItems.map(item =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h2>
      <p className="text-gray-600 mb-8">Here are the actionable next steps suggested by your companion to support your journey.</p>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {actionItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => handleToggleTask(item.id)}
            className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${item.completed ? 'bg-green-50 border-green-200 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <CheckSquare className={`h-6 w-6 mr-4 mt-1 flex-shrink-0 ${item.completed ? 'text-green-500' : 'text-gray-400'}`} />
            <p className={`flex-grow ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}