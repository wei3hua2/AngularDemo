/**
 * Created by James on 4/4/14.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var SECRET = "VERY_SECRETIVE";

var db = require('./DB');
var jwt = require('jwt-simple');


// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            var user = db.findByUsername(username);
            console.log(JSON.stringify(user));

            if(user && user.password === password) {
                var token = jwt.encode({username:username,password:password}, SECRET);
                db.updateUserToken(user.username, token);
                done(null,{username:username,token:token});
            } else {
                done(null,{error:"fail to authenticate"});
            }

        });
    }
));

passport.use(new BearerStrategy({},
    function(token, done) {
        // asynchronous validation, for effect...
        process.nextTick(function () {

            // Find the user by token.  If there is no user with the given token, set
            // the user to `false` to indicate failure.  Otherwise, return the
            // authenticated `user`.  Note that in a production-ready application, one
            // would want to validate the token for authenticity.
            var user = db.findByToken(token);

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
));




module.exports = {
    registerServices : function (app) {

        app.use(passport.initialize());

        app.get('/', function (req, resp) {
            resp.send('hello worlddd');
        });

        //curl --data "username=jameschong&password=jameschong" http://localhost:3000/login
        app.post('/login',
            passport.authenticate('local'),
            function(req, resp) {
                resp.send(JSON.stringify(req.user));
            });

        //curl http://localhost:3000/logout?access_token=<token>
        app.get('/logout',
            function(req, resp) {
                var accessToken = req.query.access_token;

                var user = db.findByToken(req.access_token);
                if(user) {
                    console.log('invalidate user : '+user.username);
                    db.updateUserToken(user.username, '');
                }

                resp.send('logout');
            });

//        curl http://localhost:3000/api/user-info?access_token=<token>
        app.get('/user-info',
            passport.authenticate('bearer'),
            function(req, resp) {
                resp.send(JSON.stringify(req.user));
            });
    }
}