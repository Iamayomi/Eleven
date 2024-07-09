const { Organisation } = require("../models/index");
const CustomError = require('../utils/customError');


exports.getAllOrganisation = async function(req, res, next) {

	try{

		const getAllOrganisation = await Organisation.findAll({ where: { userId: req.user.id }, attributes: { exclude: ['id'] }});

		res.status(200).json({
	          status: 'Success',
	          message: "Oraganisation Request Successful",
	          data: {
	          	oraganisations: getAllOrganisation
	          }
		})

	} catch(err){
          next(new CustomError('Oraganisation Does Exist !!!', 401))
	}

};

exports.getAnOrganisation = async function(req, res, next) {

	try{

		const getAnOrganisation = await Organisation.findOne({ where: { id: req.params.orgId }, attributes: { exclude: ['userId'] }});

		res.status(200).json({
	          status: 'Success',
	          message: "Oraganisation Request Successful",
	          data: {
	          	organisations: getAnOrganisation
	          }
		})

	} catch(err){
          next(new CustomError('Organisation Does Exist !!!', 401))
	}

};

exports.createAnOrganisation = async function(req, res, next){
	try{

		let createAnOrganisation = await Organisation.create({
			name: req.body.name,
			description: req.body.description,
			userId: req.user.id
		});

		createAnOrganisation = await Organisation.findOne({ where: { id: createAnOrganisation.id }, attributes: { exclude: ['userId', 'id'] }});

		res.status(201).json(createAnOrganisation);

	} catch(err){
          next(new CustomError('Client Error', 401))

	};
};


exports.addUserToOrganisation = async function(req, res, next){
	try {

		const getOrganisation = await Organisation.findOne({ where: { id: req.params.orgId * 1 } });

		getOrganisation.userId = req.body.userId * 1;

		await getOrganisation.save();

		res.status(200).json({
	          status: 'Success',
	          message: "Oraganisation Request Successful",
		})


	} catch(err){
          next(new CustomError('Client Error', 401))

	};
};
