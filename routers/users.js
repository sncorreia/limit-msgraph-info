const express = require("express");
const auth = require("../services/authService");
const fetch = require("../services/fetchService");

const router = express.Router();
const graphDomain = "https://graph.microsoft.com/v1.0/"

router.get("/", async (req, res) => {
    const graphUrl = graphDomain + "users/?$select=id,displayName,mail";
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await fetch.callApi(graphUrl, authResponse.accessToken);
        res.status(200).json(graphResponse);
    } catch (error) {
        console.log(error);
    }

});

router.get("/:id", async (req, res) => {
    const graphUrl = graphDomain + "users/" + req.params.id + "?$select=id,displayName,mail";
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await fetch.callApi(graphUrl, authResponse.accessToken);
        res.status(200).json(graphResponse);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;