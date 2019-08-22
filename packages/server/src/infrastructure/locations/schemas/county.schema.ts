import * as mongoose from 'mongoose';

export const countySchema = new mongoose.Schema({
  _id: String,
  code: Number,
  name: String,
});
