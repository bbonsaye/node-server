export default function errorLogger(error, req, res, next) {
	console.log("-----------------");
	console.log("within errorLogger");

	if (process.env.NODE_ENV === "development") {
		console.log("development logs:");
		console.log(error);
	}
	//
	else if (process.env.NODE_ENV === "production") {
		console.log("production logs:");
		console.log("-----------------");
		console.log(error.message);
		console.log(error.statusCode);
	}

	next(error);
}
