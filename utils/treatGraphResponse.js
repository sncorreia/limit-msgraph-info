const dotenv = require("dotenv");
dotenv.config();

const treatGraphResponse = (graphResponse) => {
    delete graphResponse["@odata.context"];
    if (graphResponse['@odata.nextLink'] === undefined) {
        return graphResponse;
    } else {
        let changeODataNextLink = graphResponse['@odata.nextLink'].replace("https://graph.microsoft.com/v1.0/users?$select=id%2cdisplayName%2cmail&$top=5&", process.env.DEV_DOMAIN + "/users?");
        graphResponse['@odata.nextLink'] = changeODataNextLink;
        return graphResponse;
    }
}

module.exports = treatGraphResponse;