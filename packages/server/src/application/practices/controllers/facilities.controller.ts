import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoggingInterceptor } from '../../common';
import { GetFacilitiesQuery } from '../queries';
import { FacilityDto } from '../../../domain/practices/dtos/facility.dto';
import { SaveFacilityCommand } from '../commands/save-facility.command';
import { DeleteFacilityCommand } from '../commands/delete-facility.command';

@UseInterceptors(LoggingInterceptor)
@Controller('facilities')
export class FacilitiesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getFacilities(): Promise<any> {
    return this.queryBus.execute(new GetFacilitiesQuery());
  }

  @Post()
  async createOrUpdateFacility(@Body() facility: FacilityDto) {
    return this.commandBus.execute(
      new SaveFacilityCommand(facility.code, facility.name, facility._id),
    );
  }

  @Delete(':_id')
  async deleteFacility(@Param('id') id) {
    return this.commandBus.execute(new DeleteFacilityCommand(id));
  }
}
