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
import { FacilityBagDto } from '../../domain/practices/dtos/facility-bag.dto';
import { Packager } from '../../domain/common/packager';
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
      results = this.model.find()
          .sort({mechanism: -1, name: 1});
    }

    return results
      .populate(Mechanism.name.toLowerCase())
      .populate(County.name.toLowerCase())
      .skip(size * (page - 1))
      .limit(size)
      .exec();
  }
  async getBySyncId(ids: string[]): Promise<Facility[]> {
    const result = await this.model
      .find({ _id: { $in: ids } })
      .populate({
        path: Mechanism.name.toLowerCase(),
        select: '-facilities',
        populate: { path: Agency.name.toLowerCase(), select: '-mechanisms' },
      })
      .populate(County.name.toLowerCase())
      .lean();

    return result;
  }

  async getBySyncCodes(codes: number[]): Promise<Facility[]> {
    const result = await this.model
        .find({ code: { $in: codes } })
        .populate({
          path: Mechanism.name.toLowerCase(),
          select: '-facilities',
          populate: { path: Agency.name.toLowerCase(), select: '-mechanisms' },
        })
        .populate(County.name.toLowerCase())
        .lean();

    return result;
  }

    async getBySyncMechanismsId(ids: string[]): Promise<Facility[]> {
        const result = await this.model
            .find({ mechanism: { $in: ids } })
            .populate({
                path: Mechanism.name.toLowerCase(),
                select: '-facilities',
                populate: { path: Agency.name.toLowerCase(), select: '-mechanisms' },
            })
            .populate(County.name.toLowerCase())
            .lean();

        return result;
    }

  async getAllToSync(size: number, page: number): Promise<Facility[]> {
    const result = await this.model
      .find()
      .populate({
        path: Mechanism.name.toLowerCase(),
        select: '-facilities',
        populate: { path: Agency.name.toLowerCase(), select: '-mechanisms' },
      })
      .populate(County.name.toLowerCase())
      .skip(size * (page - 1))
      .limit(size)
      .lean();

    return result;
  }

  async getSyncCount(): Promise<number> {
    return await this.model.estimatedDocumentCount({});
  }
}
