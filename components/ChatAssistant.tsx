import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, ChevronLeft, Activity, Info, Utensils, HeartPulse, Scale, Shield, Brain, Syringe, Scissors } from 'lucide-react';
import { BreedData, ChatMessage, DailyDiet } from '../types';
import { chatWithBreedExpert } from '../services/geminiService';

interface ChatAssistantProps {
  breedData: BreedData;
  onBack: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ breedData, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: `Hello! I see you have a lovely ${breedData.breedName}. I've prepared a detailed diet plan and health overview. How can I assist you further?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'diet'>('info');
  const [dietStage, setDietStage] = useState<'puppy' | 'adult' | 'senior'>('adult');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithBreedExpert(history, userMsg.text, breedData);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to the server. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    "Specific allergies?",
    "Vaccination schedule?",
    "Training tips?",
    "Supplement advice"
  ];

  const renderDietPlan = (plan: DailyDiet) => (
    <div className="space-y-3">
      {Object.entries(plan).map(([day, meal]) => (
        <div key={day} className="bg-white/60 p-3 rounded-xl border border-white">
          <span className="block text-xs font-bold uppercase text-coral-500 mb-1">{day}</span>
          <p className="text-sm text-gray-700">{meal}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-[calc(100vh-80px)] max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6 animate-fade-in">
      
      {/* Left Panel: Rich Breed Info */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4 overflow-y-auto pb-4 hide-scrollbar">
        <button 
          onClick={onBack}
          className="self-start flex items-center text-gray-600 hover:text-coral-500 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Upload
        </button>

        <div className="glass-card rounded-3xl p-6 shadow-xl border-t-4 border-coral-400">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">{breedData.breedName}</h2>
            <div className="bg-coral-100 text-coral-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              {Math.round(breedData.confidence * 100)}% Match
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">{breedData.scientificName} • {breedData.origin}</p>
          
          <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">
            {breedData.longDescription}
          </p>

          {/* Info/Diet Tabs */}
          <div className="flex bg-gray-100/80 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-coral-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Breed Stats
            </button>
            <button 
              onClick={() => setActiveTab('diet')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'diet' ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Diet Plan
            </button>
          </div>

          {activeTab === 'info' ? (
            <div className="space-y-6 animate-fade-in">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/50 p-3 rounded-xl">
                  <div className="flex items-center text-xs text-gray-500 mb-1"><Scale className="w-3 h-3 mr-1" /> Height & Weight</div>
                  <div className="text-sm font-semibold text-gray-800">{breedData.height}</div>
                  <div className="text-sm font-semibold text-gray-800">{breedData.weight}</div>
                </div>
                <div className="bg-white/50 p-3 rounded-xl">
                  <div className="flex items-center text-xs text-gray-500 mb-1"><Shield className="w-3 h-3 mr-1" /> Coat & Color</div>
                  <div className="text-sm font-semibold text-gray-800">{breedData.coatType}</div>
                  <div className="text-xs text-gray-600 truncate">{breedData.colors}</div>
                </div>
              </div>

              {/* Traits */}
              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="flex items-center text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                  <Brain className="w-4 h-4 mr-2 text-purple-500" /> Temperament & Traits
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Intelligence</span>
                      <span className="font-medium">{breedData.intelligence}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 w-3/4"></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700"><span className="font-semibold">Temperament:</span> {breedData.temperament}</div>
                  <div className="text-sm text-gray-700"><span className="font-semibold">Training:</span> {breedData.trainingDifficulty}</div>
                  <div className="text-sm text-gray-700"><span className="font-semibold">Barking:</span> {breedData.barkingLevel}</div>
                </div>
              </div>

               {/* Health & Grooming */}
               <div className="bg-white/50 rounded-xl p-4">
                <h4 className="flex items-center text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4 mr-2 text-red-500" /> Health & Care
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="flex items-center text-xs font-bold text-gray-600 mb-1"><Syringe className="w-3 h-3 mr-1"/> Common Diseases</span>
                    <div className="flex flex-wrap gap-1">
                      {breedData.commonDiseases.map((d, i) => (
                        <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="flex items-center text-xs font-bold text-gray-600 mb-1"><Scissors className="w-3 h-3 mr-1"/> Grooming</span>
                    <p className="text-sm text-gray-700">{breedData.groomingRequirements}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="flex items-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                  <Utensils className="w-4 h-4 mr-2 text-cyan-500" /> Weekly Menu
                </h4>
                <div className="flex bg-white rounded-lg p-0.5 border border-gray-200">
                  {(['puppy', 'adult', 'senior'] as const).map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setDietStage(stage)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        dietStage === stage ? 'bg-cyan-100 text-cyan-700' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-cyan-50/50 rounded-2xl p-4 border border-cyan-100 max-h-[500px] overflow-y-auto custom-scrollbar">
                {renderDietPlan(breedData.dietPlan[dietStage])}
              </div>

              <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                <h5 className="text-xs font-bold text-yellow-700 mb-1 flex items-center">
                  <Info className="w-3 h-3 mr-1"/> Pregnant / Nursing
                </h5>
                <p className="text-xs text-gray-700 leading-relaxed">{breedData.dietPlan.pregnantNursing}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Chat */}
      <div className="w-full lg:w-7/12 flex flex-col glass-card rounded-3xl shadow-xl overflow-hidden relative h-full">
        <div className="bg-white/80 backdrop-blur-md p-4 border-b border-gray-100 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-gray-800">PawSense Expert</h3>
            <p className="text-xs text-green-500 font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm md:text-base leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-none px-5 py-4 shadow-sm border border-gray-100 flex space-x-1.5">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions & Input */}
        <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
          {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-3 mb-2 hide-scrollbar">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-coral-50 hover:text-coral-600 text-gray-600 text-xs font-medium rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about diet, training, or health..."
              className="flex-1 px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-coral-300 focus:ring-2 focus:ring-coral-200 rounded-xl outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-coral-500 text-white p-3 rounded-xl hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-coral-500/30"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;