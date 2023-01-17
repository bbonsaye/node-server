import connectToDb from "../../../src/database/mongoDb.js";
import User from "../../../src/model/usersSchema.js";
import { LoginError } from "../../../src/utils/middleware/errorHandlingMiddleware/index.js";

describe("login()", () => {
	it("should not throw an error when correct email and password is provided", async () => {
		connectToDb();
		const loginInfo = { email: "yoshi@gmail.com", password: "testing12" };
		const user = async () => await User.login(loginInfo.email, loginInfo.password);
		// console.log(await user());

		expect(user).not.toThrowError();
	});

	it("should throw an error if provided email field is empty", async () => {
		const loginInfo = { email: "", password: "testing12" };
		const result = async () => await User.login(loginInfo.email, loginInfo.password);

		// rejects.toThrow() returns a Promise so we need to 'await' it
		await expect(result).rejects.toThrowError(/Please enter an email./);
	});

	it("should throw Error of type 'LoginError' if email or password isn't provided", async () => {
		const loginInfo = { email: "", password: "testing12" };
		const result = async () => await User.login(loginInfo.email, loginInfo.password);

		await expect(result).rejects.toThrowError(LoginError);
	});
});
