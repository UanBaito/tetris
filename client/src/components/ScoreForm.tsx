import { useEffect, useRef } from 'react';

type props = {
	score: { linesCleared: number; time: number };
	retryState: boolean;
};

type user = { name: string; score: number; time: number };

export default function ScoreForm({ score, retryState }: props) {
	const nameInputRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<string>('');
	const dialogRef = useRef<HTMLDialogElement>(null);

	async function postUser() {
		try {
			const res = await fetch('http://localhost:9001/user', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: nameRef.current
				})
			});

			if (res.status === 200) {
				console.log('good');
			} else {
				throw new Error('something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	}

	function getUsername() {
		const name = localStorage.getItem('name');
		if (name) {
			nameRef.current = name;
			updateUserScore();
		} else {
			dialogRef.current?.showModal();
		}
	}

	async function validateUsername(e: React.FormEvent<HTMLFormElement>) {
		const warningLabel = document.getElementById('warning-label');
		try {
			const response = await fetch('http://localhost:9001/user');
			const usersList: user[] = await response.json();
			const name = nameInputRef.current?.value;
			if (name === '') {
				dialogRef.current?.showModal();
				nameInputRef.current?.setAttribute('data-isvalid', 'true');
				if (warningLabel) {
					warningLabel.textContent = 'Username cannot be empty';
				}
			} else {
				const isUserOccupied = usersList.some((user) => user.name === name);
				if (isUserOccupied) {
					dialogRef.current?.showModal();
					nameInputRef.current?.setAttribute('data-isvalid', 'true');
					if (warningLabel) {
						warningLabel.textContent = 'Username is occupied';
					}
				} else {
					localStorage.setItem('name', name!);
					nameRef.current = name!;
					await postUser();
					await updateUserScore();
				}
			}
			e.preventDefault();
		} catch (err) {
			console.log(err);
		}
	}

	async function updateUserScore() {
		if (nameRef.current === '') {
			getUsername();
			return;
		}

		/// TODO: check if user exists first
		try {
			const res = await fetch('http://localhost:9001/user', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: nameRef.current,
					linesCleared: score.linesCleared,
					time: score.time
				})
			});

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
		updateUserScore();
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
