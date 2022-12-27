import User from "../model/users.js";
import { handleErrors, createToken } from "../utils/middleware/index.js";
// -----------------------------------

function signupGet(req, res) {
	res.render("signup", { tapTitle: "Signup" });
}

async function signupPost(req, res) {
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
		res.json(errors);
	}
}

function loginGet(req, res) {
	res.render("login", { tapTitle: "Login" });
}

async function loginPost(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken({ user });
		res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 60 });
		res.status(200);
		res.json({ user: user._id });
	} catch (error) {
		console.log(error.message);
		res.status(400);
		res.json({});
	}
}

export default {
	signupGet,
	signupPost,
	loginGet,
	loginPost,
};
