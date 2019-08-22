import { BaseRepository } from '../common/base.repository';
import { County } from '../../domain/locations/county';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILocationRepository } from '../../domain/locations/location-repository.interface';

export class LocationRepository extends BaseRepository<County> implements ILocationRepository {

  constructor(@InjectModel(County.name)model: Model<County>) {
    super(model);
  }
}
