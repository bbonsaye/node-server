export default function containsNumber(password) {
	let hasNumber = false;
	const numbers = "0123456789";

	for (let number of numbers) {
		if (password.includes(number)) {
			hasNumber = true;
		}
	}
	return hasNumber;
}
