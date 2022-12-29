async function smoothies_get(req, res) {
	res.render("smoothies", { tapTitle: "Smoothies" });
}

export default { smoothies_get };
