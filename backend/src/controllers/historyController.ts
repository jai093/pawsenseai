import { Request, Response } from 'express';
import mongoose from 'mongoose';
import History, { IHistory } from '../models/History';

export const addToHistory = async (req: any, res: Response) => {
  try {
    const { image, breedName, breedData } = req.body;
    
    const historyItem = await History.create({
      user: req.user.id,
      image,
      breedName,
      breedData,
    });

    res.status(201).json({
      success: true,
      data: historyItem,
    });
  } catch (error) {
    console.error('Error adding to history:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to history',
      error: error.message,
    });
  }
};

export const getHistory = async (req: any, res: Response) => {
  try {
    const history = await History.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching history',
      error: error.message,
    });
  }
};

export const deleteHistoryItem = async (req: any, res: Response) => {
  try {
    const historyItem = await History.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!historyItem) {
      return res.status(404).json({
        success: false,
        message: 'History item not found',
      });
    }

    await historyItem.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting history item',
      error: error.message,
    });
  }
};

export const clearHistory = async (req: any, res: Response) => {
  try {
    await History.deleteMany({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing history',
      error: error.message,
    });
  }
};
