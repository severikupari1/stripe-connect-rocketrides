import { Express } from "express";

export const corsMiddleware = (app: Express) => {
// enable CORS for all routes and for our specific API-Key header
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, api_key')
        next()
    })
};