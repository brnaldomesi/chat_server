import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import winstonInstance from './winston';
import routes from '../server/routes';
import config from './env';
import * as utilityService from '../server/services/utility';

const app = express();

app.use(logger('dev'));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.NODE_ENV === 'development') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({
		winstonInstance,
		meta: true, 	// optional: log meta data about request (defaults to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
		colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	}));
}

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

// log error in winston transports
app.use(expressWinston.errorLogger({
	winstonInstance
}));

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>		// eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.NODE_ENV === 'development' ? err.stack : {}
	})
);

export default app;
