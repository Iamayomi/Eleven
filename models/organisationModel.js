const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {

	 const Organisation = sequelize.define("organisation", {

 	 	name: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		validate: {
	 			notNull: {
					msg: "name is required"
				}
			}
 		},

 		description: {
	 		type: DataTypes.STRING,
		}

	   },{
		  timestamps: false,  
	});
 	
 	return Organisation;

};