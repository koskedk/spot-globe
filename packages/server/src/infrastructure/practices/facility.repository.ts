import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../common';
import {
  Facility,
  IFacilityRepository,
  Mechanism,
} from '../../domain/practices';
import { County } from '../../domain/locations';

export class FacilityRepository extends BaseRepository<Facility>
  implements IFacilityRepository {
  constructor(@InjectModel(Facility.name) model: Model<Facility>) {
    super(model);
  }

  async getById(id: string): Promise<any> {
    const result = await this.model
      .findById(id)
      .populate(Mechanism.name.toLowerCase())
      .populate(County.name.toLowerCase())
      .exec();
    return result;
  }

  async getFacilities(mechanismId?: string): Promise<any[]> {
    let results = [];
    if (mechanismId) {
      results = await this.model
        .find({ mechanism: mechanismId })
        .populate(Mechanism.name.toLowerCase())
        .populate(County.name.toLowerCase())
        .exec();
    } else {
      results = await this.model
        .find()
        .populate(Mechanism.name.toLowerCase())
        .populate(County.name.toLowerCase())
        .exec();
    }
    return results;
  }
}
