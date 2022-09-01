const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		console.log("DB connection succesful");
	});

// Read JSON File

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// Import Data in Database
const importData = async () => {
	try {
		await Tour.create(tours);
		console.log("Data Succesfuly Loaded");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

// Delete all data from Collection

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log("Data successfuly deleted");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
console.log(process.argv);
