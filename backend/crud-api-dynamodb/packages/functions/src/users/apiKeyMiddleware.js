import process from "process";
export const apiKeyMiddleware = (app) => {
    app.use((req, res, next) => {
        const apiKey = req.get('api_key');
        if (!apiKey || apiKey !== process.env.API_KEY) {
            res.status(401).json({ error: 'unauthorised' });
        }
        else {
            next();
        }
    });
};
