import { useEffect, useState } from 'react';
import { scoreboardItem } from '../interfaces';
import TimeCounter from './TimeCounter';

export default function () {
	const [difficultiesArray, setDifficultiesArray] = useState<any>(null);
	const [difficultyTab, setDifficultyTab] = useState(1);

	function handleChangeTab(tabIndex: number) {
		setDifficultyTab(tabIndex);
	}

	useEffect(() => {
		async function fetchBoard() {
			const response = await fetch(
				'https://classic-tetris-app.onrender.com/scoreboard'
			);
			const difficultiesArray: scoreboardItem[][] = await response.json();
			setDifficultiesArray(difficultiesArray);
		}
		fetchBoard();
	}, []);

	if (difficultiesArray === null) {
		return <div>...Loading</div>;
	}

	const mappedDifficultyTables = difficultiesArray.map(
		(difficulty: scoreboardItem[]) => {
			const mappedUsersList = difficulty.map((user) => {
				return (
					<UserItem
						key={user.name}
						name={user.name}
						linescleared={user.points}
						time={user.time}
					/>
				);
			});

			return mappedUsersList;
		}
	);

	return (
		<>
			<DifficultyTabs
				handleChangeTab={handleChangeTab}
				difficultyTab={difficultyTab}
			/>
			<table>
				<caption>Scoreboard</caption>
				<thead>
					<tr>
						<th>Name</th>
						<th>Lines Cleared</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>{mappedDifficultyTables[difficultyTab]}</tbody>
			</table>
		</>
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

export function DifficultyTabs({
	handleChangeTab,
	difficultyTab
}: {
	handleChangeTab: (tabIndex: number) => void;
	difficultyTab: number;
}) {
	return (
		<div className="difficulty-tab-container">
			<button
				className={`difficulty-tab ${
					difficultyTab === 0 ? 'difficulty-tab-selected' : ''
				}`}
				onClick={() => {
					handleChangeTab(0);
				}}
			>
				<h2>Easy</h2>
			</button>
			<button
				className={`difficulty-tab ${
					difficultyTab === 1 ? 'difficulty-tab-selected' : ''
				}`}
				onClick={() => {
					handleChangeTab(1);
				}}
			>
				<h2>Normal</h2>
			</button>
			<button
				className={`difficulty-tab ${
					difficultyTab === 2 ? 'difficulty-tab-selected' : ''
				}`}
				onClick={() => {
					handleChangeTab(2);
				}}
			>
				<h2>Hard</h2>
			</button>
		</div>
	);
}
