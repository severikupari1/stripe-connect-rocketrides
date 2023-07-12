import { Express } from "express";
import logger from "morgan";

export const loggerMiddleware = (app: Express) => {
// Set up useful middleware
    app.use(logger('dev'));
};