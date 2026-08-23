import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Sparkles, AlertCircle, Info } from 'lucide-react';
import { identifyDogBreed } from '../services/geminiService';
import { BreedData } from '../types';

interface BreedIdentifierProps {
  onSuccess: (data: BreedData, image: string) => void;
}

const BreedIdentifier: React.FC<BreedIdentifierProps> = ({ onSuccess }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const result = await identifyDogBreed(image);
      if (result.breedName === 'Unknown') {
        setError("We couldn't detect a dog in this image. Please try again.");
      } else {
        onSuccess(result, image);
      }
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try a different image or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="flex space-x-2 mb-4">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="w-4 h-4 bg-coral-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-xl font-heading font-semibold text-gray-700 animate-pulse">Analyzing paw prints...</p>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-gray-800 mb-3">Who's That Good Boy?</h2>
          <p className="text-gray-600">Upload a photo to identify the breed and unlock care insights.</p>
        </div>

        {!image ? (
          <div
            className="border-3 border-dashed border-gray-300 hover:border-coral-400 hover:bg-coral-50/50 transition-all duration-300 rounded-2xl p-12 text-center cursor-pointer group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10" />
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center animate-slide-up">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-8 group">
              <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
              <button
                onClick={clearImage}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl mb-6 border border-red-100 w-full max-w-md">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              className="w-full max-w-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Identify Breed</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedIdentifier;
