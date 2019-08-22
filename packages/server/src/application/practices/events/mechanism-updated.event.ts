import { IEvent } from '@nestjs/cqrs';

export class MechanismUpdatedEvent  implements IEvent{
  constructor(public readonly _id: string) {
  }
}

