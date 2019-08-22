import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFacilityCommand } from '../delete-facility.command';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
export declare class DeleteFacilityHandler implements ICommandHandler<DeleteFacilityCommand> {
    private readonly facilityRepository;
    private readonly eventBus;
    constructor(facilityRepository: IFacilityRepository, eventBus: EventBus);
    execute(command: DeleteFacilityCommand): Promise<boolean>;
}
