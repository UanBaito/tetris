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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 9001;
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(body_parser_1.default.json());
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name === '') {
        res.status(400).send('name cannot be empty');
        console.log('name cannot be empty');
    }
    else {
        try {
            const name = req.body.name;
            const results = yield db_1.default.query('INSERT INTO users VALUES ($1, 0, 0)', [
                name
            ]);
            console.log(results);
            res.send('oki');
        }
        catch (err) {
            console.log(err);
        }
    }
}));
app.put('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const linesCleared = req.body.linesCleared;
        const time = req.body.time / 1000; //convert milliseconds to seconds
        yield db_1.default.query('UPDATE users SET linescleared = $2 WHERE name = $1 AND linesCleared < $2', [name, linesCleared]);
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
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query('SELECT * FROM users');
        res.send(results.rows);
    }
    catch (err) {
        console.log(err);
    }
}));
app.get('/', (req, res) => {
    console.log('elpepe');
    res.send('hello');
});
app.listen(port, () => {
    console.log('listening on port ' + port);
});
