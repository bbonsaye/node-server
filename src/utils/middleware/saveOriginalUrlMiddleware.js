function saveOriginalUrl(req, res, next) {
	const originalUrl = req.originalUrl;
	res.locals = originalUrl;
	next();
}

export default saveOriginalUrl;
