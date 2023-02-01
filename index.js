const express = require('express'),
    mongoose = require('mongoose'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    routes = require('./routes/routes'),
    keys = require('./config/keys'),
    app = express(),
    PORT = process.env.PORT || 3000;
app.use(express.json());             // for application/json
app.use(express.urlencoded());

require('./models/user');
require('./services/passport');

const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`);
    next();
}

app.use(logRequestStart);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);

app.use(require('./src/campaigns/router'));
app.use(require('./src/game-details/game-types/router'));
app.use(require('./src/game-details/game-races/router'));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});

mongoose.connect(keys.mongoURI);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
})