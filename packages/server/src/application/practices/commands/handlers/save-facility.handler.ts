import { SaveFacilityCommand } from '../save-facility.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Facility } from '../../../../domain/practices/facility';
import { FacilityRepository } from '../../../../infrastructure/practices/facility.repository';
import { plainToClass } from 'class-transformer';
import { Inject } from '@nestjs/common';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';

@CommandHandler(SaveFacilityCommand)
export class SaveFacilityHandler
  implements ICommandHandler<SaveFacilityCommand> {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SaveFacilityCommand): Promise<any> {
    if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
      return await this.updateFacility(command);
    }

    return await this.createFacility(command);
  }

  async createFacility(command: SaveFacilityCommand): Promise<any> {
    const newFacility = new Facility(command.code, command.name);
    const facility = await this.facilityRepository.create(newFacility);
    this.publisher.mergeObjectContext(newFacility).commit();
    return facility;
  }

  async updateFacility(command: SaveFacilityCommand): Promise<any> {
    const raw = await this.facilityRepository.get(command._id);
    if (raw) {
      const facilityToUpdate = plainToClass(Facility, raw);
      facilityToUpdate.changeDetails(command.code, command.name);
      const facility = await this.facilityRepository.update(facilityToUpdate);
      this.publisher.mergeObjectContext(facilityToUpdate).commit();
      return facility;
    } else {
      await this.createFacility(command);
    }
  }
}
