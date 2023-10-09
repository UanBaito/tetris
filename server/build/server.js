"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 9001;
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(body_parser_1.default.json());
app.post('/user', (req, res) => {
    if (req.body.name === '') {
        res.statusCode = 400;
        res.send('name cannot be empty');
        console.log('name cannot be empty');
    }
    else {
        res.statusCode = 200;
        res.send('request to post ' + req.body + ' received');
        console.log('request to post ' + req.body + ' received');
    }
});
const users = [];
app.get('/', (req, res) => {
    console.log('elpepe');
    res.send('hello');
});
function addUser(name, score) { }
app.listen(port, () => {
    console.log('listening on port ' + port);
});
