const User = require('../models/user.model');

async function isAuthenticated(req, res, next) {
    const authToken = req.headers.authtoken;
    if(!authToken) {
        return res.status(401).json({ error: 'User not logged in' });
    }
    try {
        const user = await User.findById(authToken);
        if(user) {
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({ error: 'Corrupted auth token. Please try again' });
        }
    } catch(err) {
        console.log(err);
        return res.status(403).json({ error: err });
    }
}

module.exports = isAuthenticated;