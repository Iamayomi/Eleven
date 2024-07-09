const sequelize = require('../db');

const User =  require('./userModel')(sequelize);
const Organisation =  require('./organisationmodel')(sequelize);


User.hasMany(Organisation);
Organisation.belongsTo(User);

sequelize.sync({ alter: true }).then(() => {
    console.log("Models synchronized with the database 🔃🔃🔃🔃🔃 ")
}).catch((err) => {
    console.error("UNABLE to synchronize with the DATABASE 🔥🔥🔥", err)
})


module.exports = { User, Organisation };