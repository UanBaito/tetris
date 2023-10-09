type props = { children: React.ReactNode };

export default function ScoreBoard({ children }: props) {
	return <div className="scoreboard">{children}</div>;
}
