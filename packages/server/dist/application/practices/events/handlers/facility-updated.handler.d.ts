import { IEventHandler } from '@nestjs/cqrs';
import { FacilityUpdatedEvent } from '../facility-updated.event';
import { ClientProxy } from '@nestjs/microservices';
import { IFacilityRepository } from '../../../../domain/practices';
export declare class FacilityUpdatedEventHandler implements IEventHandler<FacilityUpdatedEvent> {
    private readonly client;
    private readonly repository;
    constructor(client: ClientProxy, repository: IFacilityRepository);
    handle(event: FacilityUpdatedEvent): Promise<void>;
}
