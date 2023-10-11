"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = require("./logging");
const player_1 = require("./routes/player");
const scoreboard_1 = require("./routes/scoreboard");
const app = (0, express_1.default)();
const port = 9001;
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
    (0, logging_1.logIp)(req);
    next();
});
app.use(body_parser_1.default.json());
app.use('/user', player_1.userRouter);
app.use('/scoreboard', scoreboard_1.scoreboardRouter);
app.listen(port, () => {
    console.log('listening on port ' + port);
});
