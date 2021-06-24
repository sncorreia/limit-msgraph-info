const GeneralError = require("../utils/error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.httpCode).json({
            status: err.httpCode,
            name: err.name,
            message: err.description
        });
    }
};

module.exports = errorHandler;