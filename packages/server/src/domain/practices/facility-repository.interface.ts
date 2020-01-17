import { Facility } from './facility';
import { IRepository } from '../../application/common';
import { Agency } from './agency';

export interface IFacilityRepository extends IRepository<Facility> {
  getById(id: string): Promise<any>;
  getFacilities(
    size: number,
    page: number,
    sort?: any,
    filter?: any,
  ): Promise<any[]>;
  getBySyncId(ids: string[]): Promise<Facility[]>;
}
