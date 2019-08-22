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

describe('Get Facility Query Tests', () => {
  let module: TestingModule;
  let queryBus: QueryBus;
  let testFacilities: Facility[] = [];
  const dbHelper = new TestDbHelper();
  let liveFacility: Facility;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        PracticesModule,
      ],
    }).compile();

    testFacilities = getTestFacilities(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('facilities', testFacilities);

    const saveFacilityHandler = module.get<GetFacilitiesHandler>(GetFacilitiesHandler);

    queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(saveFacilityHandler, GetFacilitiesQuery.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveFacility = new Facility(444, 'XXX-ZZX');
    await dbHelper.seedDb('facilities', [liveFacility]);
  });

  it('should get new Facility', async () => {
    const query = new GetFacilitiesQuery();
    const result = await queryBus.execute<GetFacilitiesQuery, FacilityDto[]>(query);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
