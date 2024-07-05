const sequelize  =  require('sequelize');
require('dotenv').config({ path: './config.env' });

const Sequelize = new sequelize.Sequelize( 
	process.env.PG_DATABASE,
	process.env.PG_USERNAME,
	process.env.PG_PASSWORD, 
	{ dialect: 'postgres' });

const connectDatabase = async (db) => {
	 console.log('checking database connection 🔃🔃🔃🔃');
	try {
      const connectDB = await db.authenticate();
      console.log('Database successfully connected 🔗🔗🔗')
	} catch(err){
		console.log('unable to connect to database 🔥🔥🔥',err)
	}
};

connectDatabase(Sequelize);

module.exports = Sequelize;