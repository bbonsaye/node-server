import express from "express";

import livereload from "livereload";
import connectLiveReload from "connect-livereload";

import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

//
// -----------------------------------------------------
// route imports

import authRoutes from "./src/routes/authRoutes.js";
import errorRoutes from "./src/routes/errorRoutes.js";
import smoothieRoutes from "./src/routes/smoothieRoutes.js";

//
// -----------------------------------------------------
// middleware imports
import isUserLoggedIn from "./src/utils/middleware/isUserLoggedInMiddleware.js";
import saveOriginalUrl from "./src/utils/middleware/saveOriginalUrlMiddleware.js";

//
// -----------------------------------------------------

// TODO: put all errors in one place. Does it make sense to
// take out the errors for the UserSchema and put them in handleErrors.js?

//
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

//
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

//
// -----------------------------------------------------
// template engine settings

app.engine(".hbs", engine({ extname: ".hbs", helpers: {} }));
app.set("view engine", ".hbs");
// const viewFolder = await fs.realpath("./src/views");
app.set("views", "src/views");

//
// -----------------------------------------------------
// database settings & app.listen()

// "mongodb+srv://testingMongoDB:testingMongoDB@delicious.f7hlt8l.mongodb.net/node-authorization";
// "mongodb://localhost:27017"

const dbURI = "mongodb://127.0.0.1:27017/drinks";
mongoose
	.set("strictQuery", true)
	.connect(dbURI)
	.then((result) => {
		console.log("Connected to MongoDB.");
		console.log("App URL: http://localhost:3000\n");
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
		res.status(400);
		res.send("Error, user not created");
	});

//
// -----------------------------------------------------
// routes;

app.get("/", (req, res) => {
	res.render("home", { tapTitle: "Home" });
});

app.use(smoothieRoutes);
app.use(authRoutes);
app.use(errorRoutes);
