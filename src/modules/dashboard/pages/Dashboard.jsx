import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import DashboardSummary from '../components/DashboardSummary';
import ProgressChart from '../components/ProgressChart';
import RecentActivity from '../components/RecentActivity';
import NextSteps from '../components/NextSteps';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    recentActivity: [],
    nextSteps: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      // In a real app, this would be an API call
      // For this demo, we'll use mock data
      setTimeout(() => {
        setDashboardData({
          summary: {
            businessPlans: 2,
            investmentStrategies: 3,
            completionRate: 65
          },
          recentActivity: [
            { id: 1, type: 'business', name: 'Tech Startup Plan', date: '2023-08-15', progress: 70 },
            { id: 2, type: 'investment', name: 'Diversified Portfolio', date: '2023-08-10', progress: 85 },
            { id: 3, type: 'business', name: 'E-commerce Strategy', date: '2023-08-05', progress: 40 }
          ],
          nextSteps: [
            { id: 1, title: 'Complete market analysis', description: 'Analyze target market for your tech startup', link: '/business-planner' },
            { id: 2, title: 'Review investment portfolio', description: 'Check performance and adjust allocation', link: '/investment-planner' },
            { id: 3, title: 'Explore business resources', description: 'Check out guides for e-commerce businesses', link: '/resources' }
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email?.split('@')[0] || 'User'}</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/business-planner" className="btn-primary">
            New Business Plan
          </Link>
          <Link to="/investment-planner" className="btn-secondary">
            New Investment
          </Link>
        </div>
      </div>

      <DashboardSummary summary={dashboardData.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
          <ProgressChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
          <NextSteps steps={dashboardData.nextSteps} />
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <RecentActivity activities={dashboardData.recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;