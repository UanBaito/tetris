import { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react';
import { tetromino } from '../interfaces';
import { L, I, O, iOffsetData, jlstzOffsetData } from '../tetrominos';
import GameBox from './GameBox';
import Square from './Square';

const tetrominoes = [L, I, O];

function getRandomTetromino() {
	const newTetromino = tetrominoes[Math.floor(Math.random() * 3)];
	return newTetromino;
}

export default function Game() {
	/**
	 * Creates an empty tetrion
	 */
	const [tetrionState, setTetrionState] = useState<
		Array<Array<number | JSX.Element>>
	>(Array(17).fill(Array(10).fill(0)));

	const [internalClockState, setInternalClockState] = useState(0); // Time in milliseconds since the game started
	const [gameState, setgameState] = useState(false); // When set to true, starts the game

	/**
	 * This is the tetromino currently controlled by the player
	 */
	const [currentTetrominoState, setCurrentTetrominoState] = useState<tetromino>(
		getRandomTetromino()
	);

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
		}
	}, [gameState]);

	/**
	 * Starts the game
	 */
	function startTimer() {
		setgameState(true);
	}

	function getTetrominoPoints(
		axis: { x: number; y: number },
		facing?: number
	): number[][] {
		let rotation;
		if (facing !== undefined) {
			rotation = facing;
		} else {
			rotation = currentTetrominoState.facing;
		}

		let relativePoints!: number[][];
		switch (rotation) {
			case 0:
				relativePoints =
					currentTetrominoState.coords.shapeCoords.facingUpPoints;
				break;
			case 1:
				relativePoints =
					currentTetrominoState.coords.shapeCoords.facingRightPoints!;
				break;
			case 2:
				relativePoints =
					currentTetrominoState.coords.shapeCoords.facingDownPoints!;
				break;
			case 3:
				relativePoints =
					currentTetrominoState.coords.shapeCoords.facingLeftPoints!;
				break;
		}
		const TetrominoPoints = relativePoints.map((point) => {
			const newPoint: number[] = [];
			const x = point[0] + axis.x;
			const y = point[1] + axis.y;
			newPoint.push(x, y);
			return newPoint;
		});
		return TetrominoPoints;
	}

	function drop(levels: number) {
		setCurrentTetrominoState((prevState) => ({
			...prevState,
			coords: {
				...prevState.coords,
				axis: {
					...prevState.coords.axis,
					y: prevState.coords.axis.y + levels
				}
			}
		}));
	}

	function checkBelow() {
		const tetrionInfo = getTetrionStateInfo();
		const tetrominoPoints = getTetrominoPoints(
			currentTetrominoState.coords.axis
		);
		for (const point of tetrominoPoints) {
			const pointBelow = [point[0], point[1] + 1, 1];
			if (pointBelow[1] > 16) {
				return false;
			}

			for (const square of tetrionInfo) {
				if (
					square[0] === pointBelow[0] &&
					square[1] === pointBelow[1] &&
					square[2] === pointBelow[2]
				) {
					return false;
				}
			}
		}
		return true;
	}

	function moveRight() {
		setCurrentTetrominoState((prevState) => ({
			...prevState,
			coords: {
				...prevState.coords,
				axis: {
					...prevState.coords.axis,
					x: prevState.coords.axis.x + 1
				}
			}
		}));
	}

	function checkRight() {
		const tetrionInfo = getTetrionStateInfo();
		const tetrominoPoints = getTetrominoPoints(
			currentTetrominoState.coords.axis
		);
		for (const point of tetrominoPoints) {
			const pointRight = [point[0] + 1, point[1], 1];
			if (pointRight[0] > 9) {
				return false;
			}

			for (const square of tetrionInfo) {
				if (
					square[0] === pointRight[0] &&
					square[1] === pointRight[1] &&
					square[2] === pointRight[2]
				) {
					return false;
				}
			}
		}
		return true;
	}

	function moveLeft() {
		setCurrentTetrominoState((prevState) => ({
			...prevState,
			coords: {
				...prevState.coords,
				axis: {
					...prevState.coords.axis,
					x: prevState.coords.axis.x - 1
				}
			}
		}));
	}

	function checkLeft() {
		const tetrionInfo = getTetrionStateInfo();
		const tetrominoPoints = getTetrominoPoints(
			currentTetrominoState.coords.axis
		);
		for (const point of tetrominoPoints) {
			const pointLeft = [point[0] - 1, point[1], 1];
			if (pointLeft[0] < 0) {
				return false;
			}

			for (const square of tetrionInfo) {
				if (
					square[0] === pointLeft[0] &&
					square[1] === pointLeft[1] &&
					square[2] === pointLeft[2]
				) {
					return false;
				}
			}
		}
		return true;
	}

	function getHardDropPreview() {
		const tetrionInfo = getTetrionStateInfo();
		const tetrominoPoints = getTetrominoPoints(
			currentTetrominoState.coords.axis
		);
		const axis = currentTetrominoState.coords.axis;
		let levels = 1;
		let preview = { levels: 0, previewPoints: Array() };
		while (true) {
			for (const point of tetrominoPoints) {
				const pointBelow = [point[0], point[1] + levels, 1];
				if (pointBelow[1] > 16) {
					const previewAxis = { x: axis.x, y: axis.y + (levels - 1) };
					preview.levels = levels;
					preview.previewPoints = getTetrominoPoints(previewAxis);
					return preview;
				}
				for (const square of tetrionInfo) {
					if (
						square[0] === pointBelow[0] &&
						square[1] === pointBelow[1] &&
						square[2] === pointBelow[2]
					) {
						const previewAxis = { x: axis.x, y: axis.y + (levels - 1) };
						preview.levels = levels;
						preview.previewPoints = getTetrominoPoints(previewAxis);
						return preview;
					}
				}
			}
			levels++;
		}
	}

	function hardDrop() {
		const levels = getHardDropPreview().levels;
		drop(levels - 1);
		setCurrentTetrominoState((prevState) => ({
			...prevState,
			moving: false
		}));
	}

	function clockRotation(rotateTo: string) {
		const nowFacing = currentTetrominoState.facing;
		let newFacing!: number;
		let result: Array<number> | undefined;
		let offsetData: number[][][];
		let derivedOffsetData: number[][];

		if (currentTetrominoState.shape === 'I') {
			offsetData = iOffsetData;
		} else {
			offsetData = jlstzOffsetData;
		}

		// This creates a cycle between 0 and 3
		if (rotateTo === 'right') {
			newFacing = nowFacing === 3 ? 0 : nowFacing + 1;
		} else {
			newFacing = nowFacing === 0 ? 3 : nowFacing - 1;
		}

		// We can derive the desired offset test data for the wall kick by substracting the offset values of the new
		// facing direction from the offset values of the current facing direction (b and a, respectively)
		const b = offsetData[newFacing];
		derivedOffsetData = offsetData[nowFacing].map((a, i) => {
			const offsetX = a[0] - b[i][0];
			const offsety = a[1] - b[i][1];
			return [offsetX, offsety];
		});

		result = testWallKick(derivedOffsetData, newFacing);
		if (result) {
			rotate(newFacing, result[0], result[1]);
		}
	}

	function rotate(newFacing: number, xShift: number, yShift: number) {
		setCurrentTetrominoState((prevState) => ({
			...prevState,
			facing: newFacing,
			coords: {
				...prevState.coords,
				axis: {
					x: prevState.coords.axis.x + xShift,
					y: prevState.coords.axis.y + yShift
				}
			}
		}));
	}

	function testWallKick(tests: Array<Array<number>>, newFacing: number) {
		const tetrionInfo = getTetrionStateInfo();
		const axis = currentTetrominoState.coords.axis;
		for (const test of tests) {
			console.log('test', test);
			let isAvailable = true;
			const testAxis = { x: axis.x + test[0], y: axis.y + test[1] };
			const testTetrominoPoints = getTetrominoPoints(testAxis, newFacing);

			for (const point of testTetrominoPoints) {
				const testPoint = [...point, 1];
				console.log(testPoint);
				if (
					testPoint[0] < 0 ||
					testPoint[0] > 9 ||
					testPoint[1] < 0 ||
					testPoint[1] > 16
				) {
					console.log('out of bounds');
					isAvailable = false;
					break;
				}
				for (const square of tetrionInfo) {
					if (
						square[0] === testPoint[0] &&
						square[1] === testPoint[1] &&
						square[2] === testPoint[2]
					) {
						isAvailable = false;
						console.log('occupied');
					}
				}
			}

			if (isAvailable) {
				console.log('rotating');
				return test;
			}
		}
		console.log('rotation failed');
	}

	function getTetrionStateInfo() {
		const tetrionInfo: Array<Array<number>> = [];
		tetrionState.forEach((row, rowIndex) => {
			row.forEach((square, squareIndex) => {
				let squareType;
				if (square === 0) {
					squareType = 0;
				} else {
					squareType = 1;
				}
				const formattedSquare = [squareIndex, rowIndex, squareType];
				tetrionInfo.push(formattedSquare);
			});
		});
		return tetrionInfo;
	}

	function place() {
		const tetrominoPoints = getTetrominoPoints(
			currentTetrominoState.coords.axis
		);
		const updatedTetrion = tetrionState.map((row, rowIndex) => {
			const newRow = row.map((square, squareIndex) => {
				for (const point of tetrominoPoints) {
					if (squareIndex === point[0] && rowIndex === point[1]) {
						return (
							<Square
								key={`${rowIndex}-${squareIndex}`}
								color={currentTetrominoState.color}
							/>
						);
					}
				}
				return square;
			});
			return newRow;
		});
		setTetrionState(updatedTetrion);
		setCurrentTetrominoState(getRandomTetromino());
	}

	useEffect(() => {
		if (gameState) {
			if (checkBelow()) {
				drop(1);
			} else {
				place();
			}
		}
	}, [internalClockState]);

	useEffect(() => {
		if (!currentTetrominoState.moving) {
			place();
		}
	}, [currentTetrominoState.moving]);

	function action(event: KeyboardEvent) {
		if (gameState) {
			switch (event.code) {
				case 'ArrowDown':
					event.preventDefault();
					if (checkBelow()) {
						drop(1);
					} else {
						place();
					}
					break;
				case 'ArrowLeft':
					event.preventDefault();
					if (checkLeft()) {
						moveLeft();
					}
					break;
				case 'ArrowRight':
					event.preventDefault;
					if (checkRight()) {
						moveRight();
					}
					break;
				case 'Space':
					event.preventDefault;
					hardDrop();
					break;
				case 'KeyZ':
					event.preventDefault();
					clockRotation('left');
					break;
				case 'KeyX':
					event.preventDefault();
					clockRotation('right');
					break;
				default:
					break; // do not block other keys
			}
		}
	}

	return (
		<div onKeyDown={action} tabIndex={-1}>
			<button onClick={startTimer}>start timer</button>
			<GameBox
				tetrionState={tetrionState}
				currentTetrominoState={currentTetrominoState}
				getTetrominoPoints={getTetrominoPoints}
				getHardDropPreview={getHardDropPreview}
			/>
		</div>
	);
}
