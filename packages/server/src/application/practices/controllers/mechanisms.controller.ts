import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMechanismsQuery } from '../queries';
import { MechanismDto } from '../../../domain/practices/dtos/mechanism.dto';
import { SaveMechanismCommand } from '../commands/save-mechanism.command';
import { DeleteMechanismCommand } from '../commands/delete-mechanism.command';

@Controller('mechanisms')
export class MechanismsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getMechanisms(): Promise<any> {
    return this.queryBus.execute(new GetMechanismsQuery());
  }

  @Post()
  async createOrUpdateMechanism(@Body() mechanism: MechanismDto) {
    return this.commandBus.execute(
      new SaveMechanismCommand(
        mechanism.code,
        mechanism.name,
        mechanism.implementationName,
        mechanism.agency,
        mechanism._id,
      ),
    );
  }

  @Delete(':id')
  async deleteMechanism(@Param('id') id) {
    return this.commandBus.execute(new DeleteMechanismCommand(id));
  }
}
