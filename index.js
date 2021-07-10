// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./routers/users");

// Require other files
const GeneralError = require("./utils/error");
const errorHandler = require("./middleware/errorHandler");
const bearerStrategy = require("./utils/bearerStrategy");

// Initialize app
const app = express();

// Set up Middleware
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(cors());

// Set up passport middleware to protect the endpoints with AAD
app.use(passport.authenticate("oauth-bearer", { session: false, failWithError: true }),
    (req, res, next) => {
        next();
    }, (err, req, res, next) => {
        throw new GeneralError("AuthenticationError", 401, "Authorization failed");
    });

// Set up routing
app.use("/users", userRouter);

// Throw Bad Request error for each malformed request
app.all("*", (req, res) => {
    throw new GeneralError("BadRequest", 404, "The path you are trying to reach does not exist");
});

// Set up custom error handling middleware - this should be defined at last, after all other app.use() and routes 
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});