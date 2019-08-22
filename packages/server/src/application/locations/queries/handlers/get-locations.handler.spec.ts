import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestCounties } from '../../../../../test/test.data';
import { County } from '../../../../domain/locations/county';
import { LocationsModule } from '../../locations.module';
import { GetLocationsHandler } from './get-locations.handler';
import { GetLocationsQuery } from '../get-locations.query';
import { CountyDto } from '../../../../domain/locations/dtos/county.dto';

describe('Locations Queries Tests', () => {
  let module: TestingModule;
  let queryBus: QueryBus;
  let testCounties: County[] = [];
  const dbHelper = new TestDbHelper();
  let liveCounty: County;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        LocationsModule,
      ],
    }).compile();
    testCounties = getTestCounties();
    await dbHelper.initConnection();
    await dbHelper.seedDb('counties', testCounties);

    const getLocationsHandler = module.get<GetLocationsHandler>(
      GetLocationsHandler,
    );
    queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(getLocationsHandler, GetLocationsQuery.name);
  });
  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveCounty = new County(99, 'CountyX');
    await dbHelper.seedDb('counties', [liveCounty]);
  });
  it('should get All Counties', async () => {
    const query = new GetLocationsQuery();
    const result = await queryBus.execute<GetLocationsQuery, CountyDto[]>(
      query,
    );
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
