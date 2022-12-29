import jwt from "jsonwebtoken";

export default function requireUserAuth(req, res, next) {
	const jsonWebToken = req.cookies.jwt;

	if (jsonWebToken) {
		jwt.verify(jsonWebToken, "thisIsSoSecret", (error, decodedToken) => {
			//
			if (error) {
				console.log(error.message);
				res.redirect("/login");
			} //
			else {
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQxZjU5ZjM4MmIxNGZmOWZlNmE0YyIsImlhdCI6MTY3MjI5MDEzNywiZXhwIjoxNjcyNTQ5MzM3fQ.4bG53lSqNjaOUAc6_Fv8lUcJgpGSW-qGwl82gICQwqU
