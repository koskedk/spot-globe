import { IEvent } from '@nestjs/cqrs';

export class AgencyCreatedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}

