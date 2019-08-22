import { SaveFacilityCommand } from '../save-facility.command';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
export declare class SaveFacilityHandler implements ICommandHandler<SaveFacilityCommand> {
    private readonly facilityRepository;
    private readonly publisher;
    constructor(facilityRepository: IFacilityRepository, publisher: EventPublisher);
    execute(command: SaveFacilityCommand): Promise<any>;
    createFacility(command: SaveFacilityCommand): Promise<any>;
    updateFacility(command: SaveFacilityCommand): Promise<any>;
}
