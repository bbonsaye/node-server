// https://flaviocopes.com/how-to-list-object-methods-javascript/
export default function getMethods(obj) {
	let properties = new Set();
	let currentObj = obj;
	do {
		Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item));
	} while ((currentObj = Object.getPrototypeOf(currentObj)));
	return [...properties.keys()].filter((item) => typeof obj[item] === "object");
}
