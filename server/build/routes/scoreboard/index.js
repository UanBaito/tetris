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
const pg_format_1 = __importDefault(require("pg-format"));
const logging_1 = require("../../logging");
exports.scoreboardRouter = express_1.default.Router();
exports.scoreboardRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const linesCleared = req.body.linesCleared;
        const time = req.body.time;
        const difficulty = req.body.difficulty;
        const sql = (0, pg_format_1.default)('INSERT INTO %I as d (name, points, time) VALUES ($1, $2, $3) ON CONFLICT (name) DO UPDATE SET points = (CASE WHEN d.points < $2 THEN $2 ELSE d.points END), time = (CASE WHEN d.time < $3 THEN $3 ELSE d.time END)', difficulty);
        yield db_1.default.query(sql, [name, linesCleared, time]);
        res.send('oki');
        (0, logging_1.logSuccess)('Score for player ' + req.body.name, ' updated/created');
    }
    catch (err) {
        (0, logging_1.logError)(err);
    }
}));
exports.scoreboardRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const easy = yield db_1.default.query('SELECT * FROM easy ORDER BY points DESC, time DESC');
        const normal = yield db_1.default.query('SELECT * FROM normal ORDER BY points DESC, time DESC');
        const hard = yield db_1.default.query('SELECT * FROM hard ORDER BY points DESC, time DESC');
        res.send([easy.rows, normal.rows, hard.rows]);
        (0, logging_1.logSuccess)('Scoreboard ', ' sent');
    }
    catch (err) {
        (0, logging_1.logError)(err);
    }
}));
