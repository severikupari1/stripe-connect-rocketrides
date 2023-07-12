// @ts-ignore
export const pilotRequiredMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(500).json({ loggedIn: false })
        // TODO
        // return res.redirect('/users/login');
    }
    next();
};