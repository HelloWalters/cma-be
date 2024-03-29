const passport = require('passport');

module.exports = app =>{
    app.get(
        '/auth/google',
        passport.authenticate(
            'google',
            {
                scope:
                [
                    'profile',
                    'email'
                ]
            }
        )
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate(
            'google'
        )
    );

    app.get(
        '/api/currentUser',
        (req, res) => {
            console.log("sending current user! " + req.user)
            res.send(req.user);
        }
    );
    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.send(req.user);
        }
    )
}