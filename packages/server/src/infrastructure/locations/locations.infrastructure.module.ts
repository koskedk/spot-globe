import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { County } from '../../domain/locations/county';
import { countySchema } from './schemas/county.schema';
import { LocationRepository } from './location.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: County.name, schema: countySchema }]),
  ],
  providers: [{ provide: 'ILocationRepository', useClass: LocationRepository }],
  exports: [{ provide: 'ILocationRepository', useClass: LocationRepository }],
})
export class LocationsInfrastructureModule {
}
