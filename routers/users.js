const express = require("express");
const auth = require("../services/authService");
const graph = require('../services/graphService');
const validateScope = require("../utils/validateScope");
const treatGraphResponse = require("../utils/treatGraphResponse");



const router = express.Router();

router.get("/", async (req, res, next) => {
    const permissionNeeded = "access_as_user";
    try {
        validateScope(permissionNeeded, req.authInfo);
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUsers(authResponse.accessToken, req.query["$skiptoken"] || req.query["$skipToken"]);
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

module.exports = router;