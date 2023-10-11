import chalk from 'chalk';

const log = console.log;

export const logIp = (req: any) => {
	log(
		chalk.blue.bold(
			'INFO - Received request to: ' +
				chalk.white(req.path) +
				' IP ' +
				chalk.white(req.ip) +
				' Method ' +
				chalk.white(req.method)
		)
	);
};
export const logError = (error: any) => log(chalk.red.bold('Error: ') + error);

export const logSuccess = (subject: any, action: any) => {
	log(
		chalk.green.bold('SUCCESS - ') +
			chalk.greenBright(subject) +
			' has been ' +
			chalk.greenBright(action)
	);
};
