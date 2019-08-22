import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus } from '@nestjs/cqrs';
import { PracticesModule } from '../../practices.module';
import { facilitySchema } from '../../../../infrastructure/practices/schemas/facility.schema';
import { Facility } from '../../../../domain/practices/facility';
import { DeleteFacilityCommand } from '../delete-facility.command';
import { DeleteFacilityHandler } from './delete-facility.handler';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestAgencies, getTestFacilities } from '../../../../../test/test.data';

describe('Delete Facility Command Tests', () => {
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
    await dbHelper.seedDb('agencies', testFacilities);

    const deleteHandler = module.get<DeleteFacilityHandler>(DeleteFacilityHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(deleteHandler, DeleteFacilityCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveFacility = new Facility(345, 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveFacility]);
  });

  it('should delete Facility', async () => {
    const command = new DeleteFacilityCommand(liveFacility._id);
    const result = await commandBus.execute(command);
    expect(result).toBe(true);
  });
});
