const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); //invalid token
		req.roles = decoded.UserInfo.roles;
		req.roles = parseInt(req.roles);
		req.roles = [req.roles];
		req.user = decoded.UserInfo.username;
		next();
	});
};

module.exports = verifyJWT;
