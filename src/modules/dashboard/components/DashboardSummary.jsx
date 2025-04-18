import React from 'react';
import { MdBusiness, MdShowChart, MdCheckCircle } from 'react-icons/md';

const DashboardSummary = ({ summary }) => {
  const { businessPlans, investmentStrategies, completionRate } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <MdBusiness className="text-blue-600 text-2xl" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{businessPlans}</p>
          <p className="text-sm text-gray-600">Business Plans</p>
        </div>
      </div>
      
      <div className="card flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <MdShowChart className="text-green-600 text-2xl" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{investmentStrategies}</p>
          <p className="text-sm text-gray-600">Investment Strategies</p>
        </div>
      </div>
      
      <div className="card flex items-center space-x-4">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <MdCheckCircle className="text-purple-600 text-2xl" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{completionRate}%</p>
          <p className="text-sm text-gray-600">Completion Rate</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;