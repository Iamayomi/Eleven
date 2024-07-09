
const developmentError = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		statusCode: err.statusCode
	})
};



module.exports = function (err, req, res, next) {
	err.statusCode = err.statusCode || 400;
	err.status = err.status || 'error';

	function databaseError(errorMessage) {
		if (err.name === errorMessage) {

			err.statusCode = 422;

			const errdetails = err.errors.map(e => {
				let error = {};

				if (Object.keys(e).includes('message') || Object.keys(e).includes('value')) {
					error.field = e.path;
					error.message = e.message;
				}

				return error;

			});

			return res.status(err.statusCode).json({
				error: errdetails
			})
		}
	};


	if (process.env.NODE_ENVIRONMENT === 'development') {

		databaseError('SequelizeUniqueConstraintError');
		databaseError('SequelizeValidationError');
		developmentError(err, res)

	};

	// if(process.env.NODE_ENVIRONMENT === 'development'){
	// 	developmentError(err, res)
	// };

	// if(err instanceof Sequelize.ValidationError){
	// 	return res.status(400).json({
	// 		error: 'Validator',
	// 		details: err.errors.map(e => e.message)
	// 	})
	// }

	// res.status(err.statusCode).json({
	// 	status: err.status,
	// 	error: err,
	// })

	//   next(new CustomError(err, 400))

};