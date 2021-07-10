const express = require("express");
const auth = require("../services/authService");
var graph = require('../services/graphService');

// Require other files
const GeneralError = require("../utils/error");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const permissionNeeded = "access_as_user";
    try {
        if (
            !(
                "scp" in req.authInfo &&
                req.authInfo.scp.split(" ").indexOf(permissionNeeded) >= 0
            )
        ) {
            console.log("I reached here")
            throw new GeneralError(
                "InsufficientPrivileges",
                403,
                `Insufficient privileges to complete the operation. The scope ${permissionNeeded} is missing in the access_token`
            );
        }
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUsers(authResponse.accessToken);
        res.status(200).json(graphResponse);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const permissionNeeded = "access_as_user";
    try {
        if (
            !(
                "scp" in req.authInfo &&
                req.authInfo.scp.split(" ").indexOf(permissionNeeded) >= 0
            )
        ) {
            throw new GeneralError(
                "InsufficientPrivileges",
                403,
                `Insufficient privileges to complete the operation. The scope ${permissionNeeded} is missing in the access_token`
            );
        }
        const authResponse = await auth.getToken(auth.tokenRequest);
        const graphResponse = await graph.getUserById(authResponse.accessToken, req.params.id);
        res.status(200).json(graphResponse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;