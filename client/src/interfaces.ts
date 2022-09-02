export interface tetromino {
	shape: string;
	color: string;
	coords: {
		x: number;
		y: number;
	};
	facing: string;
}
