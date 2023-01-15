import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config({ path: `./environment/.env` });

export default function connectToDb() {
	mongoose
		.set("strictQuery", true)
		.connect(process.env.DB_HOST)
		.catch((err) => {
			console.log("Unable to connect to MongoDB");
		});
}
