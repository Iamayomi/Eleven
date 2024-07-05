const { User } = require('../models/index');
// const signTokenAndResponse = require('../utilis/signToken');


exports.register = async function (req, res) {

	try{
		const { firstName, lastName, email, password, phone } = req.body;

		const createUser = await User.create({
			firstName: firstName, 
			lastName: lastName, 
			email: email, 
			password: password, 
			phone: phone
		});
		
		console.log(createUser);

	  // await	signTokenAndResponse(createUser, 201, res);

	} catch(err){
		res.status(400).send(err);

		// res.status(400).json({
		// 	status: "Bad request",
		// 	message: "Registration unsuccessful",
		// 	statusCode: 400
		// })
	}

	
};