import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { getTestPracticesCompleteData } from '../../../test/test.data';
import { PracticesInfrastructureModule } from './practices.infrastructure.module';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';
import { LocationsInfrastructureModule } from '../locations';

describe('Facility Repository Test', () => {
  let module: TestingModule;
  let repository: IFacilityRepository;
  const dbHelper = new TestDbHelper();
  const {
    counties,
    agencies,
    facilities,
    mechanisms,
  } = getTestPracticesCompleteData();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        LocationsInfrastructureModule,
        PracticesInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('counties', counties);
    await dbHelper.seedDb('agencies', agencies);
    await dbHelper.seedDb('mechanisms', mechanisms);
    await dbHelper.seedDb('facilities', facilities);
    repository = module.get<IFacilityRepository>('IFacilityRepository');
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load by Id', async () => {
    const fac = await repository.getById(facilities[0]._id);
    expect(fac.county.name).not.toBeNull();
    expect(fac.mechanism.name).not.toBeNull();
  });

  it('should load Facilities', async () => {
    const facs = await repository.getFacilities(1, 1);
    expect(facs.length).toBeGreaterThan(0);
  });

  it('should load Facilities by Mechanism', async () => {
    const facs = await repository.getFacilities(1, 1, mechanisms[0]._id);
    expect(facs.length).toBeGreaterThan(0);
  });

  it('should load By Ids', async () => {
    const ids = facilities.map(a => a._id);
    const data = await repository.getBySyncId(ids);
    expect(data.length).toBeGreaterThan(0);
  });
});
