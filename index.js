// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routers/users");

// Require other files
const GeneralError = require("./utils/error");
const errorHandler = require("./middleware/errorHandler");

// Initialize app
const app = express();

// Set up Middleware
app.use(morgan('dev'));
app.use(cors());

// Set up routing
app.use("/users", userRouter);

// Throw Bad Request error for each malformed request
app.all("*", (req, res) => {
    throw new GeneralError("BadRequest", 404, "The path you are trying to reach does not exist");
});

// Set up custom error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});