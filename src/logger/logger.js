import * as dotenv from "dotenv";

process.env.NODE_ENV
	? dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` })
	: dotenv.config({ path: `./environment/.env` });

console.log(`\nEnvironment: ${process.env.NODE_ENV}`);
console.log(`Log Level: ${process.env.LOG_LEVEL}\n`);

import winston from "winston";
import "winston-daily-rotate-file";

const { json, timestamp, combine } = winston.format;

import morgan, { format } from "morgan";

// -----------------------------------------------------
// https://medium.com/@sam-king/http-logging-with-morgan-and-winston-eec9bc0e812c

// Winston Settings
// ---------------------------------------------------------------
// file names
// ---------------------------------------------------------------

const dirName = "./src/logger/logs";

const fileNames = {
	error: "errors",
	errorsReadable: "errorsReadable",

	warn: "warnings",
	warnReadable: "warnReadable",

	combined: "combined",
	combinedReadable: "combinedReadable",

	exception: "exceptions",
	exceptionReadable: "exceptionReadable",

	// handleExceptions and handleRejections, seem to be handling all thrown errors?
	rejection: "rejections",
	rejectionReadable: "rejectionReadable",
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
// DailyRotateFile Configuration
// ---------------------------------------------------------------
const rotateConfig = {
	dirname: dirName,
	extension: ".log",

	// will archive deleted log files
	zippedArchive: true,

	// logs will be separated by the minute if
	// datePattern: "YYYY-MM-DD-HHmm",
	datePattern: "YYYY-MM-DD",

	// will rotate if file size reaches 30 megabytes or 30 days have passed
	maxSize: "30m",
	maxFiles: "30d",
};

const rotateJsonConfig = {
	...rotateConfig,
	// "extension" overrides the one set in "const DailyRotateFileConfig"
	extension: ".json",
};

// ---------------------------------------------------------------
// Transports
// ---------------------------------------------------------------
const transports = [
	new winston.transports.DailyRotateFile({
		filename: fileNames.errorsReadable,
		format: errorFilter(),
		...rotateConfig,
	}),
	new winston.transports.DailyRotateFile({
		filename: fileNames.error,
		format: combine(errorFilter(), json()),
		...rotateJsonConfig,
	}),

	new winston.transports.DailyRotateFile({
		filename: fileNames.warnReadable,
		format: warnFilter(),
		...rotateConfig,
	}),
	new winston.transports.DailyRotateFile({
		filename: fileNames.warn,
		format: combine(warnFilter(), json()),
		...rotateJsonConfig,
	}),

	// level: "silly", because I want silly level information no matter what NODE_ENV is set to
	new winston.transports.DailyRotateFile({
		filename: fileNames.combinedReadable,
		level: "silly",
		...rotateConfig,
	}),
	new winston.transports.DailyRotateFile({
		filename: fileNames.combined,
		level: "silly",
		format: json(),
		...rotateJsonConfig,
	}),
];

const exceptionHandlers = [
	// the specified format: json(), isn't working, both files get logged in "readableLogFormat"
	new winston.transports.DailyRotateFile({
		filename: fileNames.exceptionReadable,
		...rotateConfig,
	}),
	// new winston.transports.DailyRotateFile({ filename: fileNames.exception, ...rotateJsonConfig }),
];
const rejectionHandlers = [
	new winston.transports.DailyRotateFile({
		filename: fileNames.rejectionReadable,
		...rotateConfig,
	}),
	// new winston.transports.DailyRotateFile({ filename: fileNames.rejection, ...rotateJsonConfig }),
];

// ---------------------------------------------------------------
// logger instance
// ---------------------------------------------------------------

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,

	// by default, the logging format is Production just incase "NODE_ENV=development, testing" is not passed in
	// winston.format.errors({ stack: true } having it or not doesn't seem to change the error output, however, it's recommended to include that
	format: combine(winston.format.errors({ stack: true }), timestamp(), readableLogFormat),

	// defaultMeta: { service: "" },

	// transports, exceptionHandlers, and rejectionHandlers is what tells the logger what files to write to.
	// These do not create the files. The files were created within the transport
	// definitions above under "Transports"
	transports: transports,
	exceptionHandlers: exceptionHandlers,
	rejectionHandlers: rejectionHandlers,

	// By default, winston will exit after logging an uncaughtException. This option prevents exiting.
	// if there is any asynchronous code in the Nodejs queues, after executing that code, it will exit.
	// exitOnError: false,
});

// ---------------------------------------------------------------
// CONSOLE: if not in production environment, log to the console
// ---------------------------------------------------------------
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: developmentLogFormat,

			// handleExceptions and, handleRejections are for the error to be output in the Console transport
			handleExceptions: true,
			handleRejections: true,
		})
	);
}

logger.error("erroring log message");
logger.warn("warning log message");
logger.info("information log message");
logger.http("HypterText Transfer Protocol log message");
logger.verbose("verbose log message");
logger.debug("debuglog message");
logger.silly("silly message");

// console.log(process.env.NODE_ENV);
// fetch("https://websiteDoe22222sNotExist.com");

// setTimeout(() => {
// 	console.log(undefinedVariable);
// }, 25000);
// console.log(undefinedVariable);
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
