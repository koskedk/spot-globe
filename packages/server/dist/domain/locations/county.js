"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const cqrs_1 = require("@nestjs/cqrs");
class County extends cqrs_1.AggregateRoot {
    constructor(code, name) {
        super();
        this.code = code;
        this.name = name;
        this._id = uuid();
    }
    toString() {
        return `${this.name}`;
    }
}
exports.County = County;
//# sourceMappingURL=county.js.map