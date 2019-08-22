import { IEvent } from '@nestjs/cqrs';

export class FacilityCreatedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}
