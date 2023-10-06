import Square from './Square';
import { L, I, O } from '../tetrominos';
import { storedTetromino, tetromino } from '../interfaces';

type props = {
	getTetrominoPoints: (
		axis: { x: number; y: number },
		facing?: number,
		tetromino?: tetromino
	) => number[][];
	tetromino: tetromino | null;
	getTetromino: (shape: string) => tetromino | null;
};

export default function TetrominoStorage({
	getTetrominoPoints,
	tetromino,
	getTetromino
}: props) {
	const storageContainer: number[][] = Array(2).fill(Array(5).fill(0));
	let storedTetromino: tetromino | null;
	let tetrominoPoints: number[][];

	if (tetromino) {
		storedTetromino = getTetromino(tetromino.shape);
		console.log(storedTetromino);
		if (storedTetromino) {
			const yAxis = storedTetromino.shape === 'O' ? 0 : 1; /// fixes issue with storage only showing half of "O" tetromino
			tetrominoPoints = getTetrominoPoints(
				{ x: 2, y: yAxis },
				0,
				storedTetromino
			);
			console.log(tetrominoPoints);
		}
	} else {
		return <></>;
	}

	const mappedStorageContainer = storageContainer.map((row, rowIndex) => {
		const mappedRow = row.map((square, squareIndex) => {
			for (const points of tetrominoPoints) {
				if (!storedTetromino) {
					return <Square color="gray" key={`${rowIndex}-${squareIndex}`} />;
				}
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
		return mappedRow;
	});

	return <div className="tetromino-storage">{mappedStorageContainer}</div>;
}
