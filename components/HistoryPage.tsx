import React from 'react';
import { HistoryItem } from '../types';
import { Calendar, ChevronRight, Clock, Search, Trash2 } from 'lucide-react';

interface HistoryPageProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearHistory: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onSelect, onDelete, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-fade-in text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">No History Yet</h2>
        <p className="text-gray-500 max-w-md">
          Once you identify a dog breed, it will appear here so you can revisit the care guides and insights anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-800 flex items-center">
              <Clock className="w-8 h-8 mr-3 text-coral-500" />
              Recent Discoveries
            </h2>
            <p className="text-gray-600 mt-2">Revisit your previously identified breeds and care plans.</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
              <img 
                src={item.imagePreview} 
                alt={item.breedData.breedName} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-coral-600 shadow-sm">
                {Math.round(item.breedData.confidence * 100)}% Match
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-heading font-bold text-gray-800 group-hover:text-coral-500 transition-colors">
                  {item.breedData.breedName}
                </h3>
              </div>
              
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                {item.breedData.shortDescription}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(item.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-coral-500 group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
