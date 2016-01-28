[![Build Status](https://travis-ci.org/KunalKapadia/express-mongoose-es6-rest-api.svg?branch=master)](https://travis-ci.org/KunalKapadia/express-mongoose-es6-rest-api)
[![Coverage Status](https://coveralls.io/repos/github/KunalKapadia/express-mongoose-es6-rest-api/badge.svg?branch=master)](https://coveralls.io/github/KunalKapadia/express-mongoose-es6-rest-api?branch=master)
[![Code Climate](https://codeclimate.com/github/KunalKapadia/express-mongoose-es6-rest-api/badges/gpa.svg)](https://codeclimate.com/github/KunalKapadia/express-mongoose-es6-rest-api)
[![bitHound Overall Score](https://www.bithound.io/github/KunalKapadia/express-es6-rest-api-starter/badges/score.svg)](https://www.bithound.io/github/KunalKapadia/express-es6-rest-api-starter)
[![bitHound Dependencies](https://www.bithound.io/github/KunalKapadia/express-mongoose-es6-rest-api/badges/dependencies.svg)](https://www.bithound.io/github/KunalKapadia/express-mongoose-es6-rest-api/master/dependencies/npm)

# [![Express ES6 REST API Starter](https://cloud.githubusercontent.com/assets/4172932/12560514/3a678a08-c3c1-11e5-94b3-b4ce2cbd8e21.jpg)](https://github.com/KunalKapadia/express-es6-rest-api-starter)

## Overview

This is a boilerplate application for building REST APIs using ES6 and Express with Code Coverage. Helps you stay productive by following best practices. Follows [Airbnb's Javascript style guide](https://github.com/airbnb/javascript).

### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ES6 via Babel                  	 	 | ES6 support using [Babel](https://babeljs.io/).  |
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                                                                                |
| Auto server restart                  	 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                            |
| ES6 Code Coverage via [istanbul](https://www.npmjs.com/package/istanbul)                  | Supports code coverage of ES6 code using istanbul and mocha. Code coverage reports are saved in `coverage/` directory post `npm test` execution. Open `lcov-report/index.html` to view coverage report. `npm test` also displays code coverage summary on console.                                                                                                                                                                            |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).                       |

- CORS support via [cors](https://github.com/troygoode/node-cors)
- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.

## Getting Started

```
# clone it
git clone git@github.com:KunalKapadia/express-mongoose-es6-rest-api.git
cd express-mongoose-es6-rest-api
npm install

# Make it your own
rm -rf .git && git init && npm init

# start server
DEBUG=express-mongoose-es6-rest-api:* npm start or gulp serve (requires gulp to be installed globally)
NODE_ENV=production npm start # start in production env

# test with code coverage
npm test
# code coverage for each file as text
gulp mocha --code-coverage-reporter text

# prepare ES5 files for deployment. All ES5 files are saved in dist/ directory.
npm build or gulp (requires gulp to be installed globally)
```

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging
Logs detailed info about each api request to console during development.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging
Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)

## Code Coverage
Get code coverage summary on executing `npm test`
![Code Coverage Text Summary](https://cloud.githubusercontent.com/assets/4172932/12619174/f581647c-c53c-11e5-8b0f-f0764391bd45.JPG)

`npm test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.
![Code coverage HTML report](https://cloud.githubusercontent.com/assets/4172932/12625331/571a48fe-c559-11e5-8aa0-f9aacfb8c1cb.jpg)

## Deploy to Heroku

Coming soon.

## A Boilerplate-only Option

If you would prefer not to use any of our tooling, delete the following files from the project: `package.json`, `gulpfile.babel.js`, `.eslintrc` and `.travis.yml`. You can now safely use the boilerplate with an alternative build-system or no build-system at all if you choose.

## Docs and Recipes

* [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - the official Gulp recipes directory includes a comprehensive list of guides for different workflows you can add to your project.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.
