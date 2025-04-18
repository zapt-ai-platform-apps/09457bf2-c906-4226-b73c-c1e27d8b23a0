import React from 'react';
import { MdLightbulb, MdThumbUp, MdWarning, MdOutlineTipsAndUpdates } from 'react-icons/md';

const AiRecommendations = ({ recommendations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Analyzing your business plan...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <MdLightbulb className="text-yellow-500 text-4xl mb-4" />
          <p className="text-gray-600">Fill out your business plan and get AI-powered recommendations to improve it.</p>
          <p className="text-sm text-gray-500 mt-2">Our AI will analyze your plan and provide personalized feedback.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
      
      <div className="space-y-5">
        <div>
          <p className="text-gray-700">{recommendations.summary}</p>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdThumbUp className="text-green-500 mr-2" /> Strengths
          </h3>
          <ul className="mt-1 space-y-1 pl-6 list-disc text-gray-700">
            {recommendations.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdWarning className="text-amber-500 mr-2" /> Areas to Improve
          </h3>
          <ul className="mt-1 space-y-1 pl-6 list-disc text-gray-700">
            {recommendations.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-800 flex items-center">
            <MdOutlineTipsAndUpdates className="text-blue-500 mr-2" /> Suggestions
          </h3>
          <ul className="mt-1 space-y-1 pl-6 list-disc text-gray-700">
            {recommendations.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiRecommendations;