import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';
import { Agency, IAgencyRepository } from '../../domain/practices';
export declare class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository {
    constructor(model: Model<Agency>);
    getById(id: string): Promise<any>;
}
