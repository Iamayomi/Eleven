const { User, Organisation } = require('../models/index');
const CustomError = require('../utils/customError');
const signToken = require('../utils/signToken');


exports.register = async function (req, res, next) {

	try{
		// const { firstName, lastName, email, password, phone } = req.body;

		const createUser = await User.create({
			firstName: req.body.firstName, 
			lastName: req.body.lastName, 
			email: req.body.email, 
			password: req.body.password, 
			phone: req.body.phone
		});

		const createOrg = await Organisation.create({
			name: `${createUser.firstName}'s Organisation`,
			description: "this is a testing orgnisation",
			userId: createUser.id
		})

		const token = await signToken(createUser.id);

		const user = await User.findOne({ where: { id: createUser.id }, attributes: { exclude: ['password', 'userCreatedAt'] } })

		res.cookie('jwt', token, { 
	 		expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
	 		httpOnly: true,
	 		sameSite: 'lax',
	 		// secure: true
		});

	    res.status(201).json({
			status: "success",
	        message: "Registration Successful",
	        data: {
	            accessToken: token,
	            user
			}
		});	  

	} catch(err){
		next(err)

		// next(new CustomError(`Registration unsuccessful`, 400))
	}
	
};


exports.signin = async function(req, res, next){
	try {

		const { email , password } = req.body;


		if(!email || !password) {
		 	next(new CustomError('Please provide email and password', 401))
		};

		let user = await User.findOne({ where: { email } });

		if(!user || !await User.checkPassword(password, user.password)){
		 	next(new CustomError('incorrect email or password', 401));
		};

		const token = await signToken(user.id);

		user = await User.findOne({ where: { email }, attributes: { exclude: ['password', 'userCreatedAt'] } });

		res.cookie('jwt', token, { 
	 		expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
	 		httpOnly: true,
	 		sameSite: 'lax',
		});

	    res.status(201).json({
			status: "success",
	        message: "Login Successful",
	        data: {
	            accessToken: token,
	            user
			}
		});

	} catch(err){
		next(new CustomError('Authentication failed', 401));
	}
};

