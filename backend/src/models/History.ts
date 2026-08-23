import mongoose, { Document, Schema } from 'mongoose';

export interface IHistory extends Document {
  user: mongoose.Schema.Types.ObjectId;
  image: string;
  breedName: string;
  breedData: any;
  createdAt: Date;
}

const historySchema = new Schema<IHistory>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  image: {
    type: String,
    required: [true, 'Image data is required'],
  },
  breedName: {
    type: String,
    required: [true, 'Breed name is required'],
  },
  breedData: {
    type: Schema.Types.Mixed,
    required: [true, 'Breed data is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model<IHistory>('History', historySchema);

export default History;
