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
exports.scoreboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../db"));
exports.scoreboardRouter = express_1.default.Router();
exports.scoreboardRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const linescleared = req.body.linescleared;
        const time = req.body.time;
        yield db_1.default.query('UPDATE users SET linescleared = $2 WHERE name = $1 AND linesCleared < $2', [name, linescleared]);
        yield db_1.default.query('UPDATE users SET time = $2 WHERE name = $1 AND time < $2', [
            name,
            time
        ]);
        res.send('oki');
    }
    catch (err) {
        console.log(err);
    }
}));
exports.scoreboardRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query('SELECT * FROM users');
        res.send(results.rows);
    }
    catch (err) {
        console.log(err);
    }
}));
