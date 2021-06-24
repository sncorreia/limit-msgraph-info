// jshint esversion:8

const GeneralError = require("../utils/error");

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.httpCode).json({
            status: err.httpCode,
            name: err.name,
            message: err.description
        });
    }
};

module.exports = handleErrors;