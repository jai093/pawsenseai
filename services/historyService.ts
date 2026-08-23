import { historyAPI } from './api';
import { HistoryItem } from '../types';

export const historyService = {
  // Get user's history from database
  getHistory: async (): Promise<HistoryItem[]> => {
    try {
      const response = await historyAPI.getHistory();
      return response.data.data.map((item: any) => ({
        id: item._id,
        timestamp: new Date(item.createdAt).getTime(),
        breedData: item.breedData,
        imagePreview: item.image
      }));
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  // Add item to user's history
  addToHistory: async (breedData: any, image: string): Promise<void> => {
    try {
      await historyAPI.addToHistory({
        image,
        breedName: breedData.breedName,
        breedData
      });
    } catch (error) {
      console.error('Error adding to history:', error);
      throw error;
    }
  },

  // Delete specific history item
  deleteHistoryItem: async (id: string): Promise<void> => {
    try {
      await historyAPI.deleteHistoryItem(id);
    } catch (error) {
      console.error('Error deleting history item:', error);
      throw error;
    }
  },

  // Clear all history for user
  clearHistory: async (): Promise<void> => {
    try {
      await historyAPI.clearHistory();
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  }
};
