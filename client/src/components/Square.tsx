export default function Square({ color }: { color: string }) {
	return (
		<div
			className="square square-occupied"
			style={{ backgroundColor: `${color}` }}
		></div>
	);
}
