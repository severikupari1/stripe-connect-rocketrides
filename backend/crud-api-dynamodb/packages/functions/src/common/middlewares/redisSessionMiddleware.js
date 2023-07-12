import bodyParser from "body-parser";
import { createClient } from "redis";
import session from "express-session";
import RedisStore from "connect-redis";
export const redisSessionMiddleware = async (app) => {
    app.set('trust proxy', true);
    // https://medium.com/swlh/session-management-in-nodejs-using-redis-as-session-store-64186112aa9
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const client = createClient({
        url: 'redis://host.docker.internal:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    //Configure session middleware
    app.use(session({
        store: new RedisStore({
            client: client
        }),
        secret: 'CHANGE_ME',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 1000 * 60 * 10 // session max age in miliseconds
        }
    }));
};
