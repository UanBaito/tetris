import { useEffect, useState } from 'react';
import { user } from '../interfaces';
import TimeCounter from './TimeCounter';

export default function () {
	const [usersList, setUsersList] = useState<user[] | null>(null);

	useEffect(() => {
		async function fetchBoard() {
			const response = await fetch('http://localhost:9001/user');
			const usersList = await response.json();
			setUsersList(usersList);
		}
		fetchBoard();
	}, []);

	if (usersList === null) {
		return <div>...Loading</div>;
	}

	const mappedUsersList = usersList.map((user, index) => {
		return (
			<UserItem
				key={user.name}
				name={user.name}
				linescleared={user.linescleared}
				time={user.time}
			/>
		);
	});

	return (
		<table>
			<caption>Scoreboard</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Lines Cleared</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>{mappedUsersList}</tbody>
		</table>
	);
}

function UserItem({
	name,
	linescleared,
	time
}: {
	name: string;
	linescleared: number;
	time: number;
}) {
	return (
		<tr>
			<td>{name}</td>
			<td>{linescleared}</td>
			<td>
				<TimeCounter milliseconds={time} />
			</td>
		</tr>
	);
}
