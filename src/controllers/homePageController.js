export default async function homePage_get(req, res, next) {
	res.render("home", { tapTitle: "Home" });
}
