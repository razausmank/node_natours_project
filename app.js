/* eslint-disable no-new */
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//  ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// const testFunction1 = () =>
// 	new Promise((resolve, reject) => {
// 		for (let i = 0; i < 10000; i++) {
// 			for (let j = 0; j < 10000; j++) {
// 				// do nothing
// 			}
// 		}

// 		const data = "sdads";
// 		console.log(`test function 1 called ${data}`);
// 		resolve(data);
// 	});

// const testFunction2 = () =>
// 	new Promise((resolve, reject) => {
// 		for (let i = 0; i < 100000; i++) {
// 			for (let j = 0; j < 100000; j++) {
// 				// do nothing
// 			}
// 		}
// 		const data = "sdads";

// 		console.log("test function 2 called");
// 		resolve(data);
// 	});

// const asyncFunction = async (param1) => {
// 	console.time("total");
// 	console.time("func1");
// 	const responseOfTestFunc1 = await testFunction1();
// 	console.timeEnd("func1");
// 	console.timeLog("func1");

// 	console.log(responseOfTestFunc1);
// 	console.log("will this get run in between");

// 	console.time("func2");
// 	const responseOfTestFunc2 = await testFunction2();
// 	console.timeEnd("func2");
// 	console.timeLog("func2");
// 	console.timeEnd("total");

// 	console.timeLog("total");
// };

// // asyncFunction();

// const asyncFunctionWithPromise = async () => {
// 	console.time("promises total");
// 	const func1Promise = testFunction1();
// 	console.log("will this get run in between", func1Promise);

// 	const func2Promise = testFunction2();

// 	console.log("promise then before");

// 	// func1Promise.then((data) => console.log(data));
// 	// func2Promise.then((data) => console.log(data));

// 	console.log("promise then after");

// 	Promise.all([func1Promise, func2Promise]).then(([data1, data2]) => {
// 		console.log("all promises resolved", data1, data2);
// 	});
// 	console.log("promise then nb kjbafter");

// 	console.timeEnd("promises total");
// 	console.timeLog("promises total");
// };

// asyncFunctionWithPromise();
// // const testFunc1Promise = testFunction1();

// // console.log("promise then before");
// // testFunc1Promise.then(() => {
// // 	console.log("yolo the promise is completed");
// // });
// // console.log("promise then after");
