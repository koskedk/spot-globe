import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesController } from './facilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveFacilityHandler } from '../commands/handlers/save-facility.handler';
import { SaveFacilityCommand } from '../commands/save-facility.command';
import { TestDbHelper } from '../../../../test/test-db.helper';
import { Facility } from '../../../domain/practices/facility';
import { getTestFacilities } from '../../../../test/test.data';
import { GetFacilitiesQuery } from '../queries/get-facilities.query';
import { GetFacilitiesHandler } from '../queries/handlers/get-facilities.handler';
import { PracticesModule } from '../practices.module';
import { FacilityDto } from '../../../domain/practices/dtos/facility.dto';
import { LocationsInfrastructureModule } from '../../../infrastructure/locations';

describe('Facilities Controller Tests', () => {
  let module: TestingModule;
  let testFacilities: Facility[] = [];
  const dbHelper = new TestDbHelper();
  let controller: FacilitiesController;
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

    const saveFacilityHandler = module.get<SaveFacilityHandler>(
      SaveFacilityHandler,
    );
    const commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveFacilityHandler, SaveFacilityCommand.name);

    const getFacilitiesHandler = module.get<GetFacilitiesHandler>(
      GetFacilitiesHandler,
    );
    const queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(getFacilitiesHandler, GetFacilitiesQuery.name);

    controller = new FacilitiesController(
      commandBus,
      queryBus,
      module.get<EventBus>(EventBus),
    );
  });

  beforeEach(async () => {
    liveFacility = new Facility(787, 'XXX-ZZX');
    await dbHelper.seedDb('facilities', [liveFacility]);
  });

  it('should create Facility', async () => {
    const facilityDto: FacilityDto = { code: 888, name: 'Demo' };
    const result = await controller.createOrUpdateFacility(facilityDto);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should get All Facilities', async () => {
    const result = await controller.getFacilities(null, null, 1, 1);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
