import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../common';
import {
  Agency,
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

  async getFacilities(
    size: number,
    page: number,
    mechanismId?: string,
  ): Promise<any[]> {
    let results: any;

    if (mechanismId) {
      results = this.model.find({ mechanism: mechanismId });
    } else {
      results = this.model.find();
    }

    return results
      .populate(Mechanism.name.toLowerCase())
      .populate(County.name.toLowerCase())
      .skip(size * (page - 1))
      .limit(size)
      .exec();
  }
  async getBySyncId(ids: string[]): Promise<Facility[]> {
    const result = await this.model.find({ _id: { $in: ids } }).lean();

    return result;
  }
}
