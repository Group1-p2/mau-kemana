const jwt = require("jsonwebtoken");
const {
    User
} = require("../models");

const authentication = (request, response, next) => {
    const {
        access_token
    } = request.headers;
    if (!access_token) {
        next({
            name: "TOKEN_ERROR",
        });
    } else {
        var decode = jwt.verify(access_token, process.env.SECRET);
        request.userData = decode;
        User.findByPk(request.userData.id)
            .then((data) => {
                if (data) {
                    next();
                } else {
                    next({
                        name: "NOT_FOUND_ERROR",
                    });
                }
            })
            .catch((err) => {
                next({
                    name: "AUTHENTICATION_FAILED",
                });
            });
    }
};

const authorization = (request, response, next) => {
    const {
        id
    } = request.params;
    Todo.findByPk(id)
        .then((data) => {
            if (!data) {
                next({
                    name: "NOT_FOUND_ERROR",
                });
            } else if (data.UserId !== request.userData.id) {
                next({
                    name: "AUTHORIZATION_FAILED",
                });
            } else {
                next();
            }
        })
        .catch((err) => {
            response.status(500).json({
                message: "Internal server error",
            });
        });
};

module.exports = {
    authentication,
    authorization,
};