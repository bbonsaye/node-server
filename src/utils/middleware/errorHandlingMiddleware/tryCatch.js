// Different ways to write a tryCatch HOF function.
// Method 1
function tryCatch(fn) {
	return function inner(req, res, next) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

// Method 2
// const tryCatch = (fn) => (req, res, next) => {
// 	Promise.resolve(fn(req, res, next)).catch(next);
// };

// Method 3
// function tryCatch(controller) {
// 	return async function inner(req, res, next) {
// 		try {
// 			await controller(req, res);
// 		} catch (error) {
// 			return next(error);
// 		}
// 	};
// }

export default tryCatch;
