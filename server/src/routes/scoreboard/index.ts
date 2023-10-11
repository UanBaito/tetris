import express from 'express';
import db from '../../db';

export const scoreboardRouter = express.Router();

scoreboardRouter.put('/', async (req, res) => {
	try {
		const name: string = req.body.name;
		const linescleared: number = req.body.linescleared;
		const time: number = req.body.time;

		await db.query(
			'UPDATE users SET linescleared = $2 WHERE name = $1 AND linesCleared < $2',
			[name, linescleared]
		);
		await db.query('UPDATE users SET time = $2 WHERE name = $1 AND time < $2', [
			name,
			time
		]);

		res.send('oki');
	} catch (err) {
		console.log(err);
	}
});

scoreboardRouter.get('/', async (req, res) => {
	try {
		const results = await db.query('SELECT * FROM users');
		res.send(results.rows);
	} catch (err) {
		console.log(err);
	}
});
