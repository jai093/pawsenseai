import React from 'react';
import { PawPrint, ShoppingBag, LogOut, User as UserIcon, Clock } from 'lucide-react';
import { AppView, User } from '../types';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
  onNavigateRestricted: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, user, onLogout, onNavigateRestricted }) => {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const navItems = [
    { id: AppView.HOME, label: 'Home', restricted: false },
    { id: AppView.IDENTIFY, label: 'Identify', restricted: true },
    { id: AppView.HISTORY, label: 'History', restricted: true },
    { id: AppView.STORE, label: 'Shop', restricted: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.restricted && !user) {
      onNavigateRestricted(item.id);
    } else {
      setView(item.id);
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-4 w-full">
      <div className="max-w-7xl mx-auto glass-card rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => setView(AppView.HOME)}
        >
          <div className="w-10 h-10 bg-coral-500 rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <PawPrint className="w-6 h-6" />
          </div>
          <span className="text-xl font-heading font-bold text-gray-800 tracking-tight hidden sm:inline">PawSense<span className="text-coral-500">AI</span></span>
        </div>

        <nav className="hidden md:flex items-center space-x-1 bg-gray-100/50 p-1 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
            onClick={() => setView(AppView.CART)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
               <div className="hidden lg:flex flex-col items-end mr-1">
                 <span className="text-xs font-bold text-gray-700 leading-none">{user.name}</span>
                 <span className="text-[10px] text-gray-400 leading-none mt-1">Free Plan</span>
               </div>
               <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                 {user.avatar ? (
                   <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                 ) : (
                   <UserIcon className="w-full h-full p-1.5 text-gray-400" />
                 )}
               </div>
               <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Sign Out"
               >
                 <LogOut className="w-5 h-5" />
               </button>
            </div>
          ) : (
            <button 
              onClick={() => setView(AppView.AUTH)}
              className="hidden sm:flex bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-coral-500 transition-colors shadow-md"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

