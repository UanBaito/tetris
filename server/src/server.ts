import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import { logIp } from './logging';
import { userRouter } from './routes/player';
import { scoreboardRouter } from './routes/scoreboard';

const app = express();
const port = 9001;

app.use(cors({ origin: 'https://classic-tetris-app.web.app' }));
app.use((req, res, next) => {
	logIp(req);
	next();
});
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/scoreboard', scoreboardRouter);

app.listen(port, () => {
	console.log('listening on port ' + port);
});
