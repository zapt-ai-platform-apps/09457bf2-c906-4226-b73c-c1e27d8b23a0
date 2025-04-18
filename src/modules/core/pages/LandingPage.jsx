import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=64&height=64"
              alt="Net Ai Logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold text-gray-900">Net Ai</h1>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">AI-Powered</span>
              <span className="block text-blue-600">Business & Investment Planning</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Make smart and strategic steps toward success with our AI-powered planning tools.
              Whether you're investing in multiple niches or running a business, Net Ai helps you
              every step of the way.
            </p>
            <div className="mt-10">
              {user ? (
                <Link
                  to="/dashboard"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                How Net Ai Helps You Succeed
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <MdBusiness className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Business Planning</h3>
                  <p className="mt-2 text-gray-600">
                    Develop comprehensive business plans with AI-powered insights and recommendations.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <MdShowChart className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Investment Strategies</h3>
                  <p className="mt-2 text-gray-600">
                    Make data-driven investment decisions across multiple niches and markets.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <MdLibraryBooks className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Resource Library</h3>
                  <p className="mt-2 text-gray-600">
                    Access a wealth of resources, templates, and guides to support your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;