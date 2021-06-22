const express = require("express");
const auth = require("../services/authService");

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        res.status(200).json({
            "status": "Endpoint Alive",
            "info": "It will return all the users with limited info from MS Graph",
            "access_token": authResponse.accessToken
        })
    } catch (error) {
        console.log(error);
    }

});

router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const authResponse = await auth.getToken(auth.tokenRequest);
    res.status(200).json({
        "status": "Endpoint Alive",
        "info": `It will return the user ${id} with limited info from MS Graph`,
        "access_token": authResponse.accessToken
    })
});

module.exports = router;