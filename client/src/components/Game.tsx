import { useEffect, useState } from 'react';
import GameBox from './GameBox';
export default function Game() {
	/**
	 * Creates an empty tetrion
	 */
	const [tetrionState, setTetrionState] = useState<Array<Array<number>>>(
		Array(17).fill(Array(10).fill(0))
	);

	const [internalClockState, setInternalClockState] = useState(0); // Time in milliseconds since the game started
	const [gameState, setgameState] = useState(false); // When set to true, starts the game

	/**
	 * This is the tetromino currently controlled by the player
	 */
	const [currentTetrominoState, setCurrentTetrominoState] = useState({
		shape: 'L',
		color: 'blue',
		facing: 0, ///Current rotation, 0 = up, 1 = right, 2 = down, 3 = left.
		coords: {
			/**
			 * This is the position of the square that the other squares will rotate around.
			 * When this property is updated, the other squares will be mapped around it.
			 * This could be considered the "true" position of the entire tetromino.
			 */
			axis: {
				x: 4,
				y: 1
			},
			/**
			 * The shapeCoords property tells where the squares around the axis are
			 * depending on the rotation, describing the shape of the tetromino
			 */
			shapeCoords: {
				facingUpPoints: [
					///(x, y)
					[0, 0],
					[-1, 0],
					[1, 0],
					[-1, -1]
				]
			}
		}
	});

	/**
	 * When  gameState is true, this useEffect basically makes the game tick and
	 * sets the speed depending on the number passed to the setInterval second
	 * parameter. I plan to make this also determine the rate at which points are obtained.
	 */
	useEffect(() => {
		if (gameState) {
			setInterval(() => {
				setInternalClockState((prevState) => {
					return prevState + 1000;
				});
			}, 1000);
			console.log(internalClockState);
		}
	}, [gameState]);

	/**
	 * Starts the game
	 */
	function startTimer() {
		setgameState(true);
	}

	return (
		<>
			<button onClick={startTimer}>start timer</button>
			<GameBox
				tetrionState={tetrionState}
				currentTetrominoState={currentTetrominoState}
			/>
		</>
	);
}
