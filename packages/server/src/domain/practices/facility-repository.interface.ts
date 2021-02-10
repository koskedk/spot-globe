import { Facility } from './facility';
import { IRepository } from '../../application/common';
import { Agency } from './agency';
import { FacilityBagDto } from './dtos/facility-bag.dto';

export interface IFacilityRepository extends IRepository<Facility> {
  getById(id: string): Promise<any>;
  getFacilities(
    size: number,
    page: number,
    sort?: any,
    filter?: any,
  ): Promise<any[]>;
  getBySyncId(ids: string[]): Promise<Facility[]>;
  getBySyncMechanismsId(ids: string[]): Promise<Facility[]>;
  getBySyncCodes(codes: number[]): Promise<Facility[]>;
  getAllToSync(size: number, page: number): Promise<Facility[]>;
}
