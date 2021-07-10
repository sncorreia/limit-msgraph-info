// Require other files
const GeneralError = require("./error");

const validateScope = (scope, authInfo) => {
    if (
        !(
            "scp" in authInfo &&
            authInfo.scp.split(" ").indexOf(scope) >= 0
        )
    ) {
        throw new GeneralError(
            "InsufficientPrivileges",
            403,
            `Insufficient privileges to complete the operation. The scope ${scope} is missing in the access_token`
        );
    }
}

module.exports = validateScope;