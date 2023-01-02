import User from "../model/usersSchema.js";
import createToken from "../utils/createToken.js";
import { handleErrors } from "../utils/middleware/errorHandlingMiddleware/index.js";
// -----------------------------------

function login_get(req, res) {
	res.render("login", { tapTitle: "Login", returnTo: req.query.returnTo });
}

async function login_post(req, res) {
	const { email, password, returnTo } = req.body;

	console.log('returnTo', returnTo)

	try {
		const user = await User.login(email, password);
		const token = createToken(user);
		res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 60 });

		res.status(200);
		res.json({ user: user._id, returnTo });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400);
		res.json({ errors });
	}
}

function signup_get(req, res) {
	res.render("signup", { tapTitle: "Signup" });
}

async function signup_post(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });
		const token = createToken(user);

		res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 60 });
		res.status(201);
		res.json({ user: user._id });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400);
		res.json({ errors });
	}
}

function logout_get(req, res) {
	res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
	res.redirect("/");
}

export default {
	login_get,
	login_post,
	signup_get,
	signup_post,
	logout_get,
};
