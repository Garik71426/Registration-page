const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const schema = require('../utils/validate');

const config = require('../config');
const { createToken, checkRefreshToken } = require('../utils/token');
const User = require('../models');

/* Auth */
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = await schema.login.validateAsync({
            email: req.body.email,
            password: req.body.password,
        })
        let user;
        try {
            user = await User.findOne({
                where: {
                    email: email.toLowerCase(),
                    password: crypto
                        .createHash('md5')
                        .update(config.SALT + password)
                        .digest('hex'),
                },
            });
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
            return error;
        };
        if (user) {
            const token = createToken(user);
            res.status(200).send({
                token,
                user,
            });
        } else {
            res.status(400).send({
                message: 'Wrong email or password',
            });
        };
    } catch (err) {
        console.error(err)
        if (err.details) {
            res.status(400).send({
                message: err.details[0].message,
            });
        }
        next(err);
    }
});

/* Refresh token */
router.post('/refresh', async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).send({
                message: 'is absent the token',
            });
            return;
        }
        const decoded = checkRefreshToken(token);
        if (!decoded) {
            res.status(400).send({
                message: 'Authorization fail',
            });
            return;
        } else {
            let user;
            try {
                user = await User.findOne({ where: { id: decoded.id } })
            } catch (error) {
                res.status(500).send('Server error')
                return error;
            }
            if (user) {
                const updatedToken = createToken(user);
                res.status(200).send({
                    updatedToken,
                });
            } else {
                res.status(400).send({
                    message: 'Authorization fail',
                });
            }
        }
    } catch (err) {
        console.error(err)
        next(err);
    }
});


module.exports = router;