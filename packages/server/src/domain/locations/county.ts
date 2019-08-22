import * as uuid from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export class County extends AggregateRoot {
  _id: string;

  constructor(
    public code: number,
    public name: string) {
    super();
    this._id = uuid();
  }

  toString() {
    return `${this.name}`;
  }
}
