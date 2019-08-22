import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus } from '@nestjs/cqrs';
import { PracticesModule } from '../../practices.module';
import { agencySchema } from '../../../../infrastructure/practices/schemas/agency.schema';
import { Agency } from '../../../../domain/practices/agency';
import { DeleteAgencyCommand } from '../delete-agency.command';
import { DeleteAgencyHandler } from './delete-agency.handler';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestAgencies } from '../../../../../test/test.data';

describe('Delete Agency Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();
  let liveAgency: Agency;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
        PracticesModule,
      ],
    }).compile();
    testAgencies = getTestAgencies(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', testAgencies);

    const deleteHandler = module.get<DeleteAgencyHandler>(DeleteAgencyHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(deleteHandler, DeleteAgencyCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveAgency = new Agency('XXX', 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveAgency]);
  });

  it('should delete Agency', async () => {
    const command = new DeleteAgencyCommand(liveAgency._id);
    const result = await commandBus.execute(command);
    expect(result).toBe(true);
  });
});
