type props = { children: React.ReactNode };

export default function ScoreBoard({ children }: props) {
	return <section className="scoreboard">{children}</section>;
}
