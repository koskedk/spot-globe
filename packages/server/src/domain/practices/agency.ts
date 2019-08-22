import { AggregateRoot } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import {
  AgencyCreatedEvent,
  AgencyUpdatedEvent,
} from '../../application/practices/events';
import { Mechanism } from './mechanism';

export class Agency extends AggregateRoot {
  _id: string;
  mechanisms: any[] = [];

  constructor(public name: string, public display: string) {
    super();
    this._id = uuid.v1();
    this.name = name;
    this.display = display;
    this.apply(new AgencyCreatedEvent(this._id));
  }

  changeDetails(name: string, display: string) {
    this.name = name;
    this.display = display;
    this.apply(new AgencyUpdatedEvent(this._id));
  }

  addMechanism(mechanism: Mechanism) {
    mechanism.agency = this._id;
    const found = this.mechanisms.find(m => m._id === mechanism._id);
    if (found) {
      throw new Error(`Already ${mechanism.name} exists`);
    }
    this.mechanisms.push(mechanism);
  }

  toString() {
    return `${this.display}`;
  }
}
