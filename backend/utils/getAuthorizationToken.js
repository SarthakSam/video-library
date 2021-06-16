const jwt = require('jsonwebtoken');

require('dotenv').config()

module.exports = function(data) {
    const authorization = jwt.sign( data, process.env.AUTH_SECRET , { expiresIn: '24h' });
    return authorization;  
}
