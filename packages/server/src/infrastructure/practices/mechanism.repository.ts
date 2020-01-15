import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Agency,
  IMechanismRepository,
  Mechanism,
} from '../../domain/practices';

export class MechanismRepository extends BaseRepository<Mechanism>
  implements IMechanismRepository {
  constructor(@InjectModel(Mechanism.name) model: Model<Mechanism>) {
    super(model);
  }

  async getById(id: string): Promise<any[]> {
    const result = await this.model
      .findById(id)
      .populate(Agency.name.toLowerCase())
      .populate('facilities')
      .exec();
    return result;
  }

  async getAll(criteria?: any): Promise<Mechanism[]> {
    if (criteria) {
      return this.model
        .find(criteria)
        .populate(Agency.name.toLowerCase())
        .exec();
    }
    return this.model
      .find()
      .populate(Agency.name.toLowerCase())
      .exec();
  }

  async getMechanisms(agencyId?: string): Promise<any[]> {
    let results = [];
    if (agencyId) {
      results = await this.model
        .find({ agency: agencyId })
        .populate(Agency.name.toLowerCase())
        .populate('facilities')
        .exec();
    } else {
      results = await this.model
        .find()
        .populate(Agency.name.toLowerCase())
        .populate('facilities')
        .exec();
    }
    return results;
  }
}
