import React from 'react';
import { 
  MdBusiness, 
  MdShowChart, 
  MdArticle, 
  MdInsertDriveFile, 
  MdCalculate, 
  MdOutlineCategory 
} from 'react-icons/md';

const ResourceCard = ({ resource }) => {
  const getCategoryIcon = () => {
    switch (resource.category) {
      case 'business':
        return <MdBusiness className="text-blue-600 text-xl" />;
      case 'investment':
        return <MdShowChart className="text-green-600 text-xl" />;
      default:
        return <MdOutlineCategory className="text-gray-600 text-xl" />;
    }
  };
  
  const getTypeIcon = () => {
    switch (resource.type) {
      case 'guide':
        return <MdArticle className="text-purple-600 text-xl" />;
      case 'template':
      case 'worksheet':
        return <MdInsertDriveFile className="text-amber-600 text-xl" />;
      case 'tool':
      case 'calculator':
        return <MdCalculate className="text-red-600 text-xl" />;
      default:
        return <MdArticle className="text-gray-600 text-xl" />;
    }
  };
  
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-1">
          {getCategoryIcon()}
          <span className="text-xs font-medium text-gray-600 capitalize">{resource.category}</span>
        </div>
        <div className="flex items-center space-x-1">
          {getTypeIcon()}
          <span className="text-xs font-medium text-gray-600 capitalize">{resource.type}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
      
      <a 
        href={resource.url} 
        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
      >
        Access Resource
        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </a>
    </div>
  );
};

export default ResourceCard;