const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("assets"));

app.get("/", (req, res) => {
	res.render("index");
});

app.listen(3000, () => {
	console.log("The app is running.")
});

