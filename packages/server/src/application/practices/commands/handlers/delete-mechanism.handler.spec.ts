import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus } from '@nestjs/cqrs';
import { PracticesModule } from '../../practices.module';
import { mechanismSchema } from '../../../../infrastructure/practices/schemas/mechanism.schema';
import { Mechanism } from '../../../../domain/practices/mechanism';
import { DeleteMechanismCommand } from '../delete-mechanism.command';
import { DeleteMechanismHandler } from './delete-mechanism.handler';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestAgencies, getTestMechanisms } from '../../../../../test/test.data';

describe('Delete Mechanism Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testAgencies: Mechanism[] = [];
  const dbHelper = new TestDbHelper();
  let liveMechanism: Mechanism;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Mechanism', schema: mechanismSchema }]),
        PracticesModule,
      ],
    }).compile();
    testAgencies = getTestMechanisms(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', testAgencies);

    const deleteHandler = module.get<DeleteMechanismHandler>(DeleteMechanismHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(deleteHandler, DeleteMechanismCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveMechanism = new Mechanism('XXX', 'XXX-ZZX', 'IM');
    await dbHelper.seedDb('agencies', [liveMechanism]);
  });

  it('should delete Mechanism', async () => {
    const command = new DeleteMechanismCommand(liveMechanism._id);
    const result = await commandBus.execute(command);
    expect(result).toBe(true);
  });
});
