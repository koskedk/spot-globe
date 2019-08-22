import { IEvent } from '@nestjs/cqrs';

export class AgencyUpdatedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}

