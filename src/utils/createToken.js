import jwt from "jsonwebtoken";

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60;
const secret = "thisIsSoSecret";

export default function createToken(user) {
	const id = user._id;
	return jwt.sign({ id }, secret, { expiresIn: maxAge, algorithm: "HS256" });
}
