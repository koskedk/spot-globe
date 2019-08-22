import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLocationsQuery } from '../queries';

@Controller()
export class LocationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getCounties(): Promise<any> {
    return this.queryBus.execute(new GetLocationsQuery());
  }
}
