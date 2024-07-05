// const jwt = require('jsonwebtoken');


// const signToken = async function(id) {

// 	return await jwt.sign({ id } , process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
// };

// module.exports = async function (user, statusCode, res) {

// 	const token = signToken(user.id);

// 	const cookiesOption = { 
//  		expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
//  		https: true,
//  		sameSite: 'lax'
// 	};


// 	if (process.env.NODE_ENVIRONMENT === 'production') cookiesOption.secure = true;

// 	res.cookies('jwt', token, cookiesOption);

// 	res.status(statusCode).json({
// 	  status: "success",
// 	        message: "Login successful",
// 	        data: {
// 	            accessToken: token,
// 	            user: user
// 			}
// 	});

// };