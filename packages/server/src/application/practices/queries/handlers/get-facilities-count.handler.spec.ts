import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { facilitySchema } from '../../../../infrastructure/practices/schemas/facility.schema';
import { Logger } from '@nestjs/common';
import { PracticesModule } from '../../practices.module';
import { Facility } from '../../../../domain/practices/facility';
import { GetFacilitiesQuery } from '../get-facilities.query';
import { GetFacilitiesHandler } from './get-facilities.handler';
import { FacilityDto } from '../../../../domain/practices/dtos/facility.dto';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestFacilities } from '../../../../../test/test.data';
import { QueryBus } from '@nestjs/cqrs';
import { PracticesInfrastructureModule } from '../../../../infrastructure/practices';
import { LocationsInfrastructureModule } from '../../../../infrastructure/locations';
import { GetFacilitiesCountHandler } from './get-facilities-count.handler';
import { GetFacilitiesCountQuery } from '../get-facilities-count.query';

describe('Get Facility Count Query Tests', () => {
  let module: TestingModule;
  let queryBus: QueryBus;
  let testFacilities: Facility[] = [];
  const dbHelper = new TestDbHelper();
  let liveFacility: Facility;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        LocationsInfrastructureModule,
        PracticesModule,
      ],
    }).compile();

    testFacilities = getTestFacilities(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('facilities', testFacilities);

    const saveFacilityHandler = module.get<GetFacilitiesCountHandler>(
      GetFacilitiesCountHandler,
    );

    queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(saveFacilityHandler, GetFacilitiesCountQuery.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveFacility = new Facility(444, 'XXX-ZZX');
    await dbHelper.seedDb('facilities', [liveFacility]);
  });

  it('should get new Facility Count', async () => {
    const query = new GetFacilitiesCountQuery();
    const result = await queryBus.execute<GetFacilitiesCountQuery, number>(
      query,
    );
    expect(result).toBeGreaterThan(0);
  });
});
