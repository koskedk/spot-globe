import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAgencyCommand } from '../delete-agency.command';
import { AgencyDeletedEvent } from '../../events/agency-deleted.event';
import { Inject } from '@nestjs/common';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';

@CommandHandler(DeleteAgencyCommand)
export class DeleteAgencyHandler implements ICommandHandler<DeleteAgencyCommand> {
  constructor(
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteAgencyCommand): Promise<boolean> {
    const result = await this.agencyRepository.delete(command._id);
    if (result) {
      this.eventBus.publish(new AgencyDeletedEvent(command._id));
      return true;
    }
    return false;
  }
}
