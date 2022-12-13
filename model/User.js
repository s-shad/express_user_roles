const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	role: { type: String },
	password: { type: String },
	refreshToken: { type: String },
});

module.exports = mongoose.model("user", userSchema);
