const jwt = require('jsonwebtoken');


module.exports = async function(id) {

	return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

};

