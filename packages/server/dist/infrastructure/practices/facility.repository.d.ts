import { Model } from 'mongoose';
import { BaseRepository } from '../common';
import { Facility, IFacilityRepository } from '../../domain/practices';
export declare class FacilityRepository extends BaseRepository<Facility> implements IFacilityRepository {
    constructor(model: Model<Facility>);
    getById(id: string): Promise<any>;
    getFacilities(mechanismId?: string): Promise<any[]>;
}
