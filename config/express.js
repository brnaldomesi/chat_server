import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import routes from '../server/routes';
import * as utilityService from '../server/services/utility';

const app = express();

app.use(logger('dev'));

// parses body params and attaches them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

// catch different types of error
app.use((err, req, res, next) => {
	const error = utilityService.createError(err.message, err.status, err.isPublic);
	return next(error);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = utilityService.createError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});

// error handler
app.use((err, req, res, next) =>		// eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		error: process.env.NODE_ENV === 'development' ? err : {}
	})
);

export default app;
