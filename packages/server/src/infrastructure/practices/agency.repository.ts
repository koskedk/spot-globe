import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency, IAgencyRepository } from '../../domain/practices';

export class AgencyRepository extends BaseRepository<Agency>
  implements IAgencyRepository {
  constructor(@InjectModel(Agency.name) model: Model<Agency>) {
    super(model);
  }

  async getById(id: string): Promise<any> {
    const result = await this.model
      .findById(id)
      .populate('mechanisms')
      .exec();

    if (result) {
      return result.toObject();
    }
    return null;
    return null;
  }

  async getBySyncId(ids: string[]): Promise<Agency[]> {
    const result = await this.model.find({ _id: { $in: ids } }).exec();
    return result;
  }
}
