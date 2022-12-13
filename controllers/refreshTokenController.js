const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	console.log("Cookies: ", req.cookies);
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const foundUser = User.findOne({ refreshToken });
	if (!foundUser) return res.sendStatus(403); //Forbidden

	// evaluate jwt
	jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
		if (err || foundUser.email != decoded.email) return res.sendStatus(403);
		const roles = foundUser.role;
		const accessToken = jwt.sign(
			{
				UserInfo: {
					email: decoded.email,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "30s" }
		);
		res.json({ accessToken });
	});
};

module.exports = { handleRefreshToken };
