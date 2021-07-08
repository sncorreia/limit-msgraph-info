const express = require("express");
const auth = require("../services/authService");
var graph = require('../services/graphService');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUsers(authResponse.accessToken);
        res.status(200).json(graphResponse);
    } catch (error) {
        next(error);
    }

});

router.get("/:id", async (req, res, next) => {
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUserById(authResponse.accessToken, req.params.id);
        res.status(200).json(graphResponse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;