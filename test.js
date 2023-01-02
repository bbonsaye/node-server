function hof(fn) {
	return function inner(z, y) {
		Promise.resolve(fn(z, y)).catch((error) => console.log(error.message));
	};
}

function add(z, y) {
	return z + y;
}

console.log(hof(add));
