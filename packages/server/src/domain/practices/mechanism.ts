import { AggregateRoot } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import {
  MechanismCreatedEvent,
  MechanismUpdatedEvent,
} from '../../application/practices/events';
import { Facility } from './facility';

export class Mechanism extends AggregateRoot {
  _id: string;
  facilities: any[] = [];

  constructor(
    public code: string,
    public name: string,
    public implementationName: string,
    public agency?: string,
  ) {
    super();
    this._id = uuid.v1();
    this.code = code;
    this.name = name;
    this.implementationName = implementationName;
    this.apply(new MechanismCreatedEvent(this._id));
  }

  changeDetails(
    code: string,
    name: string,
    implementationName: string,
    agency?: string,
  ) {
    this.code = code;
    this.name = name;
    this.implementationName = implementationName;
    this.agency = agency;
    this.apply(new MechanismUpdatedEvent(this._id));
  }

  addFacility(facility: Facility) {
    facility.mechanism = this._id;
    const found = this.facilities.find(f => f._id === facility._id);
    if (found) {
      throw new Error(`Already ${facility.name} exists`);
    }
    this.facilities.push(facility);
  }
}
