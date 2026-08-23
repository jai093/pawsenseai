export interface DailyDiet {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface DietPlan {
  puppy: DailyDiet;
  adult: DailyDiet;
  senior: DailyDiet;
  pregnantNursing: string;
}

export interface BreedData {
  breedName: string;
  shortDescription: string;
  longDescription: string;
  confidence: number;
  
  // Physical Stats
  height: string;
  weight: string;
  colors: string;
  coatType: string;
  origin: string;
  breedGroup: string;
  scientificName: string;
  
  // Traits & Behavior
  temperament: string;
  intelligence: string;
  trainingDifficulty: string;
  exerciseNeeds: string;
  barkingLevel: string;
  sheddingLevel: string;
  
  // Health & Care
  commonDiseases: string[];
  groomingRequirements: string;
  
  // Legacy/General
  characteristics: string[];
  careTips: string[];
  funFact: string;

  // Detailed Diet
  dietPlan: DietPlan;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Food' | 'Toys' | 'Accessories' | 'Grooming' | 'Beds' | 'Treats' | 'Bowls' | 'Crates';
  image: string;
  rating: number;
  stock: number;
  brand: string;
  weight: string;
  ingredients: string;
  features: string[];
  inStock: boolean;
}

export enum AppView {
  HOME = 'HOME',
  AUTH = 'AUTH',
  IDENTIFY = 'IDENTIFY',
  CHAT = 'CHAT',
  STORE = 'STORE',
  HISTORY = 'HISTORY',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
}

export interface IdentificationState {
  isLoading: boolean;
  error: string | null;
  imagePreview: string | null;
  result: BreedData | null;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  breedData: BreedData;
  imagePreview: string;
}
