import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-coral-400 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 shadow-sm animate-slide-up">
          <Sparkles className="w-4 h-4 text-coral-500" />
          <span className="text-sm font-medium text-gray-600">AI-Powered Companion for Dog Lovers</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-800 leading-tight tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Understand Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-cyan-500">
            Best Friend
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Instantly identify dog breeds, get personalized care guides, and chat with our AI veterinary assistant.
        </p>

        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-coral-500 to-coral-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          >
            Identify Breed
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Hero;
