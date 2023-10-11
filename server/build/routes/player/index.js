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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../db"));
const logging_1 = require("../../logging");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name === '') {
        res.status(400).send('name cannot be empty');
    }
    try {
        const name = req.body.name;
        yield db_1.default.query('INSERT INTO users(name) VALUES ($1)', [name]);
        (0, logging_1.logSuccess)('user ' + req.body.name, 'created');
        res.send('player created');
    }
    catch (err) {
        (0, logging_1.logError)(err);
        res.status(409).send('Player name ' + req.body.name + ' already exists');
    }
}));
