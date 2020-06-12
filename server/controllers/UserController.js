const jwt = require("jsonwebtoken");
const {
    User
} = require("../models");
const bcrypt = require("bcrypt");
const verificationToken = require('../helpers/googleOauth.js')


class UserController {
    static googleSign(request, response, next) {
        let google_token = request.headers.google_token
        let email = null
        let newUser = false
        verificationToken(google_token)
            .then(payload => {
                email = payload.email
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    newUser = true
                    return User.create({
                        email,
                        password: process.env.DEFAULT_GOOGLE_PASSWORD
                    })
                }
            })
            .then(user => {
                let code = newUser ? 202 : 201
                const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                    },
                    process.env.SECRET
                );
                response.status(code).json({
                    access_token: token,
                });
            })
            .catch(err => {
                // next(err)
                console.log(err)
            })
    }

    static register(request, response, next) {
        const newUser = {
            email: request.body.email,
            password: request.body.password,
        };
        User.create(newUser)
            .then((user) => {
                response.status(201).json({
                    id: user.id,
                    email: user.email,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static login(request, response, next) {
        const email = request.body.email;
        const password = request.body.password;
        console.log(email, password, process.env.SECRET);
        User.findOne({
                where: {
                    email: email,
                },
            })
            .then((user) => {
                if (!user) {
                    next({
                        name: "VALIDATION_FAILED",
                    });
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        const token = jwt.sign({
                                id: user.id,
                                email: user.email,
                            },
                            process.env.SECRET
                        );
                        response.status(201).json({
                            access_token: token,
                        });
                    } else {
                        next({
                            name: "VALIDATION_FAILED",
                        });
                    }
                }
            })
            .catch((err) => {
                // next(err)
                console.log(err);
            });
    }
}

module.exports = UserController;