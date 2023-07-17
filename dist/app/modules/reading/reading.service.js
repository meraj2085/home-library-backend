"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingService = void 0;
const reading_model_1 = require("./reading.model");
const addReading = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const reading = yield reading_model_1.Reading.create(data);
    return reading;
});
const getReading = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const reading = yield reading_model_1.Reading.find({ user_email: email });
    return reading;
});
const updateReading = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reading = yield reading_model_1.Reading.findByIdAndUpdate({ _id: id }, { completed: true });
    return reading;
});
exports.ReadingService = {
    addReading,
    getReading,
    updateReading,
};
