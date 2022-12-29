export default function logging(req, res, next) {
	console.log("-----------------------hello world--------------------------");
	next();
}
