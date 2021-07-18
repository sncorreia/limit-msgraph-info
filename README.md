# API to restrain the information returned from MS Graph

Nowadays, due to GDPR compliance, companies want to expose the minimum amount of information to 3rd parties.

Due to this, a question we see a lot is how to restrain the information returned from MS Graph to only a subset of attributes. This is not possible (at least for now), so a good solution would be to develop a service, that would act as a middleman, that you can expose to your 3rd party instead of giving direct access to MS Graph.

This is just a POC sample, with a several topics to improve, but shows how this can be achieved.

## Microsoft Libraries used

- MSAL for Node: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node
- MS Graph JS SDK: https://github.com/microsoftgraph/msgraph-sdk-javascript