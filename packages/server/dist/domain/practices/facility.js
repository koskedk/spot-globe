"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const cqrs_1 = require("@nestjs/cqrs");
const events_1 = require("../../application/practices/events");
class Facility extends cqrs_1.AggregateRoot {
    constructor(code, name, county, mechanism) {
        super();
        this.code = code;
        this.name = name;
        this.county = county;
        this.mechanism = mechanism;
        this._id = uuid.v1();
        this.code = code;
        this.name = name;
        this.county = county;
        this.mechanism = mechanism;
        this.apply(new events_1.FacilityCreatedEvent(this._id));
    }
    changeDetails(code, name, county, mechanismId) {
        this.code = code;
        this.name = name;
        this.mechanism = mechanismId;
        this.apply(new events_1.FacilityUpdatedEvent(this._id));
    }
}
exports.Facility = Facility;
//# sourceMappingURL=facility.js.map