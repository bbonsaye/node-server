import jwt from "jsonwebtoken";

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60;

export default function createToken(user) {
	const id = user._id;
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
		algorithm: "HS256",
	});
}
