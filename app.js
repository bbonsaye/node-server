import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import validator from "validator";
console.log(validator);
// -----------------------------------------------------

// route imports
import authRoutes from "./src/routes/authRoutes.js";
import errorRoutes from "./src/routes/errorRoutes.js";

const app = express();

// -----------------------------------------------------

// middleware
app.use(express.static("src/public"));
// for incoming form data
app.use(express.urlencoded({ extended: true }));
// for incoming json data
app.use(express.json());
app.use(cookieParser());

// -----------------------------------------------------

// template engine settings
app.engine(".hbs", engine({ extname: ".hbs", helpers: {} }));
app.set("view engine", ".hbs");
// const viewFolder = await fs.realpath("./src/views");
app.set("views", "src/views");

// -----------------------------------------------------

// database settings & app.listen()
const dbURI =
	"mongodb+srv://testingMongoDB:testingMongoDB@delicious.f7hlt8l.mongodb.net/node-authorization";
mongoose
	.set("strictQuery", true)
	.connect(dbURI)
	.then((result) => {
		console.log("Connected to MongoDB.");
		console.log("App URL: http://localhost:3000\n");
		app.listen(4000);
	})
	.catch((err) => {
		console.log(err);
		res.status(400);
		res.send("Error, user not created");
	});

// -----------------------------------------------------

// routes
app.get("/", (req, res) => {
	console.log(req.cookies);
	res.render("home", { tapTitle: "Home" });
});

app.get("/smoothies", (req, res) =>
	res.render("smoothies", { tapTitle: "Smoothies" })
);

app.use(authRoutes);
app.use(errorRoutes);
