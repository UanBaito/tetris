export default function Square({
	SquareCoords,
	color
}: {
	SquareCoords: Array<number>;
	color: string;
}) {
	const coords = {
		x: SquareCoords[0],
		y: SquareCoords[1]
	};
	return (
		<div
			className="square"
			style={{ backgroundColor: `${color}` }}
		>{`(${coords.x}, ${coords.y})`}</div>
	);
}
