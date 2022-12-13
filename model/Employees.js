const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
	firstname: { type: String },
	lastname: { type: String },
});

module.exports = mongoose.model("employee", employeesSchema);
