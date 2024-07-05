const express = require('express');
const app = express();

const globalErrorHandler = require('./controllers/errorController');
const CustomError = require('./utils/customError')
const userRoute = require('./routes/userRoute');

// app.use(bodyParser.json());
console.log(globalErrorHandler)

app.use(express.json());

app.use("/", userRoute);

app.all('*', (req, res, next) => {
	next(new CustomError(`invalid URL ${req.originalUrl}`, 400))
});

app.use(globalErrorHandler);

module.exports = app;