import { tetromino } from './interfaces';

const L = {
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

const I = {
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

const O = {
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

const J = {
	shape: 'J',
	color: 'orange',
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
				[1, -1]
			],
			facingRightPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[1, 1]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[-1, 0],
				[-1, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[-1, -1]
			]
		}
	}
};

const T = {
	shape: 'T',
	color: 'purple',
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
				[1, 0],
				[-1, 0],
				[0, -1]
			],
			facingRightPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[1, 0]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[-1, 0],
				[0, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[0, 1],
				[0, -1],
				[-1, 0]
			]
		}
	}
};

const S = {
	shape: 'S',
	color: 'green',
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
				[1, -1],
				[0, -1]
			],
			facingRightPoints: [
				[0, 0],
				[0, -1],
				[1, 0],
				[1, 1]
			],
			facingDownPoints: [
				[0, 0],
				[1, 0],
				[-1, 1],
				[0, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[0, 1],
				[-1, 0],
				[-1, -1]
			]
		}
	}
};

const Z = {
	shape: 'Z',
	color: 'red',
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
				[0, -1],
				[1, 0],
				[-1, -1]
			],
			facingRightPoints: [
				[0, 0],
				[0, 1],
				[1, 0],
				[1, -1]
			],
			facingDownPoints: [
				[0, 0],
				[1, 1],
				[-1, 0],
				[0, 1]
			],
			facingLeftPoints: [
				[0, 0],
				[0, -1],
				[-1, 0],
				[-1, 1]
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

export const tetrominoes = [I, L, J, O, S, T, Z];
export const difficulties = ['easy', 'normal', 'hard'];
