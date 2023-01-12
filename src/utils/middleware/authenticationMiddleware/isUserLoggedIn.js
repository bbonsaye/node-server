import User from "../../../model/usersSchema.js";
import jwt from "jsonwebtoken";

export default function isUserLoggedIn(req, res, next) {
	const jsonWebToken = req.cookies.jwt;

	if (jsonWebToken) {
		//
		jwt.verify(jsonWebToken, process.env.JWT_SECRET, async (error, decodedToken) => {
			if (error) {
				console.log(error.message);
				res.locals.user = "";
				next();
			} //
			else {
				const user = await User.findById(decodedToken.id).lean();
				res.locals.user = user;
				next();
			}
		});
	} //
	else {
		console.log("user is not logged in");
		res.locals.user = "";
		next();
	}
}
