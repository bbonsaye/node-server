class AuthErrors extends Error {
	constructor({ email = "", password = "" }, statusCode = 400) {
		// passes in string becomes the value for "message" property on Error object
		super(email || password);
		this.errors = { email, password };
		this.statusCode = statusCode;

		// the instance (LoginError or SignupError) and it's parent (AuthError) show up in the stack trace
		Error.captureStackTrace(this);
	}

	static badRequest(message) {
		return new SignupError(message);
	}
}

class LoginError extends AuthErrors {}
class SignupError extends AuthErrors {}

export { AuthErrors, LoginError, SignupError };
