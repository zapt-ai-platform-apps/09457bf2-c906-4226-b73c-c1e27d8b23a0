import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdBusiness, 
  MdShowChart, 
  MdLibraryBooks
} from 'react-icons/md';

const Sidebar = () => {
  const linkClassName = ({ isActive }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
    ${isActive 
      ? 'bg-blue-100 text-blue-700' 
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64" 
            alt="Net Ai Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold text-gray-900">Net Ai</h1>
        </div>
      </div>
      
      <nav className="mt-2 px-3 space-y-1">
        <NavLink to="/dashboard" className={linkClassName}>
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/business-planner" className={linkClassName}>
          <MdBusiness size={20} />
          <span>Business Planner</span>
        </NavLink>
        
        <NavLink to="/investment-planner" className={linkClassName}>
          <MdShowChart size={20} />
          <span>Investment Planner</span>
        </NavLink>
        
        <NavLink to="/resources" className={linkClassName}>
          <MdLibraryBooks size={20} />
          <span>Resources</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;