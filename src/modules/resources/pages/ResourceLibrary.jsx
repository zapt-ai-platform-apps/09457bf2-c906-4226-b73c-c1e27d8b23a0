import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import ResourceFilters from '../components/ResourceFilters';

const ResourceLibrary = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock resource data - in a real app, this would come from an API
  const resources = [
    {
      id: 1,
      title: "Business Plan Template",
      description: "A comprehensive template for creating detailed business plans.",
      category: "business",
      type: "template",
      url: "#template-business-plan"
    },
    {
      id: 2,
      title: "Investment Risk Assessment Guide",
      description: "Learn how to assess and manage investment risks effectively.",
      category: "investment",
      type: "guide",
      url: "#guide-risk-assessment"
    },
    {
      id: 3,
      title: "Market Analysis Worksheet",
      description: "A worksheet to help analyze target markets for your business.",
      category: "business",
      type: "worksheet",
      url: "#worksheet-market-analysis"
    },
    {
      id: 4,
      title: "Diversification Strategies",
      description: "A comprehensive guide to diversifying your investment portfolio.",
      category: "investment",
      type: "guide",
      url: "#guide-diversification"
    },
    {
      id: 5,
      title: "Cash Flow Projection Template",
      description: "Project your business cash flow with this detailed template.",
      category: "business",
      type: "template",
      url: "#template-cash-flow"
    },
    {
      id: 6,
      title: "Asset Allocation Calculator",
      description: "Calculate optimal asset allocation based on your risk profile.",
      category: "investment",
      type: "tool",
      url: "#tool-asset-allocation"
    },
    {
      id: 7,
      title: "Marketing Strategy Framework",
      description: "Framework for developing effective marketing strategies.",
      category: "business",
      type: "framework",
      url: "#framework-marketing"
    },
    {
      id: 8,
      title: "Investment Tax Guide",
      description: "Understanding tax implications of different investment types.",
      category: "investment",
      type: "guide",
      url: "#guide-investment-tax"
    }
  ];
  
  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.category === filter;
    const matchesSearch = searchQuery === '' || 
                          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
        <p className="mt-1 text-gray-600">
          Access guides, templates, and tools to help with your business and investment planning.
        </p>
      </div>
      
      <ResourceFilters 
        activeFilter={filter} 
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;