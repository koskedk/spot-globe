import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMechanismCommand } from '../delete-mechanism.command';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';
export declare class DeleteMechanismHandler implements ICommandHandler<DeleteMechanismCommand> {
    private readonly mechanismRepository;
    private readonly eventBus;
    constructor(mechanismRepository: IMechanismRepository, eventBus: EventBus);
    execute(command: DeleteMechanismCommand): Promise<boolean>;
}
