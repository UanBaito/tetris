import { tetromino } from '../interfaces';

export default function GameBox({
	tetrionState,
	currentTetrominoState
}: {
	tetrionState: Array<Array<number>>;
	currentTetrominoState: tetromino;
}) {
	const MappedGame = tetrionState.map((Row, rowIndex) => {
		const newRow = Row.map((square, squareIndex) => {
			const coordX = currentTetrominoState.coords.x;
			const coordY = currentTetrominoState.coords.y;
			let isOccupied: boolean;

			if (rowIndex === coordY && squareIndex === coordX) {
				isOccupied = true;
			} else if (square === 1) {
				isOccupied = true;
			} else {
				isOccupied = false;
			}

			return (
				<div
					key={`${rowIndex}-${squareIndex}`}
					className={`square ${isOccupied ? 'occupied' : 'free'}`}
				></div>
			);
		});
		return newRow;
	});
	return <div className="GameBox">{MappedGame}</div>;
}
