import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body;

	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name,
		points: 0
	});

	return user
		.save()
		.then((user) => {
			res.status(201).json({ user });
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	return User.findById(userId)
		.then((user) =>
			user
				? res.status(200).json({ user })
				: res.status(404).json({ message: 'Not found' })
		)
		.catch((error) => {
			res.status(500).json({ error });
		});
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
	return User.find()
		.then((users) => res.status(200).json({ users }))
		.catch((error) => {
			res.status(500).json({ error });
		});
};

const updateUserPoints = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	return User.findById(userId)
		.then((user) => {
			if (user) {
				user.set({
					...user,
					points: req.body
				});
				return user
					.save()
					.then((user) => {
						res.status(201).json({ user });
					})
					.catch((error) => {
						res.status(500).json({ error });
					});
			} else {
				res.status(404).json({ message: 'Not found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	return User.findByIdAndDelete(userId).then((user) =>
		user
			? res.status(200).json({ message: 'Deleted user' })
			: res.status(404).json({ message: 'Not found' })
	);
};

export default { createUser, readUser, readAll, updateUserPoints, deleteUser };
