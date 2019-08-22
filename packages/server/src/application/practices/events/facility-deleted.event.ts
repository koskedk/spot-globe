import { IEvent } from '@nestjs/cqrs';

export class FacilityDeletedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}
