import { IEvent } from '@nestjs/cqrs';

export class MechanismDeletedEvent implements IEvent {
  constructor(public readonly _id: string) {
  }
}
