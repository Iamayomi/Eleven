const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {

	 const User = sequelize.define("user", {

	 	firstName: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		validate: {
	 			checkName(val) {
					if (val.length < 3) {
						throw new Error('Please provide a your lastName');
					}
				},
				notNull: {
					msg: "firstname is required"
				}
			}
	 	},

 	 	lastName: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		validate: {
	 			checkName(val) {
					if (val.length < 3) {
						throw new Error('Please provide a your lastName');
					}
				},
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
	 		validate: {
	 			checkPassword(val) {
					if (val.length === 0 || val.length < 8) {
						throw new Error('Please provide a your password  min 8');
					}
				},
			}
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


	User.beforeSave(async function(user){
		const hashPassword = await bcrypt.hash(user.password, 10);
		user.password = hashPassword;
	});

	User.checkPassword = async function(signinPassword, userPassword){
 		return await bcrypt.compare(signinPassword, userPassword);
	};
 	
 	return User;

};