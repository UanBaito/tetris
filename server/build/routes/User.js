"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const app = express_1.default.app();
app.post('/create', user_1.default.createUser);
app.get('/get/:userId', user_1.default.readUser);
app.get('/get/', user_1.default.readAll);
app.patch('/update/:UserId', user_1.default.updateUserPoints);
app.delete('/delete/:userId', user_1.default.deleteUser);
module.exports = app;
