import { useEffect, useState } from 'react';
import GameBox from './GameBox';
export default function Game() {
	/**
	 * Creates an empty tetrion
	 */
	const [tetrionState, setTetrionState] = useState<Array<Array<number>>>(
		Array(15).fill(Array(10).fill(0))
	);

	const [internalClockState, setInternalClockState] = useState(0); // Time in milliseconds since the game started
	const [gameState, setgameState] = useState(false); // When set to true, starts the game

	/**
	 * This is the tetromino currently controlled by the player
	 */
	const [currentTetrominoState, setCurrentTetrominoState] = useState({
		shape: 'xd',
		color: 'xd',
		coords: {
			x: 0,
			y: 0
		},
		facing: 'up'
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

	useEffect(() => {
		if (gameState) {
			dropOne();
		}
	}, [internalClockState]);

	/*
	 * This function is called every time the internal clock is updated using the useEffect above.
	 * It checks if the square below the tetronimo is free, and if it is,
	 * modifies the currentTetrominoState y coords property to drop it one level.
	 */
	function dropOne() {
		const { x, y } = currentTetrominoState.coords;
		const tetrionCoordY = tetrionState[y + 1]; /// undefined if the tetromino is at the last row
		if (tetrionCoordY) {
			const tetrionCoordXY = tetrionCoordY[x];
			if (tetrionCoordXY === 0) {
				console.log('moving');
				setCurrentTetrominoState((prevState) => ({
					...prevState,
					coords: {
						x: prevState.coords.x,
						y: prevState.coords.y + 1
					}
				}));
			} else {
				console.log('cant move');
			}
		} else {
			console.log('cant move');
		}
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
