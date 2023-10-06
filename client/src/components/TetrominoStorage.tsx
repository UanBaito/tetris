import Square from './Square';

export default function TetrominoStorage() {
	const storageContainer = Array(9).fill(Array(9).fill(0));
	console.log(storageContainer);

	const mappedStorageContainer = storageContainer.map((row, rowIndex) => {
		const mappedRow = row.map(() => {
			return <Square color="gray" />;
		});
		return mappedRow;
	});

	return <div className="tetromino-storage">{mappedStorageContainer}</div>;
}
