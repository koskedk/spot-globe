"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const uuid = require("uuid");
const events_1 = require("../../application/practices/events");
class Mechanism extends cqrs_1.AggregateRoot {
    constructor(code, name, implementationName, agency) {
        super();
        this.code = code;
        this.name = name;
        this.implementationName = implementationName;
        this.agency = agency;
        this.facilities = [];
        this._id = uuid.v1();
        this.code = code;
        this.name = name;
        this.implementationName = implementationName;
        this.apply(new events_1.MechanismCreatedEvent(this._id));
    }
    changeDetails(code, name, implementationName, agency) {
        this.code = code;
        this.name = name;
        this.implementationName = implementationName;
        this.agency = agency;
        this.apply(new events_1.MechanismUpdatedEvent(this._id));
    }
    addFacility(facility) {
        facility.mechanism = this._id;
        const found = this.facilities.find(f => f._id === facility._id);
        if (found) {
            throw new Error(`Already ${facility.name} exists`);
        }
        this.facilities.push(facility);
    }
}
exports.Mechanism = Mechanism;
//# sourceMappingURL=mechanism.js.map