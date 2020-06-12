function errorHandler(err, req, res, next) {
    let statusCode = ""
    let errorMessage = ""
    let errorCode = ""

    switch (err.name) {
        case "TOKEN_ERROR":
            statusCode = 404
            errorCode = err.name
            errorMessage = "Token Not Found"
            break
        case "NOT_FOUND_ERROR":
            statusCode = 404
            errorCode = "NOT_FOUND_ERROR"
            errorMessage = err.message || "Data Not Found"
            break
        case "AUTHENTICATION_FAILED":
            statusCode = 401
            errorCode = err.name
            errorMessage = "Authentication Error"
            break
        case "AUTHORIZATION_FAILED":
            statusCode = 403
            errorCode = err.name
            errorMessage = "Authorization Failed"
            break
        case "VALIDATION_FAILED":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Authorization Failed"
            break
        case "SequelizeValidationError":
            statusCode = 400
            errorCode = "VALIDATION ERROR"
            const validationError = []
            err.errors.forEach(e => {
                validationError.push(e.message)
            })
            errorMessage = validationError
            break
        default:
            statusCode = 500
            errorMessage = "Internal Error Server"
            errorCode = "Internal Error Server"
    }
    res.status(statusCode).json({
        errorCode,
        msg: errorMessage
    })
}

module.exports = errorHandler