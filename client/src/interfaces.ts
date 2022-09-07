export interface tetromino {
	shape: string;
	color: string;
	facing: number; ///Current rotation, 0 = up, 1 = right, 2 = down, 3 = left.
	moving: boolean;
	coords: {
		/**
		 * This is the position of the square that the other squares will rotate around.
		 * When this property is updated, the other squares will be mapped around it.
		 * This could be considered the "true" position of the entire tetromino.
		 */
		axis: {
			x: number;
			y: number;
		};
		/**
		 * The shapeCoords property tells where the squares around the axis are
		 * depending on the rotation, describing the shape of the tetromino
		 */
		shapeCoords: {
			///(x, y)
			facingUpPoints: Array<Array<number>>;
			facingRightPoints?: Array<Array<number>>;
			facingDownPoints?: Array<Array<number>>;
			facingLeftPoints?: Array<Array<number>>;
		};
	};
}
