import { IEventHandler } from '@nestjs/cqrs';
import { MechanismUpdatedEvent } from '../mechanism-updated.event';
import { ClientProxy } from '@nestjs/microservices';
import { IMechanismRepository } from '../../../../domain/practices';
export declare class MechanismUpdatedEventHandler implements IEventHandler<MechanismUpdatedEvent> {
    private readonly client;
    private readonly repository;
    constructor(client: ClientProxy, repository: IMechanismRepository);
    handle(event: MechanismUpdatedEvent): Promise<void>;
}
