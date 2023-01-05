export default function errorLogger(error, req, res, next) {
	console.log("---------------------");
	console.log("within errorLogger");
	// console.log(error);
	console.log(error.errors);
	console.log(error.statusCode);
	next(error);
}
