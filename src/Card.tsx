import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // Optional icon for the card
  onClick?: () => void; // Optional click handler
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {icon && <div className="mb-4 text-4xl text-blue-500">{icon}</div>}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
};

export default Card;
