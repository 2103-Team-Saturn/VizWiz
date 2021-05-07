"use strict";

const { db } = require("../server/db");
// const { User, Graph, Data } = require('../server/db/models')
const User = require("../server/db/models/user");
const Graph = require("../server/db/models/graph");
const Data = require("../server/db/models/data");

async function seed() {
	await db.sync({ force: true });
	console.log("db synced!");

	const users = await Promise.all([
		User.create({
			username: "cody@email.com",
			password: "123",
		}),
		User.create({
			username: "kevin@email.com",
			password: "kevinpw",
		}),
		User.create({
			username: "jake@email.com",
			password: "jakepw",
		}),
		User.create({
			username: "isabelle@email.com",
			password: "isabellepw",
		}),
		User.create({
			username: "jeanette@email.com",
			password: "jeanettepw",
		}),
	]);

	// line and scatter coordinates, will store in Data table
	const data = await Promise.all([
		Data.create({
			userId: 1,
			name: "Data Set One",
			values: [
				{ x: "1", y: "2" },
				{ x: "2", y: "2" },
				{ x: "3", y: "4" },
				{ x: "4", y: "6" },
				{ x: "5", y: "4.5" },
				{ x: "6", y: "4.5" },
				{ x: "7", y: "5" },
				{ x: "8", y: "8" },
				{ x: "9", y: "10" },
			],
		}),
		Data.create({
			userId: 2,
			name: "April Average Weather Data for Orlando",
			values: [
				{ day: "1-Apr", high: 79.9, low: 59.4, precMo: 0.12, precYr: 9.49 },
				{ day: "2-Apr", high: 80, low: 59.5, precMo: 0.24, precYr: 9.61 },
				{ day: "3-Apr", high: 80.2, low: 59.7, precMo: 0.31, precYr: 9.69 },
				{ day: "4-Apr", high: 80.3, low: 59.9, precMo: 0.43, precYr: 9.8 },
				{ day: "5-Apr", high: 80.4, low: 60, precMo: 0.51, precYr: 9.88 },
				{ day: "6-Apr", high: 80.6, low: 60.2, precMo: 0.59, precYr: 9.96 },
				{ day: "7-Apr", high: 80.7, low: 60.3, precMo: 0.67, precYr: 10.04 },
				{ day: "8-Apr", high: 80.9, low: 60.5, precMo: 0.75, precYr: 10.12 },
				{ day: "9-Apr", high: 81, low: 60.6, precMo: 0.83, precYr: 10.2 },
				{ day: "10-Apr", high: 81.1, low: 60.8, precMo: 0.91, precYr: 10.24 },
				{ day: "11-Apr", high: 81.3, low: 60.9, precMo: 0.94, precYr: 10.31 },
				{ day: "12-Apr", high: 81.4, low: 61.1, precMo: 1.02, precYr: 10.39 },
				{ day: "13-Apr", high: 81.6, low: 61.2, precMo: 1.1, precYr: 10.43 },
				{ day: "14-Apr", high: 81.7, low: 61.4, precMo: 1.14, precYr: 10.51 },
				{ day: "15-Apr", high: 81.9, low: 61.6, precMo: 1.18, precYr: 10.55 },
				{ day: "16-Apr", high: 82.1, low: 61.7, precMo: 1.3, precYr: 10.63 },
				{ day: "17-Apr", high: 82.2, low: 61.9, precMo: 1.38, precYr: 10.71 },
				{ day: "18-Apr", high: 82.4, low: 62, precMo: 1.46, precYr: 10.79 },
				{ day: "19-Apr", high: 82.6, low: 62.2, precMo: 1.54, precYr: 10.91 },
				{ day: "20-Apr", high: 82.7, low: 62.4, precMo: 1.61, precYr: 10.98 },
				{ day: "21-Apr", high: 82.9, low: 62.6, precMo: 1.73, precYr: 11.1 },
				{ day: "22-Apr", high: 83.1, low: 62.7, precMo: 1.81, precYr: 11.18 },
				{ day: "23-Apr", high: 83.3, low: 62.9, precMo: 1.93, precYr: 11.3 },
				{ day: "24-Apr", high: 83.5, low: 63.1, precMo: 2.01, precYr: 11.38 },
				{ day: "25-Apr", high: 83.7, low: 63.3, precMo: 2.09, precYr: 11.46 },
				{ day: "26-Apr", high: 83.9, low: 63.5, precMo: 2.2, precYr: 11.54 },
				{ day: "27-Apr", high: 84.1, low: 63.6, precMo: 2.28, precYr: 11.61 },
				{ day: "28-Apr", high: 84.3, low: 63.8, precMo: 2.36, precYr: 11.69 },
				{ day: "29-Apr", high: 84.5, low: 64, precMo: 2.4, precYr: 11.77 },
				{ day: "30-Apr", high: 84.7, low: 64.2, precMo: 2.48, precYr: 11.84 },
			],
		}),
		Data.create({
			userId: 3,
			name:
				"Monthly transatlantic airtravel, in thousands of passengers, for 1958-1960",
			values: [
				{ 1958: 340, 1959: 360, 1960: 417, Month: "JAN" },
				{ 1958: 318, 1959: 342, 1960: 391, Month: "FEB" },
				{ 1958: 362, 1959: 406, 1960: 419, Month: "MAR" },
				{ 1958: 348, 1959: 396, 1960: 461, Month: "APR" },
				{ 1958: 363, 1959: 420, 1960: 472, Month: "MAY" },
				{ 1958: 435, 1959: 472, 1960: 535, Month: "JUN" },
				{ 1958: 491, 1959: 548, 1960: 622, Month: "JUL" },
				{ 1958: 505, 1959: 559, 1960: 606, Month: "AUG" },
				{ 1958: 404, 1959: 463, 1960: 508, Month: "SEP" },
				{ 1958: 359, 1959: 407, 1960: 461, Month: "OCT" },
				{ 1958: 310, 1959: 362, 1960: 390, Month: "NOV" },
				{ 1958: 337, 1959: 405, 1960: 432, Month: "DEC" },
			],
		}),
		Data.create({
			userId: 4,
			name: "Orange County FL Covid Data",
			values: [
				{ Day: "2/6/21", "Number of Cases": 357 },
				{ Day: "2/7/21", "Number of Cases": 416 },
				{ Day: "2/8/21", "Number of Cases": 429 },
				{ Day: "2/9/21", "Number of Cases": 426 },
				{ Day: "2/10/21", "Number of Cases": 431 },
				{ Day: "2/11/21", "Number of Cases": 401 },
				{ Day: "2/12/21", "Number of Cases": 446 },
				{ Day: "2/13/21", "Number of Cases": 364 },
				{ Day: "2/14/21", "Number of Cases": 200 },
				{ Day: "2/15/21", "Number of Cases": 467 },
				{ Day: "2/16/21", "Number of Cases": 382 },
				{ Day: "2/17/21", "Number of Cases": 280 },
				{ Day: "2/18/21", "Number of Cases": 326 },
				{ Day: "2/19/21", "Number of Cases": 384 },
				{ Day: "2/20/21", "Number of Cases": 307 },
				{ Day: "2/21/21", "Number of Cases": 264 },
				{ Day: "2/22/21", "Number of Cases": 331 },
				{ Day: "2/23/21", "Number of Cases": 443 },
				{ Day: "2/24/21", "Number of Cases": 341 },
				{ Day: "2/25/21", "Number of Cases": 319 },
				{ Day: "2/26/21", "Number of Cases": 339 },
				{ Day: "2/27/21", "Number of Cases": 299 },
				{ Day: "2/28/21", "Number of Cases": 113 },
				{ Day: "3/1/21", "Number of Cases": 396 },
				{ Day: "3/2/21", "Number of Cases": 224 },
				{ Day: "3/3/21", "Number of Cases": 380 },
				{ Day: "3/4/21", "Number of Cases": 330 },
				{ Day: "3/5/21", "Number of Cases": 302 },
				{ Day: "3/6/21", "Number of Cases": 222 },
				{ Day: "3/7/21", "Number of Cases": 175 },
				{ Day: "3/8/21", "Number of Cases": 258 },
				{ Day: "3/9/21", "Number of Cases": 249 },
				{ Day: "3/10/21", "Number of Cases": 272 },
				{ Day: "3/11/21", "Number of Cases": 270 },
				{ Day: "3/12/21", "Number of Cases": 292 },
				{ Day: "3/13/21", "Number of Cases": 251 },
				{ Day: "3/14/21", "Number of Cases": 170 },
				{ Day: "3/15/21", "Number of Cases": 305 },
				{ Day: "3/16/21", "Number of Cases": 260 },
				{ Day: "3/17/21", "Number of Cases": 328 },
				{ Day: "3/18/21", "Number of Cases": 307 },
				{ Day: "3/19/21", "Number of Cases": 205 },
				{ Day: "3/20/21", "Number of Cases": 290 },
				{ Day: "3/21/21", "Number of Cases": 216 },
				{ Day: "3/22/21", "Number of Cases": 387 },
				{ Day: "3/23/21", "Number of Cases": 363 },
				{ Day: "3/24/21", "Number of Cases": 396 },
				{ Day: "3/25/21", "Number of Cases": 392 },
				{ Day: "3/26/21", "Number of Cases": 418 },
				{ Day: "3/27/21", "Number of Cases": 375 },
				{ Day: "3/28/21", "Number of Cases": 215 },
				{ Day: "3/29/21", "Number of Cases": 346 },
				{ Day: "3/30/21", "Number of Cases": 311 },
				{ Day: "3/31/21", "Number of Cases": 501 },
				{ Day: "4/1/21", "Number of Cases": 455 },
				{ Day: "4/2/21", "Number of Cases": 397 },
				{ Day: "4/3/21", "Number of Cases": 291 },
				{ Day: "4/4/21", "Number of Cases": 240 },
				{ Day: "4/5/21", "Number of Cases": 386 },
				{ Day: "4/6/21", "Number of Cases": 402 },
				{ Day: "4/7/21", "Number of Cases": 650 },
				{ Day: "4/8/21", "Number of Cases": 513 },
				{ Day: "4/9/21", "Number of Cases": 490 },
				{ Day: "4/10/21", "Number of Cases": 374 },
				{ Day: "4/11/21", "Number of Cases": 138 },
				{ Day: "4/12/21", "Number of Cases": 633 },
				{ Day: "4/13/21", "Number of Cases": 455 },
				{ Day: "4/14/21", "Number of Cases": 521 },
				{ Day: "4/15/21", "Number of Cases": 492 },
				{ Day: "4/16/21", "Number of Cases": 435 },
				{ Day: "4/17/21", "Number of Cases": 400 },
				{ Day: "4/18/21", "Number of Cases": 328 },
				{ Day: "4/19/21", "Number of Cases": 351 },
				{ Day: "4/20/21", "Number of Cases": 346 },
				{ Day: "4/21/21", "Number of Cases": 480 },
				{ Day: "4/22/21", "Number of Cases": 309 },
				{ Day: "4/23/21", "Number of Cases": 553 },
				{ Day: "4/24/21", "Number of Cases": 347 },
				{ Day: "4/25/21", "Number of Cases": 263 },
				{ Day: "4/26/21", "Number of Cases": 354 },
				{ Day: "4/27/21", "Number of Cases": 401 },
				{ Day: "4/28/21", "Number of Cases": 372 },
				{ Day: "4/29/21", "Number of Cases": 386 },
				{ Day: "4/30/21", "Number of Cases": 342 },
				{ Day: "5/1/21", "Number of Cases": 261 },
				{ Day: "5/2/21", "Number of Cases": 206 },
				{ Day: "5/3/21", "Number of Cases": 270 },
				{ Day: "5/4/21", "Number of Cases": 290 },
				{ Day: "5/5/21", "Number of Cases": 338 },
				{ Day: "5/6/21", "Number of Cases": 327 },
			],
		}),
		Data.create({
			userId: 5,
			name: "Sample Data",
			values: [
				{ x: "14", y: "245" },
				{ x: "23", y: "223" },
				{ x: "33", y: "467" },
				{ x: "45", y: "632" },
				{ x: "55", y: "454" },
				{ x: "66", y: "476" },
				{ x: "77", y: "534" },
				{ x: "88", y: "823" },
				{ x: "99", y: "102" },
			],
		}),
	]);

	// Use data set one to seed some graphs for Cody
	const graph = await Promise.all([
		Graph.create({
			userId: 1,
			properties: {
				graphSelected: "bar",
				color: "tomato",
				title: "Test Graph",
				highlight: "orange",
				tooltip: "5",
				x: "x",
				y: "y",
				dataId: 1,
			},
			datumId: 1,
		}),
		Graph.create({
			userId: 1,
			properties: {
				graphSelected: "scatter",
				color: "salmon",
				title: "Another Test Graph",
				highlight: "periwinkle",
				tooltip: "5",
				x: "y",
				y: "x",
				dataId: 1,
			},
			datumId: 1,
		}),
	]);

	// console.log(`seeded ${users.length} users`);
	// console.log(`seeded ${data.length} data`);
	// console.log(`seeded ${graph.length} graphs`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
