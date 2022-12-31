import jwt from "jsonwebtoken";

export default function requireUserAuth(req, res, next) {
	const jsonWebToken = req.cookies.jwt;

	if (jsonWebToken) {
		jwt.verify(jsonWebToken, "thisIsSoSecret", (error, decodedToken) => {
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
