import validator from "../es/index.js";

const form = document.querySelector("#login") || document.querySelector("#signup");
const emailError = document.querySelector(".error.email");
const passwordError = document.querySelector(".error.password");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	// input field values
	const email = event.target.email.value;
	const password = event.target.password.value;

	if (form.id === "login") {
		console.log("LOGIN RESPONSE:");
		const returnTo = event.target.returnTo.value || "";

		try {
			const res = await fetch("/login", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
					returnTo,
				}),
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();

			if (data.errors) {
				console.log(data.errors);
				emailError.textContent = data.errors["email"];
				passwordError.textContent = data.errors["password"];
			}

			data.returnTo ? window.location.assign(data.returnTo) : window.location.assign("/");
		} catch (error) {
			console.log("front-end log in try/catch error");
		}
	}

	if (form.id === "signup") {
		console.log("SIGNUP RESPONSE:");

		const passwordCheck = event.target["password-check"].value;
		try {
			const res = await fetch("/signup", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			if (data.errors) {
				emailError.textContent = data.errors.email;
				passwordError.textContent = data.errors.password;
			}

			if (data.user) {
				window.location.assign("/");
			}
		} catch (error) {
			console.log("front-end sign up try/catch error");
		}
	}
});
