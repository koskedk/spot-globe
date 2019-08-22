import * as mongoose from 'mongoose';
import { County } from '../../../domain/locations';
import { Mechanism } from '../../../domain/practices';

export const facilitySchema = new mongoose.Schema({
  _id: String,
  code: Number,
  name: String,
  county: { type: String, ref: County.name },
  mechanism: { type: String, ref: Mechanism.name },
});
