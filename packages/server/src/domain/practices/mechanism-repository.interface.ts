import { IRepository } from '../../application/common';
import { Mechanism } from './mechanism';
import { Agency } from './agency';

export interface IMechanismRepository extends IRepository<Mechanism> {
  getById(id: string): Promise<any>;
  getMechanisms(agencyId?: string): Promise<any[]>;
  getBySyncId(ids: string[]): Promise<Mechanism[]>;

}
