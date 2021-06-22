const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
    res.status(200).json({
        "status": "Endpoint Alive",
        "info": "It will return all the users with limited info from MS Graph"
    })
});

router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        "status": "Endpoint Alive",
        "info": `It will return the user ${id} with limited info from MS Graph`
    })
});

module.exports = router;