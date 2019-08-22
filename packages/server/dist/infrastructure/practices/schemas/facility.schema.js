"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const locations_1 = require("../../../domain/locations");
const practices_1 = require("../../../domain/practices");
exports.facilitySchema = new mongoose.Schema({
    _id: String,
    code: Number,
    name: String,
    county: { type: String, ref: locations_1.County.name },
    mechanism: { type: String, ref: practices_1.Mechanism.name },
});
//# sourceMappingURL=facility.schema.js.map