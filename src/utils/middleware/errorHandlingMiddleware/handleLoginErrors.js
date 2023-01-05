export default function handleLoginErrors(error, req, res, next) {
	console.log("---------------------");
	console.log("within handleLoginErrors");
	next(error);
}
