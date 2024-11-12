// components/DashboardCard.tsx
import React from 'react';

type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  body: string;
};

const DashboardCard = ({ title, icon, body }: DashboardCardProps) => {
  return (
    <div className="shadow-lg rounded-lg p-6 flex flex-col items-center lg:col-span-3 bg-white dark:bg-gray-700">
      <div className="text-xl font-medium text-gray-900 dark:text-gray-100">
        <span className="flex gap-2">{icon} {title}</span>
      </div>
      <div className="text-3xl font-bold text-blue-500">{body}</div>
    </div>
  );
};

export default DashboardCard;
