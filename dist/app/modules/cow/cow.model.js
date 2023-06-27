"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_interface_1 = require("./cow.interface");
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: Object.values(cow_interface_1.Location), required: true },
    breed: {
        type: String,
        enum: [
            "Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej",
        ],
        required: true,
    },
    weight: { type: Number, required: true },
    label: {
        type: String,
        enum: Object.values(cow_interface_1.Label),
        required: true,
        default: cow_interface_1.Label.ForSale,
    },
    category: { type: String, enum: Object.values(cow_interface_1.Category), required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
