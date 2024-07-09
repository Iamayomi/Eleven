const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config.env' });

const sequelize = (process.env.NODE_ENVIRONMENT === 'development') ? new Sequelize(
	process.env.PG_DATABASE,
	process.env.PG_USERNAME,
	process.env.PG_PASSWORD,
	{ dialect: 'postgres' }) : new Sequelize(process.env.POSTGRES_URL);


sequelize.authenticate().then((res) => {
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

module.exports = sequelize;