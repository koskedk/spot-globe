import * as mongoose from 'mongoose';
import { Mechanism } from '../../../domain/practices';

export const agencySchema = new mongoose.Schema({
  _id: String,
  name: String,
  display: String,
  mechanisms: [{ type: String, ref: Mechanism.name }],
});
