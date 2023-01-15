function sum(...args) {
	return args.reduce((total, num) => total + num, 0);
	console.log(total);
}

sum(2, 3, 4, 5);
