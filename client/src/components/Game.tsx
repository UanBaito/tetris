import {
	KeyboardEvent,
	SyntheticEvent,
	useEffect,
	useRef,
	useState
} from 'react';
import { storedTetromino, tetromino } from '../interfaces';
import { iOffsetData, jlstzOffsetData, tetrominoes } from '../tetrominos';
import GameBox from './GameBox';
import Square from './Square';
import TetrominoStorage from './TetrominoStorage';
import TetrominoesQueue from './TetrominoesQueue';
import ScoreBoard from './ScoreBoard';
import ScoreForm from './ScoreForm';
import ScoreBoardList from './ScoreBoardList';

export default function Game() {
	/**
	 * Creates an empty tetrion
	 */
	const [tetrionState, setTetrionState] = useState<
		Array<Array<number | JSX.Element>>
	>(Array(22).fill(Array(10).fill(0)));

	const [internalClockState, setInternalClockState] = useState(0); // Time in milliseconds since the game started

	const intervalRef = useRef<number>(0);

	const [gameState, setgameState] = useState(false); // When set to true, starts the game
	const [storedTetrominoState, setstoredTetrominoState] =
		useState<storedTetromino>({
			canSwap: true,
			tetromino: null
		});
	const [retryState, setRetryState] = useState(false);
	const [tetrominoesQueueState, setTetrominoesQueueState] = useState<
		tetromino[]
	>([]);

	/// TODO: add actual points property
	const [scoreState, setScoreState] = useState({ linesCleared: 0, time: 0 });
	const timeIntervalRef = useRef(0);

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
			intervalRef.current = setInterval(() => {
				setInternalClockState((prevState) => {
					return prevState + 1000;
				});
			}, 1000);

			timeIntervalRef.current = setInterval(() => {
				setScoreState((prevState) => ({
					...prevState,
					time: prevState.time + 1000
				}));
			}, 1000);
		}
	}, [gameState]);

	const minutes = Math.floor(Math.floor(scoreState.time / 1000) / 60);
	const seconds = Math.floor(scoreState.time / 1000) - minutes * 60;

	/**
	 * Starts the game
	 */
	function startGame() {
		setgameState(true);
		setTetrominoesQueueState(createNewTetrominoQueue());
	}

	function createNewTetrominoQueue() {
		const tetrominoesQueue: tetromino[] = Array(5).fill(null);
		const mappedTetrominoesQueue = tetrominoesQueue.map(() =>
			getRandomTetromino()
		);
		return mappedTetrominoesQueue;
	}

	function retryGame() {
		setTetrionState(Array(22).fill(Array(10).fill(0)));
		setInternalClockState(0);
		setstoredTetrominoState({
			canSwap: true,
			tetromino: null
		});
		setRetryState(false);
		setCurrentTetrominoState(getRandomTetromino());
		setTetrominoesQueueState(createNewTetrominoQueue());
		setScoreState({ linesCleared: 0, time: 0 });
		setgameState(true);
	}

	function getRandomTetromino() {
		return tetrominoes[Math.floor(Math.random() * 7)];
	}

	function getTetrominoFromQueue() {
		const tetrominoesQueue = [...tetrominoesQueueState];
		if (tetrominoesQueue.length === 0) {
			throw new Error('tetrominoesQueue is empty');
		} else {
			const nextTetromino = tetrominoesQueue.shift();
			if (nextTetromino) {
				tetrominoesQueue.push(getRandomTetromino());
				setTetrominoesQueueState(tetrominoesQueue);
				return nextTetromino;
			} else {
				throw new Error('nextTetromino is null/undefined/false');
			}
		}
	}

	function storeTetromino(tetromino: tetromino) {
		if (storedTetrominoState.canSwap) {
			let staticTetromino: tetromino | null;
			if (storedTetrominoState.tetromino === null) {
				staticTetromino = getTetromino(tetromino.shape);
				setstoredTetrominoState({
					canSwap: false,
					tetromino: staticTetromino
				});
				setCurrentTetrominoState(getTetrominoFromQueue());
			} else {
				setCurrentTetrominoState(storedTetrominoState.tetromino);
				staticTetromino = getTetromino(tetromino.shape);
				setstoredTetrominoState({
					canSwap: false,
					tetromino: staticTetromino
				});
			}
		}
	}

	function getTetromino(shape: string) {
		const tetromino = tetrominoes.find((v) => v.shape === shape);
		if (tetromino) {
			return tetromino;
		} else {
			return null;
		}
	}

	function getTetrominoPoints(
		axis: { x: number; y: number },
		facing?: number,
		tetromino?: tetromino
	): number[][] {
		let rotation;
		if (facing !== undefined) {
			rotation = facing;
		} else {
			rotation = currentTetrominoState.facing;
		}
		let tetrominoToUse;
		if (tetromino) {
			tetrominoToUse = tetromino;
		} else {
			tetrominoToUse = currentTetrominoState;
		}

		let relativePoints!: number[][];
		switch (rotation) {
			case 0:
				relativePoints = tetrominoToUse.coords.shapeCoords.facingUpPoints;
				break;
			case 1:
				relativePoints = tetrominoToUse.coords.shapeCoords.facingRightPoints!;
				break;
			case 2:
				relativePoints = tetrominoToUse.coords.shapeCoords.facingDownPoints!;
				break;
			case 3:
				relativePoints = tetrominoToUse.coords.shapeCoords.facingLeftPoints!;
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
			if (pointBelow[1] > 21) {
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

	function checkFilledRows(tetrion: (number | JSX.Element)[][]) {
		const filledRows = tetrion.filter((row) => {
			const isRowFilled = row.every((square) => square !== 0);
			if (isRowFilled) {
				return true;
			} else {
				return false;
			}
		});
		let totalFilledRows = 0;
		filledRows.forEach(() => {
			totalFilledRows++;
		});
		setScoreState((prevState) => ({
			...prevState,
			linesCleared: prevState.linesCleared + totalFilledRows
		}));
		return removeFilledRows(filledRows, tetrion);
	}

	function removeFilledRows(
		filledRows: (number | JSX.Element)[][],
		tetrion: (number | JSX.Element)[][]
	) {
		const indexes = filledRows.map((filledRow) => {
			return tetrion.findIndex((tetrionRow) => filledRow === tetrionRow);
		});

		const updatedTetrion = [...tetrion];
		indexes.forEach((index) => {
			updatedTetrion.splice(index, 1);
			updatedTetrion.unshift(Array(10).fill(0));
		});
		return updatedTetrion;
	}

	function checkGameOver(tetrion: (number | JSX.Element)[][]) {
		const isLastRowOccupied = tetrion[0].some((square) => square !== 0);
		return isLastRowOccupied;
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
				if (pointBelow[1] > 21) {
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
			let isAvailable = true;
			const testAxis = { x: axis.x + test[0], y: axis.y + test[1] };
			const testTetrominoPoints = getTetrominoPoints(testAxis, newFacing);

			for (const point of testTetrominoPoints) {
				const testPoint = [...point, 1];

				if (
					testPoint[0] < 0 ||
					testPoint[0] > 9 ||
					testPoint[1] < 0 ||
					testPoint[1] > 21
				) {
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
					}
				}
			}

			if (isAvailable) {
				return test;
			}
		}
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

		const splicedTetrion = checkFilledRows(updatedTetrion);
		if (checkGameOver(splicedTetrion)) {
			setRetryState(true);
			clearInterval(intervalRef.current);
			clearInterval(timeIntervalRef.current);
			setgameState(false);
		} else {
			setTetrionState(splicedTetrion);
			setstoredTetrominoState((prevState) => ({ ...prevState, canSwap: true }));
			setCurrentTetrominoState(getTetrominoFromQueue());
		}
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
					event.preventDefault();
					if (checkRight()) {
						moveRight();
					}
					break;
				case 'Space':
					event.preventDefault();
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
				case 'KeyC':
					event.preventDefault();
					storeTetromino(currentTetrominoState);
					break;

				default:
					break; // do not block other keys
			}
		} else if (!gameState && !retryState) {
			switch (event.code) {
				case 'Enter':
					event.preventDefault();
					startGame();
					break;
				default:
					break;
			}
		} else if (!gameState && retryState) {
			switch (event.code) {
				case 'Enter':
					event.preventDefault();
					retryGame();
					break;
				default:
					break;
			}
		}
	}

	const paddedMinutes = minutes.toString().padStart(2, '0');
	const paddedSeconds = seconds.toString().padStart(2, '0');

	return (
		<div className="wrapper">
			<header>
				<h2>
					Movement: Arrow keys / Rotate: Z, X / Hold: C / Hard drop: Space / New
					game: Enter
				</h2>
			</header>
			<div onKeyDown={action} tabIndex={-1} className="game">
				<div className="tetrominostorage-container">
					<h2 className="box-title">HOLD</h2>
					<TetrominoStorage
						getTetrominoPoints={getTetrominoPoints}
						tetromino={storedTetrominoState.tetromino}
						getTetromino={getTetromino}
					/>
				</div>
				<div className="score">
					<h2>
						Lines cleared: <span>{scoreState.linesCleared}</span>
					</h2>
					<h2>
						Time:
						<span>
							{paddedMinutes} : {paddedSeconds}
						</span>
					</h2>
				</div>
				<div className="gamebox-container">
					<div className="gameover">
						{retryState && <h2 className="box-title">Game Over</h2>}
					</div>
					<GameBox
						tetrionState={tetrionState}
						currentTetrominoState={currentTetrominoState}
						getTetrominoPoints={getTetrominoPoints}
						getHardDropPreview={getHardDropPreview}
					/>
				</div>
				<div className="tetrominoesqueue-container">
					<h2 className="box-title">NEXT</h2>
					<TetrominoesQueue
						tetrominoesQueueState={tetrominoesQueueState}
						getTetrominoPoints={getTetrominoPoints}
						getTetromino={getTetromino}
					/>
				</div>
			</div>
			<ScoreBoard>
				<ScoreForm score={scoreState} retryState={retryState} />
				<ScoreBoardList />
			</ScoreBoard>
		</div>
	);
}
