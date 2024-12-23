import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const letters = ['b', 'i', 'b', 'a', 'l'];
  
  return (
    <motion.div 
      className={`flex items-center ${className}`}
      initial="hidden"
      animate="visible"
    >
      <div className={`flex items-baseline ${sizes[size]}`}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className={`
              font-bold 
              ${letter === 'b' && i === 0 ? 'text-yellow-600' : 'text-gray-800'}
              ${i === 0 ? 'text-[150%]' : 'text-[120%]'}
            `}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          variants={letterVariants}
          custom={5}
          className="ml-2 text-[100%] font-medium text-gray-600"
        >
          foods
        </motion.span>
      </div>
    </motion.div>
  );
}