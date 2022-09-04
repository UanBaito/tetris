import { tetromino } from '../interfaces';
import Square from './Square';

export default function GameBox({
	tetrionState,
	currentTetrominoState,
	getTetrominoPoints
}: {
	tetrionState: Array<Array<number | JSX.Element>>;
	currentTetrominoState: tetromino;
	getTetrominoPoints: () => number[][];
}) {
	const MappedGame = tetrionState.map((Row, rowIndex) => {
		const newRow = Row.map((square, squareIndex) => {
			const SquareCoords = [squareIndex, rowIndex];
			const tetronimoPoints = getTetrominoPoints();
			for (const points of tetronimoPoints) {
				if (squareIndex === points[0] && rowIndex === points[1]) {
					return (
						<Square
							key={`${rowIndex}-${squareIndex}`}
							color={currentTetrominoState.color}
						/>
					);
				}
			}

			if (square !== 0) {
				return square;
			}

			let outerRow = false;
			if (rowIndex < 2) {
				outerRow = true;
			}

			return (
				<div
					key={`${rowIndex}-${squareIndex}`}
					className={`square  ${outerRow ? 'outerRow' : ''}`}
				></div>
			);
		});
		return newRow;
	});
	return <div className="GameBox">{MappedGame}</div>;
}
