const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const express = require("express");

const router = express.Router();

router
	.route("/")
	.get(employeesController.getAllEmployee)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee);

module.exports = router;
