export default function handleErrors(error) {
	const errors = { email: "", password: "" };

	// signup errors
	if (error.code === 11000) {
		errors["email"] = "This email is already registered";
	}

	if (error.message.includes("user validation failed:")) {
		Object.values(error.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	// login errors
	if (error.message.includes("The password is incorrect")) {
		errors["email"] = error.message;
	}

	if (error.message.includes("That email is not registered")) {
		errors["email"] = error.message;
	}

	console.log(errors.email, errors.password);
	return errors;
}
