const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config.env' });

const sequelize = new Sequelize(process.env.POSTGRES_URL);




const connectDatabase = async () => {
   console.log('checking database connection 🔃🔃🔃🔃');
 	try {
       const connectDB = await sequelize.authenticate();
         console.log('Database successfully connected 🔗🔗🔗')
  	} catch(err){
 		console.log('unable to connect to database 🔥🔥🔥', err)
 	}
  };

connectDatabase();

module.exports = sequelize;