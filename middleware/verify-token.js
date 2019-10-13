const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('API_SECRET_KEY'), (err, decoded) => {
            if (err)
                res.json({ status: false, message: 'Failed to Authenticate Token.!' });
            else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.status(404).json({ status: false, message: 'No Token Provided.!' });
    }
};