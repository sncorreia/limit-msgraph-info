const config = require('../configs/authorizationConfig.json');
const dotenv = require("dotenv");

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const options = {
    identityMetadata: `https://${config.metadata.authority}/${process.env.AUTHORIZATION_TENANT_ID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.issuer}/${process.env.AUTHORIZATION_TENANT_ID}/`,
    clientID: process.env.AUTHORIZATION_CLIENT_ID,
    audience: process.env.AUTHORIZATION_AUDIENCE,
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    loggingLevel: config.settings.loggingLevel,
    scope: config.resource.scope
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    // Send user info using the second argument
    done(null, {}, token);
}
);

module.exports = bearerStrategy;