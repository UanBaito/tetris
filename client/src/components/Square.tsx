export default function Square({ color }: { color: string }) {
	return <div className="square" style={{ backgroundColor: `${color}` }}></div>;
}
