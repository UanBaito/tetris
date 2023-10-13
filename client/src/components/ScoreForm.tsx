import { useEffect, useRef } from 'react';
import { difficulties } from '../constants';

type props = {
	score: { linesCleared: number; time: number };
	retryState: boolean;
	difficulty: number;
};

type user = { name: string; score: number; time: number };

export default function ScoreForm({ score, retryState, difficulty }: props) {
	const nameInputRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<string>('');
	const dialogRef = useRef<HTMLDialogElement>(null);

	async function postUser() {
		/// Tries to create user, returns false if operation fails.
		try {
			const res = await fetch('https://classic-tetris-app.onrender.com/user', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: nameRef.current
				})
			});

			if (res.status === 200) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	function getUsername() {
		const name = localStorage.getItem('name');
		if (name) {
			nameRef.current = name;
			updateScoreBoard();
		} else {
			dialogRef.current?.showModal();
		}
	}

	async function validateUsername(e: React.FormEvent<HTMLFormElement>) {
		const warningLabel = document.getElementById('warning-label');
		try {
			const name = nameInputRef.current?.value;
			if (name === '') {
				dialogRef.current?.showModal();
				nameInputRef.current?.setAttribute('data-isvalid', 'true');
				if (warningLabel) {
					warningLabel.textContent = 'Username cannot be empty';
				}
			} else {
				nameRef.current = name!;
				const isUsernameFree = await postUser();
				if (!isUsernameFree) {
					dialogRef.current?.showModal();
					nameInputRef.current?.setAttribute('data-isvalid', 'true');
					if (warningLabel) {
						warningLabel.textContent = 'Username is occupied';
					}
				} else {
					localStorage.setItem('name', name!);
					await updateScoreBoard();
				}
			}
			e.preventDefault();
		} catch (err) {
			console.log(err);
		}
	}

	async function updateScoreBoard() {
		if (nameRef.current === '') {
			getUsername();
			return;
		}

		/// TODO: check if user exists first
		try {
			const res = await fetch(
				'https://classic-tetris-app.onrender.com/scoreboard',
				{
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						difficulty: difficulties[difficulty],
						name: nameRef.current,
						linesCleared: score.linesCleared,
						time: score.time
					})
				}
			);

			if (res.status === 200) {
				console.log('good');
			} else {
				throw new Error('something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (retryState) {
		updateScoreBoard();
	}

	return (
		<dialog ref={dialogRef} className="username-dialog">
			<form method="dialog" onSubmit={validateUsername}>
				<label htmlFor="username-input">Enter username</label>
				<input
					type="text"
					ref={nameInputRef}
					id="username-input"
					data-isvalid="false"
				/>
			</form>
			<label id="warning-label" htmlFor="username-input"></label>
		</dialog>
	);
}
