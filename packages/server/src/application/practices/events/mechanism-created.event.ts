import { IEvent } from '@nestjs/cqrs';

export class MechanismCreatedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}
