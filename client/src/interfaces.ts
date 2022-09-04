export interface tetromino {
	shape: string;
	color: string;
	facing: number;
	coords: {
		axis: {
			x: number;
			y: number;
		};
		shapeCoords: {
			facingUpPoints: Array<Array<number>>;
			facingRightPoints?: Array<Array<number>>;
			facingDownPoints?: Array<Array<number>>;
			facingLeftPoints?: Array<Array<number>>;
		};
	};
}
