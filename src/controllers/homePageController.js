export default function homePage_get(req, res, next) {
	res.render("home", { tapTitle: "Home" });
}
