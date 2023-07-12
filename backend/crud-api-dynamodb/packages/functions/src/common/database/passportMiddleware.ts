import { Express } from "express";
import passport from "passport";
import { UserModel } from "../models/User";
import { Strategy as LocalStrategy } from "passport-local";

export const passportMiddleware = (app: Express) => {
// Serialize the pilot's sessions for Passport
    passport.serializeUser((user, done) => {
        // @ts-ignore
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

// Define the login strategy for pilots based on email and password
    passport.use('pilot-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        let user;
        try {
            user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }
        } catch (err) {
            return done(err);
        }

        // @ts-ignore
        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    }));

// Initialize Passport and restore any existing authentication state
    app.use(passport.initialize());
    app.use(passport.session());
};