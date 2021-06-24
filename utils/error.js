// jshint esversion:8 

class GeneralError extends Error {
    constructor(name, httpCode, description) {
        super();
        this.name = name;
        this.httpCode = httpCode;
        this.description = description;
    }
}

module.exports = GeneralError;