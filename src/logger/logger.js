import * as dotenv from "dotenv";

process.env.NODE_ENV
	? dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` })
	: dotenv.config({ path: `./environment/.env` });

import winston from "winston";
const { json, timestamp, combine } = winston.format;

import morgan, { format } from "morgan";

// -----------------------------------------------------
// https://medium.com/@sam-king/http-logging-with-morgan-and-winston-eec9bc0e812c

// Winston Settings
// ---------------------------------------------------------------
// file names
// ---------------------------------------------------------------

const fileNames = {
	error: "./src/logger/logs/errors.json",
	errorsReadable: "./src/logger/logs/errorsReadable.log",

	warn: "./src/logger/logs/warnings.json",
	warnReadable: "./src/logger/logs/warnReadable.log",

	combined: "./src/logger/logs/combined.json",
	combinedReadable: "./src/logger/logs/combinedReadable.log",

	exception: "./src/logger/logs/exceptions.json",
	exceptionReadable: "./src/logger/logs/exceptionReadable.log",

	// handleExceptions and handleRejections, seem to be handling all thrown errors?
	// rejection: "./src/logger/logs/rejections.json",
	// rejectionReadable: "./src/logger/logs/rejectionReadable.log",
};

// ---------------------------------------------------------------
// logging filters
// ---------------------------------------------------------------
const errorFilter = winston.format((loggedMsg) => {
	return loggedMsg.level === "error" ? loggedMsg : false;
});

const warnFilter = winston.format((loggedMsg) => {
	return loggedMsg.level === "warn" ? loggedMsg : false;
});

// ---------------------------------------------------------------
// logging formats
// ---------------------------------------------------------------
const readableLogFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
	return `${timestamp} ${level.toUpperCase()} ${stack || message}\n`;
});

const developmentLogFormat = combine(
	// when using winston.format.cli() timestamp doesn't show up
	// winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.cli()
);

const productionLogFormat = combine(timestamp(), json());

// ---------------------------------------------------------------
// transports
// ---------------------------------------------------------------
const transports = [
	new winston.transports.File({ filename: fileNames.error, format: combine(errorFilter(), json()) }),
	new winston.transports.File({ filename: fileNames.errorsReadable, format: errorFilter() }),

	new winston.transports.File({ filename: fileNames.warn, format: combine(warnFilter(), json()) }),
	new winston.transports.File({ filename: fileNames.warnReadable, format: warnFilter() }),

	// level: "debug", because I want debug level information no matter what NODE_ENV application is running in
	new winston.transports.File({ filename: fileNames.combined, level: "debug", format: json() }),
	new winston.transports.File({ filename: fileNames.combinedReadable, level: "debug" }),
];

const exceptionHandlers = [
	// the specified format: json(), isn't working, both files get logged in "readableLogFormat"
	// new winston.transports.File({ filename: fileNames.exception, format: json() }),
	new winston.transports.File({ filename: fileNames.exceptionReadable }),
];
// const rejectionHandlers = [new winston.transports.File({ filename: fileNames.rejection })];

// ---------------------------------------------------------------
// logger instance
// ---------------------------------------------------------------

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,

	// by default, the logging format is Production just incase "NODE_ENV=development, testing" is not passed in
	// winston.format.errors({ stack: true } having it or not doesn't seem to change the error output, however, it's recommended to include that
	format: combine(winston.format.errors({ stack: true }), timestamp(), readableLogFormat),

	// defaultMeta: { service: "" },
	transports: transports,
	exceptionHandlers: exceptionHandlers,
	// handleExceptions and handleRejections, seem to be handling all thrown errors?
	// rejectionHandlers: rejectionHandlers,
});

// ---------------------------------------------------------------
// CONSOLE: if not in production environment, log to the console
// ---------------------------------------------------------------
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: developmentLogFormat,
			handleExceptions: true,
			//  handleExceptions and handleRejections, seem to be handling all thrown errors?
			// handleRejections: true,
		})
	);
}

logger.error("erroring log message");
logger.warn("warning log message");
logger.info("information log message");
logger.http("HypterText Transfer Protocol log message");
console.log(process.env.NODE_ENV);
console.log(undefinedVariable);

// throw new Error("something went wrong");
// logger event listeners

// -----------------------------------------------------

// Morgan Settings
// const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", {
// 	stream: {
// 		write: (message) => logger.info(message.trim()),
// 	},
// });

// app.use(morganMiddleware);

export { logger };
