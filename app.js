// TODO: put all errors in one place. Does it make sense to
// take out the errors for the UserSchema and put them in handleErrors.js?

// TODO: ass client-side form validation because it's a good UI practice.
// -----------------------------------------------------

// process.env variables
import * as dotenv from "dotenv";
process.env.NODE_ENV
	? dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` })
	: dotenv.config({ path: `./environment/.env` });

import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";

// -----------------------------------------------------
// middleware imports
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import cookieParser from "cookie-parser";
import { isUserLoggedIn } from "./src/utils/middleware/authenticationMiddleware/index.js";

// -----------------------------------------------------
// route imports
import homePageRoute from "./src/routes/homePageRoute.js";
import authRoutes from "./src/routes/authRoutes.js";
import pageNotFound from "./src/routes/pageNotFound.js";
import smoothieRoutes from "./src/routes/smoothieRoutes.js";

// -----------------------------------------------------
// error handling middleware imports
import { errorLogger, errorResponder } from "./src/utils/middleware/errorHandlingMiddleware/index.js";

// -----------------------------------------------------
// hot module reload for browser

// setting up livereload and connect-livereload modules
// so that the browser refreshes whenever nodemon restarts the server
// on changes to any files within the whole project directory
// https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o#:~:text=Create%20a%20Livereload%20server%20and,refresh(%22%2F%22)%3B%20.
const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 5);
});

const app = express();

// -----------------------------------------------------
// template engine settings

app.engine(".hbs", engine({ extname: ".hbs", helpers: {} }));
app.set("view engine", ".hbs");
// const viewFolder = await fs.realpath("./src/views");
app.set("views", "src/views");

// -----------------------------------------------------
// database settings & app.listen()

mongoose
	.set("strictQuery", true)
	.connect(process.env.DB_HOST)
	.then((result) => {
		console.log("Connected to MongoDB.");
		console.log("App URL: http://localhost:3000\n");
		app.listen(process.env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});

// -----------------------------------------------------
// middleware usage

//for adding the Livereload script to the response.
app.use(connectLiveReload());

app.use(express.static("src/public", { extensions: ["js"] }));
// for incoming form data
app.use(express.urlencoded({ extended: true }));
// for incoming json data
app.use(express.json());
app.use(cookieParser());
app.use("*", isUserLoggedIn);

// -----------------------------------------------------
// routes;

app.use(homePageRoute);
app.use(smoothieRoutes);
app.use(authRoutes);
app.use(pageNotFound);

// -----------------------------------------------------
// error handling middleware

app.use(errorLogger);
app.use(errorResponder);
