import React from 'react';
import { motion } from 'framer-motion';
import { Factory, UserCog, Users } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'production' | 'admin' | 'agent') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Benvenuto in Bibal Foods
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Seleziona l'area di accesso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('production')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Factory className="h-16 w-16 text-blue-600 mb-6" />
            <span className="text-xl font-medium text-gray-900 mb-2">Produzione</span>
            <span className="text-sm text-gray-500">Area Operativa</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('admin')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <UserCog className="h-16 w-16 text-indigo-600 mb-6" />
            <span className="text-xl font-medium text-gray-900 mb-2">Amministrazione</span>
            <span className="text-sm text-gray-500">Area Gestionale</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('agent')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Users className="h-16 w-16 text-purple-600 mb-6" />
            <span className="text-xl font-medium text-gray-900 mb-2">Agenti</span>
            <span className="text-sm text-gray-500">Area Commerciale</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}