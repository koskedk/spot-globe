import { BaseRepository } from '../common/base.repository';
import { County } from '../../domain/locations/county';
import { Model } from 'mongoose';
import { ILocationRepository } from '../../domain/locations/location-repository.interface';
export declare class LocationRepository extends BaseRepository<County> implements ILocationRepository {
    constructor(model: Model<County>);
}
