import Square from './Square';
import { L, I, O, iOffsetData, jlstzOffsetData } from '../tetrominos';
import { tetromino } from '../interfaces';

type props = {
	getTetrominoPoints: (
		axis: { x: number; y: number },
		facing?: number,
		tetromino?: tetromino
	) => number[][];
};

export default function TetrominoStorage({ getTetrominoPoints }: props) {
	const storageContainer: number[][] = Array(5).fill(Array(5).fill(0));
	console.log(storageContainer);
	const storedTetromino = L;
	console.log(storedTetromino);

	const tetrominoPoints = getTetrominoPoints({ x: 2, y: 2 }, 0, L);
	console.log(tetrominoPoints);
	const mappedStorageContainer = storageContainer.map((row, rowIndex) => {
		const mappedRow = row.map((square, squareIndex) => {
			for (const points of tetrominoPoints) {
				if (squareIndex === points[0] && rowIndex === points[1]) {
					return (
						<Square
							key={`${rowIndex}-${squareIndex}`}
							color={storedTetromino.color}
						/>
					);
				}
			}
			return <Square color="gray" key={`${rowIndex}-${squareIndex}`} />;
		});
		console.log(mappedRow);
		return mappedRow;
	});

	return <div className="tetromino-storage">{mappedStorageContainer}</div>;
}
