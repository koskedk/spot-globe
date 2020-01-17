import { IEvent } from '@nestjs/cqrs';

export class MechanismsSyncedEvent implements IEvent {
  constructor(public readonly ids: string[]) {}
}
