import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config({ path: `./environment/.env` });
process.env.NODE_ENV ? dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` }) : "";

export default function connectToDb() {
	return Promise.resolve(
		mongoose
			.set("strictQuery", true)
			.connect(process.env.DB_HOST)
			.catch((err) => {
				throw new Error("Unable to connect to MongoDB");
			})
	);
}
