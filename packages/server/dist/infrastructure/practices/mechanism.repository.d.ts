import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';
import { IMechanismRepository, Mechanism } from '../../domain/practices';
export declare class MechanismRepository extends BaseRepository<Mechanism> implements IMechanismRepository {
    constructor(model: Model<Mechanism>);
    getById(id: string): Promise<any[]>;
    getMechanisms(agencyId?: string): Promise<any[]>;
}
