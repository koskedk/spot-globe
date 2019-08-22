"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const uuid = require("uuid");
const events_1 = require("../../application/practices/events");
class Agency extends cqrs_1.AggregateRoot {
    constructor(name, display) {
        super();
        this.name = name;
        this.display = display;
        this.mechanisms = [];
        this._id = uuid.v1();
        this.name = name;
        this.display = display;
        this.apply(new events_1.AgencyCreatedEvent(this._id));
    }
    changeDetails(name, display) {
        this.name = name;
        this.display = display;
        this.apply(new events_1.AgencyUpdatedEvent(this._id));
    }
    addMechanism(mechanism) {
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
exports.Agency = Agency;
//# sourceMappingURL=agency.js.map