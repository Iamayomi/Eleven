const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

	 const User = sequelize.define("user", {

	 	firstName: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		validate: {
				notNull: {
					msg: "firstname is required"
				}
			}
	 	},

 	 	lastName: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		validate: {
				notNull: {
					msg: "lastname is required"
				}
			}
 		},

 		email: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		unique: true,
			validate: { isEmail: true },

	 	},
      
        password: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 	},

	 	phone: {
	 		type: DataTypes.STRING,
	 	},

	 	userCreatedAt: {
			type: DataTypes.DATE,
			defaultValue: Date.now()
		}

	   },{
		 timestamps: false,
	});


 	
 	return User;

};