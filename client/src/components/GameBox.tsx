import { tetromino } from '../interfaces';
import Square from './Square';

export default function GameBox({
	tetrionState,
	currentTetrominoState
}: {
	tetrionState: Array<Array<number>>;
	currentTetrominoState: tetromino;
}) {
	const MappedGame = tetrionState.map((Row, rowIndex) => {
		const newRow = Row.map((square, squareIndex) => {
			const currentTetrominoAxis = currentTetrominoState.coords.axis;
			const SquareCoords = [squareIndex, rowIndex];

			///Here should be declared a variable with the rotation of the tetromino
			///Then a switch statement for every rotation
			///finally, make the for loop below iterate over the result

			for (const points of currentTetrominoState.coords.shapeCoords
				.facingUpPoints) {
				if (
					squareIndex === points[0] + currentTetrominoAxis.x &&
					rowIndex === points[1] + currentTetrominoAxis.y
				) {
					return (
						<Square
							color={currentTetrominoState.color}
							SquareCoords={SquareCoords}
						/>
					);
				}
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
