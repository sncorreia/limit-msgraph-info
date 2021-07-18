const express = require("express");
const auth = require("../services/authService");
const graph = require('../services/graphService');
const validateScope = require("../utils/validateScope");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.get("/", async (req, res, next) => {
    // console.log(req.query["$skipToken"]);
    const permissionNeeded = "access_as_user";
    try {
        validateScope(permissionNeeded, req.authInfo);
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUsers(authResponse.accessToken);
        const treatedGraphResponse = treatGraphResponse(graphResponse);
        res.status(200).json(treatedGraphResponse);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const permissionNeeded = "access_as_user";
    try {
        validateScope(permissionNeeded, req.authInfo);
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUserById(authResponse.accessToken, req.params.id);
        res.status(200).json(graphResponse);
    } catch (error) {
        next(error);
    }
});

const treatGraphResponse = (graphResponse) => {
    if (graphResponse['@odata.nextLink'] === undefined) {
        return graphResponse;
    } else {
        let changeODataNextLink = graphResponse['@odata.nextLink'].replace("https://graph.microsoft.com/v1.0", process.env.DEV_DOMAIN);
        graphResponse['@odata.nextLink'] = changeODataNextLink;
        return graphResponse;
    }
}

module.exports = router;