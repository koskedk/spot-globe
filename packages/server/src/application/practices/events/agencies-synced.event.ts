import { IEvent } from '@nestjs/cqrs';

export class AgenciesSyncedEvent implements IEvent {
  constructor(public readonly ids: string[]) {}
}
