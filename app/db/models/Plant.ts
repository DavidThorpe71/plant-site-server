import mongoose, { Document, Schema } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

export enum Light {
  None = 'None',
  Shade = 'Shade',
  Indirect = 'Indirect',
  Direct = 'Direct'
}

export interface IPlant extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  permalink: string;
  latinName: string;
  location: string;
  image: string;
  wateringInstructions: string;
  light: Light;
}

const plantSchema = new Schema(
  {
    name: { type: String, required: true },
    permalink: { type: String, required: true },
    latinName: { type: String },
    location: { type: String },
    image: { type: String },
    wateringInstructions: { type: String },
    light: { type: String, enum: ['None', 'Shade', 'Indirect', 'Direct'] }
  },
  { timestamps: true }
);

plantSchema.plugin(mongodbErrorHandler);

export default mongoose.model<IPlant>('Plant', plantSchema);
