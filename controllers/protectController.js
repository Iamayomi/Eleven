const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const { User } = require("../models/index");
const customError = require("../utils/customError");

exports.protectRoute = async function(req, res, next){

	let token;

	if(req.headers.authorization?.startsWith("Bearer")){
		token = req.headers.authorization.split(" ")[1];
	}
	
	if (!token) {
        return next(new customError("You are not logged in! Please login to get accsss", 401));
    };

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decode.id);

    if (!currentUser) {
        return next(new customError("This User Token doesn't Exist Anymore", 401));
    };

    function changePasswordAfter() {
        const changeTimeStamp = parseInt(currentUser.userCreatedAt.getTime() / 1000);

        return decode.iat < changeTimeStamp;
    };

    if (changePasswordAfter()) {
        return next(new customError("This User recently changed password", 401));
    };

    req.user = currentUser;

    next();


}


  //      if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();