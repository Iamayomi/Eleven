const app = require('./app');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listen at port ${port} 👍👍👍`);
});