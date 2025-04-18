import React from 'react';
import { Link } from 'react-router-dom';

const NextSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No next steps available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <h3 className="font-medium text-gray-900">{step.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          <Link to={step.link} className="text-blue-600 text-sm inline-block mt-2">
            Get Started →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NextSteps;