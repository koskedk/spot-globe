import { IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { ClientProxy } from '@nestjs/microservices';
import { IFacilityRepository } from '../../../../domain/practices';
export declare class FacilityCreatedEventHandler implements IEventHandler<FacilityCreatedEvent> {
    private readonly client;
    private readonly repository;
    constructor(client: ClientProxy, repository: IFacilityRepository);
    handle(event: FacilityCreatedEvent): Promise<void>;
}
