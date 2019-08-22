import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, Facility, Mechanism } from '../../domain/practices';
import { mechanismSchema } from './schemas/mechanism.schema';
import { facilitySchema } from './schemas/facility.schema';
import { agencySchema } from './schemas/agency.schema';
import { MechanismRepository } from './mechanism.repository';
import { FacilityRepository } from './facility.repository';
import { AgencyRepository } from './agency.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agency.name, schema: agencySchema }]),
    MongooseModule.forFeature([
      { name: Mechanism.name, schema: mechanismSchema },
    ]),
    MongooseModule.forFeature([
      { name: Facility.name, schema: facilitySchema },
    ]),
  ],
  providers: [
    { provide: 'IAgencyRepository', useClass: AgencyRepository },
    { provide: 'IFacilityRepository', useClass: FacilityRepository },
    { provide: 'IMechanismRepository', useClass: MechanismRepository },
  ],
  exports: [
    { provide: 'IAgencyRepository', useClass: AgencyRepository },
    { provide: 'IFacilityRepository', useClass: FacilityRepository },
    { provide: 'IMechanismRepository', useClass: MechanismRepository },
  ],
})
export class PracticesInfrastructureModule {}
