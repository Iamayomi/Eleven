const sequelize = require('sequelize');
require('dotenv').config({ path: './config.env' });

const Sequelize = new sequelize.Sequelize(
	process.env.PG_DATABASE,
	process.env.PG_USERNAME,
	process.env.PG_PASSWORD,
	{ dialect: 'postgres' });


Sequelize.authenticate().then((res) => {
	console.log('Database successfully connected 🔗🔗🔗', res)
}).catch((err) => {
	console.log('unable to connect to database 🔥🔥🔥', err)
})

// const connectDatabase = async () => {
// 	 console.log('checking database connection 🔃🔃🔃🔃');
// 	try {
//       const connectDB = await Sequelize.authenticate();
//          console.log('Database successfully connected 🔗🔗🔗')
// 	} catch(err){
// 		console.log('unable to connect to database 🔥🔥🔥', err)
// 	}
// };

// connectDatabase();

module.exports = Sequelize;