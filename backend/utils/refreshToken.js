import jwt from "jsonwebtoken";

const generateRefreshTokenAndSetCookie = (userId, res) => {
	const Rtoken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("rjwt", Rtoken, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
	return Rtoken
};

export default generateRefreshTokenAndSetCookie;