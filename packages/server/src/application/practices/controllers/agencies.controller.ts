import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../queries';
import { AgencyDto } from '../../../domain/practices/dtos/agency.dto';
import { SaveAgencyCommand } from '../commands/save-agency.command';
import { DeleteAgencyCommand } from '../commands/delete-agency.command';

@Controller('agencies')
export class AgenciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAgencies(): Promise<any> {
    return this.queryBus.execute(new GetAgenciesQuery());
  }

  @Post()
  async createOrUpdateAgency(@Body() agency: AgencyDto) {
    return this.commandBus.execute(
      new SaveAgencyCommand(agency.name, agency.display, agency._id),
    );
  }

  @Delete(':_id')
  async deleteAgency(@Param('id') id) {
    return this.commandBus.execute(new DeleteAgencyCommand(id));
  }
}
