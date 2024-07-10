const express = require('express');
const app = express();
const xss = require("xss-clean");

const globalErrorHandler = require('./controllers/errorController');
const CustomError = require('./utils/customError');
const userRoute = require('./routes/userRoute');
const organisationRoute = require('./routes/organisationRoute');


// app.use(bodyParser.json());

app.use(xss());

app.use(express.json());

app.use("/", userRoute);

app.use("/api/organisations", organisationRoute);


app.all('*', (req, res, next) => {
	next(new CustomError(`invalid URL ${req.originalUrl}`, 400));
});

app.use(globalErrorHandler);

module.exports = app;