import Square from './Square';

export default function TetrominoesQueue() {
	const tetrominoesQueue: number[][][] = Array(5).fill(
		Array(2).fill(Array(5).fill(0))
	);
	console.log(tetrominoesQueue);

	const mappedTetrominoesQueue = tetrominoesQueue.map(
		(container, containerIndex) => {
			const mappedContainer = container.map((row, rowIndex) => {
				const mappedRow = row.map((square, squareIndex) => {
					// if (!storedTetromino) {
					// 	return (
					// 		<div
					// 			className="square"
					// 			key={`${rowIndex}-${squareIndex}-storage`}
					// 		></div>
					// 	);
					// }
					// for (const points of tetrominoPoints) {
					// 	if (squareIndex === points[0] && rowIndex === points[1]) {
					// 		return (
					// 			<Square
					// 				key={`${rowIndex}-${squareIndex}-storage`}
					// 				color={storedTetromino.color}
					// 			/>
					// 		);
					// 	}
					// }
					return (
						<Square
							color="black"
							key={`${rowIndex}-${squareIndex}-queue-container`}
						/>
					);
				});
				return mappedRow;
			});

			return <li className="tetrominoesqueue-item">{mappedContainer}</li>;
		}
	);

	return <ul className="tetrominoesqueue-list">{mappedTetrominoesQueue}</ul>;
}
