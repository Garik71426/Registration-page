const jwt = require('jsonwebtoken');

const config = require('../config');

const createToken = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email.toLowerCase() },
        config.ACCESS_TOKEN,
        { expiresIn: '2h' }
    );
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email.toLowerCase() },
        config.REFRESH_TOKEN,
        { expiresIn: '24h' }
    );
    return { accessToken, refreshToken };
};

const checkAccessToken = (token) => {
    try {
        const payload = jwt.verify(token, config.ACCESS_TOKEN);
        return payload;
    } catch (err) {
        return false;
    }
};

const checkRefreshToken = (token) => {
    try {
        const payload = jwt.verify(token, config.REFRESH_TOKEN);
        return payload;
    } catch (err) {
        return false;
    }
};

module.exports = {
    createToken,
    checkAccessToken,
    checkRefreshToken,
};