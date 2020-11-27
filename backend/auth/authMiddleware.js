function withAuth(req, res, next) {
    if (!req.user) {
        res.status(401);
        return res.json({ message: 'Unauthorized: User not logged in' });
    }

    next();
}

module.exports = withAuth;
