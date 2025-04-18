import React, { useState } from 'react';
import PlannerHeader from '../../planning/components/PlannerHeader';
import InvestmentForm from '../components/InvestmentForm';
import InvestmentAnalysis from '../components/InvestmentAnalysis';

const InvestmentPlanner = () => {
  const [investment, setInvestment] = useState({
    name: '',
    type: 'stocks',
    amount: '',
    timeHorizon: '',
    riskTolerance: 'moderate',
    currentInvestments: [],
    goals: '',
  });

  const [analysis, setAnalysis] = useState(null);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  
  const handleInvestmentChange = (updatedInvestment) => {
    setInvestment(updatedInvestment);
  };
  
  const generateAnalysis = async () => {
    // In a real app, this would make an API call to get AI-powered investment analysis
    setIsGeneratingAnalysis(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis
      setAnalysis({
        overview: "Based on your investment parameters, here's an analysis to help guide your investment strategy.",
        riskProfile: {
          level: investment.riskTolerance,
          description: "Your moderate risk tolerance suggests a balanced approach between growth and security."
        },
        allocationRecommendations: [
          { category: "Stocks", percentage: 50, description: "Focus on blue-chip and dividend stocks" },
          { category: "Bonds", percentage: 30, description: "Government and high-grade corporate bonds" },
          { category: "Alternative Investments", percentage: 15, description: "REITs and commodities" },
          { category: "Cash", percentage: 5, description: "Emergency fund and short-term needs" }
        ],
        timelineConsiderations: [
          "Your selected time horizon allows for some market fluctuations",
          "Consider increasing stock allocation in early years",
          "Gradually shift to more conservative investments as you approach your goal"
        ],
        nextSteps: [
          "Establish an emergency fund before investing heavily",
          "Consider tax-advantaged accounts when applicable",
          "Diversify within each asset category",
          "Rebalance portfolio regularly, at least annually"
        ]
      });
    } catch (error) {
      console.error('Error generating investment analysis:', error);
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <PlannerHeader 
        title="Investment Planner" 
        description="Create an investment strategy with AI-powered analysis and recommendations."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InvestmentForm 
            investment={investment}
            onInvestmentChange={handleInvestmentChange}
            onGetAnalysis={generateAnalysis}
            isGeneratingAnalysis={isGeneratingAnalysis}
          />
        </div>
        
        <div>
          <InvestmentAnalysis 
            analysis={analysis}
            isLoading={isGeneratingAnalysis}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlanner;