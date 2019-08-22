import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAgencyCommand } from '../delete-agency.command';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
export declare class DeleteAgencyHandler implements ICommandHandler<DeleteAgencyCommand> {
    private readonly agencyRepository;
    private readonly eventBus;
    constructor(agencyRepository: IAgencyRepository, eventBus: EventBus);
    execute(command: DeleteAgencyCommand): Promise<boolean>;
}
