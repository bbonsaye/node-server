import jwt from "jsonwebtoken";

export default function loginRequired(req, res, next) {
	const jsonWebToken = req.cookies.jwt;

	if (jsonWebToken) {
		jwt.verify(jsonWebToken, process.env.JWT_SECRET, (error, decodedToken) => {
			//
			if (error) {
				console.log(error.message);
				// the query is so that the user can be redirected to the /smoothies page
				res.redirect("/login?returnTo=/smoothies");
			} //
			else {
				next();
			}
		});
	} else {
		res.redirect("/login?returnTo=/smoothies");
	}
}
