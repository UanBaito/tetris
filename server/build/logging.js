"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSuccess = exports.logError = exports.logIp = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const logIp = (req) => {
    log(chalk_1.default.blue.bold('INFO - Received request to: ' +
        chalk_1.default.white(req.path) +
        ' IP ' +
        chalk_1.default.white(req.ip) +
        ' Method ' +
        chalk_1.default.white(req.method)));
};
exports.logIp = logIp;
const logError = (error) => log(chalk_1.default.red.bold('Error: ') + error);
exports.logError = logError;
const logSuccess = (subject, action) => {
    log(chalk_1.default.green.bold('SUCCESS - ') +
        chalk_1.default.greenBright(subject) +
        ' has been ' +
        chalk_1.default.greenBright(action));
};
exports.logSuccess = logSuccess;
