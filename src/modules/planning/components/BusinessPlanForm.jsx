import React, { useState } from 'react';

const BusinessPlanForm = ({ 
  businessPlan, 
  onPlanChange, 
  onGetRecommendations,
  isGeneratingRecommendations
}) => {
  const [newGoal, setNewGoal] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onPlanChange({
      ...businessPlan,
      [name]: value
    });
  };
  
  const handleFinancialInputChange = (e) => {
    const { name, value } = e.target;
    onPlanChange({
      ...businessPlan,
      financialProjections: {
        ...businessPlan.financialProjections,
        [name]: value
      }
    });
  };
  
  const addGoal = () => {
    if (newGoal.trim()) {
      onPlanChange({
        ...businessPlan,
        goals: [...businessPlan.goals, newGoal.trim()]
      });
      setNewGoal('');
    }
  };
  
  const removeGoal = (index) => {
    const updatedGoals = [...businessPlan.goals];
    updatedGoals.splice(index, 1);
    onPlanChange({
      ...businessPlan,
      goals: updatedGoals
    });
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Plan Details</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={businessPlan.name}
            onChange={handleInputChange}
            className="input-field mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={businessPlan.industry}
            onChange={handleInputChange}
            className="input-field mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">
            Target Market
          </label>
          <textarea
            id="targetMarket"
            name="targetMarket"
            rows="3"
            value={businessPlan.targetMarket}
            onChange={handleInputChange}
            className="input-field mt-1"
            placeholder="Describe your target customers"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Goals
          </label>
          <div className="flex mt-1">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="input-field flex-1"
              placeholder="Add a business goal"
            />
            <button
              type="button"
              onClick={addGoal}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add
            </button>
          </div>
          
          {businessPlan.goals.length > 0 && (
            <ul className="mt-2 space-y-2">
              {businessPlan.goals.map((goal, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span>{goal}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div>
          <label htmlFor="competitiveAdvantage" className="block text-sm font-medium text-gray-700">
            Competitive Advantage
          </label>
          <textarea
            id="competitiveAdvantage"
            name="competitiveAdvantage"
            rows="3"
            value={businessPlan.competitiveAdvantage}
            onChange={handleInputChange}
            className="input-field mt-1"
            placeholder="What makes your business unique?"
          ></textarea>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">Financial Projections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700">
                Initial Investment
              </label>
              <input
                type="text"
                id="initialInvestment"
                name="initialInvestment"
                value={businessPlan.financialProjections.initialInvestment}
                onChange={handleFinancialInputChange}
                className="input-field mt-1"
                placeholder="$"
              />
            </div>
            
            <div>
              <label htmlFor="projectedRevenue" className="block text-sm font-medium text-gray-700">
                Projected Annual Revenue
              </label>
              <input
                type="text"
                id="projectedRevenue"
                name="projectedRevenue"
                value={businessPlan.financialProjections.projectedRevenue}
                onChange={handleFinancialInputChange}
                className="input-field mt-1"
                placeholder="$"
              />
            </div>
            
            <div>
              <label htmlFor="projectedExpenses" className="block text-sm font-medium text-gray-700">
                Projected Annual Expenses
              </label>
              <input
                type="text"
                id="projectedExpenses"
                name="projectedExpenses"
                value={businessPlan.financialProjections.projectedExpenses}
                onChange={handleFinancialInputChange}
                className="input-field mt-1"
                placeholder="$"
              />
            </div>
            
            <div>
              <label htmlFor="breakEvenPoint" className="block text-sm font-medium text-gray-700">
                Break-even Point
              </label>
              <input
                type="text"
                id="breakEvenPoint"
                name="breakEvenPoint"
                value={businessPlan.financialProjections.breakEvenPoint}
                onChange={handleFinancialInputChange}
                className="input-field mt-1"
                placeholder="Months/Years"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="button"
            onClick={onGetRecommendations}
            disabled={isGeneratingRecommendations}
            className="btn-primary w-full"
          >
            {isGeneratingRecommendations ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Generating Recommendations...
              </div>
            ) : (
              'Get AI Recommendations'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanForm;