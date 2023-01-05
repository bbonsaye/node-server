class AuthErrors extends Error {
	constructor({ email = "", password = "" }, statusCode = 400) {
		// passes in string becomes the value for "message" property on Error object
		super(email || password);

		if (this instanceof LoginError) {
			this.type = "login";
		}
		//
		if (this instanceof SignupError) {
			this.type = "signup";
		}

		this.errors = { email, password };
		this.statusCode = statusCode;
	}
}

class LoginError extends AuthErrors {}
class SignupError extends AuthErrors {}

export { AuthErrors, LoginError, SignupError };
