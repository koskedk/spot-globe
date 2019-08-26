import { EventsHandler, IEvent, IEventHandler } from "@nestjs/cqrs";
import { AgencyCreatedEvent } from "../agency-created.event";
import { Inject, Logger } from "@nestjs/common";
import { ClientProxy, EventPattern } from "@nestjs/microservices";
import { AgencyUpdatedEvent } from "../agency-updated.event";
import { IAgencyRepository } from "../../../../domain/practices/agency-repository.interface";

@EventsHandler(AgencyCreatedEvent)
export class AgencyCreatedEventHandler
  implements IEventHandler<AgencyCreatedEvent> {
  constructor(
    @Inject("GLOBE_SERVICE")
    private readonly client: ClientProxy,
    @Inject("IAgencyRepository")
    private readonly agencyRepository: IAgencyRepository
  ) {
  }

  async handle(event: AgencyCreatedEvent) {
    Logger.debug(`===${AgencyCreatedEvent.name}===:${event._id}`);
    const agency = await this.agencyRepository.get(event._id);
    if (agency) {

      this.client.emit(AgencyCreatedEvent.name, JSON.stringify(agency)).subscribe(
        m => {
          Logger.log(m);
          Logger.log('PUBLISHED')
        },w => {Logger.error(w)},()=>{
          Logger.log('DONE')
        }
      );


    }
  }
}
