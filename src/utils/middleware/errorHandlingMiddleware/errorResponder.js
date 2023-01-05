export default function errorResponder(error, req, res, next) {
	res.status(error.statusCode || 500);
	res.json({ errors: error.errors });
}
