import User from "../../src/model/usersSchema.js";
import connectToDb from "../../src/database/mongoDb.js";
import { describe, expect, it } from "vitest";

connectToDb();

// -------------------------------------------------
// examples

test("should work as expected", () => {
	expect(Math.sqrt(4)).toBe(2);
});

function sum(...args) {
	return args.reduce((total, num) => total + num, 0);
}

describe("#sum", () => {
	it("returns the total sum of multiple numbers", () => {
		expect(sum(2, 2, 2)).toBe(6);
	});

	it("returns the same number when called with one number", () => {
		expect(sum(7)).toBe(7);
	});

	it("returns 0 when called with no numbers", () => {
		expect(sum(0)).toBe(0);
	});
});

// -------------------------------------------------
// sign in test
const logInInfo = { email: "", password: "testing1" };

// describe("#login", () => {
// 	it("will throw an error if called with an empty email field", () => {
// 		expect();
// 	});
// });

// it("should throw an error if called with an empty email", () => {
// 	expect(async () => {
// 		await User.create({
// 			email: logInInfo.email,
// 			password: logInInfo.password,
// 		});
// 	}).toThrow("Please enter an email.");
// });

// try {
// 	const res = await User.login(logInInfo.email, logInInfo.password);
// 	console.log(res);
// } catch (error) {
// 	console.log(error.message);
// }

// -------------------------------------------------
// how to pass these errors throguh my error setup I already have
// sign up test

// const signUpInfo = {
// 	email: "toadNew222s222ss@gmail.com",
// 	password: "123s21312321",
// };

// try {
// 	const res = await User.create({
// 		email: signUpInfo.email,
// 		password: signUpInfo.password,
// 	});
// 	console.log(`res: ${res}`);
// 	// console.log(res);
// } catch (error) {
// 	console.log(error instanceof SignupError);
// 	// console.log(error);
// }
