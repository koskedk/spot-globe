import { IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { ClientProxy } from '@nestjs/microservices';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
export declare class AgencyCreatedEventHandler implements IEventHandler<AgencyCreatedEvent> {
    private readonly client;
    private readonly agencyRepository;
    constructor(client: ClientProxy, agencyRepository: IAgencyRepository);
    handle(event: AgencyCreatedEvent): Promise<void>;
}
