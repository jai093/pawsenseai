import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, PawPrint, Chrome, Smartphone, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      let response;
      
      if (isLogin) {
        // Login
        response = await authService.login(email, password);
      } else {
        // Register
        response = await authService.register({ name, email, password });
      }

      console.log('Auth response:', response); // Debug log

      if (response && (response.token || response.data?.token)) {
        const userData = response.data || response; // Handle both response formats
        
        const user: User = {
          _id: userData._id || userData.user?._id,
          name: userData.name || userData.user?.name || '',
          email: userData.email || userData.user?.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email || userData.user?.email || 'user'}`,
          token: userData.token || userData.data?.token
        };
        
        console.log('User object before onLogin:', user); // Debug log
        
        if (!user.token) {
          throw new Error('Authentication token not found in response');
        }
        
        onLogin(user);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      // Handle error (show error message to user)
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Authentication failed. Please try again.';
      alert(errorMessage);
      
      // Reset form on error for better UX
      if (!isLogin) {
        setName('');
      }
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Left Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white/40 backdrop-blur-md">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join the Pack'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to access your breed history and AI companion.' 
                : 'Create an account to start your journey with PawSense AI.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1 animate-slide-up">
                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-400 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-400 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-coral-500 hover:text-coral-600 font-medium">Forgot Password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/0 text-gray-500">Or continue with</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl bg-white/70 hover:bg-white transition-colors shadow-sm">
                <Chrome className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl bg-white/70 hover:bg-white transition-colors shadow-sm">
                <Smartphone className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-700 font-medium">Apple</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-coral-500 hover:text-coral-600 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        {/* Right Side: Decorative */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-coral-400 to-coral-600 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6 animate-float shadow-xl border border-white/30">
              <PawPrint className="w-16 h-16 text-white" />
            </div>
            
            <h3 className="text-3xl font-heading font-bold">
              Unlock the World of <br /> Dogs
            </h3>
            <p className="text-coral-100 max-w-sm mx-auto leading-relaxed">
              Identify over 300+ breeds, get tailored nutrition plans, and shop curated products for your furry friend.
            </p>

            <div className="pt-8 grid grid-cols-3 gap-4 text-center">
               <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                 <div className="font-bold text-xl">300+</div>
                 <div className="text-xs text-coral-100">Breeds</div>
               </div>
               <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                 <div className="font-bold text-xl">24/7</div>
                 <div className="text-xs text-coral-100">AI Chat</div>
               </div>
               <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                 <div className="font-bold text-xl">100%</div>
                 <div className="text-xs text-coral-100">Love</div>
               </div>
            </div>
          </div>

          {/* Abstract circles */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-coral-300/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

