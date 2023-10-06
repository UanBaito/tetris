import { tetromino } from '../interfaces';
import Square from './Square';

export default function GameBox({
	tetrionState,
	currentTetrominoState,
	getTetrominoPoints,
	getHardDropPreview
}: {
	tetrionState: Array<Array<number | JSX.Element>>;
	currentTetrominoState: tetromino;
	getTetrominoPoints: (
		axis: { x: number; y: number },
		facing?: number
	) => number[][];
	getHardDropPreview: () => {
		levels: number;
		previewPoints: number[][];
	};
}) {
	const tetronimoPoints = getTetrominoPoints(currentTetrominoState.coords.axis);
	const previewPoints = getHardDropPreview().previewPoints;
	const MappedGame = tetrionState.map((Row, rowIndex) => {
		const newRow = Row.map((square, squareIndex) => {
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

			for (const previewPoint of previewPoints) {
				if (squareIndex === previewPoint[0] && rowIndex === previewPoint[1]) {
					return (
						<div
							key={`${rowIndex}-${squareIndex}`}
							className={`square square-preview`}
						></div>
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
