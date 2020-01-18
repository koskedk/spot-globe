import { IEvent } from '@nestjs/cqrs';

export class AllFacilitiesSyncedEvent implements IEvent {
  constructor(public batchSize: number) {}
}
