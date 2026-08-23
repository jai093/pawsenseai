import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import BreedIdentifier from './components/BreedIdentifier';
import ChatAssistant from './components/ChatAssistant';
import ProductStore from './components/ProductStore';
import AuthPage from './components/AuthPage';
import HistoryPage from './components/HistoryPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import { AppView, BreedData, User, HistoryItem } from './types';
import { authService } from './services/authService';
import { historyService } from './services/historyService';
import { setAuthToken } from './services/api';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [analyzedBreed, setAnalyzedBreed] = useState<BreedData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pendingView, setPendingView] = useState<AppView | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [returnView, setReturnView] = useState<AppView>(AppView.IDENTIFY);

  // Load user from auth service on mount and set initial theme
  useEffect(() => {
    // Set initial theme to light
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Set auth token for API calls
      setAuthToken(currentUser.token);
      loadUserHistory();
    }
  }, []);

  // Load user history from database
  const loadUserHistory = async () => {
    try {
      const userHistory = await historyService.getHistory();
      setHistory(userHistory);
      console.log('History loaded successfully:', userHistory);
    } catch (error) {
      console.error('Failed to load user history:', error);
      // Don't set history to empty array, keep existing history
      // This prevents error from breaking the app
    }
  };

  const handleLogin = (loggedInUser: User) => {
    console.log('handleLogin called with:', loggedInUser);
    
    if (!loggedInUser || !loggedInUser.token) {
      console.error('Invalid user data received in handleLogin');
      return;
    }
    
    setUser(loggedInUser);
    // Set auth token for API calls
    setAuthToken(loggedInUser.token);
    
    // Navigate to pending view or default to IDENTIFY
    const targetView = pendingView || AppView.IDENTIFY;
    console.log('Pending view before navigation:', pendingView);
    console.log('Navigating to:', targetView);
    
    setPendingView(null);
    setCurrentView(targetView);
    
    // Load user history after successful login
    loadUserHistory();
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setAnalyzedBreed(null);
    setCurrentView(AppView.HOME);
    
    // Clear axios auth header
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleRestrictedNavigation = (targetView: AppView) => {
    console.log('handleRestrictedNavigation:', { targetView, user: !!user });
    
    if (user) {
      console.log('User is logged in, navigating to:', targetView);
      setCurrentView(targetView);
    } else {
      console.log('User not logged in, setting pending view to:', targetView);
      setPendingView(targetView);
      // Always set to AUTH view to ensure consistent behavior
      setCurrentView(AppView.AUTH);
    }
  };

  const handleBreedIdentified = async (breedData: BreedData, image: string) => {
    setAnalyzedBreed(breedData);
    setReturnView(AppView.IDENTIFY);
    setCurrentView(AppView.CHAT);
    
    // Add to database history
    try {
      await historyService.addToHistory(breedData, image);
      // Reload history to get the updated list
      await loadUserHistory();
    } catch (error) {
      console.error('Failed to save to history:', error);
    }
  };
  
  const handleViewHistoryItem = (item: HistoryItem) => {
    setAnalyzedBreed(item.breedData);
    setReturnView(AppView.HISTORY);
    setCurrentView(AppView.CHAT);
  };
  
  const handleDeleteHistoryItem = async (id: string) => {
    try {
      await historyService.deleteHistoryItem(id);
      // Reload history to get the updated list
      await loadUserHistory();
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  };
  
  const handleClearHistory = async () => {
    try {
      await historyService.clearHistory();
      // Reload history to get the updated list
      await loadUserHistory();
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  // Wrap components that require authentication with proper typing
  const renderProtectedComponent = <T extends object>(
    Component: React.ComponentType<T>,
    props: T
  ) => {
    if (!user) {
      setCurrentView(AppView.AUTH);
      setPendingView(currentView);
      return null;
    }
    return <Component {...props} />;
  };

  const renderView = () => {
    console.log('Rendering view:', currentView, { user: !!user, pendingView });
    
    // If user is not authenticated and trying to access protected routes
    if (!user && currentView !== AppView.HOME && currentView !== AppView.AUTH) {
      console.log('Redirecting to AUTH, currentView was:', currentView);
      return <AuthPage onLogin={handleLogin} />;
    }

    switch (currentView) {
      case AppView.HOME:
        return <Hero onGetStarted={() => handleRestrictedNavigation(AppView.IDENTIFY)} />;
      case AppView.AUTH:
        return <AuthPage onLogin={handleLogin} />;
      case AppView.IDENTIFY:
        return <BreedIdentifier onSuccess={handleBreedIdentified} />;
      case AppView.CHAT:
        return (
          <ChatAssistant 
            breedData={analyzedBreed} 
            onBack={() => setCurrentView(returnView)} 
          />
        );
      case AppView.STORE:
        return <ProductStore />;
      case AppView.CART:
        return <CartPage setView={setCurrentView} />;
      case AppView.CHECKOUT:
        return <CheckoutPage setView={setCurrentView} />;
      case AppView.HISTORY:
        return (
          <HistoryPage 
            history={history} 
            onSelect={handleViewHistoryItem}
            onDelete={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        );
      default:
        return <Hero onGetStarted={() => handleRestrictedNavigation(AppView.IDENTIFY)} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen text-gray-800 font-sans selection:bg-coral-200 selection:text-coral-900">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        user={user}
        onLogout={handleLogout}
        onNavigateRestricted={handleRestrictedNavigation}
      />
      <main className="w-full">
        {renderView()}
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm mt-auto">
        <p>© 2024 PawSense AI. Crafted for dogs & their humans.</p>
      </footer>
      </div>
    </CartProvider>
  );
};

export default App;
