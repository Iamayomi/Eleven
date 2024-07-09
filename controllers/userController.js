const { User } = require("../models/index");
const customError = require("../utils/customError");


exports.getAUser = async function(req, res, next) {

    if (!req.body.id) req.params.userId = req.user.id;

	try {

		const user = await User.findByPk(req.params.userId);

		if(!user){
			next(new CustomError(`User with this id ${req.params.userId} does not exist`, 401));
		};

		const getUser = await User.findOne({ where: { id: req.params.userId * 1}, attributes: { exclude: ['password', 'userCreatedAt'] } });

		res.status(200).json({
			status: "Success",
			message: "User Data",
			data: getUser
		})

	}catch(err){
		next(new CustomError('User Does Exist', 401));
	}

}