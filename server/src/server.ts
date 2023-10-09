import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 9001;

type user = {
	name: string;
};

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

app.post('/user', (req, res) => {
	if (req.body.name === '') {
		res.statusCode = 400;
		res.send('name cannot be empty');
		console.log('name cannot be empty');
	} else {
		res.statusCode = 200;
		res.send('request to post ' + req.body + ' received');
		console.log('request to post ' + req.body + ' received');
	}
});

const users: user[] = [];

app.get('/', (req, res) => {
	console.log('elpepe');
	res.send('hello');
});

function addUser(name: string, score: number) {}

app.listen(port, () => {
	console.log('listening on port ' + port);
});
