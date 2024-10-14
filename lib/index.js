"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const myRule_1 = __importDefault(require("./rules/myRule"));
exports.rules = {
    'my-rule': myRule_1.default,
};
