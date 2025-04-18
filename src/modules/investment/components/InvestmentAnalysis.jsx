import React from 'react';
import { MdInsights, MdTrackChanges, MdPieChart, MdTimeline, MdForward } from 'react-icons/md';

const InvestmentAnalysis = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Analysis</h2>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Analyzing your investment strategy...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Analysis</h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <MdInsights className="text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600">Complete your investment details to receive AI-powered analysis.</p>
          <p className="text-sm text-gray-500 mt-2">Our AI will provide personalized investment recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Analysis</h2>
      
      <div className="space-y-5">
        <div>
          <p className="text-gray-700">{analysis.overview}</p>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdTrackChanges className="text-blue-500 mr-2" /> Risk Profile
          </h3>
          <div className="mt-1 text-gray-700">
            <p className="font-medium capitalize">{analysis.riskProfile.level}</p>
            <p className="text-sm">{analysis.riskProfile.description}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdPieChart className="text-green-500 mr-2" /> Recommended Allocation
          </h3>
          <div className="mt-1 text-gray-700">
            {analysis.allocationRecommendations.map((item, index) => (
              <div key={index} className="flex items-center py-1">
                <div 
                  className="w-24 h-4 rounded-full overflow-hidden bg-gray-200 mr-3"
                >
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{item.category}: {item.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {analysis.allocationRecommendations.map((item, index) => (
              <div key={index} className="py-1">
                <span className="font-medium">{item.category}:</span> {item.description}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdTimeline className="text-purple-500 mr-2" /> Timeline Considerations
          </h3>
          <ul className="mt-1 space-y-1 pl-6 list-disc text-sm text-gray-700">
            {analysis.timelineConsiderations.map((consideration, index) => (
              <li key={index}>{consideration}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdForward className="text-amber-500 mr-2" /> Next Steps
          </h3>
          <ul className="mt-1 space-y-1 pl-6 list-disc text-sm text-gray-700">
            {analysis.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;