"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const mongoose_1 = require("mongoose");
const readingListSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    user_email: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Reading = (0, mongoose_1.model)("Reading", readingListSchema);
