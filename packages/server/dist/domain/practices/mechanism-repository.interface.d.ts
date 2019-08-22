import { IRepository } from '../../application/common';
import { Mechanism } from './mechanism';
export interface IMechanismRepository extends IRepository<Mechanism> {
    getById(id: string): Promise<any>;
    getMechanisms(agencyId?: string): Promise<any[]>;
}
