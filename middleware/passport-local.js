const passport = require("passport");
const Admin = require("../models/adminModel");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await Admin.findOne({ username });

        if (!user) {
            console.log("User not found");
            return done(null, false);
        }

        if (user.password !== password) { 
            console.log("Incorrect password");
            return done(null, false);
        }

        console.log("Authentication successful");
        return done(null, user);
        
    } catch (error) {
        console.error("Error in authentication:", error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
        let user = await Admin.findById(id);
        done(null, user);
});


passport.userAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/signin'); 
    }
    return next();
};

passport.userLocalData = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;