import * as uuid from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  FacilityCreatedEvent,
  FacilityUpdatedEvent,
} from '../../application/practices/events';
import { County } from '../locations';

export class Facility extends AggregateRoot {
  _id: string;

  constructor(
    public code: number,
    public name: string,
    public county?: string,
    public mechanism?: string,
  ) {
    super();
    this._id = uuid.v1();
    this.code = code;
    this.name = name;
    this.county = county;
    this.mechanism = mechanism;
    this.apply(new FacilityCreatedEvent(this._id));
  }

  changeDetails(
    code: number,
    name: string,
    county?: string,
    mechanismId?: string,
  ) {
    this.code = code;
    this.name = name;
    this.mechanism = mechanismId;
    this.apply(new FacilityUpdatedEvent(this._id));
  }
}
