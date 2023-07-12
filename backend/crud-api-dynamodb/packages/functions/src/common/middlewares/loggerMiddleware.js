import logger from "morgan";
export const loggerMiddleware = (app) => {
    // Set up useful middleware
    app.use(logger('dev'));
};
