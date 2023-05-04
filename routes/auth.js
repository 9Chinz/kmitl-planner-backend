const router = require("express").Router();
const passport = require("passport");
const MongoClient = require('mongodb').MongoClient

router.get("/login/success", async (req, res) => {
	if (req.user) {
		const user_id = req.user.user_id
		const user_email = req.user.emails[0].value
		let client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

		const db = client.db(`${process.env.DB_NAME}`);
		const user = db.collection('user');

		const doc = user.find({user_id: user_id});
		const result = await doc.toArray();
		client.close();

		if (result.length == 0){
			const newUser = {
				user_id: user_id,
				email: user_email,
				role: "user"
			}
			user.insertOne(newUser)
		}

		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
