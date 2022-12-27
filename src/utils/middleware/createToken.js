import jwt from "jsonwebtoken";

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60;

export default function createToken({ id }) {
	return jwt.sign({ id }, "thisIsSoSecret", {
		expiresIn: maxAge,
	});
}
