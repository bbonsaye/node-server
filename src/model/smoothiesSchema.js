import mongoose from "mongoose";

class MySchema extends mongoose.Schema {}

const smoothieSchema = new MySchema(
	{
		title: {
			type: String,
			uppercase: true,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

smoothieSchema.pre("save", (next) => {
	console.log("Pre 'SAVE' Mongoose hook for smoothies model");
	next();
});

smoothieSchema.post("save", (next) => {
	console.log("Post 'SAVE' Mongoose hook for smoothies model");
	next();
});

const Smoothie = mongoose.model("smoothie", smoothieSchema);

export default Smoothie;
