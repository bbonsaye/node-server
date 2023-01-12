// "uncaughtException" doesn't handle synchronous errors thrown from imported modules. Therefore,
// "uncaughtException" errors are being handled by Winston, which, is able to handle synchronous code thrown
// from imported files.

// process.on("uncaughtException", (error) => {
// 	console.log("--------------------");
// 	console.log("within uncaughtException");
// 	console.log(error);
// 	process.exit(1);
// });

// unhandledRejection is also being handled by Winston, although, it works as expected on "process" object
// process.on("unhandledRejection", (error) => {
// 	console.log("--------------------");
// 	console.log("within unhandledRejection");
// 	console.log(error);
// 	process.exit(1);
// });
//  process.on("uncaughtException"){} is at the top of the file
