import { IEventHandler } from '@nestjs/cqrs';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { ClientProxy } from '@nestjs/microservices';
export declare class AgencyUpdatedEventHandler implements IEventHandler<AgencyUpdatedEvent> {
    private readonly client;
    private readonly agencyRepository;
    constructor(client: ClientProxy, agencyRepository: IAgencyRepository);
    handle(event: AgencyUpdatedEvent): Promise<void>;
}
