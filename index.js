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


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);
require('./routes/routes')(app);

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