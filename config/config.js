const config = {
	default: {
		JWT_SECRET: "thisIsSoSecret",
	},

	development: {
		// url to be used in link generation
		// url: "http://my.site.com",

		// mongodb connection settings
		// "mongodb+srv://testingMongoDB:testingMongoDB@delicious.f7hlt8l.mongodb.net/node-authorization";
		database: {
			HOST: "mongodb://127.0.0.1:27017/drinks",
		},
		// server details
		server: {
			HOST: "127.0.0.1",
			PORT: "3000",
		},

		// winston & morgan logger settings
		logger: {
			LOG_LEVEL: "debug",
		},
	},

	production: {
		// mongodb connection settings
		database: {
			HOST: "mongodb://127.0.0.1:27017/drinks",
		},

		// server details
		server: {
			host: "127.0.0.1",
			port: "8080",
		},

		// winston & morgan  logger settings
		logger: {
			LOG_LEVEL: "info",
		},
	},
};

export default config;
