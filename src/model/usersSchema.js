import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import { LoginError, SignupError } from "../utils/middleware/errorHandlingMiddleware/index.js";
import {
	containsLetter,
	containsNumber,
} from "../utils/mongooseValidators/passwordValidators/index.js";

class mySchema extends mongoose.Schema {}

const userSchema = new mySchema(
	{
		email: {
			type: String,
			required: [true, "Please enter an email."],
			unique: true,
			lowercase: true,
			validate: [isEmail, "Please enter a valid email address."],
		},
		password: {
			type: String,
			required: [true, "Please enter a password."],
			minlength: [6, "Minimum password length is 6 characters."],
			validate: [
				{
					validator: containsLetter,
					msg: "Password must contain at least one alphabet letter",
				},
				{
					validator: containsNumber,
					msg: "Password must contain at least one number",
				},
			],
		},
	},
	{
		timestamps: true,
	}
);

// -----------------------------------------------------------
// mongoose hooks:
// https://mongoosejs.com/docs/middleware.html

// pre: fire a callback function before a document(user in this example) is saved to the database
userSchema.pre("save", async function (next) {
	console.log("Mongoose 'PRE SAVE' hook: hashing password prior to saving to Mongo DB");

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	// console.log(this);

	next();
});
// post: fire a callback function after a document(user in this example) is saved to the database
// first argument is the event. So, after a "save" event occurs. After a new document is saved to the database
// second argument is is a callback function which is given two two arguments, the document saved and next. Which needs to be called.
// "this" keyword refers to the user instance

userSchema.post("save", function (document, next) {
	console.log("Mongoose 'POST SAVE' hook: new user was created & saved");
	next();
});

userSchema.statics.login = async function (email, password) {
	if (email) {
		if (isEmail(email)) {
			const user = await User.findOne({ email }).lean();

			if (user) {
				if (password.length >= 6) {
					const passwordIsCorrect = await bcrypt.compare(password, user.password);
					if (passwordIsCorrect) {
						console.log("Successfully logged in");
						return user;
					}
					throw new LoginError({ password: "The password is incorrect." });
				}
				throw new LoginError({
					password: "Minimum password length is 6 characters.",
				});
			}
			throw new LoginError({ email: "That email isn't registered." });
		}
		throw new LoginError({ email: "Please enter a valid email." });
	}
	throw new LoginError({ email: "Please enter an email." });
};

// -----------------------------------------------------------

const User = mongoose.model("user", userSchema);

export default User;
