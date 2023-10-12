import express from 'express';
import db from '../../db';
import format from 'pg-format';
import { logError, logSuccess } from '../../logging';

export const scoreboardRouter = express.Router();

scoreboardRouter.put('/', async (req, res) => {
	try {
		const name: string = req.body.name;
		const linesCleared: number = req.body.linesCleared;
		const time: number = req.body.time;
		const difficulty: string = req.body.difficulty;
		const sql = format(
			'INSERT INTO %I as d (name, points, time) VALUES ($1, $2, $3) ON CONFLICT (name) DO UPDATE SET points = (CASE WHEN d.points < $2 THEN $2 ELSE d.points END), time = (CASE WHEN d.time < $3 THEN $3 ELSE d.time END)',
			difficulty
		);

		await db.query(sql, [name, linesCleared, time]);

		res.send('oki');
		logSuccess('Score for player ' + req.body.name, ' updated/created');
	} catch (err) {
		logError(err);
	}
});

scoreboardRouter.get('/', async (req, res) => {
	try {
		const easy = await db.query(
			'SELECT * FROM easy ORDER BY points DESC, time DESC'
		);
		const normal = await db.query(
			'SELECT * FROM normal ORDER BY points DESC, time DESC'
		);
		const hard = await db.query(
			'SELECT * FROM hard ORDER BY points DESC, time DESC'
		);

		res.send([easy.rows, normal.rows, hard.rows]);
		logSuccess('Scoreboard ', ' sent');
	} catch (err) {
		logError(err);
	}
});
