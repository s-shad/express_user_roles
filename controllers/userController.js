const User = require("../model/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
	const { email, pwd, role } = req.body;

	if (!email || !pwd || !role)
		return res.status(400).json({ message: "Email and password are required." });
	const duplicate = await User.findOne({ email });

	if (duplicate) return res.sendStatus(409); //Conflict

	try {
		//encrypt the password
		const hashedPwd = await bcrypt.hash(pwd, 10);
		const user = await User.create({
			email,
			role,
			password: hashedPwd,
		});
		res.status(201).json({ success: `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const handleLogin = async (req, res) => {
	const { email, pwd } = req.body;
	if (!email || !pwd)
		return res.status(400).json({ message: "Username and password are required." });

	const foundUser = await User.findOne({ email });
	if (!foundUser) return res.sendStatus(401); //Unauthorized

	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		console.log(foundUser.role);
		const accessToken = jwt.sign(
			{ UserInfo: { email: foundUser.email, roles: foundUser.role } },
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);
		const refreshToken = jwt.sign({ email: foundUser.email }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		// Saving refreshToken with current user
		try {
			foundUser.refreshToken = refreshToken;
			await foundUser.save();
			// res.cookie("auth", refreshTokentoken, { httpOnly: true, secure: false });

			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			});
			res.json({ accessToken });
		} catch (err) {
			res.send(err);
		}
	} else {
		res.send(err);
	}
};

module.exports = { handleNewUser, handleLogin };
