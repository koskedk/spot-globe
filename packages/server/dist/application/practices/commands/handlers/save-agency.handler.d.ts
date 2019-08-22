import { SaveAgencyCommand } from '../save-agency.command';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
export declare class SaveAgencyHandler implements ICommandHandler<SaveAgencyCommand> {
    private readonly agencyRepository;
    private readonly publisher;
    constructor(agencyRepository: IAgencyRepository, publisher: EventPublisher);
    execute(command: SaveAgencyCommand): Promise<any>;
    createAgency(command: SaveAgencyCommand): Promise<any>;
    updateAgency(command: SaveAgencyCommand): Promise<any>;
}
