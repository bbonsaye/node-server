export default function errorResponder(error, req, res, next) {
	console.log("Within error responder");
	res.status(error.statusCode || 500);
	res.json({ errors: error.errors });
}
