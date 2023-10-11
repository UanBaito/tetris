import { MutableRefObject, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { difficulties } from '../constants';

type configBoxProps = {
	difficulty: number;
	changeDifficulty: (raiseBy: 1 | -1) => void;
	gameState: boolean;
};

export default function ConfigBox({
	difficulty,
	changeDifficulty,
	gameState
}: configBoxProps) {
	return (
		<section className="config-box">
			<div className="difficulty">
				<h1>Difficulty</h1>
				<DifficultySlider
					difficulty={difficulty}
					changeDifficulty={changeDifficulty}
					gameState={gameState}
				/>
			</div>
		</section>
	);
}

type difficultySliderProps = {
	difficulty: number;
	changeDifficulty: (raiseBy: 1 | -1) => void;
	gameState: boolean;
};

export function DifficultySlider({
	difficulty,
	changeDifficulty,
	gameState
}: difficultySliderProps) {
	function handleChangeDifficulty(raiseBy: -1 | 1) {
		changeDifficulty(raiseBy);
	}

	return (
		<div className="difficulty-slider">
			<button
				className="difficulty-slider-button"
				onClick={() => {
					handleChangeDifficulty(-1);
				}}
				disabled={difficulty === 0 || gameState === true}
			>
				<FaChevronLeft />
			</button>
			<span>
				<h2>{difficulties[difficulty]}</h2>
			</span>
			<button
				className="difficulty-slider-button"
				onClick={() => {
					handleChangeDifficulty(1);
				}}
				disabled={difficulty === difficulties.length - 1 || gameState === true}
			>
				<FaChevronRight />
			</button>
		</div>
	);
}
