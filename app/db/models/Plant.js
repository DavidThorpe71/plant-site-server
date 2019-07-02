import mongoose, { Schema } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

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

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
