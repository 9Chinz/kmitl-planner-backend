require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const apiRoute = require("./routes/api");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use(
	cookieSession({
		name: "session",
		keys: ["kmitl"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: true,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/api", apiRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
