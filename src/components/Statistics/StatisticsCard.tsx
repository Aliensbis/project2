import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function StatisticsCard({ title, value, icon, subtitle }: StatisticsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <span className="text-sm text-gray-500">{subtitle}</span>
        )}
      </div>
    </div>
  );
}