var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

// Require other files
const GeneralError = require("../utils/error");

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById
};

/**
 * Returns a client object to call MS Graph.
 * @param {string} accessToken 
 * @returns {graph.Client} 
 */
function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
}

/**
 * Get a list of users by calling MS Graph API .
 * @param {string} accessToken 
 */
async function getUsers(accessToken) {
    const client = getAuthenticatedClient(accessToken);
    try {
        const users = await client
            .api('/users')
            .select('id,displayName,mail')
            .get();
        return users;
    } catch (error) {
        throw new GeneralError(error.code, error.statusCode, JSON.parse(error.body).message);
    }
}

/**
 * Get a user by ID by calling MS Graph API .
 * @param {string} accessToken
 * @param {string} userId
 */
async function getUserById(accessToken, userId) {
    const client = getAuthenticatedClient(accessToken);
    try {
        const user = await client
            .api(`/users/${userId}`)
            .select('id,displayName,mail')
            .get();
        return user;
    } catch (error) {
        throw new GeneralError(error.code, error.statusCode, JSON.parse(error.body).message);
    }
}