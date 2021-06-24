const express = require("express");
const auth = require("../services/authService");
const fetch = require("../services/fetchService");

// Require other files
const GeneralError = require("../utils/error");
const errorHandler = require("../middleware/errorHandler");

const router = express.Router();
const graphDomain = "https://graph.microsoft.com/v1.0/"

router.get("/", async (req, res, next) => {
    const graphUrl = graphDomain + "users/?$select=id,displayName,mail";
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await fetch.callApi(graphUrl, authResponse.accessToken);
        if (graphResponse.name === "Error") {
            //TODO - Set up the error according to the error message from MS Graph 
            throw new GeneralError("Internal Server Error", 500, "Something went wrong")
        } else {
            res.status(200).json(graphResponse);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }

});

router.get("/:id", async (req, res, next) => {
    const graphUrl = graphDomain + "users/" + req.params.id + "?$select=id,displayName,mail";
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await fetch.callApi(graphUrl, authResponse.accessToken);
        if (graphResponse.name === "Error") {
            //TODO - Set up the error according to the error message from MS Graph 
            throw new GeneralError("Internal Server Error", 500, "Something went wrong")
        } else {
            res.status(200).json(graphResponse);
        }
    } catch (error) {
        //console.log(error);
        next(error);
    }
});

module.exports = router;