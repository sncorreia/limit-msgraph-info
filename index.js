// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routers/users");

// Initialize app
const app = express();

// Set up Middleware
app.use(morgan('dev'));
app.use(cors());

// Set up routing
app.use("/", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});