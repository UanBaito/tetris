import { tetromino } from '../interfaces';
import Square from './Square';

type props = {
	getTetrominoPoints: (
		axis: { x: number; y: number },
		facing?: number,
		tetromino?: tetromino
	) => number[][];
	tetrominoesQueueState: tetromino[];
	getTetromino: (shape: string) => tetromino | null;
};

export default function TetrominoesQueue({
	getTetrominoPoints,
	tetrominoesQueueState,
	getTetromino
}: props) {
	const tetrominoesQueue: number[][][] = Array(5).fill(
		Array(2).fill(Array(5).fill(0))
	);
	console.log(tetrominoesQueue);
	console.log(tetrominoesQueueState);

	const mappedTetrominoesQueue = tetrominoesQueue.map(
		(container, containerIndex) => {
			const mappedContainer = container.map((row, rowIndex) => {
				const mappedRow = row.map((square, squareIndex) => {
					if (tetrominoesQueueState.length === 0) {
						return (
							<div
								className="square"
								key={`${rowIndex}-${squareIndex}-queue-container-square`}
							></div>
						);
					}
					const tetronimoOnQueue = getTetromino(
						tetrominoesQueueState[containerIndex].shape
					);
					if (tetronimoOnQueue) {
						const tetrominoPoints = getTetrominoPoints(
							{ x: 2, y: tetronimoOnQueue.coords.axis.y },
							0,
							tetronimoOnQueue
						);
						for (const points of tetrominoPoints) {
							if (squareIndex === points[0] && rowIndex === points[1]) {
								return (
									<Square
										key={`${rowIndex}-${squareIndex}-queue-container-square`}
										color={tetronimoOnQueue.color}
									/>
								);
							}
						}
					}

					return (
						<Square
							color="black"
							key={`${rowIndex}-${squareIndex}-queue-container-square`}
						/>
					);
				});
				return mappedRow;
			});

			return (
				<li
					className="tetrominoesqueue-item"
					key={`${containerIndex}-queue-container`}
				>
					{mappedContainer}
				</li>
			);
		}
	);

	return <ul className="tetrominoesqueue-list">{mappedTetrominoesQueue}</ul>;
}
import { tetromino } from '../interfaces';
import Square from './Square';

type props = {
	getTetrominoPoints: (
		axis: { x: number; y: number },
		facing?: number,
		tetromino?: tetromino
	) => number[][];
	tetrominoesQueueState: tetromino[];
	getTetromino: (shape: string) => tetromino | null;
};

export default function TetrominoesQueue({
	getTetrominoPoints,
	tetrominoesQueueState,
	getTetromino
}: props) {
	const tetrominoesQueue: number[][][] = Array(5).fill(
		Array(3).fill(Array(5).fill(0))
	);
	console.log(tetrominoesQueue);
	console.log(tetrominoesQueueState);

	const mappedTetrominoesQueue = tetrominoesQueue.map(
		(container, containerIndex) => {
			const mappedContainer = container.map((row, rowIndex) => {
				const mappedRow = row.map((square, squareIndex) => {
					if (tetrominoesQueueState.length === 0) {
						return (
							<div
								className="square"
								key={`${rowIndex}-${squareIndex}-queue-container-square`}
							></div>
						);
					}
					const tetronimoOnQueue = getTetromino(
						tetrominoesQueueState[containerIndex].shape
					);
					if (tetronimoOnQueue) {
						const tetrominoPoints = getTetrominoPoints(
							{ x: 2, y: tetronimoOnQueue.coords.axis.y },
							0,
							tetronimoOnQueue
						);
						for (const points of tetrominoPoints) {
							if (squareIndex === points[0] && rowIndex === points[1]) {
								return (
									<Square
										key={`${rowIndex}-${squareIndex}-queue-container-square`}
										color={tetronimoOnQueue.color}
									/>
								);
							}
						}
					}

					return (
						<div
							className="square"
							key={`${rowIndex}-${squareIndex}-queue-container-square`}
						></div>
					);
				});
				return mappedRow;
			});

			return (
				<li
					className="tetrominoesqueue-item"
					key={`${containerIndex}-queue-container`}
				>
					{mappedContainer}
				</li>
			);
		}
	);

	return <ul className="tetrominoesqueue-list">{mappedTetrominoesQueue}</ul>;
}
