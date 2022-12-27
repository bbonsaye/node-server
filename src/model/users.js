import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

class mySchema extends mongoose.Schema {}

const userSchema = new mySchema(
	{
		email: {
			type: String,
			required: [true, "Please enter an email"],
			unique: true,
			lowercase: true,
			validate: [isEmail, "Please enter a valid email address."],
		},
		password: {
			type: String,
			required: [true, "Please enter a password."],
			minlength: [6, "Minimum password length is 6 characters."],
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
	console.log(
		"Mongoose 'PRE SAVE' hook: hashing password prior to saving to Mongo DB"
	);

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	console.log(this);

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
	const user = await User.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			console.log("Successfully logged in");
			return user;
		}
		throw Error("The password is incorrect");
	}
	throw Error("That email is not registered");
};

// -----------------------------------------------------------

const User = mongoose.model("user", userSchema);

export default User;
