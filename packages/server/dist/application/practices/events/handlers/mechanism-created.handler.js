"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const mechanism_created_event_1 = require("../mechanism-created.event");
const common_1 = require("@nestjs/common");
let MechanismCreatedEventHandler = class MechanismCreatedEventHandler {
    handle(event) {
        common_1.Logger.debug(`=== MechanismCreated ===:${event._id}`);
    }
};
MechanismCreatedEventHandler = __decorate([
    cqrs_1.EventsHandler(mechanism_created_event_1.MechanismCreatedEvent)
], MechanismCreatedEventHandler);
exports.MechanismCreatedEventHandler = MechanismCreatedEventHandler;
//# sourceMappingURL=mechanism-created.handler.js.map