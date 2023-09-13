require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = express();

// express config
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
	res.send("chat server");
});

// connect into mongodb
mongoose
	.connect(process.env.MONGODB_URL, {})
	.then(() => {
		console.log("Connection to db success");
		// server start
		app.listen(port, (req, res) => {
			console.log(`server running on http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("Error on try connect to db");
	});
