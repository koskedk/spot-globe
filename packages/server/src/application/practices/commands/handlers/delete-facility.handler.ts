import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFacilityCommand } from '../delete-facility.command';
import { FacilityDeletedEvent } from '../../events/facility-deleted.event';
import { Inject } from '@nestjs/common';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';

@CommandHandler(DeleteFacilityCommand)
export class DeleteFacilityHandler implements ICommandHandler<DeleteFacilityCommand> {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteFacilityCommand): Promise<boolean> {
    const result = await this.facilityRepository.delete(command._id);
    if (result) {
      this.eventBus.publish(new FacilityDeletedEvent(command._id));
      return true;
    }
    return false;
  }
}
