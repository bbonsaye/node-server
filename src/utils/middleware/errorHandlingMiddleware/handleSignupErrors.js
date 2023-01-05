import { SignupError } from "../errorHandlingMiddleware/index.js";

export default function handleSignupErrors(error, req, res, next) {
	console.log("Within handleSignupErrors");
	console.log(error.message);
	console.log(error._message);

	if (error.code === 11000) {
		console.log(error.code);
		throw new SignupError({ email: "This email is already registered" });
	}

	if (error.message.includes("user validation failed:")) {
		const path = properties.path;
		const message = properties.message;
		throw new SignupError({ path: message });
	}

	next(error);
}
