import { SaveMechanismCommand } from '../save-mechanism.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Mechanism } from '../../../../domain/practices/mechanism';
import { plainToClass } from 'class-transformer';
import { DeleteMechanismCommand } from '../delete-mechanism.command';
import { MechanismDeletedEvent } from '../../events/mechanism-deleted.event';
import { Inject } from '@nestjs/common';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';

@CommandHandler(DeleteMechanismCommand)
export class DeleteMechanismHandler implements ICommandHandler<DeleteMechanismCommand> {
  constructor(
    @Inject('IMechanismRepository')
    private readonly mechanismRepository: IMechanismRepository,
    private readonly eventBus: EventBus) {
  }

  async execute(command: DeleteMechanismCommand): Promise<boolean> {
    const result = await this.mechanismRepository.delete(command._id);
    if (result) {
      this.eventBus.publish(new MechanismDeletedEvent(command._id));
      return true;
    }
    return false;
  }
}
