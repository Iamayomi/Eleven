const sequelize = require('../db');

const User = require('./userModel')(sequelize);


sequelize.sync({ alter: true }).then(() => {
	console.log("Models synchronized with the database 🔃🔃🔃🔃🔃 ")
}).catch((err) => {
    console.error("UNABLE to synchronize with the DATABASE 🔥🔥🔥", err)
})


module.exports = { User };