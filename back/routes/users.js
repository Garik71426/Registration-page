var express = require('express');
var router = express.Router();

const schema = require('../utils/validate');
const crypto = require('crypto');
const config = require('../config');
const { createToken, checkAccessToken } = require('../utils/token');
const User = require('./../models')

/* Registration */
router.post('/create', async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = await schema.register.validateAsync({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
        let user;
        try {
            user = await User.findOne({
                where: {
                    email: email.toLowerCase(),
                },
            });
            if (user) {
                res.status(400).send({
                    message: 'A user with this email is already registered',
                });
                return;
            }
        } catch (error) {
            res.status(500).send('Server error')
            return error;
        }
        try {
            user = await User.create({
				firstName,
				lastName,
				email: email.toLowerCase(),
				password: crypto
					.createHash('md5')
					.update(config.SALT + password)
					.digest('hex'),
            })
            await user.save()
        } catch (error) {
            res.status(500).send('Server error')
            return error;
        }
        const token = createToken(user);
        res.status(200).send({
            token,
            user,
        });
    } catch (err) {
        console.error(err)
        if (err.details) {
            res.status(400).send({
                message: err.details[0].message,
            });
        }
        next(err);
    }
})

/* GET user by id. */
router.get('/my', async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        const dekoded = checkAccessToken(accessToken);
        if (dekoded) {
            let currentUser;
            try {
                currentUser = await User.findOne({
                    where: {
                        id: dekoded.id,
                    },
                });
            } catch (error) {
                res.status(500).send('Server error')
                return error;
            }
            if (!currentUser) {
                res.status(403).send({
                    message: 'Permision dinead',
                });
                return;
            } else {
                res.status(200).send(currentUser);
            }
        } else {
            res.status(401).send({
                message: 'Invalid token',
            });
            return;
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
