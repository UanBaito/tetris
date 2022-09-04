import { config } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/Logging';
import UserRoutes from './routes/User';

const router = express();

/* Connect to mongoose */
mongoose
	.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logging.info('Connected to MongoDB');
		StartServer();
	})
	.catch((error) => {
		Logging.error('Unable to connect');
		Logging.error(error);
	});

/** Only start the server if Mongo connects */
const StartServer = () => {
	router.use((req, res, next) => {
		/**Log the request */
		Logging.info(
			`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
		);

		res.on('finish', () => {
			`Outgoing -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] Status: [${res.statusCode}]`;
		});

		next();
	});

	router.use(express.urlencoded({ extended: true }));

	/** Rules of our API */

	router.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-with, Content-Type, Accept, Authorization'
		);

		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, PATCH, DELETE, GET'
			);
			return res.status(200).json({});
		}

		next();
	});

	/**Routes */
	router.use('/users', UserRoutes);

	/** Healthcheck */
	router.get('/ping', (req, res, next) =>
		res.status(200).json({ message: 'pong' })
	);

	/** Error handling */
	router.use((req, res, next) => {
		const error = new Error('not found');
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	http
		.createServer(router)
		.listen(config.server.port, () =>
			Logging.info(`Server is running on port ${config.server.port}`)
		);
};