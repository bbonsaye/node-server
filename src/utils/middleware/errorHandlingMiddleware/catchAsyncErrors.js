// keeping this around just incase Express 5.0 breaks but "catchAsyncErrors" utility function is no longer needed.
// As errors from asynchronous code are automatically passed to the next() function -> next(error)

// Different ways to write a tryCatch HOF function.
// Method 1
function catchAsyncErrors(controller) {
	return function inner(req, res, next) {
		Promise.resolve(controller(req, res, next)).catch(next);
	};
}

// Method 2
// const catchAsyncErrors = (controller) => (req, res, next) => {
// 	Promise.resolve(controller(req, res, next)).catch(next);
// };

// Method 3
// function catchAsyncErrors(controller) {
// 	return async function inner(req, res, next) {
// 		try {
// 			await controller(req, res);
// 		} catch (error) {
// 			return next(error);
// 		}
// 	};
// }

// Method 4
// Download express-async-errors and import it

export default catchAsyncErrors;
