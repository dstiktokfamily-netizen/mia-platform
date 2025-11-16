
import React from 'react';
import Card from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, className }) => {
  return (
    <Card className={`flex items-center justify-between ${className}`}>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
      </div>
      <div className="text-blue-500 dark:text-blue-400">
        {icon}
      </div>
    </Card>
  );
};

export default StatsCard;
