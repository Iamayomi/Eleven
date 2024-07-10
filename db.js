const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config.env' });


const sequelize = process.env.NODE_ENVIRONMENT === 'production' ? new Sequelize(process.env.PG_URL, { dialect: 'postgres'}) 
: new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, { dialect: 'postgres' });

sequelize.authenticate().then(() => {
	console.log('Database successfully connected 🔗🔗🔗')
}).catch((err) => {
	console.log('unable to connect to database 🔥🔥🔥', err)
})


module.exports = sequelize;