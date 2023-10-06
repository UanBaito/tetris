import { tetromino } from './interfaces';

export const L = {
	shape: 'L',
	color: 'blue',
	facing: 0,
	moving: true,
	coords: {
		axis: {
			x: 4,
			y: 1
		},
		shapeCoords: {
			facingUpPoints: [
				[0, 0],
				[-1, 0],
				[1, 0],
				[-1, -1]
			],
			facingRightPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[1, -1]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[-1, 0],
				[1, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[-1, 1]
			]
		}
	}
};

export const I = {
	shape: 'I',
	color: 'cyan',
	facing: 0,
	moving: true,
	coords: {
		axis: {
			x: 4,
			y: 0
		},

		shapeCoords: {
			facingUpPoints: [
				[0, 0],
				[-1, 0],
				[1, 0],
				[2, 0]
			],
			facingRightPoints: [
				[0, 0],
				[0, -1],
				[0, 1],
				[0, 2]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[-1, 0],
				[-2, 0]
			],
			facingLeftPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[0, -2]
			]
		}
	}
};

export const O = {
	shape: 'O',
	color: 'yellow',
	facing: 0,
	moving: true,
	coords: {
		axis: {
			x: 4,
			y: 0
		},
		shapeCoords: {
			facingUpPoints: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1]
			],
			facingRightPoints: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1]
			]
		}
	}
};

export const iOffsetData = [
	[
		[0, 0],
		[-1, 0],
		[2, 0],
		[-1, 0],
		[2, 0]
	],
	[
		[-1, 0],
		[0, 0],
		[0, 0],
		[0, -1],
		[0, 2]
	],
	[
		[-1, -1],
		[1, -1],
		[-2, -1],
		[1, 0],
		[-2, 0]
	],
	[
		[0, -1],
		[0, -1],
		[0, -1],
		[0, 1],
		[0, -2]
	]
];

export const jlstzOffsetData = [
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	],
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[0, -2],
		[1, -2]
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	],
	[
		[0, 0],
		[-1, 0],
		[-1, +1],
		[0, -2],
		[-1, -2]
	]
];
