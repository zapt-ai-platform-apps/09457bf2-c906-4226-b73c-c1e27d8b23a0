import React from 'react';

const PlannerHeader = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  );
};

export default PlannerHeader;