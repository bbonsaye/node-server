import { SignupError } from "../errorHandlingMiddleware/index.js";

export default function handleSignupErrors(error, req, res, next) {
	console.log("-------------------");
	console.log("Within handleSignupErrors");

	if (error.code === 11000) {
		throw new SignupError({ email: "This email is already registered" });
	}

	if (error.message.includes("user validation failed:")) {
		Object.values(error.errors).forEach(({ properties }) => {
			const typeOfError = properties.path;
			const message = properties.message;
			throw new SignupError({ [typeOfError]: message });
		});
	}
	next(error);
}
