const userController = require("../controllers/userController");
const express = require("express");
const refreshToken = require("../controllers/refreshTokenController");

const router = express.Router();

// router.get("/", refreshTokenController.handleRefreshToken);
router.post("/login", userController.handleLogin);

router.post("/register", userController.handleNewUser);
router.post("/ref", refreshToken.handleRefreshToken);

module.exports = router;
