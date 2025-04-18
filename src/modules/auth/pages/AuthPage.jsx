import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=96&height=96" 
            alt="Net Ai Logo" 
            className="mx-auto h-12 w-12"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Net Ai
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in with ZAPT
          </p>
          <p className="mt-1 text-sm text-gray-500">
            <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="underline">
              What is ZAPT?
            </a>
          </p>
        </div>
        <div className="mt-8">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'apple']}
            magicLink={true}
            view="magic_link"
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;