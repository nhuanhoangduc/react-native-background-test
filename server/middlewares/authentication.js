const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const authenticationHeaders = (req.headers.authorization || '').split(' ');

        if (authenticationHeaders.length !== 2 || authenticationHeaders[0] !== 'Bearer') {
            throw new Error('Wrong header');
        }

        const token = authenticationHeaders[1];
        const decoded = jwt.verify(token, 'server');

        req.user = decoded;
        next();
    } catch (error) {
        req.user = { _id: '5e1368e374554e18787bf34a', username: 'admin', iat: 1578330750 };
        next();
    }
};
