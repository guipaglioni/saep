function authMiddleware(req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Você precisa estar logado para acessar esta rota');
    }
}

module.exports = authMiddleware;
