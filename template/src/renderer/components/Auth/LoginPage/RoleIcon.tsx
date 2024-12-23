import React from 'react';
import { motion } from 'framer-motion';
import { Factory, UserCog } from 'lucide-react';

interface RoleIconProps {
  role: 'production' | 'admin';
  className?: string;
}

export default function RoleIcon({ role, className = '' }: RoleIconProps) {
  const Icon = role === 'production' ? Factory : UserCog;
  const color = role === 'production' ? 'text-blue-600' : 'text-indigo-600';

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
    >
      <Icon className={`h-16 w-16 ${color}`} />
    </motion.div>
  );
}