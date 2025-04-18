import React, { useState } from 'react';
import PlannerHeader from '../components/PlannerHeader';
import BusinessPlanForm from '../components/BusinessPlanForm';
import AiRecommendations from '../components/AiRecommendations';

const BusinessPlanner = () => {
  const [businessPlan, setBusinessPlan] = useState({
    name: '',
    industry: '',
    targetMarket: '',
    goals: [],
    competitiveAdvantage: '',
    financialProjections: {
      initialInvestment: '',
      projectedRevenue: '',
      projectedExpenses: '',
      breakEvenPoint: '',
    },
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  
  const handlePlanChange = (updatedPlan) => {
    setBusinessPlan(updatedPlan);
  };
  
  const generateRecommendations = async () => {
    // In a real app, this would make an API call to get AI recommendations
    setIsGeneratingRecommendations(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recommendations
      setRecommendations({
        summary: "Your business plan has strong fundamentals but could benefit from more detailed financial planning and clearer target market definition.",
        strengths: [
          "Clear industry focus",
          "Well-defined initial goals"
        ],
        weaknesses: [
          "Financial projections need more detail",
          "Target market could be more specific"
        ],
        suggestions: [
          "Break down your financial projections by quarter for the first year",
          "Define 2-3 specific customer personas within your target market",
          "Research 3-5 main competitors and identify specific advantages"
        ]
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <PlannerHeader 
        title="Business Planner" 
        description="Create a comprehensive business plan with AI-powered recommendations."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BusinessPlanForm 
            businessPlan={businessPlan} 
            onPlanChange={handlePlanChange}
            onGetRecommendations={generateRecommendations}
            isGeneratingRecommendations={isGeneratingRecommendations}
          />
        </div>
        
        <div>
          <AiRecommendations 
            recommendations={recommendations}
            isLoading={isGeneratingRecommendations}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanner;