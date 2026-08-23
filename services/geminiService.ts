import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BreedData } from "../types";

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please ensure you have a .env file with VITE_GEMINI_API_KEY set to your Gemini API key.");
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Error initializing Gemini client:", error);
    throw new Error("Failed to initialize the Gemini client. Please check your API key and try again.");
  }
};

// Remove the "data:image/..." prefix for the API
const cleanBase64 = (base64Str: string) => {
  return base64Str.split(',')[1] || base64Str;
};

export const identifyDogBreed = async (imageBase64: string): Promise<BreedData> => {
  const ai = getClient();
  
  const prompt = `Analyze this image. If it is a dog, identify the breed. 
  If it is not a dog, return a JSON with "breedName": "Unknown".
  
  If it is a dog, provide a detailed analysis including:
  1. Detailed physical specs (Height, Weight, Colors, Coat Type, Origin, etc.)
  2. Temperament and training details.
  3. A comprehensive 7-day diet plan for Puppy, Adult, and Senior stages.
  4. General diet advice for Pregnant/Nursing dogs.
  5. Common diseases and grooming needs.
  
  Ensure the diet plans are varied and specific to the breed's size and energy level.`;

  const dailyDietSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      monday: { type: Type.STRING },
      tuesday: { type: Type.STRING },
      wednesday: { type: Type.STRING },
      thursday: { type: Type.STRING },
      friday: { type: Type.STRING },
      saturday: { type: Type.STRING },
      sunday: { type: Type.STRING },
    },
    required: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: cleanBase64(imageBase64)
          }
        },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          breedName: { type: Type.STRING },
          shortDescription: { type: Type.STRING, description: "One sentence summary" },
          longDescription: { type: Type.STRING, description: "Detailed paragraph about the breed" },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
          
          // Stats
          height: { type: Type.STRING },
          weight: { type: Type.STRING },
          colors: { type: Type.STRING },
          coatType: { type: Type.STRING },
          origin: { type: Type.STRING },
          breedGroup: { type: Type.STRING },
          scientificName: { type: Type.STRING },

          // Traits
          temperament: { type: Type.STRING },
          intelligence: { type: Type.STRING },
          trainingDifficulty: { type: Type.STRING },
          exerciseNeeds: { type: Type.STRING },
          barkingLevel: { type: Type.STRING },
          sheddingLevel: { type: Type.STRING },

          // Health
          commonDiseases: { type: Type.ARRAY, items: { type: Type.STRING } },
          groomingRequirements: { type: Type.STRING },

          characteristics: { type: Type.ARRAY, items: { type: Type.STRING } },
          careTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          funFact: { type: Type.STRING },

          // Diet Plan
          dietPlan: {
            type: Type.OBJECT,
            properties: {
              puppy: dailyDietSchema,
              adult: dailyDietSchema,
              senior: dailyDietSchema,
              pregnantNursing: { type: Type.STRING, description: "General advice for pregnant or nursing dogs" }
            },
            required: ["puppy", "adult", "senior", "pregnantNursing"]
          }
        },
        required: [
          "breedName", "shortDescription", "longDescription", "characteristics", "careTips", 
          "height", "weight", "colors", "coatType", "origin", "breedGroup", 
          "temperament", "intelligence", "trainingDifficulty", "exerciseNeeds", "barkingLevel", 
          "commonDiseases", "dietPlan"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as BreedData;
};

export const chatWithBreedExpert = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  breedContext: BreedData | null
): Promise<string> => {
  const ai = getClient();

  const systemInstruction = breedContext 
    ? `You are a specialized veterinary expert and dog behaviorist assisting an owner of a ${breedContext.breedName}. 
       Use the following context about their specific dog: ${JSON.stringify(breedContext)}. 
       Your responses must be VERY SHORT, SIMPLE, and SWEET. Avoid long paragraphs. 
       Aim for 2-3 sentences max per response unless specifically asked for a detailed list. 
       Be friendly, encouraging, and easy to understand.
       Do not use markdown formatting like bold (**text**) in your responses, just use plain text.`
    : `You are a helpful dog care assistant. Provide general advice for dog owners. 
       Your responses must be VERY SHORT, SIMPLE, and SWEET. 
       Aim for 2-3 sentences max. 
       Do not use markdown formatting like bold (**text**) in your responses, just use plain text.`;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: systemInstruction,
    }
  });

  const result = await chat.sendMessage({ message });
  const text = result.text || "I'm sorry, I couldn't generate a response.";
  
  // Clean up any markdown bold syntax that might slip through
  return text.replace(/\*\*/g, '');
};
