export default function containsLetter(password) {
	let hasLetter = false;
	const alphabet = "abcdefghijklmnopqurstuvwxyz";

	for (let letter of alphabet) {
		if (password.toLowerCase().includes(letter)) {
			hasLetter = true;
		}
	}
	return hasLetter;
}
