import * as mongoose from 'mongoose';
import { Agency, Facility } from '../../../domain/practices';

export const mechanismSchema = new mongoose.Schema({
  _id: String,
  name: String,
  implementationName: String,
  display: String,
  agency: { type: String, ref: Agency.name },
  facilities: [{ type: String, ref: Facility.name }],
});
