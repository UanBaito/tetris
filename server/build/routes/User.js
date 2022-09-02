"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post('/create', user_1.default.createUser);
router.get('/get/:userId', user_1.default.readUser);
router.get('/get/', user_1.default.readAll);
router.patch('/update/:UserId', user_1.default.updateUserPoints);
router.delete('/delete/:userId', user_1.default.deleteUser);
module.exports = router;
