export default function errorResponder(error, req, res, next) {
	console.log("---------------------");
	console.log("Within errorResponder");
	res.status(error.statusCode || 500);
	res.json({ errors: error.errors || "programmatic error occurred" });
	// next(error);
	console.log("End of errorResponder");
	console.log("---------------------");
}
