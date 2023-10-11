import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';

const app = express();
const port = 9001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

app.post('/user', async (req, res) => {
	if (req.body.name === '') {
		res.status(400).send('name cannot be empty');
		console.log('name cannot be empty');
	} else {
		try {
			const name: string = req.body.name;
			const results = await db.query('INSERT INTO users VALUES ($1, 0, 0)', [
				name
			]);
			console.log(results);
			res.send('oki');
		} catch (err) {
			console.log(err);
		}
	}
});

app.put('/user', async (req, res) => {
	try {
		const name: string = req.body.name;
		const linesCleared: number = req.body.linesCleared;
		const time: number = req.body.time / 1000; //convert milliseconds to seconds

		await db.query(
			'UPDATE users SET linescleared = $2 WHERE name = $1 AND linesCleared < $2',
			[name, linesCleared]
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

app.get('/user', async (req, res) => {
	try {
		const results = await db.query('SELECT * FROM users');
		res.send(results.rows);
	} catch (err) {
		console.log(err);
	}
});

app.get('/', (req, res) => {
	console.log('elpepe');
	res.send('hello');
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});
