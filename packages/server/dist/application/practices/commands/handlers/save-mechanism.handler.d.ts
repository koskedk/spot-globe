import { SaveMechanismCommand } from '../save-mechanism.command';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';
export declare class SaveMechanismHandler implements ICommandHandler<SaveMechanismCommand> {
    private readonly mechanismRepository;
    private readonly publisher;
    constructor(mechanismRepository: IMechanismRepository, publisher: EventPublisher);
    execute(command: SaveMechanismCommand): Promise<any>;
    createMechanism(command: SaveMechanismCommand): Promise<any>;
    updateMechanism(command: SaveMechanismCommand): Promise<any>;
}
