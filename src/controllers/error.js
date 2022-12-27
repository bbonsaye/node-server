function pageNotFound(req, res) {
	res.render("404", { tapTitle: 404 });
}

export default { pageNotFound };
