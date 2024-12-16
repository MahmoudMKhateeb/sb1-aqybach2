import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50">
      <div className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h1>

        {isLogin ? <LoginForm /> : <SignUpForm />}

        <p className="mt-8 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}