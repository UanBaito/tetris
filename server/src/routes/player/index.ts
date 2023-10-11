import express from 'express';
import db from '../../db';
import { logError, logSuccess } from '../../logging';

export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
	if (req.body.name === '') {
		res.status(400).send('name cannot be empty');
	}

	try {
		const name: string = req.body.name;
		await db.query('INSERT INTO users(name) VALUES ($1)', [name]);
		logSuccess('user ' + req.body.name, 'created');
		res.send('player created');
	} catch (err) {
		logError(err);
		res.status(409).send('Player name ' + req.body.name + ' already exists');
	}
});
