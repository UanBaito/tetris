type props = { milliseconds: number };

export default function TimeCounter({ milliseconds }: props) {
	const minutes = Math.floor(Math.floor(milliseconds / 1000) / 60);
	const seconds = Math.floor(milliseconds / 1000) - minutes * 60;

	const paddedMinutes = minutes.toString().padStart(2, '0');
	const paddedSeconds = seconds.toString().padStart(2, '0');

	return (
		<span>
			{paddedMinutes} : {paddedSeconds}
		</span>
	);
}
