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

export default catchAsyncErrors;
