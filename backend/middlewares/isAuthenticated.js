const User = require('../models/user.model'),
      jwt  = require('jsonwebtoken');

async function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization.split(" ")[1];
    if(!authToken) {
        return res.status(401).json({ error: 'User not logged in' });
    }
    try {
        var { _id } = jwt.verify(authToken, process.env.AUTH_SECRET);
        const user = await User.findById(_id);
        if(user) {
            req.user = user;
            next();
        }
        else {
            return res.status(500).json({ error: 'Cannot find user. Please try again.' });
        }
    } catch(err) {
        console.log(err);
        return res.status(401).json({ error: 'Corrupted auth token. Please try again' });
    }
}

module.exports = isAuthenticated;