import Smoothie from "../model/smoothiesSchema.js";

async function smoothies_get(req, res) {
	const smoothies = await Smoothie.find().lean();
	res.render("smoothies", { tapTitle: "Smoothies", smoothies });
}

export default { smoothies_get };
