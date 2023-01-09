import * as dotenv from "dotenv";

process.env.NODE_ENV
	? dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` })
	: dotenv.config({ path: `./environment/.env` });

import winston from "winston";
import morgan from "morgan";

// -----------------------------------------------------
// https://medium.com/@sam-king/http-logging-with-morgan-and-winston-eec9bc0e812c

// Winston Settings
const productionLogFormat = {
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
};

const developmentLogFormat = {
	format: winston.format.combine(
		winston.format.colorize(),
		// winston.format.errors({ stack: true }),
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(({ timestamp, level, message, stack }) => {
			return `${timestamp} ${level} ${stack || message}`;
		})
	),
};

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,
	productionLogFormat,
	// defaultMeta: { service: "" },
	transports: [
		new winston.transports.File({ filename: "./src/logger/logs/errors.log" }),
		new winston.transports.File({ filename: "./src/logger/logs/combined.log", level: "debug" }),
	],
});

// if not in production environment, log to the console at "debug" logging level
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			developmentLogFormat,
		})
	);
}

// logger event listeners
logger.info("CHILL WINSTON!", { seriously: true });

// -----------------------------------------------------

// Morgan Settings
// const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", {
// 	stream: {
// 		write: (message) => logger.info(message.trim()),
// 	},
// });

// app.use(morganMiddleware);

export { logger };
