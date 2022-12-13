const Employee = require("../model/Employees");

const getAllEmployee = async (req, res) => {
	const allEmployee = await Employee.find({});
	res.json(allEmployee);
};

const createNewEmployee = async (req, res) => {
	const { firstname, lastname } = req.body;
	if (!lastname || !firstname)
		return res.status(400).json({ message: "First and last names are required." });
	try {
		const employee = await Employee.create({
			firstname,
			lastname,
		});
		res.status(201).json(employee);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	getAllEmployee,
	createNewEmployee,
};
