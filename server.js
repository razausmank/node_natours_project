const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	console.log(`Uncaught Exception, server shutting down`);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Db connection successful"));

const port = 3000;

const server = app.listen(port, () => {
	console.log(`App Running on Port ${port}.....`);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name);
	console.log(`Unhandled rejection, server shutting down`);
	server.close(() => {
		process.exit(1);
	});
});
