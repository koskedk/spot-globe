import { Agency } from './agency';
import { IRepository } from '../../application/common';
export interface IAgencyRepository extends IRepository<Agency> {
    getById(id: string): Promise<any>;
}
