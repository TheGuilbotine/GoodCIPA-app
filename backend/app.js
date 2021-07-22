const express = require('express');
const morgan = require('morgan');
// only allow Croos-Origin Resource SHaring in development
const cors = require('cors');
const csurf = require('csurf');
// better overall security
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production';
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
// app.use(
//     csurf({
//         cookie: {
//             secure: isProduction,
//             sameSite: isProduction && "Lax",
//             httpOnly: true,
//         },
//     })
// );

app.use(routes);

// Catch unhandled requests and forward to error handler
/*
Remember, next invoked with nothing means that error handlers
defined after this middleware will not be invoked.
However, next invoked with an error means that error handlers
defined after this middleware will be invoked.
*/
app.use((_req, _res, next) => {
    const err = new Error('The requested resource couldn\'t be found.');
    err.title = 'Resource Not Found';
    err.errors = ['The requested resource couldn\'t be found'];
    err.status = 404;
    next(err);
});

// process sequelize errors
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
