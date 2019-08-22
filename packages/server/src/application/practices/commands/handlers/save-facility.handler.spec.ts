import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveFacilityCommand } from '../save-facility.command';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveFacilityHandler } from './save-facility.handler';
import { PracticesModule } from '../../practices.module';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { facilitySchema } from '../../../../infrastructure/practices/schemas/facility.schema';
import { getTestAgencies, getTestFacilities } from '../../../../../test/test.data';
import { Facility } from '../../../../domain/practices/facility';

describe('Save Facility Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testFacilities: Facility[] = [];
  const dbHelper = new TestDbHelper();
  let liveFacility: Facility;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Facility', schema: facilitySchema }]),
        PracticesModule,
      ],
    }).compile();
    testFacilities = getTestFacilities(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('facilities', testFacilities);

    const saveFacilityHandler = module.get<SaveFacilityHandler>(SaveFacilityHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveFacilityHandler, SaveFacilityCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveFacility = new Facility(200, 'FacXXX-ZZX');
    await dbHelper.seedDb('facilities', [liveFacility]);
  });

  it('should create Facility', async () => {
    const command = new SaveFacilityCommand(300, 'FacDemo');
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should modify Facility', async () => {
    const command = new SaveFacilityCommand(400, 'FacTest', liveFacility._id);
    const result = await commandBus.execute(command);
    expect(result.name).toBe('FacTest');
    expect(result._id).toBe(liveFacility._id);
    Logger.debug(result);
  });

});
