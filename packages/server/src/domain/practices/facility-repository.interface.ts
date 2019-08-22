import { Facility } from './facility';
import { IRepository } from '../../application/common';

export interface IFacilityRepository extends IRepository<Facility> {
  getById(id: string): Promise<any>;
  getFacilities(mechanismId?: string): Promise<any[]>;
}
