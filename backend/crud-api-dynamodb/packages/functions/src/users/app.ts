import 'dotenv/config'
import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import express from 'express';
import * as process from "process";
import { mongooseConnect } from "../common/database/Mongoose";
import passport from "passport";
import { UserModel } from "../common/models/User";
import { passportMiddleware } from "../common/database/passportMiddleware";
import { loggerMiddleware } from "../common/middlewares/loggerMiddleware";
import { pilotRequiredMiddleware } from "../common/middlewares/pilotRequiredMiddleware";
import { corsMiddleware } from "../common/middlewares/corsMiddleware";
import { redisSessionMiddleware } from "../common/middlewares/redisSessionMiddleware";
import { apiKeyMiddleware } from "../common/middlewares/apiKeyMiddleware";


mongooseConnect.then(value => {
    // console.log(value)
})

// Create the Express app
const app = express();

apiKeyMiddleware(app);

app.use(express.json());

await redisSessionMiddleware(app);

loggerMiddleware(app);
passportMiddleware(app);
corsMiddleware(app);

/**
 * POST /pilots/signup
 *
 * Create a user and update profile information during the pilot onboarding process.
 */
app.post('/signup', async (req, res, next) => {

    const body = req.body

    // Check if we have a logged-in user
    // @ts-ignore
    let user = req.user;
    if (!user) {
        try {
            // Try to create and save a new user
            user = new UserModel(body);
            // @ts-ignore
            user = await user.save()
            // Sign in and redirect to continue the signup process
            // @ts-ignore
            req.login(user, err => {

                if (err) {
                    console.log(err)
                    next(err);
                }
                console.log('Ok redirecting')
                return res.redirect('/users/dashboard');
            });
        } catch (err) {
            console.log(err);
            // Show an error message to the user
            // @ts-ignore
            const errors = Object.keys(err.errors).map(field => err.errors[field].message);
            // res.render('signup', { step: 'account', error: errors[0] });
            res.status(500).json(errors)
        }
    } else {
        try {
            // Try to update the logged-in user using the newly entered profile data
            // @ts-ignore
            user.set(body);
            // @ts-ignore
            await user.save();
            return res.redirect('/pilots/stripe/authorize');
        } catch (err) {
            next(err);
        }
    }
});

/**
 * GET /pilots/login
 *
 * Simple pilot login.
 */
app.post(
    '/login',
    passport.authenticate('pilot-login', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login/failed',
    })
);

/**
 * GET /pilots/logout
 *
 * Delete the pilot from the session.
 */
app.get('/logout', pilotRequiredMiddleware, (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/loggedOut");
    });
});

// Lambda handler function
const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): void => {
    awsServerlessExpress.proxy(server, event, context);
};

// Start the server on the correct port
if (process.env.IS_LOCAL || true) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Users api started: http://localhost:${process.env.PORT || 3000}`);
    });
}


